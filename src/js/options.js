"use strict";

const settings = structuredClone(DEFAULT_SETTINGS) || {};
const options = [];
const Manager = {
    updateSyncSettings: function (newState, userInteraction) {

        const settingId = SettingId.syncSettings;
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
                await browser.storage.local.set({[SettingId.syncSettings]: newState});
                await browser.storage.local.clear();
            } else {
                browser.storage.sync.onChanged.removeListener(Util.onStorageChangedListener);
                browser.storage.local.onChanged.addListener(Util.onStorageChangedListener);
                await Util.saveData(settings);
                await browser.storage.sync.set({[SettingId.syncSettings]: newState});
                await browser.storage.sync.clear();
            }

        })();

    },
    updateExtensionButton: function (newState, userInteraction) {

        const settingId = SettingId.extensionButton;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateTheme: function (newState, userInteraction) {

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

        const settingId = SettingId.theme;
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
    updateLogoSubscriptions: function (newState, userInteraction) {

        const settingId = SettingId.logoSubscriptions;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateShorts: function (id, newState, userInteraction) {

        const settingId = id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAdManager: function (id, newState, userInteraction) {

        const settingId = id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (id === SettingId.adOptOutAll) {

            const idList = [
                SettingId.adVideoFeed,
                SettingId.adInVideo,
                SettingId.adTaggedProducts,
                SettingId.adMasthead,
                SettingId.adHomeFeed,
                SettingId.adSearchFeed,
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
    updateVideoFocus: function (newState, userInteraction) {

        const settingId = SettingId.videoFocus;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateCreatorMerch: function (newState, userInteraction) {

        const settingId = SettingId.creatorMerch;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAutoplay: function (newState, userInteraction) {

        const settingId = SettingId.autoplay;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateLoudness: function (newState, userInteraction) {

        const settingId = SettingId.loudness;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateScrollVolume: function (newState, userInteraction) {

        const settingId = SettingId.scrollVolume;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateInfoCards: function (newState, userInteraction) {

        const settingId = SettingId.infoCards;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateEndScreen: function (newState, userInteraction) {

        const settingId = SettingId.endScreen;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultQuality: function (newState, userInteraction) {

        const settingId = SettingId.defaultQuality;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultSpeed: function (newState, userInteraction) {

        const settingId = SettingId.defaultSpeed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateHFRAllowed: function (newState, userInteraction) {

        const settingId = SettingId.hfrAllowed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoScreenshot: function (newState, userInteraction) {

        const settingId = SettingId.videoScreenshot;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoThumbnail: function (newState, userInteraction) {

        const settingId = SettingId.videoThumbnail;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateMonetizationInfo: function (newState, userInteraction) {

        const settingId = SettingId.monetizationInfo;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
};
const Util = {
    saveData: async function (data) {
        if (settings.syncSettings === true) {
            await browser.storage.sync.set(data);
        } else {
            await browser.storage.local.set(data);
        }
    },
    updateSettings: function (data) {

        for (let key in data) {
            settings[key] = data[key];
        }

        Util.saveData(data).then();

    },
    updateSingleSetting: function (key, value) {

        if (settings[key] === value) {
            return;
        }

        settings[key] = value;

        Util.saveData({[key]: value}).then();

    },
    populateOptions: function (item) {
        const id = item?.dataset?.menu?.trim();
        if (id != null && id !== "") {
            options.push(id);
        }
    },
    toggleMenuItem: function (event) {

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
    handleSetting: function (key, value, userInteraction) {
        switch (key) {
            case SettingId.extensionButton:
                Manager.updateExtensionButton(value, userInteraction);
                break;
            case SettingId.syncSettings:
                Manager.updateSyncSettings(value, userInteraction);
                break;
            case SettingId.adOptOutAll:
            case SettingId.adSubscribed:
            case SettingId.adVideoFeed:
            case SettingId.adInVideo:
            case SettingId.adTaggedProducts:
            case SettingId.adMasthead:
            case SettingId.adHomeFeed:
            case SettingId.adSearchFeed:
                Manager.updateAdManager(key, value, userInteraction);
                break;
            case SettingId.theme:
                Manager.updateTheme(value, userInteraction);
                break;
            case SettingId.logoSubscriptions:
                Manager.updateLogoSubscriptions(value, userInteraction);
                break;
            case SettingId.homeShorts:
            case SettingId.subscriptionsShorts:
            case SettingId.searchShorts:
                Manager.updateShorts(key, value, userInteraction);
                break;
            case SettingId.videoFocus:
                Manager.updateVideoFocus(value, userInteraction);
                break;
            case SettingId.creatorMerch:
                Manager.updateCreatorMerch(value, userInteraction);
                break;
            case SettingId.defaultQuality:
                Manager.updateDefaultQuality(value, userInteraction);
                break;
            case SettingId.defaultSpeed:
                Manager.updateDefaultSpeed(value, userInteraction);
                break;
            case SettingId.autoplay:
                Manager.updateAutoplay(value, userInteraction);
                break;
            case SettingId.loudness:
                Manager.updateLoudness(value, userInteraction);
                break;
            case SettingId.scrollVolume:
                Manager.updateScrollVolume(value, userInteraction);
                break;
            case SettingId.infoCards:
                Manager.updateInfoCards(value, userInteraction);
                break;
            case SettingId.endScreen:
                Manager.updateEndScreen(value, userInteraction);
                break;
            case SettingId.hfrAllowed:
                Manager.updateHFRAllowed(value, userInteraction);
                break;
            case SettingId.videoScreenshot:
                Manager.updateVideoScreenshot(value, userInteraction);
                break;
            case SettingId.videoThumbnail:
                Manager.updateVideoThumbnail(value, userInteraction);
                break;
            case SettingId.monetizationInfo:
                Manager.updateMonetizationInfo(value, userInteraction);
                break;
        }
    },
    settingAction: function (event) {
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
    importSettings: function () {
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
    exportSettings: function () {
        try {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(settings, null, 2)], {type: "application/json"}));
            a.download = `Iridium${browser.runtime.getManifest().version}.json`;
            a.click();
        } catch (ignore) {
        }
    },
    resetSettings: function () {
        if (window.confirm("You are about to reset the settings to default, do you want to continue?")) {

            Util.updateSettings(structuredClone(DEFAULT_SETTINGS));

            for (let key in settings) {
                Util.handleSetting(key, settings[key], false);
            }

        }
    },
    onStorageChangedListener: data => {

        const changedData = {};

        for (let key in data) {
            const change = data[key];
            if (change.newValue !== change.oldValue && settings[key] !== change.newValue) {
                settings[key] = changedData[key] = change.newValue;
            }
        }

        if (Object.keys(changedData).length > 0) {
            Util.updateSettings(changedData);
        }

    },
    initialLoad: function (items) {

        // ensure new features are applied
        for (let key in DEFAULT_SETTINGS) {
            if (!Object.hasOwn(settings, key)) {
                settings[key] = DEFAULT_SETTINGS[key];
            }
        }

        for (let key in items) {
            settings[key] = items[key];
            Util.handleSetting(key, items[key], false);
        }

    },
    checkStorage: async function () {

        const dataSync = await browser.storage.sync.get();

        if (Object.keys(dataSync).length > 0 && dataSync[SettingId.syncSettings] === true) {
            Util.initialLoad(dataSync);
            browser.storage.sync.onChanged.addListener(Util.onStorageChangedListener);
        } else {

            const dataLocal = await browser.storage.local.get();

            // storage will be empty during first installation
            // this ensures the first load stores the default settings
            if (Object.keys(dataLocal).length === 0) {
                await browser.storage.local.set(DEFAULT_SETTINGS);
                Util.initialLoad(DEFAULT_SETTINGS);
            } else {
                Util.initialLoad(dataLocal);
            }

            browser.storage.local.onChanged.addListener(Util.onStorageChangedListener);

        }

    },
    ini: function () {

        document.getElementById("version").textContent = browser.runtime.getManifest().version;
        document.getElementById("items")?.addEventListener("click", Util.toggleMenuItem, true);
        document.getElementById("contents")?.addEventListener("click", Util.settingAction, true);
        document.getElementById("contents")?.addEventListener("change", Util.settingAction, true);
        document.querySelectorAll("[data-menu]").forEach(Util.populateOptions);

        Util.checkStorage().then();

    },
};

Util.ini();