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
                            <path d="M620-332.308h127.692V-460h-35.384v92.308H620v35.384ZM212.308-580h35.384v-92.308H340v-35.384H212.308V-580ZM360-160v-80H184.615Q157-240 138.5-258.5 120-277 120-304.615v-430.77Q120-763 138.5-781.5 157-800 184.615-800h590.77Q803-800 821.5-781.5 840-763 840-735.385v430.77Q840-277 821.5-258.5 803-240 775.385-240H600v80H360ZM184.615-280h590.77q9.23 0 16.923-7.692Q800-295.385 800-304.615v-430.77q0-9.23-7.692-16.923Q784.615-760 775.385-760h-590.77q-9.23 0-16.923 7.692Q160-744.615 160-735.385v430.77q0 9.23 7.692 16.923Q175.385-280 184.615-280ZM160-280v-480 480Z"/>
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
                            <path d="M224.615-160Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h510.77Q763-800 781.5-781.5 800-763 800-735.385v510.77Q800-197 781.5-178.5 763-160 735.385-160h-510.77Zm0-40h510.77q9.23 0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760h-510.77q-9.23 0-16.923 7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM200-200v-560 560Zm132.307-100h301.539q9.693 0 14.154-8.692 4.462-8.693-1.23-17.154L566-434.385q-5.231-6.461-12.923-6.461t-12.923 6.461l-91.692 115.923-57.077-69q-5.231-5.692-12.539-5.692t-12.538 6.461l-46.154 60.847q-6.462 8.461-2 17.154Q322.615-300 332.307-300ZM340-580q16.539 0 28.269-11.731Q380-603.461 380-620q0-16.539-11.731-28.269Q356.539-660 340-660q-16.539 0-28.269 11.731Q300-636.539 300-620q0 16.539 11.731 28.269Q323.461-580 340-580Z"/>
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
                            <path d="M480.134-120q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm-1 264.615q7.846 0 13.731-5.884 5.884-5.885 5.884-13.731v-27.308q43.077-3.615 82.539-30.923 39.461-27.307 39.461-84.769 0-42-25.538-71.615-25.538-29.616-97.538-55.616-66.154-23.077-84.539-39.615-18.385-16.539-18.385-47.154 0-30.615 23.885-51t63.5-20.385q24.615 0 43.077 9.693 18.461 9.692 31.538 25.538 4.616 5.846 11.347 8.423 6.73 2.577 12.928-.115 8.451-3.231 11.55-11.039 3.099-7.807-1.825-14.423-16-22.231-39.884-36.307-23.885-14.077-50.116-16.077V-725q0-7.846-5.884-13.731-5.885-5.884-13.731-5.884t-13.731 5.884q-5.884 5.885-5.884 13.731v27.308q-52.308 8.692-79.154 39-26.846 30.307-26.846 66.692 0 43.154 27.115 69.077Q409.615-497 474-473.692q64.538 23.769 86.731 42.923 22.192 19.154 22.192 52.769 0 42.231-30.808 60.808-30.807 18.577-66.115 18.577-31 0-56.038-15.962-25.039-15.962-42.116-44.808-4.154-7.077-11.769-9.384-7.615-2.308-14.365.465-7.27 2.774-10.645 10.539t.318 14.611q17.538 33.231 44.538 52.039 27 18.807 63.462 26.807V-235q0 7.846 5.884 13.731 5.885 5.884 13.731 5.884Z"/>
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

            if (!settings.videoScreenshot && !settings.videoThumbnail && !settings.monetizationInfo) {
                document.getElementById("iridium-player-tools")?.remove();
                return;
            }

            const playerTools = Api.checkPlayerTools();

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