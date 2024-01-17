"use strict";

function mainScript(extensionId, SettingId, Names, settings) {

    const Util = {
        getSingleObjectByKey: function (obj, keys, match) {

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
        getSingleObjectAndParentByKey: function (obj, keys, match) {

            for (let property in obj) {

                if (!obj.hasOwnProperty(property) || obj[property] === null || obj[property] === undefined) {
                    continue;
                }

                if ((keys.constructor.name === "String" ? keys === property : keys.indexOf(property) > -1)
                    && (!match || /*obj[property].constructor.name !== "Object" &&*/ match(obj[property], obj))
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
    };

    const Api = {
        onYTPCreated: [
            function (api) {
                api.addEventListener("onStateChange", function (state) {
                    if (settings.videoFocus) {
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
            },
            function (api) {
                api.addEventListener("onStateChange", function () {
                    if (settings.defaultQuality !== "auto" && Api.isValidQuality(settings.defaultQuality)) {
                        const currentQuality = api?.["getPreferredQuality"]?.();
                        if (currentQuality === "auto") {
                            const availableQualityList = api?.["getAvailableQualityLevels"]?.();
                            if (availableQualityList?.length > 0) {
                                const qualitySet = Api.getAvailableQuality(settings.defaultQuality, availableQualityList)
                                api?.["setPlaybackQuality"]?.(qualitySet);
                                api?.["setPlaybackQualityRange"]?.(qualitySet);
                            }
                        }
                    }
                });
            },
            function (api) {
                api.addEventListener("onStateChange", function () {
                    const currentSpeed = api?.["getPlaybackRate"]?.()?.toString();
                    if (settings.defaultSpeed !== currentSpeed) {
                        api?.["setPlaybackRate"]?.(Number(settings.defaultSpeed));
                    }
                });
            },
            function (api) {
                api.addEventListener("videodatachange", () => {
                    if (!settings.annotations) {
                        api?.["unloadModule"]?.("annotations_module");
                    }
                });
            },
        ],
        qualityList: [
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
        ],
        isValidQuality: quality => Api.qualityList.indexOf(quality) > -1,
        getAvailableQuality: function (quality, availableList) {
            if (availableList.indexOf(quality) > -1) {
                return quality;
            } else {
                return availableList[0];
            }
        },
        iniSettingsButton: function (data) {

            if (!settings.extensionButton) {
                return
            }

            const topBarButtons = Util.getSingleObjectByKey(data, "topbarButtons");

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

        },
        iniLogoShortcut: function (event) {

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

        },
        iniDefaultTab: function (event) {

            if (settings.channelTab === "featured") {
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

            switch (settings.channelTab) {
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

            metadata.url = link.href = `${browseEndpoint["canonicalBaseUrl"]}/${settings.channelTab}`;

        },
        isAdAllowed: function (isSubscribed, enabled) {

            // when all ads are opted out
            if (settings.adOptOutAll) {
                // ads will be allowed only if:
                // the exception for videos from subscribed channels is enabled
                // and the video belongs to a subscribed channel
                return settings.adSubscribed && isSubscribed;
            }

            // ads will be allowed if:
            // the exception for videos from subscribed channels is enabled
            // the video belongs to a subscribed channel
            // and the option is enabled
            if (settings.adSubscribed) {
                return isSubscribed && enabled;
            }

            // otherwise the setting itself prevails
            return enabled;

        },
        iniPageAdManager: function (data) {

            const subscribeButtonRenderer = Util.getSingleObjectByKey(data, "subscribeButtonRenderer");
            const isSubscribed = subscribeButtonRenderer?.["subscribed"] === true;
            const isAdTaggedProductsAllowed = Api.isAdAllowed(isSubscribed, settings.adTaggedProducts);

            if (!isAdTaggedProductsAllowed) {

                // player args
                const playerOverlayRenderer = Util.getSingleObjectByKey(data, "playerOverlayRenderer");

                // video tagged products
                if (playerOverlayRenderer?.["productsInVideoOverlayRenderer"]) {
                    delete playerOverlayRenderer["productsInVideoOverlayRenderer"];
                }

            }

            const isAdMastheadAllowed = Api.isAdAllowed(isSubscribed, settings.adMasthead);
            const isAdHomeFeedAllowed = Api.isAdAllowed(isSubscribed, settings.adHomeFeed);

            if (!isAdMastheadAllowed || !isAdHomeFeedAllowed) {

                // home page ads
                const richGridRenderer = Util.getSingleObjectByKey(data, "richGridRenderer");

                if (!isAdMastheadAllowed) {
                    // home page masthead banner
                    if (richGridRenderer?.["masthead"]?.["bannerPromoRenderer"] || richGridRenderer?.["masthead"]?.["adSlotRenderer"]) {
                        delete richGridRenderer["masthead"];
                    }
                }

                if (!isAdHomeFeedAllowed) {

                    const richGridRendererContents = richGridRenderer?.["contents"];

                    // home page list ads
                    if (richGridRendererContents?.constructor === Array && richGridRendererContents.length > 0) {
                        for (let i = richGridRendererContents.length - 1; i >= 0; i--) {
                            const itemRenderer = richGridRendererContents[i];
                            if (itemRenderer?.["richItemRenderer"]?.["content"]?.["adSlotRenderer"]) {
                                richGridRendererContents.splice(i, 1);
                            }
                        }
                    }

                }

            }

            const isAdSearchFeedAllowed = Api.isAdAllowed(isSubscribed, settings.adSearchFeed);

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

            const isAdVideoFeedAllowed = Api.isAdAllowed(isSubscribed, settings.adVideoFeed);

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

        },
        iniPlayerConfig: function (args) {

            const subscribeButtonRenderer = Util.getSingleObjectByKey(args, "subscribeButtonRenderer");
            const isSubscribed = subscribeButtonRenderer?.["subscribed"] === true;
            const isInVideoAdsAllowed = Api.isAdAllowed(isSubscribed, settings.adInVideo);

            if (!isInVideoAdsAllowed) {

                const adPlacements = Util.getSingleObjectByKey(args, "adPlacements");
                const adSlots = Util.getSingleObjectByKey(args, "adSlots");
                const playerAds = Util.getSingleObjectByKey(args, "playerAds");

                if (adPlacements?.length) {
                    adPlacements.fill({});
                }

                if (adSlots?.length) {
                    adSlots.length = 0;
                }

                if (playerAds?.length) {
                    playerAds.length = 0;
                }

            }

            if (!settings.loudness) {

                const audioConfig = Util.getSingleObjectByKey(args, "audioConfig");
                const adaptiveFormats = Util.getSingleObjectByKey(args, "adaptiveFormats");

                if (audioConfig) {
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

            if (!settings.hfrAllowed) {

                const adaptiveFormats = Util.getSingleObjectByKey(args, "adaptiveFormats");

                if (adaptiveFormats) {
                    if (adaptiveFormats.constructor === Array && adaptiveFormats.length > 0) {
                        for (let i = adaptiveFormats.length - 1; i >= 0; i--) {
                            if (adaptiveFormats[i]?.["fps"] > 30) {
                                adaptiveFormats.splice(i, 1);
                            }
                        }
                    }
                }

            }

        },
        iniExcludeShorts: function (data) {

            if (!settings.searchShorts) {

                // search results shorts
                const itemSectionRenderer = Util.getSingleObjectByKey(arguments, "itemSectionRenderer");
                const itemSectionRendererContents = itemSectionRenderer?.["contents"];

                if (itemSectionRendererContents) {
                    for (let i = itemSectionRendererContents.length - 1; i >= 0; i--) {
                        if (itemSectionRendererContents[i]?.["reelShelfRenderer"] || itemSectionRendererContents[i]?.["videoRenderer"]?.["navigationEndpoint"]?.["reelWatchEndpoint"]) {
                            itemSectionRendererContents.splice(i, 1);
                        } else if (itemSectionRendererContents[i]?.["shelfRenderer"]) {

                            const shelfRendererItems = itemSectionRendererContents[i]?.["shelfRenderer"]?.["content"]?.["verticalListRenderer"]?.["items"];

                            if (shelfRendererItems?.constructor === Array && shelfRendererItems.length > 0) {

                                for (let j = shelfRendererItems.length - 1; j >= 0; j--) {
                                    const reelWatchEndpoint = shelfRendererItems[j]?.["videoRenderer"]?.["navigationEndpoint"]?.["reelWatchEndpoint"];
                                    if (reelWatchEndpoint) {
                                        shelfRendererItems.splice(j, 1);
                                    }
                                }

                                if (itemSectionRendererContents.length === 0) {
                                    itemSectionRendererContents.splice(i, 1);
                                }

                            }

                        }
                    }
                }

            }

            if ((!settings.homeShorts && window.location.pathname === "/") || (!settings.subscriptionsShorts && window.location.pathname === "/feed/subscriptions")) {

                // home page and subscriptions shorts
                const richGridRenderer = Util.getSingleObjectByKey(arguments, "richGridRenderer");
                const richGridRendererContents = richGridRenderer?.["contents"];

                if (richGridRendererContents?.constructor === Array && richGridRendererContents.length > 0) {
                    for (let i = richGridRendererContents.length - 1; i >= 0; i--) {

                        const richShelfRendererContents = richGridRendererContents[i]?.["richSectionRenderer"]?.["content"]?.["richShelfRenderer"]?.["contents"];

                        if (richShelfRendererContents?.constructor === Array && richShelfRendererContents.length > 0) {

                            for (let j = richShelfRendererContents.length - 1; j >= 0; j--) {
                                const reelItemRenderer = richShelfRendererContents[j]?.["richItemRenderer"]?.["content"]?.["reelItemRenderer"];
                                if (reelItemRenderer) {
                                    richShelfRendererContents.splice(j, 1);
                                }
                            }

                            if (richShelfRendererContents.length === 0) {
                                richGridRendererContents.splice(i, 1);
                            }

                        }

                    }
                }

            }

        },
        iniInfoCards: function (data) {
            if (!settings.infoCards) {
                const cards = Util.getSingleObjectAndParentByKey(arguments, "cards", (cards, _) => !!cards?.["cardCollectionRenderer"]);
                if (cards?.parent?.["cards"]) {
                    delete cards.parent["cards"];
                }
            }
        },
        iniCreatorMerch: function (data) {
            if (!settings.creatorMerch) {
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
        },
        iniScrollVolume: function (event) {

            const api = document.getElementById("movie_player");
            const playerState = api?.["getPlayerState"]?.() || -1;
            const ivDrawer = document.querySelector(".iv-drawer");
            const playerSettings = document.querySelector(".ytp-settings-menu");
            const fullscreenPlaylist = document.querySelector(".ytp-playlist-menu");
            const canScroll = (!fullscreenPlaylist || !fullscreenPlaylist.contains(event.target))
                && (!ivDrawer || !ivDrawer.contains(event.target))
                && (!playerSettings || !playerSettings.contains(event.target));

            if (api && api.contains(event.target) && playerState > 0 && playerState < 5 && canScroll) {

                event.preventDefault();

                const direction = event.deltaY;
                const oldVolume = api?.["getVolume"]?.() || 0;
                let newVolume = oldVolume - (Math.sign(direction) * 5);

                if (newVolume < 0) {
                    newVolume = 0;
                } else if (newVolume > 100) {
                    newVolume = 100;
                }

                if (newVolume > oldVolume && api?.["isMuted"]?.() === true) {
                    api?.["unMute"]?.();
                }

                api?.["setVolume"]?.(newVolume);

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

                levelContainer.timeoutId = setTimeout(() => {
                    levelContainer.style.display = "none";
                }, 1000);

            }

        },
        checkPlayerTools: function () {

            const titleSection = document.querySelector("#below ytd-watch-metadata #title");

            if (!titleSection) {
                return null;
            }

            let playerTools = document.getElementById("iridium-player-tools");

            if (!playerTools) {
                playerTools = document.createElement("div");
                playerTools.id = "iridium-player-tools";
                titleSection.appendChild(playerTools);
                titleSection.style.position = "relative";
            } else {
                playerTools.replaceChildren();
            }

            return playerTools;

        },
        checkVideoFocusToggleTool: function (playerTools) {

            if (!settings.videoFocusToggle) {
                document.getElementById("iridium-focus")?.remove();
            } else {

                let videoFocusButton = document.getElementById("iridium-focus");

                if (!videoFocusButton) {

                    videoFocusButton = document.createElement("div");
                    videoFocusButton.id = "iridium-focus";
                    videoFocusButton.title = "Video focus";
                    videoFocusButton.innerHTML =
                        `<svg viewBox="0 -960 960 960" height="24" width="24">
                            <path d="M112.857-378Q104-378 97.5-384.643t-6.5-15.5Q91-409 97.643-415.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160Q104-538 97.5-544.643t-6.5-15.5Q91-569 97.643-575.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM235-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm164.299 343.846q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM397-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM396.857-92Q388-92 381.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164.442 483.692q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM561-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM560.857-92Q552-92 545.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM725-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM846.857-378q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Z"/>
                        </svg>`;

                    if (!playerTools) {
                        playerTools = Api.checkPlayerTools();
                    }

                    playerTools?.appendChild(videoFocusButton);

                }

                if (videoFocusButton) {

                    if (settings.videoFocus) {

                        const player = document.getElementById("movie_player");

                        switch (player?.["getPlayerState"]?.()) {
                            case 1:
                            case 3:
                                document.documentElement.setAttribute("dim", "");
                                break;
                        }

                        videoFocusButton.innerHTML =
                            `<svg viewBox="0 -960 960 960" height="24" width="24">
                                <path d="M112.857-378Q104-378 97.5-384.643t-6.5-15.5Q91-409 97.643-415.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160Q104-538 97.5-544.643t-6.5-15.5Q91-569 97.643-575.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM235-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm164.299 343.846q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM397-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM396.857-92Q388-92 381.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164.442 483.692q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038Zm0-162q-23.914 0-40.953-16.739-17.038-16.74-17.038-40.654 0-23.914 16.739-40.953 16.74-17.038 40.654-17.038 23.914 0 40.953 16.739 17.038 16.74 17.038 40.654 0 23.914-16.739 40.953-16.74 17.038-40.654 17.038ZM561-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-490q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM560.857-92Q552-92 545.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-734q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM725-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-162q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm0-164q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM846.857-378q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm0-160q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Z"/>
                            </svg>`;

                    } else {

                        document.documentElement.removeAttribute("dim");

                        videoFocusButton.innerHTML =
                            `<svg viewBox="0 -960 960 960" height="24" width="24">
                                <path d="M798.923-96.23 95.231-798.924q-10.616-10.615-11-23.269-.385-12.654 11-24.039 11.384-11.384 23.654-11.384 12.269 0 23.654 11.384l703.692 703.692q10.615 10.616 11 22.77.384 12.154-11 23.538-11.385 11.385-23.654 11.385-12.27 0-23.654-11.385ZM396.857-92Q388-92 381.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164 0Q552-92 545.5-98.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM235-196.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm162 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm164 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM399-342.308q-22.846 0-40.269-17.423T341.308-400q0-22.846 17.423-40.269T399-457.692q22.846 0 40.269 17.423T456.692-400q0 22.846-17.423 40.269T399-342.308Zm-164-17.846q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm507.154-.231-56.769-56.769q6.076-10.384 15.884-16.538t23.943-6.154q16.295 0 27.964 11.67 11.67 11.669 11.67 27.964 0 14.135-6.154 23.943-6.154 9.808-16.538 15.884ZM112.857-378Q104-378 97.5-384.643t-6.5-15.5Q91-409 97.643-415.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm734 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM591.231-510.538l-81.693-81.693q8.231-12.952 22.423-20.207 14.193-7.254 29.416-7.254 22.469 0 39.892 17.423 17.423 17.423 17.423 39.892 0 15.223-7.038 29.031-7.039 13.808-20.423 22.808ZM235-522.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm490 0q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM112.857-538Q104-538 97.5-544.643t-6.5-15.5Q91-569 97.643-575.5t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm734 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5ZM561-686.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731Zm-146.615-1.231-56-56q5.307-9.384 15.109-15.923 9.803-6.538 23.506-6.538 16.385 0 28.115 11.67 11.731 11.669 11.731 27.964 0 14.135-6.538 23.827-6.539 9.693-15.923 15ZM725-686.154q-16.385 0-28.115-11.731-11.731-11.73-11.731-28.115 0-16.385 11.731-28.115 11.73-11.731 28.115-11.731 16.385 0 28.115 11.731 11.731 11.73 11.731 28.115 0 16.385-11.731 28.115-11.73 11.731-28.115 11.731ZM396.857-826q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Zm164 0q-8.857 0-15.357-6.643t-6.5-15.5q0-8.857 6.643-15.357t15.5-6.5q8.857 0 15.357 6.643t6.5 15.5q0 8.857-6.643 15.357t-15.5 6.5Z"/>
                            </svg>`;

                    }

                    videoFocusButton.onclick = function () {

                        settings.videoFocus = !settings.videoFocus;

                        broadcastChannel.postMessage({
                            type: "setting",
                            payload: {[SettingId.videoFocus] : settings.videoFocus}
                        });

                        Api.checkVideoFocusToggleTool(playerTools);

                    };

                }

            }

        },
        checkScreenshotTool: function (playerTools) {

            if (!settings.videoScreenshot) {
                document.getElementById("iridium-screenshot")?.remove();
            } else {

                let screenshotButton = document.getElementById("iridium-screenshot");

                if (!screenshotButton) {

                    screenshotButton = document.createElement("div");
                    screenshotButton.id = "iridium-screenshot";
                    screenshotButton.title = "Screenshot";
                    screenshotButton.innerHTML =
                        `<svg viewBox="0 -960 960 960" height="24" width="24">
                            <path d="M686.308-395.692h-61.616q-12.615 0-21.654 9.038Q594-377.615 594-365t9.038 21.654q9.039 9.038 21.654 9.038h77.693q18.923 0 32.115-13.192 13.192-13.192 13.192-32.115v-77.693q0-12.615-9.038-21.654Q729.615-488 717-488t-21.654 9.038q-9.038 9.039-9.038 21.654v61.616ZM273.692-652.308h61.616q12.615 0 21.654-9.038Q366-670.385 366-683t-9.038-21.654q-9.039-9.038-21.654-9.038h-77.693q-18.923 0-32.115 13.192-13.192 13.192-13.192 32.115v77.693q0 12.615 9.038 21.654Q230.385-560 243-560t21.654-9.038q9.038-9.039 9.038-21.654v-61.616ZM184.615-216q-38.34 0-64.478-26.137Q94-268.275 94-306.615v-434.77q0-38.34 26.137-64.478Q146.275-832 184.615-832h590.77q38.34 0 64.478 26.137Q866-779.725 866-741.385v434.77q0 38.34-26.137 64.478Q813.725-216 775.385-216H628v42.693q0 18.923-13.192 32.115Q601.616-128 582.693-128H377.307q-18.923 0-32.115-13.192Q332-154.384 332-173.307V-216H184.615Zm0-66h590.77q9.23 0 16.923-7.692Q800-297.385 800-306.615v-434.77q0-9.23-7.692-16.923Q784.615-766 775.385-766h-590.77q-9.23 0-16.923 7.692Q160-750.615 160-741.385v434.77q0 9.23 7.692 16.923Q175.385-282 184.615-282ZM160-282v-484 484Z"/>
                        </svg>`;

                    if (!playerTools) {
                        playerTools = Api.checkPlayerTools();
                    }

                    playerTools?.appendChild(screenshotButton);

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
                        canvas.toBlob(function (blob) {
                            window.open(URL.createObjectURL(blob));
                        });

                    };

                }

            }

        },
        checkThumbnailTool: function (playerTools) {

            if (!settings.videoThumbnail) {
                document.getElementById("iridium-thumbnail")?.remove();
            } else {

                let thumbnailButton = document.getElementById("iridium-thumbnail");

                if (!thumbnailButton) {

                    thumbnailButton = document.createElement("div");
                    thumbnailButton.id = "iridium-thumbnail";
                    thumbnailButton.title = "Thumbnail";
                    thumbnailButton.innerHTML =
                        `<svg viewBox="0 -960 960 960" height="24" width="24">
                            <path d="M224.615-134q-38.34 0-64.478-26.137Q134-186.275 134-224.615v-510.77q0-38.34 26.137-64.478Q186.275-826 224.615-826h510.77q38.34 0 64.478 26.137Q826-773.725 826-735.385v510.77q0 38.34-26.137 64.478Q773.725-134 735.385-134h-510.77Zm0-66h510.77q9.23 0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760h-510.77q-9.23 0-16.923 7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM200-200v-560 560Zm127.307-84h311.539q14.693 0 20.154-12.192 5.462-12.193-2.23-23.654L573-433.385q-7.231-9.461-17.923-8.961-10.692.5-17.923 9.961l-88.692 111.923-54.077-64q-7.077-8.692-17.462-8.692t-17.615 9.461l-49.154 63.847q-8.462 11.461-3 23.654Q312.615-284 327.307-284ZM340-567q21.955 0 37.478-15.522Q393-598.045 393-620q0-21.955-15.522-37.478Q361.955-673 340-673q-21.955 0-37.478 15.522Q287-641.955 287-620q0 21.955 15.522 37.478Q318.045-567 340-567Z"/>
                        </svg>`;

                    if (!playerTools) {
                        playerTools = Api.checkPlayerTools();
                    }

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

        },
        checkMonetizationInfoTool: function (playerTools) {

            if (!settings.monetizationInfo) {
                document.getElementById("iridium-monetization")?.remove();
            } else {

                let monetizationButton = document.getElementById("iridium-monetization");

                if (!monetizationButton) {

                    monetizationButton = document.createElement("div");
                    monetizationButton.id = "iridium-monetization";
                    monetizationButton.title = "Monetization state";
                    monetizationButton.innerHTML =
                        `<svg viewBox="0 -960 960 960" height="24" width="24">
                            <path d="M328-364.769q15.077 47.077 45.808 74.538 30.73 27.462 75.577 37.923V-231q0 12.846 8.384 21.231 8.385 8.384 21.231 8.384 12.846 0 21.231-8.384 8.384-8.385 8.384-21.231v-19.308q49.077-8.615 86.539-36.923 37.461-28.307 37.461-88.769 0-44-24.538-76.615-24.538-32.616-98.538-58.616-65.154-23.077-86.039-38.615-20.885-15.539-20.885-44.154 0-27.615 21.385-45.5t58-17.885q31.462 0 50.269 15.462 18.808 15.462 29.423 37.923l54.77-21.692q-12.077-32.846-40.77-57.308-28.692-24.462-65.077-26.692V-729q0-12.846-8.384-21.231-8.385-8.384-21.231-8.384-12.846 0-21.231 8.384-8.384 8.385-8.384 21.231v19.308q-52.308 9.692-80.154 42.5-27.846 32.807-27.846 73.192 0 46.154 28.115 75.077Q399.615-490 462-467.692q64.538 23.769 88.731 41.923 24.192 18.154 24.192 49.769 0 38.231-27.308 54.808-27.307 16.577-61.23 16.577-34.923 0-62.231-20.616-27.308-20.615-40.923-60.769L328-364.769Zm152.134 276.77q-81.673 0-152.91-30.84t-124.365-83.922q-53.127-53.082-83.993-124.257Q88-398.194 88-479.866q0-81.673 30.839-153.41 30.84-71.737 83.922-124.865 53.082-53.127 124.257-83.493Q398.194-872 479.866-872q81.673 0 153.41 30.339 71.737 30.34 124.865 83.422 53.127 53.082 83.493 124.757Q872-561.806 872-480.134q0 81.673-30.339 152.91-30.34 71.237-83.422 124.365-53.082 53.127-124.757 83.993Q561.806-88 480.134-88ZM480-154q137 0 231.5-94.5T806-480q0-137-94.5-231.5T480-806q-137 0-231.5 94.5T154-480q0 137 94.5 231.5T480-154Zm0-326Z"/>
                        </svg>
                        <div id="iridium-monetization-count"/>`;

                    if (!playerTools) {
                        playerTools = Api.checkPlayerTools();
                    }

                    playerTools?.appendChild(monetizationButton);

                }

                if (monetizationButton) {

                    const adCount = document.querySelector("ytd-page-manager")?.["getCurrentData"]?.()?.["playerResponse"]?.["adPlacements"]?.length || 0;
                    const countInfo = document.getElementById("iridium-monetization-count");

                    if (adCount > 0) {
                        monetizationButton.classList.add("monetized");
                        monetizationButton.title = "Monetized";
                        if (countInfo) {
                            countInfo.textContent = adCount;
                        }
                    } else {
                        monetizationButton.classList.remove("monetized");
                        monetizationButton.title = "Not monetized";
                        if (countInfo) {
                            countInfo.textContent = "";
                        }
                    }

                }

            }

        },
        checkPlayerToolsSpacing: function (playerTools) {

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

        },
        checkTools: function () {

            if (!settings.videoFocusToggle && !settings.videoScreenshot && !settings.videoThumbnail && !settings.monetizationInfo) {
                document.getElementById("iridium-player-tools")?.remove();
                return;
            }

            const playerTools = Api.checkPlayerTools();

            Api.checkVideoFocusToggleTool(playerTools);
            Api.checkScreenshotTool(playerTools);
            Api.checkThumbnailTool(playerTools);
            Api.checkMonetizationInfoTool(playerTools);
            Api.checkPlayerToolsSpacing(playerTools);

        },
        onPageChanges: function (_) {
            Api.checkTools();
        },
    };

    const Feature = {
        [SettingId.extensionButton]: function (value) {
            if (settings.extensionButton !== value) {
                settings.extensionButton = value;
            }
        },
        [SettingId.adOptOutAll]: function (value) {
            if (settings.adOptOutAll !== value) {
                settings.adOptOutAll = value;
            }
        },
        [SettingId.adSubscribed]: function (value) {
            if (settings.adSubscribed !== value) {
                settings.adSubscribed = value;
            }
        },
        [SettingId.adVideoFeed]: function (value) {
            if (settings.adVideoFeed !== value) {
                settings.adVideoFeed = value;
            }
        },
        [SettingId.adInVideo]: function (value) {
            if (settings.adInVideo !== value) {
                settings.adInVideo = value;
            }
        },
        [SettingId.adTaggedProducts]: function (value) {
            if (settings.adTaggedProducts !== value) {
                settings.adTaggedProducts = value;
            }
        },
        [SettingId.adMasthead]: function (value) {
            if (settings.adMasthead !== value) {
                settings.adOptOutAll = value;
            }
        },
        [SettingId.adHomeFeed]: function (value) {
            if (settings.adHomeFeed !== value) {
                settings.adHomeFeed = value;
            }
        },
        [SettingId.adSearchFeed]: function (value) {
            if (settings.adSearchFeed !== value) {
                settings.adSearchFeed = value;
            }
        },
        [SettingId.theme]: function (value) {

            if (settings.theme !== value) {
                settings.theme = value;
            }

            const ytdApp = document.querySelector("ytd-app");

            switch (value) {
                case "deviceTheme":
                    ytdApp?.["handleSignalActionToggleDarkThemeDevice"]?.();
                    break;
                case "darkTheme":
                    ytdApp?.["handleSignalActionToggleDarkThemeOn"]?.();
                    break;
                case "lightTheme":
                    ytdApp?.["handleSignalActionToggleDarkThemeOff"]?.();
                    break;
            }

        },
        [SettingId.logoSubscriptions]: function (value) {

            if (settings.logoSubscriptions !== value) {
                settings.logoSubscriptions = value;
            }

            if (settings.logoSubscriptions) {
                window.addEventListener("mouseup", Api.iniLogoShortcut, true);
            } else {
                window.removeEventListener("mouseup", Api.iniLogoShortcut, true);
            }

        },
        [SettingId.channelTab]: function (value) {

            if (settings.channelTab !== value) {
                settings.channelTab = value;
            }

            if (settings.channelTab) {
                window.addEventListener("mouseup", Api.iniDefaultTab, true);
            } else {
                window.removeEventListener("mouseup", Api.iniDefaultTab, true);
            }

        },
        [SettingId.homeShorts]: function (value) {
            if (settings.homeShorts !== value) {
                settings.homeShorts = value;
            }
        },
        [SettingId.subscriptionsShorts]: function (value) {
            if (settings.subscriptionsShorts !== value) {
                settings.subscriptionsShorts = value;
            }
        },
        [SettingId.searchShorts]: function (value) {
            if (settings.searchShorts !== value) {
                settings.searchShorts = value;
            }
        },
        [SettingId.videoFocus]: function (value) {

            if (settings.videoFocus !== value) {
                settings.videoFocus = value;
            }

            if (!settings.videoFocus) {
                document.documentElement.removeAttribute("dim");
            }

        },
        [SettingId.creatorMerch]: function (value) {
            if (settings.creatorMerch !== value) {
                settings.creatorMerch = value;
            }
        },
        [SettingId.defaultQuality]: function (value) {
            if (settings.defaultQuality !== value) {
                settings.defaultQuality = value;
            }
        },
        [SettingId.defaultSpeed]: function (value) {
            if (settings.defaultSpeed !== value) {
                settings.defaultSpeed = value;
            }
        },
        [SettingId.autoplay]: function (value) {
            if (settings.autoplay !== value) {
                settings.autoplay = value;
            }
        },
        [SettingId.loudness]: function (value) {
            if (settings.loudness !== value) {
                settings.loudness = value;
            }
        },
        [SettingId.scrollVolume]: function (value) {

            if (settings.scrollVolume !== value) {
                settings.scrollVolume = value;
            }

            if (settings.scrollVolume) {
                document.addEventListener("wheel", Api.iniScrollVolume, {passive: false});
            } else {
                document.removeEventListener("wheel", Api.iniScrollVolume);
            }

        },
        [SettingId.infoCards]: function (value) {
            if (settings.infoCards !== value) {
                settings.infoCards = value;
            }
        },
        [SettingId.annotations]: function (value) {
            if (settings.annotations !== value) {
                settings.annotations = value;
            }
        },
        [SettingId.endScreen]: function (value) {

            if (settings.endScreen !== value) {
                settings.endScreen = value;
            }

            if (settings.endScreen) {
                document.documentElement.classList.add("iridium-hide-end-screen-cards");
            } else {
                document.documentElement.classList.remove("iridium-hide-end-screen-cards");
            }

        },
        [SettingId.hfrAllowed]: function (value) {
            if (settings.hfrAllowed !== value) {
                settings.hfrAllowed = value;
            }
        },
        [SettingId.videoFocusToggle]: function (value) {

            if (settings.videoFocusToggle !== value) {
                settings.videoFocusToggle = value;
            }

            Api.checkTools();

        },
        [SettingId.videoScreenshot]: function (value) {

            if (settings.videoScreenshot !== value) {
                settings.videoScreenshot = value;
            }

            Api.checkTools();

        },
        [SettingId.videoThumbnail]: function (value) {

            if (settings.videoThumbnail !== value) {
                settings.videoThumbnail = value;
            }

            Api.checkTools();

        },
        [SettingId.monetizationInfo]: function (value) {

            if (settings.monetizationInfo !== value) {
                settings.monetizationInfo = value;
            }

            Api.checkTools();

        },
    }

    const onMessageListener = function (event) {

        if (!event?.data) {
            return;
        }

        for (let key in event.data) {
            Feature[key]?.(event.data?.[key]);
        }

    };

    const onDocumentClick = function (event) {

        const optionsButton = document.documentElement.querySelector(".iridium-options");
        const buttonClicked = optionsButton === event.target || optionsButton?.contains(event.target);

        if (!buttonClicked) {
            return;
        }

        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }

        broadcastChannel.postMessage({
            type: "action",
            payload: "extensionButton"
        });

    };

    window[Names.parseBypass] = function () {
        const parsed = JSON.parse.apply(this, arguments);
        window[Names.pageModifier](parsed);
        Api.iniPlayerConfig(parsed);
        return parsed;
    }

    window[Names.pageModifier] = function () {
        Api.iniSettingsButton(arguments);
        Api.iniPageAdManager(arguments);
        Api.iniExcludeShorts(arguments);
        Api.iniCreatorMerch(arguments);
        Api.iniInfoCards(arguments);
    };

    window[Names.navigationMod] = function (data) {
        try {
            const response = JSON.parse(data);
            window[Names.pageModifier](response);
            return JSON.stringify(response);
        } catch (ignore) {
            return data;
        }
    };

    window[Names.patchYtInitialData] = function (data) {
        window[Names.pageModifier](data);
    };

    window[Names.onAppReady] = function () {
        for (let featureKey in Feature) {
            const setting = settings?.[featureKey];
            if (setting !== undefined) {
                Feature?.[featureKey]?.(setting);
            }
        }
    };

    window[Names.patchApplicationCreate] = function (original) {
        return function () {

            const args = arguments?.["1"];

            Api.iniPlayerConfig(args);

            const created = original.apply(this, arguments);
            const moviePlayer = created?.["template"]?.["element"];

            if (moviePlayer?.["id"] === "movie_player") {

                const loadVideoByPlayerVars = created?.["loadVideoByPlayerVars"];
                const cueVideoByPlayerVars = created?.["cueVideoByPlayerVars"];

                created["loadVideoByPlayerVars"] = function () {

                    const args = arguments?.["0"];
                    Api.iniPlayerConfig(args);

                    if (window.location.pathname === "/watch" && !settings.autoplay) {
                        created?.["cueVideoByPlayerVars"]?.apply(this, arguments);
                    } else {
                        loadVideoByPlayerVars?.apply(this, arguments);
                    }

                }

                created["cueVideoByPlayerVars"] = function () {
                    const args = arguments?.["0"];
                    Api.iniPlayerConfig(args);
                    cueVideoByPlayerVars?.apply(this, arguments);
                }

                Api.onYTPCreated.forEach(callback => callback(moviePlayer));

            }

            return created;

        }
    };

    window.addEventListener("yt-page-data-updated", Api.onPageChanges, true);
    window.addEventListener("yt-navigate-start", Api.onPageChanges, false);
    window.addEventListener("yt-navigate-finish", Api.onPageChanges, false);
    window.addEventListener("popstate", Api.onPageChanges, true);

    document.documentElement.addEventListener("click", onDocumentClick, false);

    const broadcastChannel = new BroadcastChannel(extensionId);

    broadcastChannel.addEventListener("message", onMessageListener);

}