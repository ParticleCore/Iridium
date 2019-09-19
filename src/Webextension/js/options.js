"use strict";

let url;

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

chrome.storage.onChanged.addListener(function (
    changes,
    namespace
) {
    console.log("options", changes);
    // for (let key in changes) {
    //     settings[key] = changes[key].newValue;
    // }
});

document.addEventListener("change", function (event) {

    let data;

    data = {};
    data[event.target.id] = event.target.checked;

    chrome.storage.local.set(data, function (event) {
        console.log(event);
        console.log("saved?");
    });

}, true);

chrome.storage.local.get({
    darkTheme: true,
    autoPlayVideo: false,
    maxResThumbnail: true
}, onSettingsResponse);