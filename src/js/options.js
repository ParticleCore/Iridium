"use strict";

function emptyElementContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function updateSetting(
    settingId,
    value
) {

    let element;

    if (!(element = document.getElementById(settingId))) {
        return;
    }

    switch (element.type) {

        case "checkbox":
            element.checked = value;
            break;

    }

    if (element.id === "darkTheme") {
        document.documentElement.dataset.dark = value;
    }

}

function onSettingsResponse(items) {

    settings = items || window.defaultSettings || {};

    for (let settingId in items) {
        if (items.hasOwnProperty(settingId)) {
            updateSetting(settingId, items[settingId]);
        }
    }

}

function onSettingsChanged(changes) {
    for (let key in changes) {

        if (!changes.hasOwnProperty(key) ||
            changes[key].newValue === changes[key].oldValue
        ) {
            continue;
        }

        settings[key] = changes[key].newValue;
        updateSetting(key, settings[key]);

    }
}

function onSettingsPageUpdate(event) {

    if (!event.target.classList.contains("setting")) {
        return;
    }

    let data;

    data = {};

    if (event.target.id in settings) {
        if (event.target.checked !== settings[event.target.id]) {

            settings[event.target.id] = event.target.checked;
            data[event.target.id] = settings[event.target.id];

        }
    }

    switch (event.target.id) {

        case "darkTheme":
            document.documentElement.dataset.dark = event.target.checked;
            break;

        case "syncSettings":
            data = settings;
            chrome
                .storage[!settings.syncSettings ? "sync" : "local"]
                .set({syncSettings: false},
                    function (event) {
                        console.log("migrate storage");
                    });
            break;

    }

    chrome
        .storage[settings.syncSettings ? "sync" : "local"]
        .set(data,
            function (event) {
                console.log("onSettingsPageUpdate", event);
            });

}

function loadLocale() {

    function setLocale(value) {

        let type;
        let label;
        let locale;
        let attributeList;

        if ((attributeList = value.dataset.locale.split("|")).length !== 2) {
            return;
        }

        type = attributeList[0];
        label = attributeList[1];

        if ((locale = chrome.i18n.getMessage(label)) === "") {
            return;
        }

        switch (type) {

            case "title":
                value.setAttribute("title", locale);

                break;
            case "text":
                emptyElementContent(value);
                value.textContent = locale;

                break;
            case "tooltip":
                value.tooltipText = locale;
                break;

        }

    }

    document
        .querySelectorAll("[data-locale]")
        .forEach(setLocale);

}

function loadSystemInformation() {

    let infoList;

    infoList = [
        "manifestVersion: " + chrome.runtime.getManifest().version,
        "cookieEnabled: " + window.navigator.cookieEnabled,
        "doNotTrack: " + window.navigator.doNotTrack,
        "language: " + window.navigator.language
    ];

    function setBrowserInf(info) {

        infoList.push(
            "buildID: " + info.buildID,
            "name: " + info.name,
            "vendor: " + info.vendor,
            "version: " + info.version
        );

        return browser.runtime.getPlatformInfo();

    }

    function setPlatformInfo(info) {

        infoList.push(
            "arch: " + info.arch,
            "os: " + info.os
        );

        return infoList.join("\n");

    }

    return browser
        .runtime
        .getBrowserInfo()
        .then(setBrowserInf)
        .then(setPlatformInfo);

}

function openBugReport() {

    function openIssueTemplate(data) {

        let template;

        template = [
            "Make sure you followed the instructions in the link below before opening a new bug report:",
            "https://github.com/ParticleCore/Iridium/wiki/Report-a-bug",
            "Once you've finished following the instructions remove this section to confirm you've read them",
            "",
            "---",
            "",
            "software details:",
            "````",
            data,
            "````",
            "",
            "steps to recreate the problem:",
            "",
            "",
            "additional information that could be helpful:",
            ""
        ];

        browser.tabs.create({url: "https://github.com/ParticleCore/Iridium/issues/new?body=" + window.encodeURIComponent(template.join("\n"))});

    }

    loadSystemInformation().then(openIssueTemplate);

}

function onPageClick(event) {

    switch (event.target.id) {

        case "report-bug-button":
            openBugReport();
            break;

    }

}

function keepUsingSync(items) {

    if ("syncSettings" in items &&
        items["syncSettings"] === true
    ) {
        return chrome.storage.sync.get(settings, onSettingsResponse);
    }

    chrome.storage.local.get(settings, onSettingsResponse);

}

let settings;

settings = window.defaultSettings || {};

document.addEventListener("change", onSettingsPageUpdate, true);
document.addEventListener("click", onPageClick, true);

chrome.storage.onChanged.addListener(onSettingsChanged);
chrome.storage.sync.get({"syncSettings": settings.syncSettings}, keepUsingSync);

loadLocale();
loadSystemInformation();
