"use strict";

globalThis.browser ??= chrome;

const SettingData = {
    extensionButton: {
        id: "extensionButton",
        default: true,
    },
    syncSettings: {
        id: "syncSettings",
        default: false,
    },
    theme: {
        id: "theme",
        default: "deviceTheme",
    },
    logoSubscriptions: {
        id: "logoSubscriptions",
        default: false,
    },
    channelTab: {
        id: "channelTab",
        default: "featured",
    },
    homeShorts: {
        id: "homeShorts",
        default: true,
    },
    subscriptionsShorts: {
        id: "subscriptionsShorts",
        default: true,
    },
    searchShorts: {
        id: "searchShorts",
        default: true,
    },
    adOptOutAll: {
        id: "adOptOutAll",
        default: false,
    },
    adSubscribed: {
        id: "adSubscribed",
        default: false,
    },
    adVideoFeed: {
        id: "adVideoFeed",
        default: false,
    },
    adInVideo: {
        id: "adInVideo",
        default: false,
    },
    adTaggedProducts: {
        id: "adTaggedProducts",
        default: false,
    },
    adMasthead: {
        id: "adMasthead",
        default: false,
    },
    adHomeFeed: {
        id: "adHomeFeed",
        default: false,
    },
    adSearchFeed: {
        id: "adSearchFeed",
        default: false,
    },
    videoFocus: {
        id: "videoFocus",
        default: true,
    },
    creatorMerch: {
        id: "creatorMerch",
        default: true,
    },
    defaultQuality: {
        id: "defaultQuality",
        default: "auto",
    },
    defaultSpeed: {
        id: "defaultSpeed",
        default: "-1",
    },
    hfrAllowed: {
        id: "hfrAllowed",
        default: true,
    },
    autoplay: {
        id: "autoplay",
        default: false,
    },
    loudness: {
        id: "loudness",
        default: false,
    },
    scrollVolume: {
        id: "scrollVolume",
        default: true,
    },
    infoCards: {
        id: "infoCards",
        default: false,
    },
    annotations: {
        id: "annotations",
        default: true,
    },
    endScreen: {
        id: "endScreen",
        default: false,
    },
    videoFocusToggle: {
        id: "videoFocusToggle",
        default: true,
    },
    videoScreenshot: {
        id: "videoScreenshot",
        default: true,
    },
    videoThumbnail: {
        id: "videoThumbnail",
        default: true,
    },
    monetizationInfo: {
        id: "monetizationInfo",
        default: true,
    },
    blacklistEnabled: {
        id: "blacklistEnabled",
        default: true,
    },
    blacklistButton: {
        id: "blacklistButton",
        default: true,
    },
    blacklist: {
        id: "blacklist",
        default: {},
    },
};
const getDefaultSettings = () => Object.keys(SettingData).reduce((previousValue, currentValue) => ({
    ...previousValue,
    [currentValue]: SettingData[currentValue].default
}), {});

const channel = new BroadcastChannel("fdhajofnodmginhfnknimmpdhcgkcldj");
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

getSettings().then(settings => channel.postMessage(settings));