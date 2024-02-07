"use strict";

const channel = new BroadcastChannel(browser.runtime.id);
let port = null;

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

const saveSettings = async data => {

    if (!data) {
        return;
    }

    const dataSync = await browser.storage.sync.get();

    if (dataSync?.[SettingData.syncSettings.id] === true) {
        await browser.storage.sync.set(data);
    } else {
        await browser.storage.local.set(data);
    }

};

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
        if (Object.hasOwn(changeData, SettingData.syncSettings.id)) {
            if (changeData[SettingData.syncSettings.id] === true) {
                browser.storage.local.onChanged.removeListener(onStorageChanged);
                browser.storage.sync.onChanged.addListener(onStorageChanged);
            } else {
                browser.storage.sync.onChanged.removeListener(onStorageChanged);
                browser.storage.local.onChanged.addListener(onStorageChanged);
            }
        }

    }

};

const checkNewFeatures = async settings => {

    const newFeatures = {};

    for (let key in SettingData) {
        if (!Object.hasOwn(settings, key)) {
            settings[key] = newFeatures[key] = SettingData[key].default;
        }
    }

    if (Object.keys(newFeatures).length > 0) {
        if (settings[SettingData.syncSettings.id] === true) {
            await browser.storage.sync.set(newFeatures);
        } else {
            await browser.storage.local.set(newFeatures);
        }
    }

    return settings;

};

const getSettings = async () => {

    const dataSync = await browser.storage.sync.get();

    if (dataSync?.[SettingData.syncSettings.id] === true) {
        return await checkNewFeatures(dataSync);
    }

    const dataLocal = await browser.storage.local.get();

    // storage will be empty during first installation
    // this ensures the first load stores the default settings
    if (Object.keys(dataLocal).length === 0) {
        const defaultSettings = getDefaultSettings();
        await browser.storage.local.set(defaultSettings);
        return defaultSettings;
    }

    return await checkNewFeatures(dataLocal);

};

channel.addEventListener("message", (message) => {
    if (message?.data?.type === "setting") {
        saveSettings(message?.data?.payload).then();
    } else if (message?.data?.type === "action") {
        portMessage(message?.data);
    }
});

browser.storage.sync.get().then(dataSync => {
    if (dataSync?.[SettingData.syncSettings.id] === true) {
        browser.storage.sync.onChanged.addListener(onStorageChanged);
    } else {
        browser.storage.local.onChanged.addListener(onStorageChanged);
    }
});

getSettings().then(settings => {
    const script = document.createElement("script");
    script.textContent = `window.iridiumSettings = ${JSON.stringify(settings)}`;
    document.documentElement.appendChild(script);
});

if (document.getElementById("iridium-inject")) {
    // maybe show a prompt to the user explaining
    // an update is ready and waiting for the page to be refreshed
    console.debug("already injected, will wait for fresh page load");
} else {
    const script = document.createElement("script");
    script.id = "iridium-inject";
    script.textContent = `(${mainScript}("${browser.runtime.id}",${JSON.stringify(SettingData)}))`;
    document.documentElement.appendChild(script);
}