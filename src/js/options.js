"use strict";

const settings = structuredClone(DEFAULT_SETTINGS) || {};
const options = [];
const Manager = {
    updateSyncSettings: function (newState) {

        const settingId = SettingId.syncSettings;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (newState === true) {
            // save a copy of all settings to sync storage
            Util.updateAllSettings({[settingId]: newState});
        } else {
            // sync storage was disabled
            browser.storage.sync.clear().then();
            Util.updateSingleSetting(settingId, newState);
        }

    },
    updateExtensionButton: function (newState) {

        const settingId = SettingId.extensionButton;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateTheme: function (newState) {

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

        Util.updateSingleSetting(settingId, newState);

    },
    updateLogoSubscriptions: function (newState) {

        const settingId = SettingId.logoSubscriptions;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateShorts: function (id, newState) {

        const settingId = id;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateAdManager: function (id, newState) {

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

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoFocus: function (newState) {

        const settingId = SettingId.videoFocus;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateAutoplay: function (newState) {

        const settingId = SettingId.autoplay;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateLoudness: function (newState) {

        const settingId = SettingId.loudness;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateScrollVolume: function (newState) {

        const settingId = SettingId.scrollVolume;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateInfoCards: function (newState) {

        const settingId = SettingId.infoCards;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateEndScreen: function (newState) {

        const settingId = SettingId.endScreen;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultQuality: function (newState) {

        const settingId = SettingId.defaultQuality;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultSpeed: function (newState) {

        const settingId = SettingId.defaultSpeed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateHFRAllowed: function (newState) {

        const settingId = SettingId.hfrAllowed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoScreenshot: function (newState) {

        const settingId = SettingId.videoScreenshot;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoThumbnail: function (newState) {

        const settingId = SettingId.videoThumbnail;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
    updateMonetizationInfo: function (newState) {

        const settingId = SettingId.monetizationInfo;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        Util.updateSingleSetting(settingId, newState);

    },
};
const Util = {
    saveAllSettings: function () {

        browser.storage.local.set(settings)?.then();

        if (settings.syncSettings === true) {
            browser.storage.sync.set(settings)?.then();
        }

    },
    updateAllSettings: function (data) {

        for (let key in data) {
            settings[key] = data[key];
        }

        Util.saveAllSettings();

    },
    saveSingleSetting: function (key, value) {

        browser.storage.local.set({[key]: value})?.then();

        if (settings.syncSettings === true) {
            browser.storage.sync.set({[key]: value})?.then();
        }

    },
    updateSingleSetting: function (key, value) {

        if (settings[key] === value) {
            return;
        }

        settings[key] = value;

        Util.saveSingleSetting(key, value);

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
    handleSetting: function (key, value) {
        switch (key) {
            case SettingId.extensionButton:
                Manager.updateExtensionButton(value);
                break;
            case SettingId.syncSettings:
                Manager.updateSyncSettings(value);
                break;
            case SettingId.adOptOutAll:
            case SettingId.adSubscribed:
            case SettingId.adVideoFeed:
            case SettingId.adInVideo:
            case SettingId.adTaggedProducts:
            case SettingId.adMasthead:
            case SettingId.adHomeFeed:
            case SettingId.adSearchFeed:
                Manager.updateAdManager(key, value);
                break;
            case SettingId.theme:
                Manager.updateTheme(value);
                break;
            case SettingId.logoSubscriptions:
                Manager.updateLogoSubscriptions(value);
                break;
            case SettingId.homeShorts:
            case SettingId.subscriptionsShorts:
            case SettingId.searchShorts:
                Manager.updateShorts(key, value);
                break;
            case SettingId.videoFocus:
                Manager.updateVideoFocus(value);
                break;
            case SettingId.defaultQuality:
                Manager.updateDefaultQuality(value);
                break;
            case SettingId.defaultSpeed:
                Manager.updateDefaultSpeed(value);
                break;
            case SettingId.autoplay:
                Manager.updateAutoplay(value);
                break;
            case SettingId.loudness:
                Manager.updateLoudness(value);
                break;
            case SettingId.scrollVolume:
                Manager.updateScrollVolume(value);
                break;
            case SettingId.infoCards:
                Manager.updateInfoCards(value);
                break;
            case SettingId.endScreen:
                Manager.updateEndScreen(value);
                break;
            case SettingId.hfrAllowed:
                Manager.updateHFRAllowed(value);
                break;
            case SettingId.videoScreenshot:
                Manager.updateVideoScreenshot(value);
                break;
            case SettingId.videoThumbnail:
                Manager.updateVideoThumbnail(value);
                break;
            case SettingId.monetizationInfo:
                Manager.updateMonetizationInfo(value);
                break;
        }
    },
    settingAction: function (event) {
        if (event.target?.type === "checkbox") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.checked);
        } else if (event.target?.type === "radio") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.value);
        } else if (event.target?.type === "select-one") {
            Util.handleSetting(event.target?.dataset?.setting, event.target?.value);
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

            Util.updateAllSettings(structuredClone(DEFAULT_SETTINGS));

            for (let key in settings) {
                Util.handleSetting(key, settings[key]);
            }

        }
    },
    onSettingsChanged: function (data) {

        const filtered = {};

        for (let key in data) {
            const change = data[key];
            if (change.newValue !== change.oldValue && Object.hasOwn(settings, key) && settings[key] !== change.newValue) {
                filtered[key] = change.newValue;
            }
        }

        if (Object.keys(filtered).length > 0) {
            Util.updateAllSettings(filtered);
        }

    },
    initialLoad: function (items) {

        // ensure new features apply to stored settings
        for (let key in DEFAULT_SETTINGS) {
            if (!Object.hasOwn(settings, key)) {
                settings[key] = DEFAULT_SETTINGS[key];
            }
        }

        Util.updateAllSettings(items);

        for (let key in items) {
            Util.handleSetting(key, items[key]);
        }

    },
    checkSyncStorage: function (items) {

        if (Object.keys(items).length > 0 && items[SettingId.syncSettings] === true) {
            Util.initialLoad(items);
        } else {
            browser.storage.local.get().then(Util.initialLoad);
        }

    },
    ini: function () {

        document.getElementById("version").textContent = browser.runtime.getManifest().version;
        document.getElementById("items")?.addEventListener("click", Util.toggleMenuItem, true);
        document.getElementById("contents")?.addEventListener("click", Util.settingAction, true);
        document.getElementById("contents")?.addEventListener("change", Util.settingAction, true);
        document.querySelectorAll("[data-menu]").forEach(Util.populateOptions);

        browser.storage.local.onChanged.addListener(Util.onSettingsChanged);
        browser.storage.sync.get().then(Util.checkSyncStorage);

    },
};

Util.ini();