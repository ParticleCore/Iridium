"use strict";

const GET_BROADCAST_ID = 0;
const YT_PATTERN = "*://www.youtube.com/*";
const YT_FP_DOMAIN = "youtube.com";
const YT_URL = "http://." + YT_FP_DOMAIN;
const YT_PREF_COOKIE = "PREF";

let fpi;
let api;
let util;
let settings;

settings = window.defaultSettings || {};

browser
    .privacy
    .websites
    .firstPartyIsolate
    .get({})
    .then(function (got) {
        fpi = got.value;
    });

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
    },
    filterEngine: function (
        details,
        modifier
    ) {

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

            filter.write(encoder.encode(modifier(str)));
            filter.disconnect();

        };

    }
};

api = {
    broadcastId: util.generateUUID(),
    mainFrameListener: function (details) {

        if (details.frameId !== 0) {
            return {};
        }

        let modifier;

        modifier = function (str) {

            str = str
                .replace(
                    "<head>",
                    `<head><script>(${window.main}("${api.broadcastId}",${JSON.stringify(settings)}))</script>`
                )
                .replace(
                    /(<g id="like">)/,
                    "\n<g id='iridium_logo'>" +
                    "\n    <polygon data-iri-feature='iridiumLogo' opacity='0.5' points='6.8,3 22.4,12 6.8,21'/>" +
                    "\n    <path data-iri-feature='iridiumLogo' d='M6.8,3v18l15.6-9L6.8,3z M9.8,8.2l6.6,3.8l-6.6,3.8V8.2z'/>" +
                    "\n</g>" +
                    "\n<g id='autoplay'>" +
                    "\n    <polygon data-iri-feature='autoPlayVideo' points='7,3.3 7,20.7 22,12'/>" +
                    "\n</g>" +
                    "\n<g id='save_video'>" +
                    "\n    <path data-iri-feature='saveVideo' d='M20,9.1h-4.6V2.3H8.6v6.9H4l8,8L20,9.1z M4,19.4v2.3h16v-2.3H4z'/>" +
                    "\n</g>" +
                    "\n<g id='stream_list'>" +
                    "\n    <path data-iri-feature='streamList' d='M9,1.5v6H5l7,7l7-7h-4v-6H9 M5,16.5v2h14v-2H5 M5,20.5v2h14v-2H5z'/>" +
                    "\n</g>" +
                    "\n$1"
                )
                .replace(
                    /yt\.player\.Application\.create\("player-api", ?ytplayer\.config\);/,
                    "window.modArgs&&window.modArgs(ytplayer.config.args);$&"
                )
            ;

            if (!settings.autoPlayVideo) {
                str = str
                    .replace(
                        /ytplayer\.load\(\);/,
                        ""
                    )
                ;
            }

            return str;

        };

        util.filterEngine(details, modifier);

    },
    scriptListener: function (details) {

        if (details.frameId !== 0) {
            return {};
        }

        let modifier;

        modifier = function (str) {

            if (details.url.endsWith("/base.js")) {
                str = str
                    .replace(
                        /"loadVideoByPlayerVars",this\.loadVideoByPlayerVars/,
                        "\"loadVideoByPlayerVars\",window.modifier?window.modifier.bind(this,this.loadVideoByPlayerVars):this.loadVideoByPlayerVars"
                    )
                    .replace(
                        /"cueVideoByPlayerVars",this\.cueVideoByPlayerVars/,
                        "\"cueVideoByPlayerVars\",window.modifier?window.modifier.bind(this,this.cueVideoByPlayerVars):this.cueVideoByPlayerVars"
                    )
                    .replace(
                        /([a-z0-9.]+)(.style\.backgroundImage=\n?([a-z0-9]+)\?"url\("\+[a-z0-9]+\+"\)":"";?)/gi,
                        "$&;(window.imageLoader&&window.imageLoader($1,$3));"
                    )
                    .replace(
                        /(this\.[a-z0-9]+)=[^;]+\.autoplayoverride\);/i,
                        "$1=window.autoPlayVideo;"
                    )
                ;
            } else {

                str = str
                    .replace(
                        /(\.onDone=function\(([a-z0-9]+)\){)/gi,
                        "$1(window.pbjMod&&window.pbjMod($2));"
                    )
                    .replace(
                        /(loadDesktopData_:function\(([a-z0-9]+)(,)?([a-z0-9]+)?\){)/gi,
                        "$1(window.pageModifier&&window.pageModifier($4||$2));"
                    )
                    .replace(
                        /([a-z0-9.]+)loadVideoByPlayerVars\(([^)]+)\)/gi,
                        "(window.autoPlayVideo!==false||window.autoPlayVideo===undefined?$1loadVideoByPlayerVars($2):$1cueVideoByPlayerVars($2))"
                    )
                ;

                if (!settings.autoPlayVideo) {
                    str = str
                        .replace(
                            /config_\.loaded=!0/g,
                            "config_.loaded=!1"
                        )
                    ;
                }

            }

            return str;

        };

        util.filterEngine(details, modifier);

    },
    headersListener: function (details) {

        if (details.frameId !== 0) {
            return {requestHeaders: details.requestHeaders};
        }

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

        function processCookieValue(
            match,
            p1,
            p2,
            offset,
            string
        ) {

            if (!p1 || !p2) {
                return string;
            }

            return p1 + setCookieValue(p2);

        }

        function bakeCookie() {

            let date;

            date = new Date();

            return {
                expirationDate: Math.round(date.setFullYear(date.getFullYear() + 1) / 1000),
                firstPartyDomain: fpi ? YT_FP_DOMAIN : null,
                httpOnly: false,
                name: YT_PREF_COOKIE,
                path: "/",
                sameSite: "no_restriction",
                secure: false,
                storeId: details.cookieStoreId,
                value: "f6=400"
            };

        }

        function updateCookie(cookie) {

            if (!cookie) {
                cookie = bakeCookie();
            }

            chrome.cookies.set({
                expirationDate: cookie.expirationDate,
                firstPartyDomain: cookie.firstPartyDomain,
                httpOnly: cookie.httpOnly,
                name: cookie.name,
                path: cookie.path,
                sameSite: cookie.sameSite,
                secure: cookie.secure,
                storeId: cookie.storeId,
                url: YT_URL,
                value: cookie.value.replace(
                    /(f6=)([0-9a-z]+)/i,
                    processCookieValue
                )
            });

        }

        let values;
        let header;

        for (let i = 0; i < details.requestHeaders.length; i++) {

            if ((header = details.requestHeaders[i]).name.toLowerCase() !== "cookie") {
                continue;
            }

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
                header.value = header.value.replace(
                    /(PREF=)[^;|$]+/i,
                    "$1" + values.join("&")
                );

            } else {
                header.value = header.value.replace(
                    /(f6=)([0-9a-z]+)/i,
                    processCookieValue
                );
            }

            chrome.cookies.get({
                    storeId: details.cookieStoreId,
                    firstPartyDomain: fpi ? YT_FP_DOMAIN : null,
                    name: YT_PREF_COOKIE,
                    url: YT_URL
                },
                updateCookie
            );

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
        const headersFilter = {
            urls: [YT_PATTERN],
            types: ["main_frame"]
        };
        const mainFilter = {
            urls: [YT_PATTERN],
            types: ["main_frame"]
        };
        const scriptFilter = {
            urls: [
                YT_PATTERN + "/base.js",
                YT_PATTERN + "/desktop_polymer_v2.js",
                YT_PATTERN + "/desktop_polymer_sel_auto_svg_home_v2.js"
            ],
            types: ["script"]
        };

        chrome.webRequest.onBeforeSendHeaders.addListener(api.headersListener, headersFilter, blockHeaders);
        chrome.webRequest.onBeforeRequest.addListener(api.mainFrameListener, mainFilter, block);
        chrome.webRequest.onBeforeRequest.addListener(api.scriptListener, scriptFilter, block);

    },
    ini: function () {

        function onMessageListener(
            request,
            sender,
            sendResponse
        ) {

            if (request === GET_BROADCAST_ID) {

                sendResponse(api.broadcastId);
                return;

            }

            if (request === "iridiumLogo") {

                chrome.runtime.openOptionsPage();
                return;

            }

            let data;
            let migrate;

            data = {};

            for (let key in request) {

                if (!request.hasOwnProperty(key) ||
                    !(key in settings) ||
                    request[key] === settings[key]
                ) {
                    continue;
                }

                settings[key] = request[key];
                data[key] = settings[key];
                migrate = key === "syncSettings";

            }

            if (Object.keys(data).length < 1) {
                return;
            }

            if (migrate) {

                data = settings;
                chrome
                    .storage[!settings.syncSettings ? "sync" : "local"]
                    .set({syncSettings: false},
                        function (event) {
                            console.log("migrate storage");
                        });

            }

            chrome
                .storage[settings.syncSettings ? "sync" : "local"]
                .set(data,
                    function (event) {
                        console.log("onMessageListener", event);
                    });

        }

        function keepUsingSync(items) {

            if ("syncSettings" in items &&
                items.syncSettings === true
            ) {
                return chrome.storage.sync.get(settings, onStorageGetListener);
            }

            chrome.storage.local.get(settings, onStorageGetListener);

        }

        function onStorageChangedListener(changes) {
            for (let key in changes) {
                if (changes.hasOwnProperty(key)) {
                    settings[key] = changes[key].newValue;
                }
            }
        }

        function onStorageGetListener(items) {
            settings = items;
        }

        function onBrowserActionClickedListener() {
            chrome.runtime.openOptionsPage();
        }

        chrome.runtime.onMessage.addListener(onMessageListener);
        chrome.storage.onChanged.addListener(onStorageChangedListener);
        chrome.browserAction.onClicked.addListener(onBrowserActionClickedListener);
        chrome.storage.sync.get({syncSettings: settings.syncSettings}, keepUsingSync);

        this.iniRequestListeners();

    }
};

api.ini();