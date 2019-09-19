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

    function onMessageListener(event) {

        console.log(event);

        if (!event.data ||
            event.data.type !== "setting-update" ||
            !event.data.payload
        ) {
            return;
        }

        let payload;

        payload = event.data.payload;

        if (payload.hasOwnProperty("autoPlayVideo")) {

            settings.autoPlayVideo = payload.autoPlayVideo;
            window.autoPlayVideo = payload.autoPlayVideo;

        } else if (payload.hasOwnProperty("darkTheme")) {

            if (settings.darkTheme !== payload.darkTheme) {

                settings.darkTheme = payload.darkTheme;
                document.dispatchEvent(
                    new CustomEvent("yt-action", {
                        bubbles: !0,
                        cancelable: !1,
                        composed: !0,
                        detail: {
                            actionName: "yt-dark-mode-toggled-action",
                            args: [payload.darkTheme],
                            disableBroadcast: false,
                            optionalAction: false,
                            returnValue: []
                        }
                    })
                );

            }

        }

        console.log(event);

    }

    let broadcastChannel;

    broadcastChannel = new BroadcastChannel(broadcastId);
    broadcastChannel.addEventListener("message", onMessageListener);

    if (settings) {
        if (settings.hasOwnProperty("autoPlayVideo")) {
            window.autoPlayVideo = settings.autoPlayVideo;
        }
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
                // .replace(/("args":{)/, "$1\"autoplay\":\"0\",")
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

            if (!settings.autoPlayVideo) {

                if (details.url.endsWith("/base.js")) {

                } else {

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
                // .replace(
                //     /("args":{)/,
                //     "$1\"autoplay\":\"0\","
                // )
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

            console.log("cookie:", cookie);

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

            console.log(header);

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
    imageListener: function (details) {

        console.log(details.url);

        if (!settings.maxResThumbnail ||
            details.url.match(/maxresdefault\.[a-z]+/)
        ) {
            return;
        }

        let videoId;
        let imageId;

        videoId = details.originUrl.match(/v=([a-z0-9-_]{11})/i);
        imageId = details.url.match(/\/([a-z0-9-_]{11})\//i);

        if (imageId &&
            imageId[1] &&
            details.url.match(/[a-z]+default\.[a-z]+$/)
        ) {
            console.log(videoId && videoId[1], imageId && imageId[1]);
            console.log(details);
            return {
                redirectUrl: details.url.replace(
                    /[a-z]+default(\.[a-z]+)/g,
                    "maxresdefault$1"
                )
            };
        }

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
        const imageFilter = {urls: ["*://*.ytimg.com/*"], types: ["image"]};

        chrome.webRequest.onBeforeSendHeaders.addListener(api.headersListener, headersFilter, blockHeaders);
        chrome.webRequest.onBeforeRequest.addListener(api.mainFrameListener, mainFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.scriptListener, scriptFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.xhrListener, xhrFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.imageListener, imageFilter, block);

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