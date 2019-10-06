"use strict";

let url;
let defaultSettings;

function emptyElementContent(element) {
    element.innerHTML = "";
}

function updateSetting(
    settingId,
    value
) {

    let element;

    element = document.getElementById(settingId);

    if (!element) {
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

    console.log(items);

    if (document.getElementById("message")) {
        document.getElementById("message").textContent = JSON.stringify(items, null, 4);
    }

    for (let settingId in items) {
        if (items.hasOwnProperty(settingId)) {
            updateSetting(settingId, items[settingId]);
        }
    }

}

function onSettingsChanged(
    changes,
    namespace
) {
    console.log("options", changes);
    // for (let key in changes) {
    //     settings[key] = changes[key].newValue;
    // }
}

function onSettingsPageUpdate(event) {

    if (!event.target.classList.contains("setting")) {
        return;
    }

    let data;

    data = {};
    data[event.target.id] = event.target.checked;

    chrome.storage.local.set(data, function (event) {
        console.log("onSettingsPageUpdate", event);
    });

    switch (event.target.id) {

        case "darkTheme":
            document.documentElement.dataset.dark = event.target.checked;
            break;

    }

}

function onPageClick(event) {

}

function loadLocale() {

    document
        .querySelectorAll("[data-locale]")
        .forEach(function (
            value,
            key,
            parent
        ) {

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
                    let fragment = document.createElement("template");
                    fragment.innerHTML = locale;
                    value.appendChild(fragment.content);

                    break;
                case "tooltip":
                    value.tooltipText = locale;
                    break;

            }

        });

}

function loadSystemInformation() {

    let section;
    let manifest;
    let infoList;

    if ((section = document.getElementById("system-information")) == null) {
        return;
    }

    emptyElementContent(section);

    manifest = chrome.runtime.getManifest();

    infoList = [
        "manifestVersion: " + manifest.version,
        "cookieEnabled: " + window.navigator.cookieEnabled,
        "doNotTrack: " + window.navigator.doNotTrack,
        "language: " + window.navigator.language
    ];

    browser
        .runtime
        .getBrowserInfo()
        .then(
            info => {

                infoList.push(
                    "buildID: " + info.buildID,
                    "name: " + info.name,
                    "vendor: " + info.vendor,
                    "version: " + info.version
                );

                return browser.runtime.getPlatformInfo();

            })
        .then(
            info => {

                infoList.push(
                    "arch: " + info.arch,
                    "os: " + info.os
                );

                section.textContent = infoList.join("\n");

            });

}

defaultSettings = {
    darkTheme: true,
    autoPlayVideo: false,
    maxResThumbnail: true
};

document.addEventListener("change", onSettingsPageUpdate, true);
document.addEventListener("click", onPageClick, true);

chrome.storage.onChanged.addListener(onSettingsChanged);
chrome.storage.local.get(defaultSettings, onSettingsResponse);

loadLocale();
loadSystemInformation();
