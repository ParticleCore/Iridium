function mainScript(extensionId, SettingData, defaultSettings) {

    const iridiumSettings = defaultSettings;

    // ini listeners

    const OnPageDataChanged = (() => {

        const listeners = [];
        const onEvent = event => listeners.forEach(listener => listener?.(event));

        window.addEventListener("yt-page-data-updated", onEvent, true);
        window.addEventListener("yt-navigate-start", onEvent, false);
        window.addEventListener("yt-navigate-finish", onEvent, false);
        window.addEventListener("yt-next-continuation-data-updated", onEvent, true);
        window.addEventListener("popstate", onEvent, true);

        return {
            addListener: listener => listeners.push(listener)
        };

    })();

    const OnYtPageDataFetched = (() => {

        const listeners = [];
        const onEvent = data => {

            const response = data?.["detail"]?.["pageData"]?.["response"];

            if (response) {
                listeners.forEach(listener => listener?.(response));
            }

        };

        window.addEventListener("yt-page-data-fetched", onEvent, true);

        return {
            addListener: listener => listeners.push(listener)
        };

    })();

    // end listeners

    // ini utils

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

    const Util = {
        getSingleObjectByKey: (obj, keys, match) => {

            if (!obj) {
                return null;
            }

            for (let property in obj) {

                if (!obj.hasOwnProperty(property) || obj[property] === null || obj[property] === undefined) {
                    continue;
                }

                if ((keys.constructor.name === "String" ? keys === property : keys.indexOf(property) > -1)
                    && (!match || obj[property].constructor.name !== "Object" && match(obj[property], obj))
                ) {
                    return obj[property];
                }

                if (obj[property].constructor.name === "Object") {
                    let result = Util.getSingleObjectByKey(obj[property], keys, match);
                    if (result) {
                        return result;
                    }
                } else if (obj[property].constructor.name === "Array") {
                    for (let i = 0; i < obj[property].length; i++) {
                        let result = Util.getSingleObjectByKey(obj[property][i], keys, match);
                        if (result) {
                            return result;
                        }
                    }
                }

            }

        },
        getSingleObjectAndParentByKey: (obj, keys, match) => {

            for (let property in obj) {

                if (!obj.hasOwnProperty(property) || obj[property] === null || obj[property] === undefined) {
                    continue;
                }

                if ((keys.constructor.name === "String" ? keys === property : keys.indexOf(property) > -1)
                    && (!match || match(obj[property], obj))
                ) {
                    return {
                        parent: obj,
                        object: obj[property]
                    };
                }

                if (obj[property].constructor.name === "Object") {
                    let result = Util.getSingleObjectAndParentByKey(obj[property], keys, match);
                    if (result) {
                        return result;
                    }
                } else if (obj[property].constructor.name === "Array") {
                    for (let i = 0; i < obj[property].length; i++) {
                        let result = Util.getSingleObjectAndParentByKey(obj[property][i], keys, match);
                        if (result) {
                            return result;
                        }
                    }
                }

            }

        },
        isWatchPage: () => window.location.pathname === "/watch" || window.location.pathname.startsWith("/clip")
    };

    const FeatureUpdater = (() => {

        const features = {};
        const register = (id, feature) => (features[id] ??= []).push(feature);
        const updateAll = () => Object.keys(features).forEach(id => features[id]?.forEach(feature => feature?.()));
        const update = id => features[id]?.forEach(feature => feature?.());

        OnPageDataChanged.addListener(updateAll);

        return {
            update: update,
            register: register
        };

    })();

    const Broadcaster = (() => {

        const channel = new BroadcastChannel(extensionId);
        const onMessageListener = event => {
            if (event?.data) {

                // first update setting(s)
                for (let key in event.data) {
                    iridiumSettings[key] = event.data?.[key];
                }

                // then update feature(s)
                for (let key in event.data) {
                    FeatureUpdater.update(key);
                }

            }
        };

        channel.addEventListener("message", onMessageListener);

        return {
            postMessage: message => channel.postMessage(message),
            doAction: action => channel.postMessage({
                type: "action",
                payload: action
            }),
            saveSetting: settingId => channel.postMessage({
                type: "setting",
                payload: {[settingId]: iridiumSettings[settingId]}
            })
        };

    })();

    // end utils

    // ini overrides

    const OverrideHandleResponse = (() => {

        const listeners = [];
        const handleResponseKey = crypto.randomUUID();

        Object.defineProperty(Object.prototype, "handleResponse", {
            set(data) {
                this[handleResponseKey] = data;
            },
            get() {
                const original = this[handleResponseKey];
                return function (url, code, response, callback) {
                    if (response?.constructor === String && original?.toString()?.indexOf("\")]}'\"") !== -1) {
                        try {
                            const parsed = JSON.parse(response);
                            listeners?.forEach(listener => listener?.(parsed));
                            arguments[2] = JSON.stringify(parsed);
                        } catch (e) {
                        }
                    }
                    return original?.apply(this, arguments);
                };
            }
        });

        return {
            onHandleResponseListener: listener => listeners.push(listener)
        };

    })();

    const OverrideFetch = (() => {

        const listeners = [];

        const canProceed = data => {

            const endpoints = data?.["onResponseReceivedEndpoints"]

            if (endpoints != null && endpoints?.constructor === Array && endpoints.length > 0) {
                for (let i = endpoints.length - 1; i >= 0; i--) {
                    if (endpoints[i]?.["reloadContinuationItemsCommand"]?.["targetId"] === "comments-section") {
                        return false
                    }
                }
            }

            return data?.["contents"]
                || data?.["videoDetails"]
                || data?.["items"]
                || data?.["onResponseReceivedActions"]
                || data?.["onResponseReceivedEndpoints"]
                || data?.["onResponseReceivedCommands"];

        }

        const override = function (target, thisArg, argArray) {
            if (!argArray?.[0]?.url || Object.getOwnPropertyDescriptor(argArray[0], "url") !== undefined) {
                return target.apply(thisArg, argArray);
            } else {
                return target.apply(thisArg, argArray).then(response => {
                    return response.clone().text().then(text => {
                        const data = JSON.parse(text.replace(")]}'\n", ""));
                        if (canProceed(data)) {
                            listeners?.forEach(listener => listener?.(data));
                            return new Response(JSON.stringify(data));
                        } else {
                            return response;
                        }
                    }).catch(() => response);
                });
            }
        };

        const original = window.fetch?.["original"] || window.fetch;

        window.fetch = new Proxy(window.fetch, {apply: override});
        window.fetch.original = original;

        let ytInitialData = undefined;

        Object.defineProperty(window, "ytInitialData", {
            set(data) {
                ytInitialData = data;
                listeners?.forEach(listener => listener?.(ytInitialData));
            },
            get() {
                return ytInitialData;
            }
        });

        let ytInitialPlayerResponse = undefined;

        Object.defineProperty(window, "ytInitialPlayerResponse", {
            set(data) {
                ytInitialPlayerResponse = data;
                listeners?.forEach(listener => listener?.(ytInitialPlayerResponse));
            },
            get() {
                return ytInitialPlayerResponse;
            }
        });

        return {
            onFetchListener: listener => listeners.push(listener)
        };

    })();

    const OverrideVideoPlay = (() => {

        let canPlay = false;
        let timer = null;
        let previousVideoId = null;
        let lastKey = -1;

        const spacebar = 32;
        const keyK = 75;
        const moviePlayerContainers = [
            "#player:has(#movie_player)",
            "#player-container:has(#movie_player)",
            "#ytd-player:has(#movie_player)",
            "#movie_player",
        ].join(",");
        const c4PlayerContainers = [
            "#player:has(#c4-player)",
            "#player-container:has(#c4-player)",
            "#ytd-player:has(#c4-player)",
            "#c4-player",
        ].join(",");

        const onClick = event => {

            lastKey = -1;

            clearTimeout(timer);

            canPlay = event.target.id !== "player-wrap" && (
                document.querySelector(moviePlayerContainers)?.contains(event.target) === true
                || document.querySelector(c4PlayerContainers)?.contains(event.target) === true
            );

            if (canPlay) {
                previousVideoId = document.getElementById("movie_player")?.["getVideoData"]()?.["video_id"] || null;
                timer = setTimeout(() => canPlay = false, 300);
            }

        }

        const isAllowed = target => {

            const currentKey = lastKey;

            lastKey = -1;

            const isMoviePlayer = document.getElementById("movie_player")?.contains(target) === true;

            if (isMoviePlayer) {
                return iridiumSettings.autoplay
                    || canPlay
                    || previousVideoId === (document.getElementById("movie_player")?.["getVideoData"]()?.["video_id"] || "")
                    || lastKey === keyK
                    || lastKey === spacebar;
            }

            const isC4Player = document.getElementById("c4-player")?.contains(target) === true;

            if (isC4Player) {
                return iridiumSettings.autoplayChannelTrailer
                    || canPlay
                    || lastKey === keyK
                    || lastKey === spacebar;
            }

            return true;

        };

        const override = () => {

            const original = HTMLVideoElement.prototype.play?.["original"] || HTMLVideoElement.prototype.play;

            HTMLVideoElement.prototype.play = function () {

                const moviePlayer = document.getElementById("movie_player");
                const isMoviePlayer = moviePlayer?.contains(this) === true;
                const currentVideoId = moviePlayer?.["getVideoData"]()?.["video_id"] || "";

                if (isAllowed(this)) {

                    if (isMoviePlayer) {
                        previousVideoId = currentVideoId;
                    } else {
                        previousVideoId = null;
                    }

                    return original.apply(this, arguments);

                } else {

                    previousVideoId = null;

                    return new Promise((resolve, reject) => reject(new DOMException("rejected")));

                }

            };

            HTMLVideoElement.prototype.play.original = original;

        };

        const reset = () => {

            HTMLVideoElement.prototype.play = HTMLVideoElement.prototype.play?.["original"] || HTMLVideoElement.prototype.play;
            delete HTMLVideoElement.prototype.play?.["original"];

            canPlay = false;
            timer = null;
            previousVideoId = null;

        };

        const onNavigate = () => {
            clearTimeout(timer);
            canPlay = false;
            previousVideoId = null;
        };

        const onKeyEvent = event => {
            lastKey = event.keyCode
        };

        let listenersActive = false;

        const update = () => {
            if (iridiumSettings.autoplay && iridiumSettings.autoplayChannelTrailer) {
                listenersActive = false;
                window.removeEventListener("yt-navigate-start", onNavigate, false);
                window.removeEventListener("popstate", onNavigate, true);
                document.removeEventListener('keydown', onKeyEvent, true);
                document.removeEventListener('keyup', onKeyEvent, true);
                document.removeEventListener("click", onClick, true);
                reset();
            } else if (!listenersActive) {
                listenersActive = true;
                window.addEventListener("yt-navigate-start", onNavigate, false);
                window.addEventListener("popstate", onNavigate, true);
                document.addEventListener('keydown', onKeyEvent, true);
                document.addEventListener('keyup', onKeyEvent, true);
                document.addEventListener("click", onClick, true);
                override();
            }
        };

        update();

        FeatureUpdater.register(SettingData.autoplay.id, update);
        FeatureUpdater.register(SettingData.autoplayChannelTrailer.id, update);

        return {};

    })();

    const OverrideOnPlayerReady = (() => {

        const listeners = [];
        const onPlayerReadyEventKey = crypto.randomUUID();
        let recentApi = null;

        Object.defineProperty(Object.prototype, "onPlayerReadyEvent_", {
            set(data) {
                this[onPlayerReadyEventKey] = data;
            },
            get() {

                const original = this[onPlayerReadyEventKey];

                if (original.constructor === Boolean) {
                    return original
                }

                return function (api) {
                    recentApi = api;
                    listeners?.forEach(listener => listener?.(api));
                    return original?.apply(this, arguments);
                }
            }
        });

        function addListener(listener) {

            if (recentApi) {
                listener(recentApi)
            }

            listeners.push(listener)

        }

        return {
            onReadyListener: listener => addListener(listener)
        };

    })();

    const OverrideSetInternalSize = (() => {

        const setInternalSizeKey = crypto.randomUUID();

        Object.defineProperty(Object.prototype, "setInternalSize", {
            set(data) {
                this[setInternalSizeKey] = data;
            },
            get() {
                const original = this[setInternalSizeKey];
                if (original?.toString()?.startsWith("function(a)")) {
                    return function (size) {
                        if (iridiumSettings.alwaysVisible && Object.hasOwn(size, "width") && Object.hasOwn(size, "height")) {
                            arguments[0].width = NaN;
                            arguments[0].height = NaN;
                        }
                        return original?.apply(this, arguments);
                    }
                } else {
                    return original;
                }
            }
        });

        return {};

    })();

    // end overrides

    // ini features

    const FeatureFullTitles = (() => {

        const update = () => {
            if (iridiumSettings.fullTitles) {
                document.documentElement.classList.add("iridium-full-titles");
            } else {
                document.documentElement.classList.remove("iridium-full-titles");
            }
        };

        FeatureUpdater.register(SettingData.fullTitles.id, update);

        return {
            update: update
        };

    })();

    const FeatureTheme = (() => {

        const update = () => {
            switch (iridiumSettings.theme) {
                case "deviceTheme":
                    document.querySelector("ytd-app")?.["handleSignalActionToggleDarkThemeDevice"]?.();
                    break;
                case "darkTheme":
                    document.querySelector("ytd-app")?.["handleSignalActionToggleDarkThemeOn"]?.();
                    break;
                case "lightTheme":
                    document.querySelector("ytd-app")?.["handleSignalActionToggleDarkThemeOff"]?.();
                    break;
            }
        };

        FeatureUpdater.register(SettingData.theme.id, update);

        return {
            update: update
        };

    })();

    const FeatureSettingsButton = (() => {

        const listener = data => {

            if (!iridiumSettings.extensionButton) {
                return
            }

            const topBarButtons = data?.["topbar"]?.["desktopTopbarRenderer"]?.["topbarButtons"];

            if (!topBarButtons) {
                return;
            }

            let alreadySet;

            topBarButtons.forEach(function (value) {
                if (value.hasOwnProperty("topbarMenuButtonRenderer")
                    && value.topbarMenuButtonRenderer.icon
                    && value.topbarMenuButtonRenderer.icon.iconType === "IRIDIUM_LOGO"
                ) {
                    return alreadySet = true;
                }
            });

            if (alreadySet) {
                return;
            }

            topBarButtons.unshift({
                topbarMenuButtonRenderer: {
                    icon: {iconType: "IRIDIUM_LOGO"},
                    tooltip: "Iridium",
                    style: "IRIDIUM_OPTIONS",
                    isDisabled: false,
                }
            });

        };

        const onDocumentClick = event => {

            if (!iridiumSettings.extensionButton) {
                return
            }

            const optionsButton = document.documentElement.querySelector(".iridium-options");
            const buttonClicked = optionsButton === event.target || optionsButton?.contains(event.target);

            if (!buttonClicked) {
                return;
            }

            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }

            Broadcaster.doAction("extensionButton");

        };

        document.documentElement.addEventListener("click", onDocumentClick, false);

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);

        return {};

    })();

    const FeatureDefaultTab = (() => {

        const iniDefaultTab = event => {

            if (iridiumSettings.channelTab === "featured") {
                return
            }

            let link = event.target;

            while (link && (link?.tagName !== "A")) {
                link = link.parentNode;
            }

            if (!link) {
                return;
            }

            const browseEndpoint = link?.["data"]?.["browseEndpoint"];
            const metadata = link?.["data"]?.["commandMetadata"]?.["webCommandMetadata"];

            if (!browseEndpoint || metadata["webPageType"] !== "WEB_PAGE_TYPE_CHANNEL") {
                return;
            }

            let param = "";

            switch (iridiumSettings.channelTab) {
                case "featured":
                    param = "EghmZWF0dXJlZPIGBAoCMgA%3D";
                    break;
                case "videos":
                    param = "EgZ2aWRlb3PyBgQKAjoA";
                    break;
                case "shorts":
                    param = "EgZzaG9ydHPyBgUKA5oBAA%3D%3D";
                    break;
                case "streams":
                    param = "EgdzdHJlYW1z8gYECgJ6AA%3D%3D";
                    break;
                case "podcasts":
                    param = "Eghwb2RjYXN0c_IGBQoDugEA";
                    break;
                case "playlists":
                    param = "EglwbGF5bGlzdHPyBgQKAkIA";
                    break;
                case "community":
                    param = "Egljb21tdW5pdHnyBgQKAkoA";
                    break;
                case "channels":
                    param = "EghjaGFubmVscw%3D%3D";
                    break;
                case "store":
                    param = "EgVzdG9yZfIGBAoCGgA%3D";
                    break;
            }

            if (param !== "") {
                browseEndpoint.params = param;
            }

            const url = browseEndpoint["canonicalBaseUrl"]
                || (browseEndpoint["browseId"] ? `/channel/${browseEndpoint["browseId"]}` : undefined);

            if (url) {
                metadata.url = link.href = `${url}/${iridiumSettings.channelTab}`;
            }

        };

        const update = () => {
            if (iridiumSettings.channelTab) {
                window.addEventListener("mouseup", iniDefaultTab, true);
            } else {
                window.removeEventListener("mouseup", iniDefaultTab, true);
            }
        };

        FeatureUpdater.register(SettingData.channelTab.id, update);

        return {
            update: update
        };

    })();

    const FeatureLogoSubscriptions = (() => {

        const iniLogoShortcut = event => {

            let link = event.target;

            while (link && (link?.tagName !== "A" || link?.id !== "logo")) {
                link = link.parentNode;
            }

            if (!link) {
                return;
            }

            const browseEndpoint = link?.["data"]?.["browseEndpoint"];
            const metadata = link?.["data"]?.["commandMetadata"]?.["webCommandMetadata"];

            if (browseEndpoint && metadata) {
                browseEndpoint.browseId = "FEsubscriptions";
                metadata.url = "/feed/subscriptions";
            }

        };

        const update = () => {
            if (iridiumSettings.logoSubscriptions) {
                window.addEventListener("mouseup", iniLogoShortcut, true);
            } else {
                window.removeEventListener("mouseup", iniLogoShortcut, true);
            }
        };

        FeatureUpdater.register(SettingData.logoSubscriptions.id, update);

        return {
            update: update
        };

    })();

    const FeaturePlaylistReverse = (() => {

        const buttonId = "reversePlaylistButton";

        const reversePlaylist = data => {

            if (!data) {
                return;
            }

            const watchNextResults = data?.["contents"]?.["twoColumnWatchNextResults"];
            const playlist = watchNextResults?.["playlist"]?.["playlist"];

            if (!!playlist?.["isReversed"] === iridiumSettings.reversePlaylistToggled) {
                return;
            }

            if (playlist) {
                playlist["isReversed"] = iridiumSettings.reversePlaylistToggled;
            }

            const topLevelButtons = playlist?.["playlistButtons"]?.["menuRenderer"]?.["topLevelButtons"];

            if (topLevelButtons?.constructor === Array) {

                const length = topLevelButtons.length;

                for (let i = 0; i < length; i++) {

                    const button = topLevelButtons[i]?.["toggleButtonRenderer"];

                    if (button?.id === "reversePlaylist") {
                        button.isToggled = iridiumSettings.reversePlaylistToggled;
                        break;
                    }

                }

            }

            const autoplay = watchNextResults?.["autoplay"]?.["autoplay"];
            const autoplaySets = autoplay?.["sets"];

            if (autoplaySets?.constructor === Array) {

                for (let i = 0; i < autoplaySets.length; i++) {

                    const item = autoplaySets[i];

                    if (!item) {
                        continue;
                    }

                    if (item["previousButtonVideo"] && item["nextButtonVideo"]) {
                        item["autoplayVideo"] = item["previousButtonVideo"];
                        item["previousButtonVideo"] = item["nextButtonVideo"];
                        item["nextButtonVideo"] = item["autoplayVideo"];
                    }

                }

            }

            const contents = playlist?.["contents"];

            if (contents?.constructor === Array) {

                contents.reverse();

                const count = contents.length;

                for (let i = 0; i < count; i++) {

                    const item = contents[i];

                    if (item?.["playlistPanelVideoRenderer"]?.["indexText"]?.["simpleText"]) {
                        item["playlistPanelVideoRenderer"]["indexText"]["simpleText"] = `${i + 1}`;
                    }

                }

                if (playlist?.["currentIndex"]?.constructor === Number) {
                    playlist["currentIndex"] = contents.length - playlist["currentIndex"] - 1;
                }

                if (playlist?.["localCurrentIndex"]?.constructor === Number) {
                    playlist["localCurrentIndex"] = contents.length - playlist["localCurrentIndex"] - 1;
                }

            }

        }

        const listener = data => {

            const topLevelButtons = data
                ?.["contents"]
                ?.["twoColumnWatchNextResults"]
                ?.["playlist"]
                ?.["playlist"]
                ?.["playlistButtons"]
                ?.["menuRenderer"]
                ?.["topLevelButtons"];

            if (topLevelButtons?.constructor !== Array) {
                return;
            }

            const length = topLevelButtons.length;

            for (let i = 0; i < length; i++) {

                if (topLevelButtons[i]?.["toggleButtonRenderer"]?.id === "reversePlaylist") {

                    if (iridiumSettings.reversePlaylist !== true) {
                        topLevelButtons.splice(i, 1);
                    }

                    break;

                }

                if (i === length - 1 && iridiumSettings.reversePlaylist === true) {
                    topLevelButtons.push({
                        toggleButtonRenderer: {
                            id: "reversePlaylist",
                            style: {styleType: "STYLE_GREY_TEXT"},
                            size: {sizeType: "SIZE_DEFAULT"},
                            isToggled: iridiumSettings.reversePlaylistToggled,
                            isDisabled: false,
                            defaultIcon: {iconType: "IRIDIUM_PLAYLIST_SHUFFLE"},
                            accessibility: {label: "reversePlaylistButton"},
                            defaultTooltip: "Reverse playlist",
                            toggledTooltip: "Reverse playlist",
                            toggledStyle: {styleType: "STYLE_DEFAULT_ACTIVE"}
                        }
                    });
                }

            }

            reversePlaylist(data);

        };

        const updateUI = data => {

            if (!data) {
                return;
            }

            const ytPlaylistManager = document.querySelector("yt-playlist-manager");

            if (!ytPlaylistManager) {
                return;
            }

            const watchNextResults = data?.["contents"]?.["twoColumnWatchNextResults"];
            const autoplay = watchNextResults?.["autoplay"]?.["autoplay"];
            const playlist = structuredClone(watchNextResults?.["playlist"]?.["playlist"]);

            ytPlaylistManager?.["setAutoplayRenderer"]?.(autoplay);
            ytPlaylistManager?.["setPlaylistData"]?.(playlist);
            ytPlaylistManager?.["setPlayerPlaybackControlData"]?.({playlistPanelRenderer: playlist});

        };

        const onDocumentClick = event => {

            const ytdWatchData = document.querySelector("ytd-watch-flexy")?.["data"];
            const reverseButton = document.querySelector(`ytd-toggle-button-renderer:has([aria-label='${buttonId}'])`);
            const isReverseButton = reverseButton?.contains(event.target);

            if (isReverseButton && ytdWatchData) {

                iridiumSettings.reversePlaylistToggled = !iridiumSettings.reversePlaylistToggled;
                Broadcaster.saveSetting(SettingData.reversePlaylistToggled.id);

                reversePlaylist(ytdWatchData);
                updateUI(ytdWatchData);

                document.querySelector("ytd-playlist-panel-video-renderer[selected]")?.scrollIntoView({block: "nearest"});

            }

        };

        const update = () => {

            const ytdWatchData = document.querySelector("ytd-watch-flexy")?.["data"];

            if (iridiumSettings.reversePlaylist) {

                document.documentElement.addEventListener("click", onDocumentClick, false);

                if (ytdWatchData) {
                    listener(ytdWatchData);
                    updateUI(ytdWatchData);
                }

            } else {

                iridiumSettings.reversePlaylistToggled = false;
                Broadcaster.saveSetting(SettingData.reversePlaylistToggled.id);

                if (ytdWatchData) {
                    listener(ytdWatchData);
                    updateUI(ytdWatchData);
                    document.querySelector("ytd-playlist-panel-video-renderer[selected]")?.scrollIntoView({block: "nearest"});
                }

                document.documentElement.removeEventListener("click", onDocumentClick, false);

            }

        };

        FeatureUpdater.register(SettingData.reversePlaylist.id, update);

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {}

    })();

    const FeatureSuperTheater = (() => {

        const onResize = () => {

            const ytdApp = document.querySelector("ytd-app");

            if (iridiumSettings.superTheater
                && ytdApp?.["fullscreen"] !== true
                && ytdApp?.["isWatchPage"] === true
                && ytdApp?.["isTheaterMode"]?.() === true
                && document.getElementById("chat")?.["isHiddenByUser"] !== true
            ) {

                const chat = document.getElementById("chat-container");

                if (chat && !chat.firstElementChild.hasAttribute("collapsed")) {

                    const videoContainer = document.getElementById("player-full-bleed-container");

                    if (videoContainer && !videoContainer.contains(chat)) {
                        videoContainer.appendChild(chat);
                    }

                }

                const masthead = document.getElementById("masthead-container");
                const moviePlayerParent = document.getElementById("movie_player")?.parentElement;

                if (masthead && moviePlayerParent?.offsetWidth > 0) {

                    const width = `${moviePlayerParent.offsetWidth}px`;

                    if (masthead.style.width !== width) {
                        masthead.style.width = width;
                    }

                }

            } else {

                const masthead = document.getElementById("masthead-container");
                const moviePlayerParent = document.getElementById("movie_player")?.parentElement;

                if (masthead) {
                    masthead.style.width = "";
                }

                const chat = document.getElementById("chat-container");

                if (chat && document.getElementById("full-bleed-container")) {

                    const sidebar = document.getElementById("secondary-inner");

                    if (sidebar && !sidebar.contains(chat)) {

                        const donationShelf = document.getElementById("donation-shelf");

                        if (donationShelf && sidebar === donationShelf.parentElement) {
                            sidebar.insertBefore(chat, donationShelf);
                        } else {
                            sidebar.prepend(chat);
                        }

                    }

                }

            }

        };

        const onYTAction = event => {
            if (iridiumSettings.superTheater && event?.detail?.["actionName"] === "yt-set-live-chat-collapsed") {
                window.dispatchEvent(new CustomEvent("resize"));
            }
        };

        const created = api => {
            api.addEventListener("resize", onResize, false);
            document.documentElement.addEventListener("yt-action", onYTAction, false);
        };

        const update = () => {

            if (iridiumSettings.superTheater) {
                document.documentElement.setAttribute("super-theater", "");
            } else {
                document.documentElement.removeAttribute("super-theater");
            }

            window.dispatchEvent(new CustomEvent("resize"));

        };

        FeatureUpdater.register(SettingData.superTheater.id, update);

        OverrideOnPlayerReady.onReadyListener(created);

        return {};

    })();

    const FeatureSuperTheaterScrollbar = (() => {

        const update = () => {
            if (iridiumSettings.superTheaterScrollbar) {
                document.documentElement.removeAttribute("super-theater-scrollbar");
            } else {
                document.documentElement.setAttribute("super-theater-scrollbar", "");
            }
        }

        FeatureUpdater.register(SettingData.superTheaterScrollbar.id, update);

        return {};

    })();

    const FeatureAlwaysVisible = (() => {

        let moviePlayer = null;
        let maxX = null;
        let maxY = null;
        let pos = {x1: 0, x2: 0, y1: 0, y2: 0}

        const offset = 10;

        const isPlayer = target => target.id === "movie_player" || document.getElementById("movie_player")?.contains(target);

        const isAlwaysVisible = () => document.documentElement.hasAttribute("always-visible-player");

        const updatePosition = () => {

            if (!iridiumSettings.alwaysVisible || !isAlwaysVisible() || !moviePlayer) {
                return;
            }

            const newX = iridiumSettings.alwaysVisiblePosition.x ??= offset;
            const newY = iridiumSettings.alwaysVisiblePosition.y ??= offset;
            const snapRight = iridiumSettings.alwaysVisiblePosition.snapRight ??= true;
            const snapBottom = iridiumSettings.alwaysVisiblePosition.snapBottom ??= true;

            if (newX < offset) {
                moviePlayer.style.left = `${offset}px`;
                moviePlayer.style.right = "unset";
            } else if (snapRight || newX > maxX) {
                moviePlayer.style.left = "unset";
                moviePlayer.style.right = `${offset}px`;
            } else {
                moviePlayer.style.left = `${newX}px`;
                moviePlayer.style.right = "unset";
            }

            if (newY < offset) {
                moviePlayer.style.top = `${offset}px`;
                moviePlayer.style.bottom = "unset";
            } else if (snapBottom || newY > maxY) {
                moviePlayer.style.top = "unset";
                moviePlayer.style.bottom = `${offset}px`;
            } else {
                moviePlayer.style.top = `${newY}px`;
                moviePlayer.style.bottom = "unset";
            }

        };

        const onMouseMove = event => {

            if (document.fullscreenElement || !moviePlayer) {
                return false;
            }

            pos.x1 = pos.x2 - event.clientX;
            pos.y1 = pos.y2 - event.clientY;

            const newX = moviePlayer.offsetLeft - pos.x1;
            const newY = moviePlayer.offsetTop - pos.y1;

            if (newX > offset && newX < maxX) {
                pos.x2 = event.clientX;
                iridiumSettings.alwaysVisiblePosition.x = newX;
                iridiumSettings.alwaysVisiblePosition.snapRight = false;
            }

            if (newY > offset && newY < maxY) {
                pos.y2 = event.clientY;
                iridiumSettings.alwaysVisiblePosition.y = newY;
                iridiumSettings.alwaysVisiblePosition.snapBottom = false;
            }

            iridiumSettings.alwaysVisiblePosition.snapRight = newX >= maxX;
            iridiumSettings.alwaysVisiblePosition.snapBottom = newY >= maxY;

            updatePosition()

            event.preventDefault();
            event.stopPropagation();

            return true;

        };

        const onMouseDown = event => {

            if (document.fullscreenElement || event.buttons !== 2 || !isPlayer(event.target)) {
                return true;
            }

            document.documentElement.setAttribute("moving", "");

            pos.x2 = event.clientX;
            pos.y2 = event.clientY;

            maxX = document.documentElement.clientWidth - moviePlayer.offsetWidth - offset;
            maxY = document.documentElement.clientHeight - moviePlayer.offsetHeight - offset;

            const onMouseUp = function () {
                document.documentElement.removeAttribute("moving");
                window.removeEventListener("mouseup", onMouseUp, true);
                window.removeEventListener("mousemove", onMouseMove, true);
                Broadcaster.saveSetting(SettingData.alwaysVisiblePosition.id);
            };

            window.addEventListener("mousemove", onMouseMove, true);
            window.addEventListener("mouseup", onMouseUp, true);

            event.preventDefault();
            event.stopPropagation();

            return true;

        };

        const onContextMenu = function (event) {

            if (document.fullscreenElement || !isAlwaysVisible() || !isPlayer(event.target)) {
                return false;
            }

            event.preventDefault();
            event.stopPropagation();

            return true;

        };

        const preventScrollTop = (() => {

            let original = null;

            const override = () => {

                const watchFlexy = document.querySelector("ytd-watch-flexy");

                if (watchFlexy) {
                    original = watchFlexy.setScrollTop;
                    watchFlexy.setScrollTop = () => {
                    };
                }

            };

            const restore = () => {

                const watchFlexy = document.querySelector("ytd-watch-flexy");

                if (watchFlexy) {
                    watchFlexy.setScrollTop = original;
                    original = null;
                }

            };

            return {
                override: override,
                restore: restore
            }

        })();

        const updateState = event => {

            moviePlayer ??= document.getElementById("movie_player");

            const parentRects = moviePlayer?.parentElement?.getBoundingClientRect();

            if (!parentRects) {
                return;
            }

            maxX = document.documentElement.clientWidth - moviePlayer.offsetWidth - offset;
            maxY = document.documentElement.clientHeight - moviePlayer.offsetHeight - offset;

            if (event?.type === "resize") {
                updatePosition();
            }

            if (iridiumSettings.alwaysVisible
                && !document.fullscreenElement
                && Util.isWatchPage()
                && parentRects.bottom < parentRects.height * .5
            ) {
                if (!isAlwaysVisible()) {
                    preventScrollTop.override();
                    document.documentElement.setAttribute("always-visible-player", "");
                    window.addEventListener("mousedown", onMouseDown, true);
                    window.addEventListener("contextmenu", onContextMenu, true);
                    updatePosition();
                    window.dispatchEvent(new CustomEvent("resize"));
                }
            } else if (isAlwaysVisible()) {
                preventScrollTop.restore();
                document.documentElement.removeAttribute("always-visible-player");
                window.removeEventListener("mousedown", onMouseDown, true);
                window.removeEventListener("contextmenu", onContextMenu, true);
                moviePlayer.removeAttribute("style");
                window.dispatchEvent(new CustomEvent("resize"));
            }

        };

        const update = () => {

            if (iridiumSettings.alwaysVisible) {
                window.addEventListener("yt-navigate-finish", updateState, false);
                window.addEventListener("scroll", updateState, false);
                window.addEventListener("resize", updateState, false);
            } else {
                window.removeEventListener("yt-navigate-finish", updateState, false);
                window.removeEventListener("scroll", updateState, false);
                window.removeEventListener("resize", updateState, false);
            }

            updateState();

        };

        FeatureUpdater.register(SettingData.alwaysVisible.id, update);

        return {};

    })();

    const FeaturePlayerTools = (() => {

        const getPlayerTools = () => {

            const titleSection = document.querySelector("#below ytd-watch-metadata #title")
                || document.querySelector("#bottom-grid");

            if (!titleSection) {
                return null;
            }

            let playerTools = document.getElementById("iridium-player-tools");

            if (!playerTools) {
                playerTools = document.createElement("div");
                playerTools.id = "iridium-player-tools";
                titleSection.prepend(playerTools);
                titleSection.style.position = "relative";
            } else {
                playerTools.replaceChildren();
            }

            return playerTools;

        };

        const checkPlayerToolsSpacing = playerTools => {

            if (!playerTools) {

                playerTools = document.getElementById("iridium-player-tools");

                if (!playerTools || playerTools.childElementCount === 0) {
                    playerTools?.remove();
                    return;
                }

            }

            const titleSection = document.querySelector("#below ytd-watch-metadata #title");

            if (titleSection) {
                titleSection.style.paddingRight = (playerTools.offsetWidth || 0) + "px";
            }

        };

        const update = () => {

            const playerTools = getPlayerTools();

            if (!playerTools) {
                return;
            }

            FeatureAutoplayShortcut.check(playerTools);
            FeatureVideoFocus.check(playerTools);
            FeatureScreenshot.update(playerTools);
            FeatureThumbnail.update(playerTools);
            FeatureMonetizationInfo.update(playerTools);

            checkPlayerToolsSpacing(playerTools);

        };

        OnPageDataChanged.addListener(update);

        FeatureUpdater.register(SettingData.videoFocusToggle.id, update);
        FeatureUpdater.register(SettingData.videoScreenshot.id, update);
        FeatureUpdater.register(SettingData.videoThumbnail.id, update);
        FeatureUpdater.register(SettingData.monetizationInfo.id, update);

        return {};

    })();

    const FeatureVideoFocus = (() => {

        const onCreated = api => {
            api.addEventListener("onStateChange", state => {
                if (iridiumSettings.videoFocus) {
                    switch (state) {
                        case 1:
                        case 3:
                            document.documentElement.setAttribute("dim", "");
                            break;
                        default:
                            document.documentElement.removeAttribute("dim");
                    }
                }
            });
        };

        const update = () => {
            if (iridiumSettings.videoFocus) {
                document.getElementById("iridium-video-focus")?.setAttribute("iridium-enabled", "");
                switch (document.getElementById("movie_player")?.["getPlayerState"]?.()) {
                    case 1:
                    case 3:
                        document.documentElement.setAttribute("dim", "");
                        break;
                }
            } else {
                document.getElementById("iridium-video-focus")?.removeAttribute("iridium-enabled");
                document.documentElement.removeAttribute("dim");
            }
        };

        const check = playerTools => {

            if (!iridiumSettings.videoFocusToggle) {
                document.getElementById("iridium-focus")?.remove();
            } else {

                let videoFocusButton = document.getElementById("iridium-focus");

                if (!videoFocusButton) {

                    videoFocusButton = document.createElement("div");
                    videoFocusButton.id = "iridium-focus";
                    videoFocusButton.title = "Video focus";
                    videoFocusButton.appendChild(
                        j2d.makeSVG("svg", {id: "iridium-video-focus", "iridium-enabled": "", viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                            j2d.makeSVG("path", {
                                id: "iridium-on",
                                d: "M112.857-378Q104-378 97.5-384.643t-6.5-15.5Q91-409 97.643-415.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160Q104-538 97.5-544.643t-6.5-15.5Q91-569 97.643-575.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM235-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm164.299 343.846q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM397-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM396.857-92Q388-92 381.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164.442 483.692q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM561-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM560.857-92Q552-92 545.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM725-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM846.857-378q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Z"
                            }),
                            j2d.makeSVG("path", {id: "iridium-off", d: "M798.923-96.23 95.231-798.924q-10.616-10.615-11-23.269-.385-12.654 11-24.039 11.384-11.384 23.654-11.384 12.269 0 23.654 11.384l703.692 703.692q10.615 10.616 11 22.77.384 12.154-11 23.538-11.385 11.385-23.654 11.385-12.27 0-23.654-11.385ZM396.857-92Q388-92 381.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164 0Q552-92 545.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM235-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm162 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm164 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM399-342.308q-22.846 0-40.269-17.423T341.308-400q0-22.846 17.423-40.269T399-457.692q22.846 0 40.269 17.423T456.692-400q0 22.846-17.423 40.269T399-342.308Zm-164-17.846q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm507.154-.231-56.769-56.769q6.076-10.384 15.884-16.538t23.943-6.154q16.295 0 27.964 11.67 11.67 11.669 11.67 27.964 0 14.135-6.154 23.943-6.154 9.808-16.538 15.884ZM112.857-378Q104-378 97.5-384.643t-6.5-15.5Q91-409 97.643-415.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm734 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM591.231-510.538l-81.693-81.693q8.231-12.952 22.423-20.207 14.193-7.254 29.416-7.254 22.469 0 39.892 17.423 17.423 17.423 17.423 39.892 0 15.223-7.038 29.031-7.039 13.808-20.423 22.808ZM235-522.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm490 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM112.857-538Q104-538 97.5-544.643t-6.5-15.5Q91-569 97.643-575.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm734 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM561-686.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm-146.615-1.231-56-56q5.307-9.384 15.109-15.923 9.803-6.538 23.506-6.538 16.385 0 28.115 11.67 11.731 11.669 11.731 27.964 0 14.135-6.538 23.827-6.539 9.693-15.923 15ZM725-686.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM396.857-826q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Z"})
                        ])
                    );

                    playerTools?.appendChild(videoFocusButton);

                }

                if (videoFocusButton) {

                    update();

                    videoFocusButton.onclick = () => {
                        iridiumSettings.videoFocus = !iridiumSettings.videoFocus;
                        Broadcaster.saveSetting(SettingData.videoFocus.id);
                        update();
                    };

                }

            }

        };

        FeatureUpdater.register(SettingData.videoFocusToggle.id, update);
        FeatureUpdater.register(SettingData.videoFocus.id, update);

        OverrideOnPlayerReady.onReadyListener(onCreated);

        return {
            check: check
        };

    })();

    const FeatureScreenshot = (() => {

        const update = playerTools => {

            if (!iridiumSettings.videoScreenshot) {
                document.getElementById("iridium-screenshot")?.remove();
            } else if (playerTools) {

                let screenshotButton = document.getElementById("iridium-screenshot");

                if (!screenshotButton) {

                    screenshotButton = document.createElement("div");
                    screenshotButton.id = "iridium-screenshot";
                    screenshotButton.title = "Screenshot";
                    screenshotButton.appendChild(
                        j2d.makeSVG("svg", {viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                            j2d.makeSVG("path", {d: "M686.308-395.692h-61.616q-12.615 0-21.654 9.038Q594-377.615 594-365t9.038 21.654q9.039 9.038 21.654 9.038h77.693q18.923 0 32.115-13.192 13.192-13.192 13.192-32.115v-77.693q0-12.615-9.038-21.654Q729.615-488 717-488t-21.654 9.038q-9.038 9.039-9.038 21.654v61.616ZM273.692-652.308h61.616q12.615 0 21.654-9.038Q366-670.385 366-683t-9.038-21.654q-9.039-9.038-21.654-9.038h-77.693q-18.923 0-32.115 13.192-13.192 13.192-13.192 32.115v77.693q0 12.615 9.038 21.654Q230.385-560 243-560t21.654-9.038q9.038-9.039 9.038-21.654v-61.616ZM184.615-216q-38.34 0-64.478-26.137Q94-268.275 94-306.615v-434.77q0-38.34 26.137-64.478Q146.275-832 184.615-832h590.77q38.34 0 64.478 26.137Q866-779.725 866-741.385v434.77q0 38.34-26.137 64.478Q813.725-216 775.385-216H628v42.693q0 18.923-13.192 32.115Q601.616-128 582.693-128H377.307q-18.923 0-32.115-13.192Q332-154.384 332-173.307V-216H184.615Zm0-66h590.77q9.23 0 16.923-7.692Q800-297.385 800-306.615v-434.77q0-9.23-7.692-16.923Q784.615-766 775.385-766h-590.77q-9.23 0-16.923 7.692Q160-750.615 160-741.385v434.77q0 9.23 7.692 16.923Q175.385-282 184.615-282ZM160-282v-484 484Z"})
                        ])
                    );

                    playerTools.appendChild(screenshotButton);

                }

                if (screenshotButton) {

                    screenshotButton.onclick = function () {

                        const video = document.querySelector("video");

                        if (!video || !video.src) {
                            return;
                        }

                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        const aspectRatio = video.videoWidth / video.videoHeight;
                        const canvasWidth = video.videoWidth;
                        const canvasHeight = parseInt(`${canvasWidth / aspectRatio}`, 10);

                        canvas.width = canvasWidth;
                        canvas.height = canvasHeight;
                        context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
                        canvas.toBlob(blob => window.open(URL.createObjectURL(blob)));

                    };

                }

            }

        };

        return {
            update: update
        };

    })();

    const FeatureThumbnail = (() => {

        const update = playerTools => {

            if (!iridiumSettings.videoThumbnail) {
                document.getElementById("iridium-thumbnail")?.remove();
            } else {

                let thumbnailButton = document.getElementById("iridium-thumbnail");

                if (!thumbnailButton) {

                    thumbnailButton = document.createElement("div");
                    thumbnailButton.id = "iridium-thumbnail";
                    thumbnailButton.title = "Thumbnail";
                    thumbnailButton.appendChild(
                        j2d.makeSVG("svg", {viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                            j2d.makeSVG("path", {d: "M224.615-134q-38.34 0-64.478-26.137Q134-186.275 134-224.615v-510.77q0-38.34 26.137-64.478Q186.275-826 224.615-826h510.77q38.34 0 64.478 26.137Q826-773.725 826-735.385v510.77q0 38.34-26.137 64.478Q773.725-134 735.385-134h-510.77Zm0-66h510.77q9.23 0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760h-510.77q-9.23 0-16.923 7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM200-200v-560 560Zm127.307-84h311.539q14.693 0 20.154-12.192 5.462-12.193-2.23-23.654L573-433.385q-7.231-9.461-17.923-8.961-10.692.5-17.923 9.961l-88.692 111.923-54.077-64q-7.077-8.692-17.462-8.692t-17.615 9.461l-49.154 63.847q-8.462 11.461-3 23.654Q312.615-284 327.307-284ZM340-567q21.955 0 37.478-15.522Q393-598.045 393-620q0-21.955-15.522-37.478Q361.955-673 340-673q-21.955 0-37.478 15.522Q287-641.955 287-620q0 21.955 15.522 37.478Q318.045-567 340-567Z"})
                        ])
                    );

                    playerTools?.appendChild(thumbnailButton);

                }

                if (thumbnailButton) {

                    thumbnailButton.onclick = function () {

                        const playerResponse = document.querySelector("ytd-app")?.["data"]?.["playerResponse"];
                        const thumbnails = Util.getSingleObjectByKey(playerResponse, "thumbnails");

                        if (thumbnails) {

                            let maxRes = null;

                            for (let thumbnailsKey in thumbnails) {

                                const thumbnail = thumbnails[thumbnailsKey];

                                if (maxRes === null || thumbnail?.["width"] > maxRes?.["width"]) {
                                    maxRes = thumbnail;
                                }

                            }

                            if (maxRes?.["url"]) {
                                window.open(maxRes["url"]);
                            }

                        }

                    };

                }

            }

        };

        return {
            update: update
        };

    })();

    const FeatureMonetizationInfo = (() => {

        const monetizationKey = crypto.randomUUID();

        const getData = data => {
            if (data.constructor === Object) {
                if (data["videoDetails"]) {
                    return data;
                } else {
                    return Util.getSingleObjectByKey(data, "raw_player_response");
                }
            } else {
                return document.querySelector("ytd-page-manager")?.["getCurrentData"]?.()?.["playerResponse"];
            }
        };

        const update = data => {

            if (!iridiumSettings.monetizationInfo) {
                document.getElementById("iridium-monetization")?.remove();
            } else {

                const playerResponse = getData(data);

                if (!playerResponse) {
                    return;
                }

                const videoId = playerResponse["videoDetails"]?.["videoId"];
                const stored = playerResponse[monetizationKey] ??= {
                    id: "",
                    sponsored: false,
                    adCount: 0,
                };

                if (stored.id !== videoId) {
                    stored.id = videoId;
                    stored.sponsored = playerResponse["paidContentOverlay"];
                    stored.adCount = playerResponse["adPlacements"]?.length || 0;
                }

                const playerTools = data instanceof HTMLElement ? data : null;

                let monetizationButton = document.getElementById("iridium-monetization");

                if (!monetizationButton && playerTools) {

                    monetizationButton = j2d.make("div", {id: "iridium-monetization", title: "Monetization state"}, [
                        j2d.makeSVG("svg", {viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                            j2d.makeSVG("path", {class: "iridium-on", d: "M324-370q14 48 43.5 77.5T444-252v17q0 14 10.5 24.5T479-200q14 0 24.5-10.5T514-235v-15q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-15q0-14-10.5-24.5T481-760q-14 0-24.5 10.5T446-725v15q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"}),
                            j2d.makeSVG("path", {class: "iridium-off", d: "M328-364.769q15.077 47.077 45.808 74.538 30.73 27.462 75.577 37.923V-231q0 12.846 8.384 21.231 8.385 8.384 21.231 8.384 12.846 0 21.231-8.384 8.384-8.385 8.384-21.231v-19.308q49.077-8.615 86.539-36.923 37.461-28.307 37.461-88.769 0-44-24.538-76.615-24.538-32.616-98.538-58.616-65.154-23.077-86.039-38.615-20.885-15.539-20.885-44.154 0-27.615 21.385-45.5t58-17.885q31.462 0 50.269 15.462 18.808 15.462 29.423 37.923l54.77-21.692q-12.077-32.846-40.77-57.308-28.692-24.462-65.077-26.692V-729q0-12.846-8.384-21.231-8.385-8.384-21.231-8.384-12.846 0-21.231 8.384-8.384 8.385-8.384 21.231v19.308q-52.308 9.692-80.154 42.5-27.846 32.807-27.846 73.192 0 46.154 28.115 75.077Q399.615-490 462-467.692q64.538 23.769 88.731 41.923 24.192 18.154 24.192 49.769 0 38.231-27.308 54.808-27.307 16.577-61.23 16.577-34.923 0-62.231-20.616-27.308-20.615-40.923-60.769L328-364.769Zm152.134 276.77q-81.673 0-152.91-30.84t-124.365-83.922q-53.127-53.082-83.993-124.257Q88-398.194 88-479.866q0-81.673 30.839-153.41 30.84-71.737 83.922-124.865 53.082-53.127 124.257-83.493Q398.194-872 479.866-872q81.673 0 153.41 30.339 71.737 30.34 124.865 83.422 53.127 53.082 83.493 124.757Q872-561.806 872-480.134q0 81.673-30.339 152.91-30.34 71.237-83.422 124.365-53.082 53.127-124.757 83.993Q561.806-88 480.134-88ZM480-154q137 0 231.5-94.5T806-480q0-137-94.5-231.5T480-806q-137 0-231.5 94.5T154-480q0 137 94.5 231.5T480-154Zm0-326Z"})
                        ]),
                        j2d.make("div", {id: "iridium-monetization-count"})
                    ]);

                    playerTools.appendChild(monetizationButton);

                }

                if (monetizationButton) {

                    const title = [];

                    if (stored.sponsored) {
                        monetizationButton.classList.add("sponsored");
                        title.push("Sponsored");
                    } else {
                        monetizationButton.classList.remove("sponsored");
                    }

                    if (stored.adCount > 0) {
                        monetizationButton.classList.add("monetized");
                        title.push(`Monetized (${stored.adCount} ads)`);
                        document.getElementById("iridium-monetization-count")?.replaceChildren(document.createTextNode(stored.adCount));
                    } else {
                        monetizationButton.classList.remove("monetized");
                        title.push("Not monetized");
                        document.getElementById("iridium-monetization-count")?.replaceChildren(document.createTextNode(""));
                    }

                    monetizationButton.title = title.join("\n");

                }

            }

        };

        OverrideFetch.onFetchListener(update);
        OverrideHandleResponse.onHandleResponseListener(update);

        return {
            update: update
        };

    })();

    const FeatureAutoplayShortcut = (() => {

        const update = () => {

            const button = document.getElementById("iridium-autoplay-shortcut");

            if (!button) {
                return;
            }

            if (iridiumSettings.autoplay) {
                button.setAttribute("iridium-enabled", "");
                button.title = "Autoplay on";
            } else {
                button.removeAttribute("iridium-enabled");
                button.title = "Autoplay off";
            }

        };

        const check = playerTools => {

            if (!iridiumSettings.autoplayShortcut) {
                document.getElementById("iridium-autoplay-shortcut")?.remove();
            } else if (playerTools) {

                let button = document.getElementById("iridium-autoplay-shortcut");

                if (!button) {

                    button = j2d.make("div", {id: "iridium-autoplay-shortcut", title: "Monetization state", "iridium-enabled": "",}, [
                        j2d.makeSVG("svg", {viewBox: "0 -960 960 960", height: "24", width: "24"}, [
                            j2d.makeSVG("path", {d: "M320-263v-438q0-15 10-24.167 10-9.167 23.333-9.167 4.333 0 8.833 1.167t8.834 3.5L715.667-510q7.667 5.333 11.5 12.333T731-482q0 8.667-3.833 15.667-3.833 6.999-11.5 12.333L371-234.333q-4.334 2.333-8.834 3.5-4.5 1.166-8.833 1.166-13.333 0-23.333-9.166Q320-248 320-263Z"})
                        ])
                    ]);

                    playerTools.appendChild(button);

                }

                if (button) {

                    update();

                    button.onclick = () => {
                        iridiumSettings.autoplay = !iridiumSettings.autoplay;
                        Broadcaster.saveSetting(SettingData.autoplay.id);
                        update();
                    };

                }

            }

        };

        FeatureUpdater.register(SettingData.autoplayShortcut.id, update);

        return {
            check: check
        };

    })();

    const FeatureDefaultQuality = (() => {

        const qualityList = [
            "highres",
            "hd2880",
            "hd2160",
            "hd1440",
            "hd1080",
            "hd720",
            "large",
            "medium",
            "small",
            "tiny",
            "auto",
        ]
        const isValidQuality = quality => qualityList.indexOf(quality) > -1;
        const getClosestAvailableQuality = (quality, availableList) => {

            const qualityIndex = qualityList.indexOf(quality);

            if (qualityIndex === -1 || availableList?.length < 1) {
                return availableList[0] || "auto";
            }

            const total = qualityList.length - 1;
            let top = qualityIndex + 1;
            let bottom = qualityIndex - 1;

            for (let i = 0; i < total; i++) {

                const topIndex = availableList.indexOf(qualityList[top]);
                const bottomIndex = availableList.indexOf(qualityList[bottom]);

                if (topIndex > -1) {
                    return availableList[topIndex];
                }

                if (bottomIndex > -1) {
                    return availableList[bottomIndex];
                }

                top += 1;
                bottom -= 1;

            }

            return availableList[0] || "auto";

        }
        const getAvailableQuality = (quality, availableList) => {

            if (availableList.indexOf(quality) > -1) {
                return quality;
            }

            return getClosestAvailableQuality(quality, availableList);

        }
        const onCreated = api => api.addEventListener("onStateChange", () => {
            if (iridiumSettings.defaultQuality !== "auto" && isValidQuality(iridiumSettings.defaultQuality)) {

                const currentQuality = api?.["getPreferredQuality"]?.();

                if (currentQuality === "auto") {

                    const availableQualityList = api?.["getAvailableQualityLevels"]?.();

                    if (availableQualityList?.length > 0) {

                        const qualitySet = getAvailableQuality(iridiumSettings.defaultQuality, availableQualityList);

                        api?.["setPlaybackQuality"]?.(qualitySet);
                        api?.["setPlaybackQualityRange"]?.(qualitySet);

                    }

                }

            }

        })

        OverrideOnPlayerReady.onReadyListener(onCreated);

        return {};

    })();

    const FeatureDefaultSpeed = (() => {

        const isValidSpeed = speed => [
            "0.25",
            "0.5",
            "0.75",
            "1",
            "1.25",
            "1.5",
            "1.75",
            "2",
            "-1",
        ].indexOf(speed) > -1;
        const getAvailableSpeed = (speed, availableList) => {

            const speedNumber = Number(speed);

            if (availableList.indexOf(speedNumber) > -1) {
                return speedNumber;
            } else {
                return 1;
            }

        };

        let currentId = "";

        const onCreated = api => api.addEventListener("onStateChange", () => {
            if (iridiumSettings.defaultSpeed !== "-1" && isValidSpeed(iridiumSettings.defaultSpeed)) {

                const videoId = api?.["getVideoData"]?.()?.["video_id"] || "";
                const currentSpeed = api?.["getPlaybackRate"]?.()?.toString();

                if (iridiumSettings.defaultSpeed !== currentSpeed && currentId !== videoId) {

                    const availableSpeedList = api?.["getAvailablePlaybackRates"]?.();

                    if (availableSpeedList?.length > 0) {

                        currentId = videoId;

                        const speedSet = getAvailableSpeed(iridiumSettings.defaultSpeed, availableSpeedList);

                        api?.["setPlaybackRate"]?.(speedSet);

                    }

                }

            }
        });

        OverrideOnPlayerReady.onReadyListener(onCreated);

        return {};

    })();

    const FeatureAnnotations = (() => {

        const onCreated = api => api.addEventListener("videodatachange", () => {
            if (!iridiumSettings.annotations) {
                api?.["unloadModule"]?.("annotations_module");
            }
        });

        OverrideOnPlayerReady.onReadyListener(onCreated);

        return {};

    })();

    const FeatureAdManager = (() => {

        const isAdAllowed = (isSubscribed, enabled) => {

            // when all ads are opted out
            if (iridiumSettings.adOptOutAll) {
                // ads will be allowed only if:
                // the exception for videos from subscribed channels is enabled
                // and the video belongs to a subscribed channel
                return iridiumSettings.adSubscribed && isSubscribed;
            }

            // ads will be allowed if:
            // the exception for videos from subscribed channels is enabled
            // the video belongs to a subscribed channel
            // and the option is enabled
            if (iridiumSettings.adSubscribed) {
                return isSubscribed && enabled;
            }

            // otherwise the setting itself prevails
            return enabled;

        };

        const checkHomePageAds = itemContainer => {

            for (let i = itemContainer.length - 1; i >= 0; i--) {

                const itemRenderer = itemContainer[i];
                const exists = itemRenderer?.["richItemRenderer"]?.["content"]?.["adSlotRenderer"]
                    || itemRenderer?.["richSectionRenderer"]?.["content"]?.["statementBannerRenderer"]
                    || itemRenderer?.["richSectionRenderer"]?.["content"]?.["brandVideoShelfRenderer"]
                    || itemRenderer?.["richSectionRenderer"]?.["content"]?.["brandVideoSingletonRenderer"];

                if (exists) {
                    itemContainer.splice(i, 1);
                }

            }

        };

        const listener = data => {

            const subscribeButtonRenderer = Util.getSingleObjectByKey(data, "subscribeButtonRenderer");
            const isSubscribed = subscribeButtonRenderer?.["subscribed"] === true;
            const isAdTaggedProductsAllowed = isAdAllowed(isSubscribed, iridiumSettings.adTaggedProducts);

            if (!isAdTaggedProductsAllowed) {

                // player args
                const playerOverlayRenderer = Util.getSingleObjectByKey(data, "playerOverlayRenderer");

                // video tagged products
                if (playerOverlayRenderer?.["productsInVideoOverlayRenderer"]) {
                    delete playerOverlayRenderer["productsInVideoOverlayRenderer"];
                }

            }

            const isAdMastheadAllowed = isAdAllowed(isSubscribed, iridiumSettings.adMasthead);
            const isAdHomeFeedAllowed = isAdAllowed(isSubscribed, iridiumSettings.adHomeFeed);

            if (!isAdMastheadAllowed || !isAdHomeFeedAllowed) {

                // home page ads
                const richGridRenderer = Util.getSingleObjectByKey(data, "richGridRenderer");

                if (!isAdMastheadAllowed) {

                    const exists = richGridRenderer?.["masthead"]?.["bannerPromoRenderer"]
                        || richGridRenderer?.["masthead"]?.["adSlotRenderer"];

                    if (exists) {
                        delete richGridRenderer["masthead"];
                    }

                    const bigYoodle = richGridRenderer?.["bigYoodle"];

                    if (bigYoodle) {
                        delete richGridRenderer?.["bigYoodle"];
                    }

                }

                if (!isAdHomeFeedAllowed) {

                    const itemContainer = richGridRenderer?.["contents"];

                    // home page list ads
                    if (itemContainer?.constructor === Array && itemContainer.length > 0) {
                        checkHomePageAds(itemContainer);
                    }

                    const actions = data?.["onResponseReceivedActions"];

                    // home page list continuation ads
                    if (actions?.constructor === Array && actions.length > 0) {
                        for (let i = actions.length - 1; i >= 0; i--) {

                            const continuationItems = actions[i]?.["appendContinuationItemsAction"]?.["continuationItems"];

                            if (continuationItems?.constructor === Array && continuationItems.length > 0) {
                                checkHomePageAds(continuationItems);
                            }

                        }
                    }

                }

            }

            const isAdSearchFeedAllowed = isAdAllowed(isSubscribed, iridiumSettings.adSearchFeed);

            if (!isAdSearchFeedAllowed) {

                // search results ads
                const sectionListRenderer = Util.getSingleObjectByKey(data, "sectionListRenderer");
                const sectionListRendererContents = sectionListRenderer?.["contents"];

                if (sectionListRendererContents?.constructor === Array && sectionListRendererContents.length > 0) {
                    for (let i = sectionListRendererContents.length - 1; i >= 0; i--) {

                        const itemRenderer = sectionListRendererContents[i];
                        const itemRendererContents = itemRenderer?.["itemSectionRenderer"]?.["contents"];

                        if (itemRendererContents?.constructor === Array && itemRendererContents.length > 0) {

                            for (let j = itemRendererContents.length - 1; j >= 0; j--) {
                                const subItemRender = itemRendererContents[j];
                                if (subItemRender?.["adSlotRenderer"] || subItemRender?.["searchPyvRenderer"]) {
                                    itemRendererContents.splice(j, 1);
                                }
                            }

                            if (itemRendererContents.length === 0) {
                                sectionListRendererContents.splice(i, 1);
                            }

                        }

                    }
                }

            }

            const isAdVideoFeedAllowed = isAdAllowed(isSubscribed, iridiumSettings.adVideoFeed);

            if (!isAdVideoFeedAllowed) {

                // video page sidebar ads
                const secondaryResults = Util.getSingleObjectByKey(data, "secondaryResults")?.["secondaryResults"];
                const results = secondaryResults?.["results"];

                if (results?.constructor === Array && results.length > 0) {
                    for (let i = results.length - 1; i >= 0; i--) {

                        const itemRenderer = results[i];
                        const adSlotRenderer = itemRenderer["adSlotRenderer"];

                        if (adSlotRenderer) {
                            results.splice(i, 1);
                        } else {

                            const itemRendererContents = itemRenderer?.["itemSectionRenderer"]?.["contents"];

                            if (itemRendererContents?.constructor === Array && itemRendererContents.length > 0) {

                                for (let j = itemRendererContents.length - 1; j >= 0; j--) {
                                    const subItemRender = itemRendererContents[j];
                                    if (subItemRender?.["adSlotRenderer"]) {
                                        itemRendererContents.splice(j, 1);
                                    }
                                }

                                if (itemRendererContents.length === 0) {
                                    results.splice(i, 1);
                                }

                            }

                        }

                    }
                }

            }

        };

        const playerConfig = args => {

            const subscribeButtonRenderer = Util.getSingleObjectByKey(args, "subscribeButtonRenderer");
            const isSubscribed = subscribeButtonRenderer?.["subscribed"] === true;
            const isInVideoAdsAllowed = isAdAllowed(isSubscribed, iridiumSettings.adInVideo);

            if (!isInVideoAdsAllowed) {

                const adPlacementsParent = Util.getSingleObjectAndParentByKey(args, "adPlacements");
                const adSlotsParent = Util.getSingleObjectAndParentByKey(args, "adSlots");
                const playerAdsParent = Util.getSingleObjectAndParentByKey(args, "playerAds");

                if (adPlacementsParent?.parent?.["adPlacements"]) {
                    delete adPlacementsParent.parent["adPlacements"];
                }

                if (adSlotsParent?.parent?.["adSlots"]) {
                    delete adSlotsParent.parent["adSlots"];
                }

                if (playerAdsParent?.parent?.["playerAds"]) {
                    delete playerAdsParent.parent["playerAds"];
                }

            }

        };

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);
        OverrideFetch.onFetchListener(playerConfig);
        OverrideHandleResponse.onHandleResponseListener(listener);
        OverrideHandleResponse.onHandleResponseListener(playerConfig);

        return {};

    })();

    const FeatureShorts = (() => {

        const listener = data => {

            if (!iridiumSettings.searchShorts) {

                // search results shorts
                const sectionListRenderer = Util.getSingleObjectByKey(data, "sectionListRenderer");
                const sectionListRendererContents = sectionListRenderer?.["contents"];

                if (sectionListRendererContents) {
                    for (let i = sectionListRendererContents.length - 1; i >= 0; i--) {

                        const itemSectionRenderer = sectionListRendererContents[i]?.["itemSectionRenderer"];
                        const itemSectionRendererContents = itemSectionRenderer?.["contents"];

                        if (itemSectionRendererContents) {
                            for (let j = itemSectionRendererContents.length - 1; j >= 0; j--) {
                                if (itemSectionRendererContents[j]?.["reelShelfRenderer"] || itemSectionRendererContents[j]?.["videoRenderer"]?.["navigationEndpoint"]?.["reelWatchEndpoint"]) {
                                    itemSectionRendererContents.splice(j, 1);
                                } else if (itemSectionRendererContents[j]?.["shelfRenderer"]) {

                                    const shelfRendererItems = itemSectionRendererContents[j]?.["shelfRenderer"]?.["content"]?.["verticalListRenderer"]?.["items"];

                                    if (shelfRendererItems?.constructor === Array && shelfRendererItems.length > 0) {

                                        for (let k = shelfRendererItems.length - 1; k >= 0; k--) {
                                            const reelWatchEndpoint = shelfRendererItems[k]?.["videoRenderer"]?.["navigationEndpoint"]?.["reelWatchEndpoint"];
                                            if (reelWatchEndpoint) {
                                                shelfRendererItems.splice(k, 1);
                                            }
                                        }

                                        if (shelfRendererItems.length === 0) {
                                            itemSectionRendererContents.splice(j, 1);
                                        }

                                    }

                                }
                            }
                        }

                        if (itemSectionRendererContents.length === 0) {
                            sectionListRendererContents.splice(i, 1);
                        }

                    }
                }

            }

            if ((!iridiumSettings.homeShorts && window.location.pathname === "/")
                || (!iridiumSettings.subscriptionsShorts && window.location.pathname === "/feed/subscriptions")
            ) {

                // home page and grid view subscriptions shorts
                const richGridRenderer = Util.getSingleObjectByKey(data, "richGridRenderer");
                const richGridRendererContents = richGridRenderer?.["contents"];

                if (richGridRendererContents?.constructor === Array && richGridRendererContents.length > 0) {
                    for (let i = richGridRendererContents.length - 1; i >= 0; i--) {

                        const richShelfRendererContents = richGridRendererContents[i]?.["richSectionRenderer"]?.["content"]?.["richShelfRenderer"]?.["contents"];

                        if (richShelfRendererContents?.constructor === Array && richShelfRendererContents.length > 0) {

                            for (let j = richShelfRendererContents.length - 1; j >= 0; j--) {

                                const richItemRendererContent = richShelfRendererContents[j]?.["richItemRenderer"]?.["content"];
                                const reelItemRenderer = richItemRendererContent?.["reelItemRenderer"];
                                const shortsLockupViewModel = richItemRendererContent?.["shortsLockupViewModel"];

                                if (reelItemRenderer || shortsLockupViewModel) {
                                    richShelfRendererContents.splice(j, 1);
                                }

                            }

                            if (richShelfRendererContents.length === 0) {
                                richGridRendererContents.splice(i, 1);
                            }

                        }

                    }
                }

                // list view subscriptions shorts
                const sectionListRenderer = Util.getSingleObjectByKey(data, "sectionListRenderer");
                const sectionListRendererContents = sectionListRenderer?.["contents"];

                if (sectionListRendererContents?.constructor === Array && sectionListRendererContents.length > 0) {
                    for (let i = sectionListRendererContents.length - 1; i >= 0; i--) {

                        const itemSectionRendererContents = sectionListRendererContents[i]?.["itemSectionRenderer"]?.["contents"];

                        if (itemSectionRendererContents?.constructor === Array && itemSectionRendererContents.length > 0) {

                            for (let j = itemSectionRendererContents.length - 1; j >= 0; j--) {
                                const reelShelfRenderer = itemSectionRendererContents[j]?.["reelShelfRenderer"];
                                if (reelShelfRenderer) {
                                    itemSectionRendererContents.splice(j, 1);
                                }
                            }

                            if (itemSectionRendererContents.length === 0) {
                                sectionListRendererContents.splice(i, 1);
                            }

                        }

                    }
                }

            }

            // video page sidebar shorts
            if (!iridiumSettings.videoPageShorts && Util.isWatchPage()) {

                const twoColumnWatchNextResults = Util.getSingleObjectByKey(data, "twoColumnWatchNextResults");
                const itemContainer = twoColumnWatchNextResults?.["secondaryResults"]?.["secondaryResults"]?.["results"];

                if (itemContainer?.constructor === Array && itemContainer.length > 0) {

                    for (let i = itemContainer.length - 1; i >= 0; i--) {

                        const itemRendererContents = itemContainer[i]?.["itemSectionRenderer"]?.["contents"];

                        if (itemRendererContents?.constructor === Array && itemRendererContents.length > 0) {

                            for (let j = itemRendererContents.length - 1; j >= 0; j--) {

                                const reelShelfRenderer = itemRendererContents[j]?.["reelShelfRenderer"];

                                if (reelShelfRenderer) {
                                    itemRendererContents.splice(j, 1);
                                }

                            }

                        }

                    }

                }

            }

        };

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {};

    })();

    const FeatureCreatorMerch = (() => {

        const listener = data => {
            if (!iridiumSettings.creatorMerch) {

                const contents = Util.getSingleObjectByKey(data, "contents", (matched, _) => matched?.find((item) => Object.hasOwn(item, "merchandiseShelfRenderer")));

                if (contents?.length > 0) {
                    for (let i = contents.length - 1; i >= 0; i--) {
                        const item = contents[i];
                        if (Object.hasOwn(item, "merchandiseShelfRenderer")) {
                            contents.splice(i, 1);
                        }
                    }
                }

            }
        };

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {};

    })();

    const FeatureVideoCount = (() => {

        const onVideoCountData = (pageData, subCount, profileCounts) => {

            if (!subCount?.["text"]?.["simpleText"]) {
                return;
            }

            if (subCount["textChanged_"]) {
                subCount["textChanged_"]?.({runs: [{text: profileCounts}]});
            } else if (subCount.textContent === subCount["text"]["simpleText"]) {
                subCount.textContent = profileCounts;
            }

            const parent = subCount.parentElement;

            if (parent?.nodeName === "A") {
                parent.title = subCount.textContent;
            }

        }

        const onEvent = () => {

            const subCount = document.getElementById("owner-sub-count");

            if (!subCount) {
                return;
            }

            const channelId = document.getElementById("movie_player")?.["getPlayerResponse"]()?.["videoDetails"]?.["channelId"] || "";

            let url = null;

            if (channelId.startsWith("UC")) {
                url = `/channel/${channelId}`;
            } else if (channelId.startsWith("/@")) {
                url = channelId;
            } else {
                return;
            }

            if (subCount.parentElement.nodeName !== "A") {

                const link = document.createElement("a");

                link.href = `${url}/videos`;
                link.className = "yt-simple-endpoint";

                subCount.parentElement.appendChild(link);
                link.appendChild(subCount);

            }

            fetch(url).then(response => response.text().then(data => {

                let matched = data.match(/var ytInitialData = (\{.*?});/)?.[1];

                if (matched) {
                    try {

                        const pageData = JSON.parse(matched);
                        const metadataRows = pageData?.header
                            ?.["pageHeaderRenderer"]
                            ?.["content"]
                            ?.["pageHeaderViewModel"]
                            ?.["metadata"]
                            ?.["contentMetadataViewModel"]
                            ?.["metadataRows"];

                        if (metadataRows?.constructor === Array && metadataRows.length > 0) {

                            for (let i = metadataRows.length - 1; i >= 0; i--) {

                                const metadataParts = metadataRows[i]?.["metadataParts"];

                                if (metadataParts?.constructor === Array && metadataParts.length > 0) {
                                    onVideoCountData(pageData, subCount, metadataParts.map((entry) => entry?.text?.content)?.join(" ‧ "));
                                    break;
                                }

                            }

                        }

                    } catch (e) {
                    }
                }

            }));

        };

        const update = () => {
            if (iridiumSettings.videoCount) {
                window.addEventListener("yt-page-data-updated", onEvent, true);
                onEvent();
            } else {

                window.removeEventListener("yt-page-data-updated", onEvent, true);

                const subCount = document.getElementById("owner-sub-count");
                const link = subCount?.parentElement;

                if (link?.nodeName === "A") {
                    link?.parentElement?.appendChild(subCount);
                    link?.remove();
                }

                if (subCount?.["textChanged_"] && subCount?.["text"]?.["simpleText"]) {
                    subCount["textChanged_"]?.({
                        runs: [
                            {text: subCount["text"]["simpleText"]},
                        ]
                    });
                }

            }
        };

        FeatureUpdater.register(SettingData.videoCount.id, update);

        return {};

    })();

    const FeatureAmbientMode = (() => {

        const created = api => {
            api?.["updateCinematicSettings"]?.(iridiumSettings.ambientMode);
        };

        const update = () => {

            if (iridiumSettings.ambientMode) {
                document.documentElement.removeAttribute("ambient-mode-disabled");
            } else {
                document.documentElement.setAttribute("ambient-mode-disabled", "");
            }

            document.getElementById("movie_player")?.["updateCinematicSettings"]?.(iridiumSettings.ambientMode);

        };

        FeatureUpdater.register(SettingData.ambientMode.id, update);

        OverrideOnPlayerReady.onReadyListener(created);

        return {};

    })();

    const FeatureInfoCards = (() => {

        const listener = data => {
            if (!iridiumSettings.infoCards) {
                const cards = Util.getSingleObjectAndParentByKey(data, "cards", (cards, _) => !!cards?.["cardCollectionRenderer"]);
                if (cards?.parent?.["cards"]) {
                    delete cards.parent["cards"];
                }
            }
        };

        OnYtPageDataFetched.addListener(listener);
        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {};

    })();

    const FeatureEndScreen = (() => {

        const update = () => {
            if (iridiumSettings.endScreen) {
                document.documentElement.classList.add("iridium-hide-end-screen-cards");
            } else {
                document.documentElement.classList.remove("iridium-hide-end-screen-cards");
            }
        };

        FeatureUpdater.register(SettingData.endScreen.id, update);

        return {
            update: update
        };

    })();

    const FeatureLoudness = (() => {

        const listener = data => {
            if (!iridiumSettings.loudness) {

                const audioConfig = Util.getSingleObjectByKey(data, "audioConfig");
                const adaptiveFormats = Util.getSingleObjectByKey(data, "adaptiveFormats");

                if (audioConfig && Object.hasOwn(audioConfig, "loudnessDb")) {
                    audioConfig["loudnessDb"] = 0;
                }

                if (adaptiveFormats) {
                    if (adaptiveFormats.constructor === Array && adaptiveFormats.length > 0) {
                        for (let i = 0; i < adaptiveFormats.length; i++) {
                            if (adaptiveFormats[i]?.["loudnessDb"]) {
                                adaptiveFormats[i]["loudnessDb"] = 0;
                            }
                        }
                    }
                }

            }
        };

        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {};

    })();

    const FeatureHFRAllowed = (() => {

        const listener = data => {
            if (!iridiumSettings.hfrAllowed) {

                const adaptiveFormats = Util.getSingleObjectByKey(data, "adaptiveFormats");

                if (adaptiveFormats?.constructor === Array && adaptiveFormats.length > 0) {
                    for (let i = adaptiveFormats.length - 1; i >= 0; i--) {
                        if (adaptiveFormats[i]?.["fps"] > 30) {
                            adaptiveFormats.splice(i, 1);
                        }
                    }
                }

            }
        };

        OverrideFetch.onFetchListener(listener);
        OverrideHandleResponse.onHandleResponseListener(listener);

        return {};

    })();

    const FeatureScrollVolume = (() => {

        const iniScrollVolume = event => {

            if (iridiumSettings.scrollVolumeShift && !event.shiftKey) {
                return;
            }

            const ytdApp = document.querySelector("ytd-app");

            if (ytdApp?.["isWatchPage"] !== true) {
                return;
            }

            const api = document.getElementById("movie_player");

            if (!api) {
                return;
            }

            if (!iridiumSettings.scrollVolumeShift) {

                const playerState = api["getPlayerState"]?.() || -1;

                if (!api.contains(event.target) || !(playerState > 0) || !(playerState < 5)) {
                    return;
                }

                const canScroll = document.querySelector(".ytp-playlist-menu")?.contains(event.target) === true
                    || document.querySelector(".iv-drawer")?.contains(event.target) === true
                    || document.querySelector(".ytp-settings-menu")?.contains(event.target) === true;

                if (canScroll) {
                    return;
                }

            }

            event.preventDefault();

            const direction = event.deltaY;
            const oldVolume = api?.["getVolume"]?.() || 0;
            const steps = Math.max(1, Math.min(iridiumSettings.scrollVolumeStep || 5, 10));
            let newVolume = oldVolume - (Math.sign(direction) * steps);

            if (newVolume < 0) {
                newVolume = 0;
            } else if (newVolume > 100) {
                newVolume = 100;
            }

            if (newVolume > oldVolume && api?.["isMuted"]?.() === true) {
                api?.["unMute"]?.();
            }

            api?.["setVolume"]?.(newVolume, true);

            let levelText = document.getElementById("iridium-scroll-volume-level");

            if (!levelText) {
                levelText = document.createElement("div");
                levelText.id = "iridium-scroll-volume-level";
            }

            levelText.textContent = `${newVolume}%`;

            let levelContainer = document.getElementById("iridium-scroll-volume-level-container");

            if (!levelContainer) {
                levelContainer = document.createElement("div");
                levelContainer.id = "iridium-scroll-volume-level-container";
                levelContainer.appendChild(levelText);
                api.prepend(levelContainer);
            } else {
                levelContainer.style.display = "";
            }

            clearTimeout(levelContainer.timeoutId);

            levelContainer.timeoutId = setTimeout(() => levelContainer.style.display = "none", 1000);

        };

        const update = () => {
            if (iridiumSettings.scrollVolume) {
                document.addEventListener("wheel", iniScrollVolume, {passive: false});
            } else {
                document.removeEventListener("wheel", iniScrollVolume);
            }
        };

        FeatureUpdater.register(SettingData.scrollVolume.id, update);

        return {
            update: update
        };

    })();

    const FeatureBlacklist = (() => {

        const targetTags = [
            "ytd-rich-item-renderer",
            "ytd-video-renderer",
            "ytd-grid-video-renderer",
            "ytd-compact-video-renderer"
        ];
        const richGridPages = [
            "/",
            "/podcasts",
        ];
        const sectionListPages = [
            "/results",
            "/feed/trending",
            "/gaming",
        ];
        const removeItems = data => {

            if (!data) {
                return;
            }

            if (richGridPages.indexOf(window.location.pathname) > -1) {

                const richGridRenderer = Util.getSingleObjectByKey(data, "richGridRenderer");
                const itemContainer = richGridRenderer?.["contents"];

                if (itemContainer?.constructor === Array && itemContainer.length > 0) {

                    for (let i = itemContainer.length - 1; i >= 0; i--) {

                        const richShelfRendererContents = itemContainer[i]
                            ?.["richSectionRenderer"]
                            ?.["content"]
                            ?.["richShelfRenderer"]
                            ?.["contents"];

                        if (richShelfRendererContents?.constructor === Array && richShelfRendererContents.length > 0) {

                            for (let j = richShelfRendererContents.length - 1; j >= 0; j--) {

                                const browseId = richShelfRendererContents[j]
                                    ?.["richItemRenderer"]
                                    ?.["content"]
                                    ?.["videoRenderer"]
                                    ?.["shortBylineText"]
                                    ?.["runs"]
                                    ?.[0]
                                    ?.["navigationEndpoint"]
                                    ?.["browseEndpoint"]
                                    ?.["browseId"];

                                if (iridiumSettings.blacklist[browseId]) {
                                    richShelfRendererContents.splice(j, 1);
                                }

                            }

                            if (richShelfRendererContents.length === 0) {
                                itemContainer.splice(i, 1);
                            }

                        }

                        const browseId = itemContainer[i]
                            ?.["richItemRenderer"]
                            ?.["content"]
                            ?.["videoRenderer"]
                            ?.["shortBylineText"]
                            ?.["runs"]
                            ?.[0]
                            ?.["navigationEndpoint"]
                            ?.["browseEndpoint"]
                            ?.["browseId"];

                        if (iridiumSettings.blacklist[browseId]) {
                            itemContainer.splice(i, 1);
                        }

                    }

                }

            } else if (Util.isWatchPage()) {

                const secondaryResults = Util.getSingleObjectByKey(data, "secondaryResults");
                const itemContainer = secondaryResults?.["secondaryResults"]?.["results"];

                if (itemContainer?.constructor === Array && itemContainer.length > 0) {

                    for (let i = itemContainer.length - 1; i >= 0; i--) {

                        const itemSectionRendererContents = itemContainer[i]?.["itemSectionRenderer"]?.["contents"];

                        if (itemSectionRendererContents?.constructor === Array && itemSectionRendererContents.length > 0) {

                            for (let j = itemSectionRendererContents.length - 1; j >= 0; j--) {

                                const browseId = itemSectionRendererContents[j]
                                    ?.["compactVideoRenderer"]
                                    ?.["shortBylineText"]
                                    ?.["runs"]
                                    ?.[0]
                                    ?.["navigationEndpoint"]
                                    ?.["browseEndpoint"]
                                    ?.["browseId"];

                                if (iridiumSettings.blacklist[browseId]) {
                                    itemSectionRendererContents.splice(j, 1);
                                }

                            }

                        }

                    }

                }

                const playerOverlays = Util.getSingleObjectByKey(data, "playerOverlays");
                const endScreenRenderer = playerOverlays?.["playerOverlayRenderer"]?.["endScreen"]?.["watchNextEndScreenRenderer"];
                const endScreenRendererResults = endScreenRenderer?.["results"];

                if (endScreenRendererResults?.constructor === Array && endScreenRendererResults.length > 0) {

                    for (let i = endScreenRendererResults.length - 1; i >= 0; i--) {

                        const browseId = endScreenRendererResults[i]
                            ?.["endScreenVideoRenderer"]
                            ?.["shortBylineText"]
                            ?.["runs"]
                            ?.[0]
                            ?.["navigationEndpoint"]
                            ?.["browseEndpoint"]
                            ?.["browseId"];

                        if (iridiumSettings.blacklist[browseId]) {
                            endScreenRendererResults.splice(i, 1);
                        }

                    }

                }

            } else if (sectionListPages.indexOf(window.location.pathname) > -1) {

                const sectionListRenderer = Util.getSingleObjectByKey(data, "sectionListRenderer");
                const itemContainer = sectionListRenderer?.["contents"];

                if (itemContainer?.constructor === Array && itemContainer.length > 0) {

                    for (let i = itemContainer.length - 1; i >= 0; i--) {

                        const items = itemContainer[i]?.["itemSectionRenderer"]?.["contents"]
                            || itemContainer[i]?.["shelfRenderer"]?.["content"]?.["verticalListRenderer"]?.["items"];

                        if (items?.constructor === Array && items.length > 0) {

                            for (let j = items.length - 1; j >= 0; j--) {

                                const browseId = items[j]?.["channelRenderer"]?.["channelId"]
                                    || items[j]
                                        ?.["videoRenderer"]
                                        ?.["ownerText"]
                                        ?.["runs"]
                                        ?.[0]
                                        ?.["navigationEndpoint"]
                                        ?.["browseEndpoint"]
                                        ?.["browseId"];

                                if (iridiumSettings.blacklist[browseId]) {
                                    items.splice(j, 1);
                                }

                                const shelfRendererContent = items[j]?.["shelfRenderer"]?.["content"];
                                const shelfItems = shelfRendererContent?.["verticalListRenderer"]?.["items"]
                                    || shelfRendererContent?.["expandedShelfContentsRenderer"]?.["items"];

                                if (shelfItems?.constructor === Array && shelfItems.length > 0) {

                                    for (let k = shelfItems.length - 1; k >= 0; k--) {

                                        const shelfItemId = shelfItems[k]
                                            ?.["videoRenderer"]
                                            ?.["ownerText"]
                                            ?.["runs"]
                                            ?.[0]
                                            ?.["navigationEndpoint"]
                                            ?.["browseEndpoint"]
                                            ?.["browseId"];

                                        if (iridiumSettings.blacklist[shelfItemId]) {
                                            shelfItems.splice(k, 1);
                                        }

                                    }

                                    if (shelfItems.length === 0) {
                                        items.splice(j, 1);
                                    }

                                }

                            }

                        }

                    }

                }

            }

        };

        const update = data => {

            if (!iridiumSettings.blacklistEnabled) {
                return;
            }

            if (data?.constructor !== Object || !data?.["responseContext"]) {
                return;
            }

            removeItems(data);

            const items = Array.from(document.querySelectorAll(targetTags.join(",")));

            items.forEach(item => {

                const renderer = item?.["data"]?.["content"]?.["videoRenderer"] || item?.["data"];
                const browseId = renderer
                    ?.["shortBylineText"]
                    ?.["runs"]
                    ?.[0]
                    ?.["navigationEndpoint"]
                    ?.["browseEndpoint"]
                    ?.["browseId"];

                if (iridiumSettings.blacklist[browseId]) {
                    item.remove();
                }

            });

            document.querySelector("ytd-rich-grid-renderer")?.["reflowContent"]?.();
            document.querySelector("ytd-video-preview")?.["deactivate"]?.();

        };

        FeatureUpdater.register(SettingData.blacklist.id, () => {
            update(document.querySelector("ytd-app")?.["data"]?.["response"]);
        });

        OnYtPageDataFetched.addListener(update);

        return {
            targetTags: targetTags,
            update: update,
            allowedRichGridPages: richGridPages,
            allowedSectionListPages: sectionListPages,
        };

    })();

    const FeatureBlacklistButton = (() => {

        const update = () => {

            document.querySelector("tp-yt-iron-dropdown")?.["close"]?.();

            if (!iridiumSettings.blacklistButton) {

                const menus = Array.from(document.querySelectorAll("ytd-menu-renderer"));

                menus.forEach(menu => {

                    const items = menu?.["data"]?.["items"];
                    const backupItems = menu?.["__data"]?.["items"];

                    if (items?.constructor === Array) {
                        for (let i = items.length - 1; i >= 0; i--) {
                            if (items[i]?.["menuServiceItemRenderer"]?.["id"] === "blockChannel") {
                                items.splice(i, 1);
                            }
                        }
                    }

                    if (backupItems?.constructor === Array) {
                        for (let i = backupItems.length - 1; i >= 0; i--) {
                            if (backupItems[i]?.["menuServiceItemRenderer"]?.["id"] === "blockChannel") {
                                backupItems.splice(i, 1);
                            }
                        }
                    }

                });

            }

        };

        const onItemSelectedAction = event => {

            const channelData = event.detail?.["args"]?.[0]?.["channelData"];
            const channelUC = channelData?.["channelUC"];

            if (!channelUC) {
                return;
            }

            const channelName = channelData?.["channelName"];
            const canonicalBaseUrl = channelData?.["canonicalBaseUrl"];

            if (!channelName && !canonicalBaseUrl) {
                return;
            }

            if (!iridiumSettings.blacklist[channelUC]) {

                iridiumSettings.blacklist[channelUC] = {
                    name: channelName,
                    handle: canonicalBaseUrl
                };

                Broadcaster.saveSetting(SettingData.blacklist.id);

            }

            FeatureBlacklist.update(document.querySelector("ytd-app")?.["data"]?.["response"]);

        }

        const iniBlacklistButton = event => {

            if (!iridiumSettings.blacklistEnabled || !iridiumSettings.blacklistButton) {
                return;
            }

            if (window.location.pathname !== "/"
                && !Util.isWatchPage()
                && FeatureBlacklist.allowedRichGridPages.indexOf(window.location.pathname) < 0
                && FeatureBlacklist.allowedSectionListPages.indexOf(window.location.pathname) < 0
            ) {
                return;
            }

            if (event.detail?.["actionName"] === "yt-menu-service-item-selected-action") {
                onItemSelectedAction(event)
            }

        };

        const checkBlacklistButton = data => {

            const hostElement = data?.["hostElement"];
            const items = data?.["items"];

            if (!hostElement || items?.constructor !== Array) {
                return;
            }

            const parent = Array.from(document.querySelectorAll(FeatureBlacklist.targetTags.join(",")))
                .find(item => item.contains(hostElement));

            if (!parent) {

                for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i]?.["menuServiceItemRenderer"]?.["id"] === "blockChannel") {
                        items.splice(i, 1);
                    }
                }

            } else if (!items.some(item => item?.["menuServiceItemRenderer"]?.["id"] === "blockChannel")) {

                const renderer = parent?.["data"]?.["content"]?.["videoRenderer"] || parent?.["data"];
                const channelUC = renderer
                    ?.["shortBylineText"]
                    ?.["runs"]
                    ?.[0]
                    ?.["navigationEndpoint"]
                    ?.["browseEndpoint"]
                    ?.["browseId"];

                if (!channelUC) {
                    return;
                }

                const channelName = parent.querySelector("yt-formatted-string.ytd-channel-name")?.title;
                const canonicalBaseUrl = Util.getSingleObjectByKey(parent.data, "canonicalBaseUrl");

                if (!channelName && !canonicalBaseUrl) {
                    return;
                }

                items.unshift({
                    menuServiceItemRenderer: {
                        id: "blockChannel",
                        channelData: {
                            channelUC: channelUC,
                            channelName: channelName,
                            canonicalBaseUrl: canonicalBaseUrl,
                        },
                        hasSeparator: true,
                        text: {runs: [{text: "Block channel"}]},
                        icon: {iconType: "CANCEL"}
                    }
                });

            }

        };

        const onOverflowTapKey = crypto.randomUUID();

        Object.defineProperty(Object.prototype, "onOverflowTap", {
            set(data) {
                this[onOverflowTapKey] = data;
            },
            get() {
                if (iridiumSettings.blacklistEnabled && iridiumSettings.blacklistButton) {
                    checkBlacklistButton(this);
                }
                return this[onOverflowTapKey]?.apply(this, arguments);
            }
        });

        FeatureUpdater.register(SettingData.blacklistButton.id, update);

        document.documentElement.addEventListener("yt-action", iniBlacklistButton, false);

        return {
            update: update
        };

    })();

    // end features

}