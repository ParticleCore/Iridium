"use strict";

const YT_PATTERN = "*://www.youtube.com/*";
const YT_DOMAIN = "https://www.youtube.com";

let api;
let settings;

settings = {
    darkTheme: true,
    autoPlayVideo: false,
    maxResThumbnail: true
};

api = {
    videoIdPattern: /v=([\w-_]+)/,
    filterCacheData: function (data) {
        return data != null && data.startsWith("\u0000") ? data.split("\u0000").pop() : data;

        // if (!data.startsWith("\u0000")) {
        //     return data;
        // }
        //
        // console.log("probably cached, applying workaround");
        // return data.split("\u0000").pop();

    },
    filterResponse: function (requestId) {
        return chrome.webRequest.filterResponseData(requestId);
    },
    mainFrameListener: function (details) {

        if (settings.autoPlayVideo &&
            !settings.maxResThumbnail
        ) {
            return;
        }

        function inject() {
            window.loadIntercept = function (...args) {

                console.log(args);

                args.forEach(function (arg) {
                    console.log(arg);
                });

                if (window.loadOriginal) {
                    window.loadOriginal();
                }

            };
        }

        console.log("main: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = api.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += api.filterCacheData(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = function (event) {

            str = str.replace(/<head>/, "<head><script>(" + inject + "())</script>");

            if (!settings.autoPlayVideo) {
                str = str
                // .replace(/("args":{)/, "$1\"autoplay\":\"0\",")
                // .replace(
                //     /yt\.player\.Application\.create\("player-api", ytplayer\.config\);/,
                //     ""
                // )
                // .replace(/ytplayer\.config\.loaded = true;/, "ytplayer.config.loaded = false;")
                    .replace(/ytplayer\.load\(\);/, "")
                    .replace(/disable_new_pause_state3=true/g, "disable_new_pause_state3=false")
                ;
            }

            if (settings.maxResThumbnail) {

                // str = str.replace(/[a-z]+default(\.[a-z]+)/g, "maxresdefault$1");
                // args.iurlmaxres = args.thumbnail_url.replace(/\/[^\/]+$/, "/maxresdefault.jpg");

            }

            filter.write(encoder.encode(str));
            filter.disconnect();

        };

        return {};

    },
    scriptListener: function (details) {

        if (settings.autoPlayVideo) {
            return;
        }

        // if (!details.url.endsWith("/base.js") &&
        //     !details.url.endsWith("/desktop_polymer_v2.js") &&
        //     !details.url.endsWith("/desktop_polymer_sel_auto_svg_home_v2.js")
        // ) {
        //
        //     console.log("skipped script: " + details.url);
        //     return;
        //
        // }

        console.log("script: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = api.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += api.filterCacheData(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = function (event) {

            if (!settings.autoPlayVideo) {

                if (details.url.endsWith("/base.js")) {

                    // str = str
                    //     .replace(/^(.+\.loadVideoByPlayerVars)(=function\((?:(?!app).)+$)/m, "$1=window.loadIntercept;window.loadOriginal$2")
                    //     .replace(
                    //         // /^(.+\.)(loadVideoByPlayerVars=function\([a-z0-9,]+\){)((?:(?!app).)+$)/im,
                    //         /^(.+\.)(loadVideoByPlayerVars=function\(([a-z0-9,]+)\){)((?:(?!app).)+$)/im,
                    //         // "$1$2if(window.autoPlay===false){$1cueVideoByPlayerVars($3);return;}$4"
                    //         "$1$2if(window.autoPlay===false){$1cueVideoByPlayerVars($3);return;}$4"
                    //     )
                    //     .replace(
                    //         /(this\.[a-z0-9$_]{1,3})=[^;]+\.autoplayoverride[^;]+;/i,
                    //         "$1=true;"
                    //     )
                    //     .replace(
                    //         /autoplay=1/g,
                    //         "autoplay=0"
                    //     )
                    //     .replace(
                    //         /autoplay=\"1\"/g,
                    //         "autoplay=0"
                    //     )
                    //     .replace(/loadVideoByPlayerVars/g, "cueVideoByPlayerVars")
                    // ;

                } else {

                    str = str
                        .replace(/([a-z0-9.]+)loadVideoByPlayerVars\(([^)]+)\)/gi, "(window.autoPlay!==false ? $1loadVideoByPlayerVars($2):$1cueVideoByPlayerVars($2))")
                        // .replace(/\.loadVideoByPlayerVars/g, ".cueVideoByPlayerVars")
                        .replace(/config_\.loaded=!0/g, "config_.loaded=!1")
                    ;

                }

            }

            filter.write(encoder.encode(str));
            filter.disconnect();

        };

        return {};

    },
    xhrListener: function (details) {

        if (settings.autoPlayVideo) {
            return;
        }

        // if (!details.url.endsWith("pbj=1")) {
        //     return console.log("skipped xhr: " + details.url);
        // }

        console.log("xhr: " + details.url);

        let str;
        let filter;
        let decoder;
        let encoder;

        str = "";
        decoder = new TextDecoder("utf-8");
        encoder = new TextEncoder();
        filter = api.filterResponse(details.requestId);

        filter.ondata = function (event) {
            str += api.filterCacheData(decoder.decode(event.data, {stream: true}));
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

        // console.log(details);

        let values;
        let header;

        for (let i = 0; i < details.requestHeaders.length; i++) {

            header = details.requestHeaders[i];

            if (header.name.toLowerCase() !== "cookie") {
                continue;
            }

            console.log(header);
            // console.log(header.value.match(/f6=([0-9a-z]+)/i));

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
                    "$1" + setCookieValue("$2")
                );
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
            return {};
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
    ini: function () {

        chrome.storage.onChanged.addListener(function (
            changes,
            namespace
        ) {
            console.log(changes);
            for (let key in changes) {
                settings[key] = changes[key].newValue;
            }
        });

        chrome.storage.local.get(settings, function (items) {

            console.log(items);

            settings = items;

        });

        chrome.browserAction.onClicked.addListener(function () {
            chrome.tabs.create({
                url: chrome.runtime.getURL("html/options.html")
            });
        });

        chrome.webRequest.onBeforeSendHeaders.addListener(
            api.headersListener,
            {urls: [YT_PATTERN]},
            [
                "blocking",
                "requestHeaders"
            ]
        );

        chrome.webRequest.onBeforeRequest.addListener(
            api.mainFrameListener,
            {
                urls: [YT_PATTERN],
                types: ["main_frame"]
            },
            ["blocking"]
        );

        chrome.webRequest.onBeforeRequest.addListener(
            api.scriptListener,
            {
                urls: [
                    YT_PATTERN + "/base.js",
                    YT_PATTERN + "/desktop_polymer_v2.js",
                    YT_PATTERN + "/desktop_polymer_sel_auto_svg_home_v2.js"
                ],
                types: ["script"]
            },
            ["blocking"]
        );

        chrome.webRequest.onBeforeRequest.addListener(
            api.xhrListener,
            {
                urls: [YT_PATTERN + "pbj=1"],
                types: ["xmlhttprequest"]
            },
            ["blocking"]
        );

        chrome.webRequest.onBeforeRequest.addListener(
            api.imageListener,
            {
                urls: ["*://*.ytimg.com/*"],
                types: ["image"]
            },
            ["blocking"]
        );

    }
};

api.ini();