"use strict";

const settings = DEFAULT_SETTINGS || {};
const Names = {
    navigationMod: "navigationMod",
    modArgs: "modArgs",
    imageLoader: "imageLoader",
    pageModifier: "pageModifier",
    onAppReady: "onAppReady",
    parseBypass: "parseBypass",
    patchApplicationCreate: "patchApplicationCreate",
    patchYtInitialData: "patchYtInitialData",
    patchYtInitialPlayerResponse: "patchYtInitialPlayerResponse",
    patchLoadVideoByPlayerVars: "patchLoadVideoByPlayerVars",
};
const Util = {
    videoIdPattern: /v=([\w-_]+)/,
    generateUUID: () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, point => (point ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> point / 4).toString(16)),
    filterCacheData: data => data != null && data.startsWith("\u0000") ? data.split("\u0000").pop() : data,
    filterEngine: (details, modifier) => {

        let data = [];
        let patchVersion = `iridium patch version ${browser.runtime.getManifest().version}`;
        let commentBlock = details.type === "script" ? `// ${patchVersion}\n` : `<!-- ${patchVersion} -->\n`;
        let decoder = new TextDecoder("utf-8");
        let encoder = new TextEncoder();
        let filter = browser.webRequest.filterResponseData(details.requestId);

        filter.ondata = event => data.push(new Uint8Array(event.data));

        filter.onstop = _ => {

            let buffer;
            let combinedLength = 0;

            for (buffer of data) {
                combinedLength += buffer.length;
            }

            let writeOffset = 0;
            let combinedArray = new Uint8Array(combinedLength);

            while (writeOffset < combinedLength) {
                buffer = data.shift();
                combinedArray.set(buffer, writeOffset);
                writeOffset += buffer.length;
            }

            let str = decoder.decode(combinedArray, {stream: false});

            // change nothing if the resource has already been modified to avoid redundant operations
            filter.write(str.startsWith(commentBlock) ? combinedArray : encoder.encode(commentBlock + modifier(Util.filterCacheData(str))));
            filter.close();

            str = null;
            combinedArray = null;
            buffer = null;
            data.length = 0;

        };

    },
    onMessageListener: (data) => {

        if (data.broadcastId !== Api.broadcastId) {
            return;
        }

        if (!data.type || !data.payload) {
            return;
        }

        if (data.payload === SettingId.extensionButton) {
            browser.runtime.openOptionsPage().then();
            return;
        }

        if (data.type === "setting") {
            Util.saveSingleSetting(data.payload.id, data.payload.value);
        }

    },
    saveAllSettings: function () {

        browser.storage.local.set(settings).then();

        if (settings.syncSettings === true) {
            browser.storage.sync.set(settings).then();
        }

    },
    updateAllSettings: function (data) {

        for (let key in data) {
            settings[key] = data[key];
        }

        Util.saveAllSettings();

    },
    saveSingleSetting: function (key, value) {

        browser.storage.local.set({[key]: value}).then();

        if (settings.syncSettings === true) {
            browser.storage.sync.set({[key]: value}).then();
        }

    },
    updateSingleSetting: function (key, value) {

        if (settings[key] === value) {
            return;
        }

        settings[key] = value;

        Util.saveSingleSetting(key, value);

    },
    initialLoad: items => {

        for (let key in DEFAULT_SETTINGS) {
            if (!Object.hasOwn(settings, key)) {
                settings[key] = DEFAULT_SETTINGS[key];
            }
        }

        if (items.broadcastId && items.broadcastId !== Api.broadcastId) {
            Api.oldBroadcastId = items.broadcastId;
            items.broadcastId = Api.broadcastId;
            Util.dispatchNewBroadcastId();
        } else if (!items.broadcastId) {
            items.broadcastId = Api.broadcastId;
        }

        Util.updateAllSettings(items);

    },
    checkSyncStorage: items => {
        if (Object.keys(items).length > 0 && items[SettingId.syncSettings] === true) {
            Util.initialLoad(items);
        } else {
            browser.storage.local.get().then(Util.initialLoad);
        }
    },
    dispatchNewBroadcastId: () => {
        Api.ports.forEach((port) => {
            try {
                port?.postMessage({
                    broadcastId: Api.oldBroadcastId,
                    newBroadcastId: Api.broadcastId
                });
            } catch (e) {
                Api.ports.splice(Api.ports.indexOf(port), 1);
            }
        });
    },
    sendMessageToPage: data => {
        Api.ports.forEach((port) => {
            port?.postMessage({
                broadcastId: Api.broadcastId,
                payload: data
            });
        });
    },
    onStorageChangedListener: changes => {

        const changedData = {};

        for (let key in changes) {

            const change = changes[key];

            if (change.newValue !== change.oldValue && settings[key] !== changes.newValue) {

                settings[key] = changes[key].newValue;

                if (key !== "broadcastId") {
                    changedData[key] = changes[key].newValue;
                }

            }

        }

        if (Object.keys(changedData).length > 0) {
            Util.sendMessageToPage(changedData);
        }

    },
    onBrowserActionClickedListener: () => browser.runtime.openOptionsPage().then(),
};
const Api = {
    broadcastId: Util.generateUUID(),
    oldBroadcastId: "",
    customScript: () => `<script>(${mainScript}("${browser.runtime.id}","${Api.broadcastId}",${JSON.stringify(SettingId)},${JSON.stringify(Names)},${JSON.stringify(settings)}))</script>`,
    customStyle: () => `<style>
        html #masthead-container,
        html #secondary,
        html #below {
            transition-property: opacity !important;
            transition-duration: 0.8s !important;;
            transition-timing-function: ease !important;;
            transition-delay: 0.25s !important;;
        }
        html[dim] #masthead-container,
        html[dim] #secondary,
        html[dim] #below {
            opacity: 0.1;
        }
        /* ini | iridium icon */
        html[dark] .iridium-options yt-icon {
            background: #fff;
        }
        html .iridium-options:hover yt-icon {
            background: radial-gradient(circle at 0% 150%, #0ff 35%, #f0f 75%);
        }
        .iridium-options yt-icon {
            mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon opacity="0.5" points="6.8,3 22.4,12 6.8,21"/><path d="M6.8,3v18l15.6-9L6.8,3z M9.8,8.2l6.6,3.8l-6.6,3.8V8.2z"/></svg>');
            background: #030303;
        }
        /* end | iridium icon */
        /* ini | hide end screen cards */
        .iridium-hide-end-screen-cards #movie_player:hover .ytp-ce-element:not(:hover) {
            opacity: 0;
        }
        /* end | hide end screen cards */
        /* ini | scroll volume */
        #iridium-scroll-volume-level-container {
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 10%;
            z-index: 19;
        }
        #iridium-scroll-volume-level {
            display: inline-block;
            padding: 10px 20px;
            font-size: 175%;
            background: rgba(0,0,0,.5);
            pointer-events: none;
            border-radius: 3px;
        }
        /* end | scroll volume */
        #iridium-player-tools {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }
        #iridium-player-tools > div {
            cursor: pointer;
            width: 36px;
            height: 36px;
            justify-content: center;
            display: flex;
            align-items: center;
            fill: currentColor;
            position: relative;
        }
        #iridium-player-tools > div:hover {
            background-color: var(--yt-spec-10-percent-layer);
            border-radius: 18px;
        }
        #iridium-player-tools > div > svg {
            pointer-events: none;
            user-select: none;
        }
        html[dark] #iridium-player-tools .monetized {
            fill: #71ff3e;
        }
        #iridium-player-tools .monetized {
            fill: #3ad406;
        }
        #iridium-monetization-count {
            font-size: 10px;
            position: absolute;
            color: var(--yt-spec-text-primary);
            bottom: 0;
            right: 0;
            background: var(--yt-spec-base-background);
            border-radius: 12px;
            padding: 0 3px;
        }
        #iridium-player-tools > div:hover #iridium-monetization-count {
            display: none;
        }
    </style>`,
    iniRequestListeners: () => {

        const BASE_URL = "*://www.youtube.com/*";
        const MAIN_FILTER_URLS = [BASE_URL];
        const SCRIPT_FILTER_URLS = [
            `${BASE_URL}/base.js`,
            `${BASE_URL}/desktop_polymer.js`,
        ];

        browser.webRequest.onBeforeRequest.addListener(
            Api.mainFrameListener,
            {urls: MAIN_FILTER_URLS, types: ["main_frame"]},
            ["blocking"]
        );

        browser.webRequest.onBeforeRequest.addListener(
            Api.scriptListener,
            {urls: SCRIPT_FILTER_URLS, types: ["script"]},
            ["blocking"]
        );

    },
    mainFrameListener: details => {

        // ignore anything that is not part of the main frame
        // https://mdn.io/onBeforeRequest
        if (details.frameId !== 0) {
            return {};
        }

        Util.filterEngine(details, str => {

            str = str
                .replace(
                    "<head>",
                    `<head>${Api.customScript()}${Api.customStyle()}`
                )
                // forces player creation through Polymer
                .replace(
                    /(if\(createPlayer\)\{)/gi,
                    `if(false){`
                )
                .replace(
                    /(var ytInitialData = \{.*};)/g,
                    `$1window?.["${Names.patchYtInitialData}"]?.(ytInitialData);`
                )
            ;

            return str;

        });

    },
    scriptListener: details => {

        // ignore anything that is not part of the main frame
        // https://mdn.io/onBeforeRequest
        if (details.frameId !== 0) {
            return {};
        }

        Util.filterEngine(details, str => {

            if (details.url.endsWith("/base.js")) {

                str = str
                    .replace(
                        /"yt\.player\.Application\.create",(.*?create)\);/g,
                        `"yt.player.Application.create",window?.["${Names.patchApplicationCreate}"]?.($1)||$1);`
                    )
                    .replace(
                        /"yt\.player\.Application\.createAlternate",(.*?create)\);/g,
                        `"yt.player.Application.createAlternate",window?.["${Names.patchApplicationCreate}"]?.($1)||$1);`
                    )
                ;

            } else if (details.url.endsWith("/desktop_polymer.js")) {

                str = str
                    .replace(
                        /text\(\)\.then(\(function\(([a-z0-9]+)\){)/gi,
                        `text().then(function($2){return window?.["${Names.navigationMod}"]?.($2)||$2;}).then$1`
                    )
                    .replace(
                        /(transition\("rendering"\))/gi,
                        `$1;window?.["${Names.onAppReady}"]?.()`
                    )
                    .replace(
                        /config\.loaded=!0\)/g,
                        "config.loaded=!!0)",
                    )
                ;

            }

            return str;

        });

    },
    ports: [],
    onPortMessage: (data) => {
        Util.onMessageListener(data);
    },
    onPortConnect: (port) => {

        Api.ports[port.sender.tab.id] = port;

        port.onDisconnect.addListener(() => Api.ports.splice(Api.ports.indexOf(port.sender.tab.id), 1));
        port.onMessage.addListener(Api.onPortMessage);

        if (Api.oldBroadcastId) {
            Util.dispatchNewBroadcastId();
        } else {
            port.postMessage({broadcastId: Api.broadcastId});
        }

    },
    ini: () => {

        browser.runtime.onConnect.addListener(Api.onPortConnect);
        browser.browserAction.onClicked.addListener(Util.onBrowserActionClickedListener);
        browser.storage.local.onChanged.addListener(Util.onStorageChangedListener);
        browser.storage.sync.get().then(Util.checkSyncStorage);

        Api.iniRequestListeners();

    }
}

Api.ini();