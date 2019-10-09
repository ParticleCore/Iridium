"use strict";

const YT_PATTERN = "*://www.youtube.com/*";
const YT_DOMAIN = "https://www.youtube.com";
const GET_BROADCAST_ID = 0;

let api;
let util;
let inject;
let settings;

settings = {
    darkTheme: true,
    autoPlayVideo: false,
    maxResThumbnail: true
};

util = {
    videoIdPattern: /v=([\w-_]+)/,
    generateUUID: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            function (point) {
                return (point ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> point / 4).toString(16);
            }
        );
    },
    filterCacheData: function (data) {
        return data != null && data.startsWith("\u0000") ? data.split("\u0000").pop() : data;
    },
    filterResponse: function (requestId) {
        return chrome.webRequest.filterResponseData(requestId);
    }
};

inject = function (
    broadcastId,
    settings
) {

    let broadcastChannel;
    let featureList;
    let autoPlayVideoFeature;
    let darkThemeFeature;
    let maxResThumbnailFeature;

    autoPlayVideoFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("autoPlayVideo")) {
                return false;
            }

            if (settings.autoPlayVideo !== option.autoPlayVideo) {

                settings.autoPlayVideo = option.autoPlayVideo;
                window.autoPlayVideo = option.autoPlayVideo;

            }

            return true;

        }
    };

    darkThemeFeature = {
        toggleEvent: new CustomEvent("yt-action", {detail: {actionName: "yt-dark-mode-toggled-action", returnValue: []}}),
        belongs: function (option) {

            if (!option.hasOwnProperty("darkTheme")) {
                return false;
            }

            if (settings.darkTheme !== option.darkTheme) {

                settings.darkTheme = option.darkTheme;

                if (settings.darkTheme !== document.documentElement.hasAttribute("dark")) {
                    document.dispatchEvent(this.toggleEvent);
                }

            }

            return true;

        }
    };

    maxResThumbnailFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("maxResThumbnail")) {
                return false;
            }

            if (settings.maxResThumbnail !== option.maxResThumbnail) {

                settings.maxResThumbnail = option.maxResThumbnail;
                window.maxResThumbnail = option.maxResThumbnail;

            }

            return true;

        }
    };

    featureList = [
        autoPlayVideoFeature,
        darkThemeFeature,
        maxResThumbnailFeature
    ];

    function onMessageListener(event) {

        console.log(event);

        if (!event.data ||
            !event.data.payload ||
            event.data.type !== "setting-update"
        ) {
            return;
        }

        for (let feature of featureList) {
            if (feature.belongs(event.data.payload)) {
                break;
            }
        }

    }

    broadcastChannel = new BroadcastChannel(broadcastId);
    broadcastChannel.addEventListener("message", onMessageListener);

    if (!settings) {
        return;
    }

    if (settings.hasOwnProperty("autoPlayVideo")) {
        window.autoPlayVideo = settings.autoPlayVideo;
    }

    if (settings.hasOwnProperty("maxResThumbnail")) {
        window.maxResThumbnail = settings.maxResThumbnail;
    }

};

