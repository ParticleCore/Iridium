"use strict";

const channel = new BroadcastChannel(browser.runtime.id);
let port = null;

const saveSettings = async data => {

    if (!data) {
        return;
    }

    const dataSync = await browser.storage.sync.get();

    if (dataSync?.[SettingId.syncSettings] === true) {
        await browser.storage.sync.set(data);
    } else {
        await browser.storage.local.set(data);
    }

};

const portMessage = data => {

    if (!data) {
        return;
    }

    if (!port) {
        port = browser.runtime.connect(browser.runtime.id);
        port?.onDisconnect?.addListener(() => port = null);
    }

    port?.postMessage(data);

};

channel.addEventListener("message", (message) => {
    switch (message?.data?.type) {
        case "setting":
            saveSettings(message?.data?.payload).then();
            break;
        case "action":
            portMessage(message?.data);
            break;
    }
});

(async () => {
    const onStorageChanged = changes => {

        const changeData = {};

        for (let key in changes) {
            const change = changes[key];
            if (change.newValue !== change.oldValue) {
                changeData[key] = change.newValue;
            }
        }

        if (Object.keys(changeData).length > 0) {

            channel.postMessage(changeData);

            // check if user switched storage areas
            if (Object.hasOwn(changeData, SettingId.syncSettings)) {
                if (changeData[SettingId.syncSettings] === true) {
                    browser.storage.local.onChanged.removeListener(onStorageChanged);
                    browser.storage.sync.onChanged.addListener(onStorageChanged);
                } else {
                    browser.storage.sync.onChanged.removeListener(onStorageChanged);
                    browser.storage.local.onChanged.addListener(onStorageChanged);
                }
            }

        }

    };

    const dataSync = await browser.storage.sync.get();

    if (dataSync?.[SettingId.syncSettings] === true) {
        browser.storage.sync.onChanged.addListener(onStorageChanged);
    } else {
        browser.storage.local.onChanged.addListener(onStorageChanged);
    }

})();