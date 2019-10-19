"use strict";

window.main = function (
    broadcastId,
    settings
) {

    window.pbjMod = function (data) {

        if (!data.response ||
            !data.response.parts ||
            !data.url.endsWith("pbj=1")
        ) {
            return;
        }

        let i;
        let config;

        for (i = 0; i < data.response.parts.length; i++) {

            if ("endpoint" in data.response.parts[i]) {

                window.pageModifier(data.response.parts[i]);
                continue;

            }

            if (!window.autoPlayVideo &&
                !config &&
                "player" in data.response.parts[i]
            ) {
                config = window.getSingleObjectByKey(data, "player")
            }

        }

        if (!window.autoPlayVideo &&
            config &&
            config.args &&
            config.args.fflags
        ) {
            config.args.fflags = config.args.fflags.replace(
                /disable_new_pause_state3=true/g,
                "disable_new_pause_state3=false"
            );
        }

    };

    window.modifier = function (
        api,
        ...args
    ) {

        let i;
        let fps;
        let list;
        let keyType;

        if (!window.autoPlayVideo) {
            args[0].autoplay = "0";
        }

        if (!window.hfrOn &&
            args[0].adaptive_fmts
        ) {

            keyType = args[0].adaptive_fmts.indexOf(",") > -1 ? "," : "%2C";
            list = args[0].adaptive_fmts.split(keyType);

            for (i = 0; i < list.length; i++) {
                if ((fps = list[i].split(/fps(?:=|%3D)([0-9]{2})/))
                    && fps[1] > 30
                ) {
                    list.splice(i--, 1);
                }
            }

            args[0].adaptive_fmts = list.join(keyType);

        }

        api.apply(this, args);

    };

    window.pageModifier = function (data) {

        if (!data) {
            return;
        }

        function setQuickControls(topLevelButtons) {

            if (!topLevelButtons) {
                return;
            }

            let key;
            let quickControls;

            quickControls = {
                AUTOPLAY: {
                    label: "Auto Play",
                    isToggled: window.autoPlayVideo || false,
                    injected: false
                }
            };

            topLevelButtons.forEach(function (value) {
                if (value.hasOwnProperty("toggleButtonRenderer") &&
                    value.toggleButtonRenderer.defaultIcon &&
                    value.toggleButtonRenderer.defaultIcon.iconType &&
                    quickControls.hasOwnProperty(value.toggleButtonRenderer.defaultIcon.iconType)
                ) {
                    quickControls[value.toggleButtonRenderer.defaultIcon.iconType].injected = true;
                }
            });

            for (key in quickControls) {

                if (quickControls[key].injected) {
                    continue;
                }

                topLevelButtons.push({
                    toggleButtonRenderer: {
                        isToggled: quickControls[key].isToggled,
                        defaultTooltip: quickControls[key].label,
                        defaultIcon: {iconType: key},
                        style: {styleType: "STYLE_TEXT"},
                        toggledStyle: {styleType: "STYLE_DEFAULT_ACTIVE"}
                    }
                });

            }

        }

        function setExtensionButton(topBarButtons) {

            if (!topBarButtons) {
                return;
            }

            let alreadySet;

            topBarButtons.forEach(function (value) {
                if (value.hasOwnProperty("topbarMenuButtonRenderer") &&
                    value.topbarMenuButtonRenderer.icon &&
                    value.topbarMenuButtonRenderer.icon.iconType === "IRIDIUM_LOGO"
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
                    tooltip: "Iridium settings",
                    style: "STYLE_DEFAULT"
                }
            });

        }

        if (window.quickControls &&
            data.url &&
            data.url.indexOf("/watch") > -1
        ) {
            setQuickControls(window.getSingleObjectByKey(data, "topLevelButtons"));
        }

        if (window.iridiumLogo) {
            setExtensionButton(window.getSingleObjectByKey(data, "topbarButtons"));
        }

    };

    window.endpointExists = function (
        parent,
        chain
    ) {

        chain.split(".").forEach(function (value) {

            if (!parent.hasOwnProperty(value)) {
                return false;
            }

            parent = parent[value];

        });

        return parent;

    };

    window.getSingleObjectByKey = function (
        obj,
        keys,
        match
    ) {

        let i;
        let hasKey;
        let result;

        for (let property in obj) {

            if (!obj.hasOwnProperty(property) ||
                obj[property] === null ||
                obj[property] === undefined
            ) {
                continue;
            }

            if ((hasKey = keys.constructor.name === "String" ? keys === property : keys.indexOf(property) > -1) &&
                (!match || obj[property].constructor.name !== "Object" && match(obj[property], obj))
            ) {
                return obj[property];
            }

            if (obj[property].constructor.name === "Object") {
                if ((result = getSingleObjectByKey(obj[property], keys, match))) {
                    return result;
                }
            } else if (obj[property].constructor.name === "Array") {
                for (i = 0; i < obj[property].length; i++) {
                    if ((result = getSingleObjectByKey(obj[property][i], keys, match))) {
                        return result;
                    }
                }
            }

        }

    };

    window.getObjectByKey = function (
        obj,
        keys,
        match,
        list,
        pos
    ) {

        let i;
        let hasKey;
        let results;

        results = [];

        for (let property in obj) {

            if (!obj.hasOwnProperty(property) ||
                obj[property] === null ||
                obj[property] === undefined
            ) {
                continue;
            }

            if ((hasKey = keys.constructor.name === "String" ? keys === property : keys.indexOf(property) > -1) &&
                (!match || typeof obj[property] !== "object" && match(obj[property], obj))
            ) {
                results.push({
                    target: obj,
                    property: property,
                    list: list,
                    pos: pos
                });
            } else if (obj[property]) {

                if (obj[property].constructor === Object) {
                    results = results.concat(getObjectByKey(obj[property], keys, match, list, pos));
                } else if (obj[property].constructor === Array) {
                    for (i = 0; i < obj[property].length; i++) {
                        results = results.concat(getObjectByKey(obj[property][i], keys, match, obj[property], i));
                    }
                }

            }

        }

        return results;

    };

    let broadcastChannel;
    let featureList;
    let iridiumLogoFeature;
    let quickControlsFeature;
    let autoPlayVideoFeature;
    let darkThemeFeature;
    let maxResThumbnailFeature;
    let hfrOnFeature;

    function onMessageListener(event) {

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

    function onDocumentClick(event) {

        let key;
        let data;
        let element;

        if ("YT-ICON" !== event.target.tagName ||
            !(element = event.target.querySelector("[data-iri-feature]")) ||
            !(key = element.getAttribute("data-iri-feature"))
        ) {
            return;
        }

        if (key === "iridiumLogo") {

            broadcastChannel.postMessage({
                type: "action",
                payload: "iridiumLogo"
            });
            return;

        }

        if (!window.hasOwnProperty(key)) {
            return;
        }

        data = {};
        data[key] = !window[key];

        broadcastChannel.postMessage({
            type: "setting-update",
            payload: data
        });

    }

    broadcastChannel = new BroadcastChannel(broadcastId);
    broadcastChannel.addEventListener("message", onMessageListener);

    document.documentElement.addEventListener("click", onDocumentClick, false);

    autoPlayVideoFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("autoPlayVideo")) {
                return false;
            }

            if (settings.autoPlayVideo === option.autoPlayVideo) {
                return true;
            }

            let svg;
            let parent;

            settings.autoPlayVideo = option.autoPlayVideo;
            window.autoPlayVideo = option.autoPlayVideo;

            if ((svg = document.querySelector("#top-level-buttons [data-iri-feature=autoPlayVideo]")) == null) {
                return true;
            }

            parent = svg.parentElement;

            while (parent !== null) {

                if ("YT-ICON-BUTTON" === parent.tagName ||
                    "YTD-TOGGLE-BUTTON-RENDERER" === parent.tagName
                ) {

                    parent.classList.add(window.autoPlayVideo ? "style-default-active" : "style-text");
                    parent.classList.remove(window.autoPlayVideo ? "style-text" : "style-default-active");

                }

                if ("YTD-TOGGLE-BUTTON-RENDERER" === parent.tagName) {
                    break;
                }

                parent = parent.parentElement;

            }

            return true;

        }
    };

    iridiumLogoFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("iridiumLogo")) {
                return false;
            }

            if (settings.iridiumLogo !== option.iridiumLogo) {
                window.iridiumLogo = settings.iridiumLogo = option.iridiumLogo;
            }

            return true;

        }
    };

    quickControlsFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("quickControls")) {
                return false;
            }

            if (settings.quickControls !== option.quickControls) {
                window.quickControls = settings.quickControls = option.quickControls;
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
                window.maxResThumbnail = settings.maxResThumbnail = option.maxResThumbnail;
            }

            return true;

        }
    };

    hfrOnFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("hfrOn")) {
                return false;
            }

            if (settings.hfrOn !== option.hfrOn) {
                window.hfrOn = settings.hfrOn = option.hfrOn;
            }

            return true;

        }
    };

    featureList = [
        iridiumLogoFeature,
        quickControlsFeature,
        autoPlayVideoFeature,
        darkThemeFeature,
        maxResThumbnailFeature,
        hfrOnFeature
    ];

    if (!settings) {
        return;
    }

    if (settings.hasOwnProperty("iridiumLogo")) {
        window.iridiumLogo = settings.iridiumLogo;
    }

    if (settings.hasOwnProperty("quickControls")) {
        window.quickControls = settings.quickControls;
    }

    if (settings.hasOwnProperty("autoPlayVideo")) {
        window.autoPlayVideo = settings.autoPlayVideo;
    }

    if (settings.hasOwnProperty("maxResThumbnail")) {
        window.maxResThumbnail = settings.maxResThumbnail;
    }

    if (settings.hasOwnProperty("hfrOn")) {
        window.hfrOn = settings.hfrOn;
    }

};

window.imageLoader = function (
    element,
    url
) {

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

};