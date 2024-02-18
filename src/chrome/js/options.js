"use strict";

globalThis.browser ??= chrome;

const settings = {};
const options = [];
const j2d = (() => {

    const processNode = (element, attributes, children) => {

        if (Array.isArray(attributes)
            || typeof attributes === "string"
            || attributes instanceof String
        ) {
            children = attributes;
            attributes = {};
        }

        for (let name in attributes) {
            element.setAttribute(name, attributes[name]);
        }

        if (children) {
            if (Array.isArray(children)) {
                for (let child of children) {
                    if (child.constructor === String) {
                        const textNode = document.createTextNode(child);
                        element.appendChild(textNode);
                    } else {
                        element.appendChild(child);
                    }
                }
            } else if (children.constructor === String) {
                element.textContent = children;
            }
        }

        return element;

    };

    return {
        make: (node, attributes, children) => processNode(document.createElement(node), attributes, children),
        makeSVG: (node, attributes, children) => processNode(document.createElementNS("http://www.w3.org/2000/svg", node), attributes, children)
    };

})();
const Manager = {
    updateSyncSettings: (newState, userInteraction) => {

        const settingId = SettingData.syncSettings.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        settings[settingId] = newState;

        (async () => {

            // to properly migrate storage areas:
            // remove listener from old storage area
            // add listener to new storage area
            // save all settings in new storage area
            // update sync setting in previous storage area to signal change to open tabs
            // clear old storage area

            if (newState === true) {
                browser.storage.local.onChanged.removeListener(Util.onStorageChangedListener);
                browser.storage.sync.onChanged.addListener(Util.onStorageChangedListener);
                await Util.saveData(settings);
                await browser.storage.local.set({[SettingData.syncSettings.id]: newState});
                await browser.storage.local.clear();
            } else {
                browser.storage.sync.onChanged.removeListener(Util.onStorageChangedListener);
                browser.storage.local.onChanged.addListener(Util.onStorageChangedListener);
                await Util.saveData(settings);
                await browser.storage.sync.set({[SettingData.syncSettings.id]: newState});
                await browser.storage.sync.clear();
            }

        })();

    },
    updateExtensionButton: (newState, userInteraction) => {

        const settingId = SettingData.extensionButton.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateTheme: (newState, userInteraction) => {

        function toggleTheme(isDark) {
            if (isDark) {
                document.documentElement.setAttribute("dark", "");
            } else {
                document.documentElement.removeAttribute("dark");
            }
        }

        const allowedValues = [
            "deviceTheme",
            "darkTheme",
            "lightTheme",
        ];

        if (allowedValues.indexOf(newState) < 0) {
            newState = "deviceTheme";
        }

        // the browser might not be able to inform the user's system theme
        // we must check for this first and fallback to dark if it is not
        if (newState === "deviceTheme" && window?.matchMedia("(prefers-color-scheme)")?.matches !== true) {
            newState = "darkTheme";
        }

        const settingId = SettingData.theme.id;
        const ui = document.querySelector(`[data-setting=${settingId}][value=${newState}]`);

        if (ui != null && !ui.checked) {
            ui.checked = true;
        }

        switch (newState) {
            case "deviceTheme":
                toggleTheme(window?.matchMedia("(prefers-color-scheme: dark)")?.matches === true);
                break;
            case "darkTheme":
                toggleTheme(true);
                break;
            case "lightTheme":
                toggleTheme(false);
                break;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateLogoSubscriptions: (newState, userInteraction) => {

        const settingId = SettingData.logoSubscriptions.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateChannelTab: (newState, userInteraction) => {

        const settingId = SettingData.channelTab.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateShorts: (id, newState, userInteraction) => {

        const settingId = id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAdManager: (id, newState, userInteraction) => {

        const settingId = id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (id === SettingData.adOptOutAll.id) {

            const idList = [
                SettingData.adVideoFeed.id,
                SettingData.adInVideo.id,
                SettingData.adTaggedProducts.id,
                SettingData.adMasthead.id,
                SettingData.adHomeFeed.id,
                SettingData.adSearchFeed.id,
            ].map(value => `[data-id="${value}"]`).join();

            const dependents = document.querySelectorAll(idList);

            if (newState) {
                dependents.forEach(value => value.classList.add("disabled"));
            } else {
                dependents.forEach(value => value.classList.remove("disabled"));
            }

        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoFocus: (newState, userInteraction) => {

        const settingId = SettingData.videoFocus.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateCreatorMerch: (newState, userInteraction) => {

        const settingId = SettingData.creatorMerch.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAutoplay: (newState, userInteraction) => {

        const settingId = SettingData.autoplay.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateLoudness: (newState, userInteraction) => {

        const settingId = SettingData.loudness.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateScrollVolume: (newState, userInteraction) => {

        const settingId = SettingData.scrollVolume.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateInfoCards: (newState, userInteraction) => {

        const settingId = SettingData.infoCards.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAnnotations: (newState, userInteraction) => {

        const settingId = SettingData.annotations.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateEndScreen: (newState, userInteraction) => {

        const settingId = SettingData.endScreen.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultQuality: (newState, userInteraction) => {

        const settingId = SettingData.defaultQuality.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultSpeed: (newState, userInteraction) => {

        const settingId = SettingData.defaultSpeed.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateHFRAllowed: (newState, userInteraction) => {

        const settingId = SettingData.hfrAllowed.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoFocusToggle: (newState, userInteraction) => {

        const settingId = SettingData.videoFocusToggle.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoScreenshot: (newState, userInteraction) => {

        const settingId = SettingData.videoScreenshot.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoThumbnail: (newState, userInteraction) => {

        const settingId = SettingData.videoThumbnail.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateMonetizationInfo: (newState, userInteraction) => {

        const settingId = SettingData.monetizationInfo.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklistEnabled: (newState, userInteraction) => {

        const settingId = SettingData.blacklistEnabled.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        const dependent = document.querySelector(`[data-id=${SettingData.blacklistButton.id}]`);

        if (newState) {
            dependent?.classList.remove("disabled");
        } else {
            dependent?.classList.add("disabled");
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklistButton: (newState, userInteraction) => {

        const settingId = SettingData.blacklistButton.id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklist: (newList, userInteraction) => {

        const settingId = SettingData.blacklist.id;
        const container = document.getElementById("blacklistChannels");

        if (container) {
            container.replaceChildren();
        }

        const keys = Object.keys(newList);

        if (keys.length === 0) {

            const child = document.createElement("div");

            child.id = "blacklistEmpty";
            child.textContent = "nothing is blocked";
            child.style.flex = "1";
            child.style.textAlign = "center";

            document.getElementById("blacklistChannels")?.appendChild(child);

        } else {

            document.getElementById("blacklistEmpty")?.remove();

            const newNodeList = []

            keys.forEach((item) => {

                const child = document.createElement("div");
                child.title = "remove";
                child.classList.add("channel");
                child.dataset.name = newList[item].name.toLowerCase();
                child.dataset.handle = newList[item].handle;
                child.dataset.ucid = item;
                child.replaceChildren(
                    j2d.make("div", {class: "channelName"}),
                    j2d.makeSVG("svg", {class: "remove", viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                        j2d.makeSVG("path", {d: "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"})
                    ])
                );

                const channelName = child.querySelector(".channelName");

                if (channelName) {

                    const name = newList[item].name;

                    if (name) {
                        channelName.textContent = name;
                    } else {
                        channelName.appendChild(j2d.make("i", `@${newList[item].handle}`));
                    }

                }

                newNodeList.push(child);

            });

            if (newNodeList.length > 0) {
                container?.append(...newNodeList);
            }

        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newList);

    },
};
const Util = {
    saveData: async data => {
        if (settings.syncSettings === true) {
            await browser.storage.sync.set(data);
        } else {
            await browser.storage.local.set(data);
        }
    },
    updateSettings: data => {

        for (let key in data) {
            settings[key] = data[key];
        }

        Util.saveData(data).then();

    },
    updateSingleSetting: (key, value) => {

        if (settings[key] === value) {
            return;
        }

        settings[key] = value;

        Util.saveData({[key]: value}).then();

    },
    populateOptions: item => {
        const id = item?.dataset?.menu?.trim();
        if (id != null && id !== "") {
            options.push(id);
        }
    },
    toggleMenuItem: event => {

        const itemId = event?.target?.dataset?.menu;

        if (options.indexOf(itemId) < 0) {
            return;
        }

        const newSelection = document.querySelector(`[data-menu='${itemId}']`);
        const currentSelection = document.querySelector("[data-menu][data-active]");

        if (newSelection != null && newSelection !== currentSelection) {

            currentSelection?.removeAttribute("data-active");
            newSelection.setAttribute("data-active", "");

            document.querySelector("[data-content][data-active]")?.removeAttribute("data-active");
            document.querySelector(`[data-content='${itemId}']`)?.setAttribute("data-active", "");

        }

    },
    handleSetting: (key, value, userInteraction) => {
        switch (key) {
            case SettingData.extensionButton.id:
                Manager.updateExtensionButton(value, userInteraction);
                break;
            case SettingData.syncSettings.id:
                Manager.updateSyncSettings(value, userInteraction);
                break;
            case SettingData.adOptOutAll.id:
            case SettingData.adSubscribed.id:
            case SettingData.adVideoFeed.id:
            case SettingData.adInVideo.id:
            case SettingData.adTaggedProducts.id:
            case SettingData.adMasthead.id:
            case SettingData.adHomeFeed.id:
            case SettingData.adSearchFeed.id:
                Manager.updateAdManager(key, value, userInteraction);
                break;
            case SettingData.theme.id:
                Manager.updateTheme(value, userInteraction);
                break;
            case SettingData.logoSubscriptions.id:
                Manager.updateLogoSubscriptions(value, userInteraction);
                break;
            case SettingData.channelTab.id:
                Manager.updateChannelTab(value, userInteraction);
                break;
            case SettingData.homeShorts.id:
            case SettingData.subscriptionsShorts.id:
            case SettingData.searchShorts.id:
                Manager.updateShorts(key, value, userInteraction);
                break;
            case SettingData.videoFocus.id:
                Manager.updateVideoFocus(value, userInteraction);
                break;
            case SettingData.creatorMerch.id:
                Manager.updateCreatorMerch(value, userInteraction);
                break;
            case SettingData.defaultQuality.id:
                Manager.updateDefaultQuality(value, userInteraction);
                break;
            case SettingData.defaultSpeed.id:
                Manager.updateDefaultSpeed(value, userInteraction);
                break;
            case SettingData.autoplay.id:
                Manager.updateAutoplay(value, userInteraction);
                break;
            case SettingData.loudness.id:
                Manager.updateLoudness(value, userInteraction);
                break;
            case SettingData.scrollVolume.id:
                Manager.updateScrollVolume(value, userInteraction);
                break;
            case SettingData.infoCards.id:
                Manager.updateInfoCards(value, userInteraction);
                break;
            case SettingData.annotations.id:
                Manager.updateAnnotations(value, userInteraction);
                break;
            case SettingData.endScreen.id:
                Manager.updateEndScreen(value, userInteraction);
                break;
            case SettingData.hfrAllowed.id:
                Manager.updateHFRAllowed(value, userInteraction);
                break;
            case SettingData.videoFocusToggle.id:
                Manager.updateVideoFocusToggle(value, userInteraction);
                break;
            case SettingData.videoScreenshot.id:
                Manager.updateVideoScreenshot(value, userInteraction);
                break;
            case SettingData.videoThumbnail.id:
                Manager.updateVideoThumbnail(value, userInteraction);
                break;
            case SettingData.monetizationInfo.id:
                Manager.updateMonetizationInfo(value, userInteraction);
                break;
            case SettingData.blacklistEnabled.id:
                Manager.updateBlacklistEnabled(value, userInteraction);
                break;
            case SettingData.blacklistButton.id:
                Manager.updateBlacklistButton(value, userInteraction);
                break;
            case SettingData.blacklist.id:
                Manager.updateBlacklist(value, userInteraction);
                break;
        }
    },
    settingAction: event => {
        if (event.target?.type === "checkbox") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.checked, true);
        } else if (event.target?.type === "radio") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.value, true);
        } else if (event.target?.type === "select-one") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.value, true);
        } else if (event.target?.dataset?.action) {
            switch (event.target?.dataset?.action) {
                case "import":
                    Util.importSettings();
                    break;
                case "export":
                    Util.exportSettings();
                    break
                case "reset":
                    Util.resetSettings();
                    break
            }
        }
    },
    importSettings: () => {
        try {
            const input = document.createElement("input");
            input.multiple = false;
            input.accept = "application/json";
            input.type = "file";
            input.onchange = _ => {
                if (input.files.length > 0) {
                    input.files[0].text().then(data => Util.initialLoad(JSON.parse(data)));
                }
            };
            input.click();
        } catch (ignore) {
        }
    },
    exportSettings: () => {
        try {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(settings, null, 2)], {type: "application/json"}));
            a.download = `Iridium${browser.runtime.getManifest().version}.json`;
            a.click();
        } catch (ignore) {
        }
    },
    resetSettings: () => {
        if (window.confirm("You are about to reset the settings to default, do you want to continue?")) {

            Util.updateSettings(getDefaultSettings());

            for (let key in settings) {
                Util.handleSetting(key, settings[key], false);
            }

        }
    },
    onStorageChangedListener: data => {

        const changedData = {};

        for (let key in data) {

            const change = data[key];
            let newObject = change.newValue;
            let oldObject = change.oldValue;
            let currentObject = settings[key];

            if (change.newValue?.constructor === Object) {
                newObject = JSON.stringify(change.newValue);
                oldObject = JSON.stringify(change.oldValue);
                currentObject = JSON.stringify(settings[key]);
            }

            if (newObject !== oldObject && currentObject !== newObject) {
                settings[key] = changedData[key] = change.newValue;
            }

        }

        if (Object.keys(changedData).length > 0) {
            Util.updateSettings(changedData);
        }

    },
    initialLoad: async items => {

        const newFeatures = {};
        const defaultSettings = getDefaultSettings();

        // ensure new features are applied
        for (let key in defaultSettings) {
            if (!Object.hasOwn(items, key)) {
                items[key] = newFeatures[key] = defaultSettings[key];
            }
        }

        if (Object.keys(newFeatures).length > 0) {
            if (items[SettingData.syncSettings.id] === true) {
                await browser.storage.sync.set(newFeatures);
            } else {
                await browser.storage.local.set(newFeatures);
            }
        }

        for (let key in items) {
            settings[key] = items[key];
        }

        for (let key in settings) {
            Util.handleSetting(key, settings[key], false);
        }

    },
    checkStorage: async () => {

        const dataSync = await browser.storage.sync.get();

        if (Object.keys(dataSync).length > 0 && dataSync[SettingData.syncSettings.id] === true) {
            await Util.initialLoad(dataSync);
            browser.storage.sync.onChanged.addListener(Util.onStorageChangedListener);
        } else {

            const dataLocal = await browser.storage.local.get();

            // storage will be empty during first installation
            // this ensures the first load stores the default settings
            if (Object.keys(dataLocal).length === 0) {
                const defaultSettings = getDefaultSettings();
                await browser.storage.local.set(defaultSettings);
                await Util.initialLoad(defaultSettings);
            } else {
                await Util.initialLoad(dataLocal);
            }

            browser.storage.local.onChanged.addListener(Util.onStorageChangedListener);

        }

    },
    onBlacklistFilterChange: (event) => {

        const items = Array.from(document.querySelectorAll(".channel")).map((item) => ({name: item.dataset.name, target: item}));

        if (items.length === 0) {
            return;
        }

        const filteredItems = items.filter((item) => {
            const name = item.target.dataset.name || item.target.dataset.handle;
            const matched = name?.includes(event?.target?.value?.toLowerCase() || "") === true;
            item.target.style.display = matched ? "" : "none";
            return matched;
        });

        document.getElementById("blacklistNoResults")?.remove();

        if (filteredItems.length === 0) {

            const child = document.createElement("div");

            child.id = "blacklistNoResults";
            child.textContent = "no results found";
            child.style.flex = "1";
            child.style.textAlign = "center";

            document.getElementById("blacklistChannels")?.appendChild(child);

        }

    },
    iniBlacklistSearch: () => {

        let url = "";
        const channelData = document.getElementById("channelDataInput")?.value?.trim();
        const onError = (error) => {

            const dialog = document.getElementById("dialog");

            if (dialog) {
                dialog.classList.add("noResults");
                dialog.classList.remove("channelBlocked");
            }

            const message = document.getElementById("searchResultMessage");

            if (message) {
                message.textContent = error;
            }

        };

        if (channelData) {
            if (channelData.startsWith("@")) {
                url = "https://www.youtube.com/" + channelData;
            } else if (channelData.toUpperCase().startsWith("UC")) {
                url = "https://www.youtube.com/channel/" + channelData;
            }
        }

        if (url === "") {
            onError("Search term must start with @... or UC...");
            return;
        }

        fetch(url).then((response) => response.text().then((b) => {

            let matched = b.match(/var ytInitialData = (\{.*?});/)?.[1];

            if (matched) {
                try {

                    const pageData = JSON.parse(matched);
                    const metadata = pageData?.metadata?.["channelMetadataRenderer"];

                    if (metadata) {

                        const dataObject = {
                            avatar: metadata?.["avatar"]?.["thumbnails"][0]?.url?.split("=")?.[0],
                            channelHandle: metadata?.["vanityChannelUrl"]?.split("@")?.[1],
                            channelName: metadata?.title,
                            channelId: metadata?.["externalId"]
                        }

                        const dialog = document.getElementById("dialog");

                        if (dialog) {

                            dialog.classList.remove("noResults");

                            if (Object.hasOwn(settings.blacklist, dataObject.channelId)) {
                                dialog.classList.add("channelBlocked");
                            } else {
                                dialog.classList.remove("channelBlocked");
                            }

                        }

                        const avatarContainer = document.getElementById("searchChannelAvatar");

                        if (avatarContainer) {
                            avatarContainer.src = dataObject.avatar;
                        }

                        const nameContainer = document.getElementById("searchChannelName");

                        if (nameContainer) {
                            if (dataObject.channelName) {
                                nameContainer.textContent = dataObject.channelName;
                            } else {
                                nameContainer.replaceChildren(j2d.make("i", "empty channel name"));
                            }
                        }

                        const addDialog = document.getElementById("addDialog");

                        if (addDialog) {
                            addDialog.dataset.channelHandle = dataObject.channelHandle;
                            addDialog.dataset.channelName = dataObject.channelName;
                            addDialog.dataset.channelId = dataObject.channelId;
                        }

                    } else {
                        onError("Something went wrong");
                    }

                } catch (e) {
                    onError("Something went wrong");
                }
            } else {
                onError(`No results for ${channelData}`);
            }

        }));

    },
    iniBlacklistAdd: () => {

        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        backdrop.appendChild(
            j2d.make("div", {id: "dialog", class: "noResults"}, [
                j2d.make("div", {id: "searchForm"}, [
                    j2d.make("input", {id: "channelDataInput", type: "text", placeholder: "@handle or UCxxx"}),
                    j2d.make("div", {id: "searchDialog", class: "action-button"}, "Search")
                ]),
                j2d.make("div", {id: "searchResult"}, [
                    j2d.make("div", {id: "searchResultMessage"}, "Enter channel handle or channel id"),
                    j2d.make("div", {id: "searchChannelAvatarContainer"}, [
                        j2d.make("img", {id: "searchChannelAvatar", alt: "", src: ""}),
                    ]),
                    j2d.make("div", {id: "blockedIndicator"}, "BLOCKED"),
                    j2d.make("div", {id: "searchChannelName"}, "."),
                ]),
                j2d.make("div", {id: "dialogAction"}, [
                    j2d.make("div", {id: "closeDialog", class: "action-button"}, "Close"),
                    j2d.make("div", {id: "addDialog", class: "action-button"}, "Add"),
                ]),
            ])
        );

        document.body.appendChild(backdrop);

        backdrop.querySelector("#closeDialog")?.addEventListener("click", () => backdrop.remove());
        backdrop.querySelector("#searchDialog")?.addEventListener("click", () => Util.iniBlacklistSearch());
        backdrop.querySelector("#channelDataInput")?.focus();
        backdrop.querySelector("#channelDataInput")?.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                Util.iniBlacklistSearch();
            }
        });
        backdrop.querySelector("#addDialog")?.addEventListener("click", (event) => {

            const dataObject = {
                channelHandle: event.target.dataset?.channelHandle,
                channelName: event.target.dataset?.channelName,
                channelId: event.target.dataset?.channelId
            }

            if (!Object.hasOwn(settings.blacklist, dataObject.channelId)) {
                document.getElementById("dialog")?.classList.add("channelBlocked");
                const listCopy = structuredClone(settings.blacklist);
                listCopy[dataObject.channelId] = {
                    name: dataObject.channelName,
                    handle: dataObject.channelHandle
                };
                Manager.updateBlacklist(listCopy, true);
            }

        });

    },
    onBlacklistRemove: event => {

        const channelId = event.target?.dataset?.ucid;

        if (channelId && Object.hasOwn(settings.blacklist, channelId)) {
            const newList = structuredClone(settings.blacklist);
            delete newList[channelId];
            Manager.updateBlacklist(newList, true);
        }

    },
    onBlacklistImport: () => {
        try {
            const input = document.createElement("input");
            input.multiple = false;
            input.accept = "application/json";
            input.type = "file";
            input.onchange = () => {
                if (input.files.length > 0) {
                    input.files[0].text().then(data => {

                        const parsedData = JSON.parse(data);
                        const newList = structuredClone(settings.blacklist);

                        Object.keys(parsedData).forEach((item) => {
                            if (!Object.hasOwn(settings.blacklist, item)) {
                                const name = parsedData[item]?.name;
                                const handle = parsedData[item]?.handle;
                                // channel must have either a name or a handle
                                if (name || handle) {
                                    newList[item] = {
                                        name: parsedData[item]?.name,
                                        handle: parsedData[item]?.handle
                                    }
                                }
                            }
                        });

                        if (Object.keys(newList).length > 0) {
                            Manager.updateBlacklist(newList, true);
                        }

                    });
                }
            };
            input.click();
        } catch (ignore) {
        }
    },
    onBlacklistExport: () => {
        try {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(settings.blacklist, null, 2)], {type: "application/json"}));
            a.download = `Iridium${browser.runtime.getManifest().version}-blacklist.json`;
            a.click();
        } catch (ignore) {
        }
    },
    iniBlacklist: () => {
        document.getElementById("filterChannels")?.addEventListener("keyup", Util.onBlacklistFilterChange);
        document.getElementById("blacklistChannels")?.addEventListener("click", Util.onBlacklistRemove);
        document.getElementById("addChannel")?.addEventListener("click", Util.iniBlacklistAdd);
        document.getElementById("importList")?.addEventListener("click", Util.onBlacklistImport);
        document.getElementById("exportList")?.addEventListener("click", Util.onBlacklistExport);
    },
    ini: () => {

        document.getElementById("version").textContent = browser.runtime.getManifest().version;
        document.getElementById("items")?.addEventListener("click", Util.toggleMenuItem, true);
        document.getElementById("contents")?.addEventListener("click", Util.settingAction, true);
        document.getElementById("contents")?.addEventListener("change", Util.settingAction, true);
        document.querySelectorAll("[data-menu]").forEach(Util.populateOptions);

        Util.iniBlacklist();
        Util.checkStorage().then();

    },
};

Util.ini();