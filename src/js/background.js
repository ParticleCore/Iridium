"use strict";

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
const Api = {
    debounce: false,
    filterEngine: (details, modifier) => {
        const filter = browser.webRequest.filterResponseData(details.requestId);
        let data = [];
        filter.ondata = event => data.push(new Uint8Array(event.data))
        filter.onstop = _ => {

            const patchVersion = `iridium patch version ${browser.runtime.getManifest().version}`;
            const commentBlock = details.type === "script" ? `// ${patchVersion}\n` : `<!-- ${patchVersion} -->\n`;
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

            const decoder = new TextDecoder("utf-8");
            const encoder = new TextEncoder();
            let str = decoder.decode(combinedArray, {stream: false});

            // change nothing if the resource has already been modified to avoid redundant operations
            filter.write(str.startsWith(commentBlock) ? combinedArray : encoder.encode(commentBlock + modifier(str)));
            filter.close();

            str = null;
            combinedArray = null;
            buffer = null;
            data.length = 0;

        };
    },
    checkNewFeatures: async (settings) => {

        const newFeatures = {};

        for (let key in DEFAULT_SETTINGS) {
            if (!Object.hasOwn(settings, key)) {
                settings[key] = newFeatures[key] = DEFAULT_SETTINGS[key];
            }
        }

        if (Object.keys(newFeatures).length > 0) {
            if (settings[SettingId.syncSettings] === true) {
                await browser.storage.sync.set(newFeatures);
            } else {
                await browser.storage.local.set(newFeatures);
            }
        }

        return settings;

    },
    getSettings: async function () {

        const dataSync = await browser.storage.sync.get();

        if (Object.keys(dataSync).length > 0 && dataSync[SettingId.syncSettings] === true) {
            return await Api.checkNewFeatures(dataSync);
        }

        const dataLocal = await browser.storage.local.get();

        // storage will be empty during first installation
        // this ensures the first load stores the default settings
        if (Object.keys(dataLocal).length === 0) {
            await browser.storage.local.set(DEFAULT_SETTINGS);
            return DEFAULT_SETTINGS;
        }

        return await Api.checkNewFeatures(dataLocal);

    },
    onWebPage: details => new Promise((resolve) => (async () => {

        const settings = await Api.getSettings();

        Api.filterEngine(details, str => str
            .replace(
                "<head>",
                `<head><script>(${mainScript}("${browser.runtime.id}",${JSON.stringify(SettingId)},${JSON.stringify(Names)},${JSON.stringify(settings)}))</script>`
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
        );

        resolve({});

    })()),
    onBaseJS: details => Api.filterEngine(details, str => str
        .replace(
            /=JSON\.parse\(/g,
            `=(window?.["${Names.parseBypass}"]||JSON.parse)(`
        )
        .replace(
            /"yt\.player\.Application\.create",(.*?create)\);/g,
            `"yt.player.Application.create",window?.["${Names.patchApplicationCreate}"]?.($1)||$1);`
        )
        .replace(
            /"yt\.player\.Application\.createAlternate",(.*?create)\);/g,
            `"yt.player.Application.createAlternate",window?.["${Names.patchApplicationCreate}"]?.($1)||$1);`
        )),
    onDesktopPolymerJS: details => Api.filterEngine(details, str => str
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
        )),
    onMessageListener: (data) => {

        if (!data.type || !data.payload || Api.debounce) {
            return;
        }

        // prevents the options page from opening in duplicate
        Api.debounce = true;
        setTimeout(() => Api.debounce = false, 1000);

        if (data.payload === SettingId.extensionButton) {
            browser.runtime.openOptionsPage().then();
        }

    }
}

browser.runtime.onConnect.addListener((port) => port.onMessage.addListener(Api.onMessageListener));
browser.action.onClicked.addListener(() => browser.runtime.openOptionsPage().then());
browser.webRequest.onBeforeRequest.addListener(
    Api.onWebPage,
    {
        urls: ["*://www.youtube.com/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);
browser.webRequest.onBeforeRequest.addListener(
    Api.onBaseJS,
    {
        urls: ["*://www.youtube.com/*/base.js"],
        types: ["main_frame", "script"]
    },
    ["blocking"]
);
browser.webRequest.onBeforeRequest.addListener(
    Api.onDesktopPolymerJS,
    {
        urls: ["*://www.youtube.com/*/desktop_polymer.js"],
        types: ["main_frame", "script"]
    },
    ["blocking"]
);