api = {
    broadcastId: util.generateUUID(),
    mainFrameListener: function (details) {

        if (settings.autoPlayVideo &&
            !settings.maxResThumbnail
        ) {
            return;
        }

        console.log("main: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = util.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += util.filterCacheData(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = function (event) {

            str = str.replace(/<head>/, `<head><script>(${inject}("${api.broadcastId}",${JSON.stringify(settings)}))</script>`);

            if (!settings.autoPlayVideo) {
                str = str
                    .replace(/("args":{)/, "$1\"autoplay\":\"0\",")
                    .replace(/ytplayer\.load\(\);/, "")
                    .replace(/disable_new_pause_state3=true/g, "disable_new_pause_state3=false")
                ;
            }

            filter.write(encoder.encode(str));
            filter.disconnect();

        };

    },
    scriptListener: function (details) {

        if (settings.autoPlayVideo) {
            return;
        }

        function imageLoader(
            element,
            url
        ) {

            console.log(element.style);

            if (!window.maxResThumbnail ||
                !url ||
                !url.match(/default\.[a-z]+/)
            ) {
                return;
            }

            function checkHighQualityThumbnail(event) {
                if (event.target.width > 120) {

                    element.parentElement.style.backgroundImage = `url(${url})`;
                    element.style.backgroundImage = `url(${src})`;

                }
            }

            let src;
            let thumbnail;

            src = url.replace(/[a-z]+default(\.[a-z]+)/g, "maxresdefault$1");
            thumbnail = new Image();
            thumbnail.addEventListener("load", checkHighQualityThumbnail, false);
            thumbnail.src = src;

        }

        console.log("script: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = util.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += util.filterCacheData(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = function (event) {

            if (details.url.endsWith("/base.js")) {

                str = str
                    .replace(
                        /([a-z0-9.]+)(.style\.backgroundImage=\n?([a-z0-9]+)\?"url\("\+[a-z0-9]+\+"\)":"";?)/gi,
                        "$&;(" + imageLoader.toString().replace(/(\$[$&`'0-9]+)/g, "$$$1") + "($1,$3));"
                    )
                    .replace(
                        /(this\.[a-z0-9]+)=[^;]+\.autoplayoverride\);/i,
                        "$1=window.autoPlayVideo;"
                    )
                ;

            } else {

                if (!settings.autoPlayVideo) {
                    str = str
                        .replace(/([a-z0-9.]+)loadVideoByPlayerVars\(([^)]+)\)/gi, "(window.autoPlayVideo!==false ? $1loadVideoByPlayerVars($2):$1cueVideoByPlayerVars($2))")
                        .replace(/config_\.loaded=!0/g, "config_.loaded=!1")
                    ;
                }

            }

            filter.write(encoder.encode(str));
            filter.disconnect();

        };

    },
    xhrListener: function (details) {

        if (settings.autoPlayVideo) {
            return;
        }

        console.log("xhr: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = util.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += util.filterCacheData(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = function (event) {

            if (!settings.autoPlayVideo) {
                str = str
                    .replace(/("args":{)/, "$1\"autoplay\":\"0\",")
                    .replace(/disable_new_pause_state3=true/g, "disable_new_pause_state3=false")
                ;
            }

            filter.write(encoder.encode(str));
            filter.disconnect();

        };

        return {};

    },
    headersListener: function (details) {

        function setCookieValue(originalValue) {

            if (typeof originalValue !== 'string' &&
                !(originalValue instanceof String)
            ) {
                return "";
            }

            let decimal;

            decimal = parseInt(originalValue, 16);

            if (settings.darkTheme) {
                decimal = decimal & ~Math.pow(2, 19) | Math.pow(2, 10); //"41414"
            } else {
                decimal = decimal & ~Math.pow(2, 10) | Math.pow(2, 19); //"c1014"
            }

            return decimal.toString(16);

        }

        function updateCookie(cookie) {

            // console.log("cookie:", cookie);

            chrome.cookies.set({
                url: YT_DOMAIN,
                name: cookie.name,
                value: cookie.value.replace(
                    /(f6=)([0-9a-z]+)/i,
                    "$1" + setCookieValue("$2")
                ),
                domain: cookie.domain,
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                sameSite: cookie.sameSite,
                expirationDate: cookie.expirationDate,
                storeId: cookie.storeId
            });

        }

        let values;
        let header;

        for (let i = 0; i < details.requestHeaders.length; i++) {

            if ((header = details.requestHeaders[i]).name.toLowerCase() !== "cookie") {
                continue;
            }

            // console.log(header);

            if (!header.value.match(/PREF=/)) {

                // doesn't have pref cookie
                values = header.value.split(/; ?/);
                values.push("PREF=f6=" + setCookieValue("0"));
                header.value = values.join("; ");

            } else if (!header.value.match(/f6=[0-9]+/)) {

                // doesn't have f6 group setting
                values = header.value.match(/PREF=([^;|$]+)/i);
                values = values ? values[1] : "";
                values = values.split("&");
                values.push("f6=" + setCookieValue("0"));
                header.value = header.value.replace(/(PREF=)[^;|$]+/i, "$1" + values.join("&"));

            } else {
                header.value = header.value.replace(/(f6=)([0-9a-z]+)/i, "$1" + setCookieValue("$2"));
            }

            chrome.cookies.get({url: YT_DOMAIN, name: "PREF"}, updateCookie);
            return {requestHeaders: details.requestHeaders};

        }

        // no cookies header, add it

        details.requestHeaders.push({
            name: "cookie",
            value: "PREF=f6=" + setCookieValue("0")
        });

        return {requestHeaders: details.requestHeaders};

    },
    iniRequestListeners: function () {

        const block = ["blocking"];
        const blockHeaders = ["blocking", "requestHeaders"];
        const headersFilter = {urls: [YT_PATTERN]};
        const mainFilter = {urls: [YT_PATTERN], types: ["main_frame"]};
        const scriptFilter = {
            urls: [
                YT_PATTERN + "/base.js",
                YT_PATTERN + "/desktop_polymer_v2.js",
                YT_PATTERN + "/desktop_polymer_sel_auto_svg_home_v2.js"
            ],
            types: ["script"]
        };
        const xhrFilter = {urls: [YT_PATTERN + "pbj=1"], types: ["xmlhttprequest"]};

        chrome.webRequest.onBeforeSendHeaders.addListener(api.headersListener, headersFilter, blockHeaders);
        chrome.webRequest.onBeforeRequest.addListener(api.mainFrameListener, mainFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.scriptListener, scriptFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.xhrListener, xhrFilter, block);

    },
    ini: function () {

        function onMessageListener(
            request,
            sender,
            sendResponse
        ) {
            if (request === GET_BROADCAST_ID) {
                sendResponse(api.broadcastId);
            }
        }

        function onStorageChangedListener(
            changes,
            namespace
        ) {

            console.log(changes);

            for (let key in changes) {
                if (changes.hasOwnProperty(key)) {
                    settings[key] = changes[key].newValue;
                }
            }

        }

        function onStorageGetListener(items) {

            console.log(items);

            settings = items;

        }

        function onBrowserActionClickedListener() {
            chrome.tabs.create({
                url: chrome.runtime.getURL("html/options.html")
            });
        }

        chrome.runtime.onMessage.addListener(onMessageListener);
        chrome.storage.onChanged.addListener(onStorageChangedListener);
        chrome.storage.local.get(settings, onStorageGetListener);
        chrome.browserAction.onClicked.addListener(onBrowserActionClickedListener);

        this.iniRequestListeners();

    }
};

api.ini();