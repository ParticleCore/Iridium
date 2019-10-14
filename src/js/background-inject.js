window.main = function (
    broadcastId,
    settings
) {

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

        if (!window.quickControls) {
            return;
        }

        let key;
        let quickControls;
        let topLevelButtons;

        topLevelButtons = window.getSingleObjectByKey(data, "topLevelButtons");

        if (!topLevelButtons) {
            return;
        }

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
                "toggleButtonRenderer": {
                    "isToggled": quickControls[key].isToggled,
                    "defaultTooltip": quickControls[key].label,
                    "defaultIcon": {"iconType": key},
                    "style": {"styleType": "STYLE_TEXT"},
                    "toggledStyle": {"styleType": "STYLE_DEFAULT_ACTIVE"}
                }
            });

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
                obj[property] === null
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
                obj[property] === null
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

        if (!window.quickControls) {
            return;
        }

        let key;
        let data;
        let element;

        if ("YT-ICON" !== event.target.tagName ||
            !(element = event.target.querySelector("[data-iri-feature]"))
        ) {
            return;
        }

        if (!(key = element.getAttribute("data-iri-feature")) ||
            !window.hasOwnProperty(key)
        ) {
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

            if ((svg = document.querySelector("[data-iri-feature=autoPlayVideo")) == null) {
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

    quickControlsFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("quickControls")) {
                return false;
            }

            if (settings.quickControls !== option.quickControls) {

                settings.quickControls = option.quickControls;
                window.quickControls = option.quickControls;

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

    hfrOnFeature = {
        belongs: function (option) {

            if (!option.hasOwnProperty("hfrOn")) {
                return false;
            }

            if (settings.hfrOn !== option.hfrOn) {

                settings.hfrOn = option.hfrOn;
                window.hfrOn = option.hfrOn;

            }

            return true;

        }
    };

    featureList = [
        quickControlsFeature,
        autoPlayVideoFeature,
        darkThemeFeature,
        maxResThumbnailFeature,
        hfrOnFeature
    ];

    if (!settings) {
        return;
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

window.pbjMod = function (data) {

    if (!data.response ||
        !data.response.parts ||
        !data.url.endsWith("pbj=1")
    ) {
        return;
    }

    // window.pageModifier(data);

    let config;

    if (!(config = window.getSingleObjectByKey(data, "player"))) {
        return;
    }

    if (window.autoPlayVideo &&
        config.args &&
        config.args.fflags
    ) {
        config.args.fflags = config.args.fflags.replace(
            /disable_new_pause_state3=true/g,
            "disable_new_pause_state3=false"
        );
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