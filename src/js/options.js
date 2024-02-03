"use strict";

const settings = {};
const options = [];
const Manager = {
    updateSyncSettings: (newState, userInteraction) => {

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
    updateExtensionButton: (newState, userInteraction) => {

        const settingId = SettingId.extensionButton;
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
    updateLogoSubscriptions: (newState, userInteraction) => {

        const settingId = SettingId.logoSubscriptions;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateChannelTab: (newState, userInteraction) => {

        const settingId = SettingId.channelTab;
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
    updateVideoFocus: (newState, userInteraction) => {

        const settingId = SettingId.videoFocus;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateCreatorMerch: (newState, userInteraction) => {

        const settingId = SettingId.creatorMerch;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAutoplay: (newState, userInteraction) => {

        const settingId = SettingId.autoplay;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateLoudness: (newState, userInteraction) => {

        const settingId = SettingId.loudness;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateScrollVolume: (newState, userInteraction) => {

        const settingId = SettingId.scrollVolume;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateInfoCards: (newState, userInteraction) => {

        const settingId = SettingId.infoCards;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateAnnotations: (newState, userInteraction) => {

        const settingId = SettingId.annotations;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateEndScreen: (newState, userInteraction) => {

        const settingId = SettingId.endScreen;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultQuality: (newState, userInteraction) => {

        const settingId = SettingId.defaultQuality;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateDefaultSpeed: (newState, userInteraction) => {

        const settingId = SettingId.defaultSpeed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.value !== newState) {
            ui.value = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateHFRAllowed: (newState, userInteraction) => {

        const settingId = SettingId.hfrAllowed;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoFocusToggle: (newState, userInteraction) => {

        const settingId = SettingId.videoFocusToggle;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoScreenshot: (newState, userInteraction) => {

        const settingId = SettingId.videoScreenshot;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateVideoThumbnail: (newState, userInteraction) => {

        const settingId = SettingId.videoThumbnail;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateMonetizationInfo: (newState, userInteraction) => {

        const settingId = SettingId.monetizationInfo;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklistEnabled: (newState, userInteraction) => {

        const settingId = SettingId.blacklistEnabled;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        const dependent = document.querySelector(`[data-id=${SettingId.blacklistButton}]`);

        if (newState) {
            dependent?.classList.remove("disabled");
        } else {
            dependent?.classList.add("disabled");
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklistButton: (newState, userInteraction) => {

        const settingId = SettingId.blacklistButton;
        const ui = document.querySelector(`[data-setting=${settingId}]`);

        if (ui != null && ui.checked !== newState) {
            ui.checked = newState;
        }

        if (!userInteraction) return;

        Util.updateSingleSetting(settingId, newState);

    },
    updateBlacklist: (newList, userInteraction) => {

        const settingId = SettingId.blacklist;
        const container = document.getElementById("blacklistChannels");

        if (container) {
            container.innerHTML = "";
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
                child.innerHTML = `
                    <div class="channelName"></div>
                    <svg class="remove" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>`;

                child.querySelector(".channelName").textContent = newList[item].name || "<i>@" + newList[item].handle + "</i>";

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
            case SettingId.channelTab:
                Manager.updateChannelTab(value, userInteraction);
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
            case SettingId.annotations:
                Manager.updateAnnotations(value, userInteraction);
                break;
            case SettingId.endScreen:
                Manager.updateEndScreen(value, userInteraction);
                break;
            case SettingId.hfrAllowed:
                Manager.updateHFRAllowed(value, userInteraction);
                break;
            case SettingId.videoFocusToggle:
                Manager.updateVideoFocusToggle(value, userInteraction);
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
            case SettingId.blacklistEnabled:
                Manager.updateBlacklistEnabled(value, userInteraction);
                break;
            case SettingId.blacklistButton:
                Manager.updateBlacklistButton(value, userInteraction);
                break;
            case SettingId.blacklist:
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

        // ensure new features are applied
        for (let key in DEFAULT_SETTINGS) {
            if (!Object.hasOwn(items, key)) {
                items[key] = newFeatures[key] = DEFAULT_SETTINGS[key];
            }
        }

        if (Object.keys(newFeatures).length > 0) {
            if (items[SettingId.syncSettings] === true) {
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

        if (Object.keys(dataSync).length > 0 && dataSync[SettingId.syncSettings] === true) {
            await Util.initialLoad(dataSync);
            browser.storage.sync.onChanged.addListener(Util.onStorageChangedListener);
        } else {

            const dataLocal = await browser.storage.local.get();

            // storage will be empty during first installation
            // this ensures the first load stores the default settings
            if (Object.keys(dataLocal).length === 0) {
                await browser.storage.local.set(DEFAULT_SETTINGS);
                await Util.initialLoad(DEFAULT_SETTINGS);
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
                                nameContainer.innerHTML = "<i>empty channel name</i>";
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
        backdrop.innerHTML = `
            <div id="dialog" class="noResults">
                <div id="searchForm">
                    <input id="channelDataInput" type="text" placeholder="@handle or UCxxx"/>
                    <div id="searchDialog" class="action-button">Search</div>
                </div>
                <div id="searchResult">
                    <div id="searchResultMessage">Enter channel handle or channel id</div>
                    <div id="searchChannelAvatarContainer">
                        <img id="searchChannelAvatar" alt="" src=""/>
                    </div>
                    <div id="blockedIndicator">BLOCKED</div>
                    <div id="searchChannelName">.</div>
                </div>
                <div id="dialogAction">
                    <div id="closeDialog" class="action-button">Close</div>
                    <div id="addDialog" class="action-button">Add</div>
                </div>
            </div>`;

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