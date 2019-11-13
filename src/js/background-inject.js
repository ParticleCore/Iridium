"use strict";

window.main = function (
    broadcastId,
    settings
) {

    window.modArgs = function (args) {

        let i;
        let fps;
        let list;
        let keyType;

        if (!window.autoPlayVideo) {

            args.autoplay = "0";
            args.fflags = args.fflags.replace(
                /disable_new_pause_state3=true/g,
                "disable_new_pause_state3=false"
            );

        }

        if (!window.hfrOn &&
            args.adaptive_fmts
        ) {

            keyType = args.adaptive_fmts.indexOf(",") > -1 ? "," : "%2C";
            list = args.adaptive_fmts.split(keyType);

            for (i = 0; i < list.length; i++) {
                if ((fps = list[i].split(/fps(?:=|%3D)([0-9]{2})/))
                    && fps[1] > 30
                ) {
                    list.splice(i--, 1);
                }
            }

            args.adaptive_fmts = list.join(keyType);

        }

        return args;

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

        let src;
        let thumbnail;

        src = url.replace(/[a-z]+default(\.[a-z]+)/g, "maxresdefault$1");
        thumbnail = new Image();
        thumbnail.addEventListener("load", checkHighQualityThumbnail, false);
        thumbnail.src = src;
        thumbnail.url = url;
        thumbnail.element = element;

    };

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
                if ((config = getSingleObjectByKey(data, "player")) &&
                    config.args
                ) {
                    modArgs(config.args);
                }
            }

        }

    };

    window.modifier = function (
        api,
        ...args
    ) {

        window.streams = {
            adaptive_fmts: args[0].adaptive_fmts ? parseStreams(args[0].adaptive_fmts.split(",")) : "",
            url_encoded_fmt_stream_map: args[0].url_encoded_fmt_stream_map ? parseStreams(args[0].url_encoded_fmt_stream_map.split(",")) : ""
        };

        modArgs(args[0]);
        api.apply(this, args);

    };

    window.pageModifier = function (data) {

        if (!data) {
            return;
        }

        if (window.quickControls &&
            data.url &&
            data.url.indexOf("/watch") > -1
        ) {
            setQuickControls(getSingleObjectByKey(data, "topLevelButtons"));
        }

        if (window.iridiumLogo) {
            setExtensionButton(getSingleObjectByKey(data, "topbarButtons"));
        }

    };

    window.endpointExists = function (
        parent,
        chain
    ) {

        chain
            .split(".")
            .forEach(function (value) {

                if (!parent.hasOwnProperty(value)) {
                    return false;
                }

                parent = parent[value];

            });

        return parent;

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

    function parseStreams(list) {

        if (!list || !list.length) {
            return "";
        }

        let i;
        let j;
        let temp;
        let stream;
        let tempList;
        let contentLength;
        let processedList;

        processedList = [];

        for (i = 0; i < list.length; i++) {

            processedList.push((stream = {}));
            tempList = list[i].split("&");

            for (j = 0; j < tempList.length; j++) {

                temp = tempList[j].split("=");
                stream[temp[0]] = temp.length > 1 ? decodeURIComponent(temp[1]) : null;

            }

            if (stream.clen) {
                continue;
            }

            if (stream.url &&
                (contentLength = stream.url.match(/clen=(\d+)/))
            ) {
                stream.clen = contentLength[1];
            }

        }

        return processedList;

    }

    function checkHighQualityThumbnail(event) {
        if (event.target.width > 120) {

            event.target.element.parentElement.style.backgroundImage = `url(${event.target.url})`;
            event.target.element.style.backgroundImage = `url(${event.target.src})`;

        }
    }

    function setQuickControls(topLevelButtons) {

        if (!topLevelButtons) {
            return;
        }

        let key;
        let quickControls;

        quickControls = {
            AUTOPLAY: {
                injected: false,
                element: {
                    toggleButtonRenderer: {
                        isToggled: window.autoPlayVideo || false,
                        defaultTooltip: "Auto Play",
                        defaultIcon: {iconType: "AUTOPLAY"},
                        style: {styleType: "STYLE_TEXT"},
                        toggledStyle: {styleType: "STYLE_DEFAULT_ACTIVE"}
                    }
                }
            },
            SAVE_VIDEO: {
                injected: false,
                element: {
                    buttonRenderer: {
                        style: "STYLE_DEFAULT",
                        size: "SIZE_DEFAULT",
                        isDisabled: false,
                        icon: {iconType: "SAVE_VIDEO"},
                        tooltip: "Save"
                    }
                }
            },
            STREAM_LIST: {
                injected: false,
                element: {
                    buttonRenderer: {
                        style: "STYLE_DEFAULT",
                        size: "SIZE_DEFAULT",
                        isDisabled: false,
                        icon: {iconType: "STREAM_LIST"},
                        tooltip: "Streams"
                    }
                }
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
            if (!quickControls[key].injected) {
                topLevelButtons.push(quickControls[key].element);
            }
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

    function getSingleObjectByKey(
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

    }

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

    function getQualityLabel(
        label,
        verticalSize
    ) {

        let i;
        let qualityLabelList;
        let qualitySizeList;

        qualityLabelList = {
            tiny: 144,
            light: 144,
            small: 240,
            medium: 360,
            large: 480,
            hd720: 720,
            hd1080: 1080,
            hd1440: 1440,
            hd2160: 2160,
            hd2880: 2880,
            highres: 4320
        };

        qualitySizeList = [
            144,
            240,
            360,
            480,
            720,
            1080,
            1440,
            2160,
            2880,
            4320
        ];

        if (!verticalSize) {
            verticalSize = qualityLabelList[label];
        }

        i = qualitySizeList.length - 1;

        while (i--) {
            if (verticalSize > qualitySizeList[i]) {
                return verticalSize + "p";
            }
        }

    }

    function getBadge(quality) {

        if (quality > 2880) {
            return "8K";
        }

        if (quality > 2160) {
            return "5K";
        }

        if (quality > 1440) {
            return "4K";
        }

        if (quality > 720) {
            return "HD";
        }

        return "";

    }

    function buildTemplate(streamList) {

        let i;
        let template;
        let videoList;

        streamList.sort(function (
            previous,
            next
        ) {
            return next.quality - previous.quality || next.clen - previous.clen;
        });

        videoList = "";

        for (i = 0; i < streamList.length; i++) {

            if (!streamList[i].label) {
                continue;
            }

            videoList += `
                <div class="ytp-menuitem" style="color: #fff; text-decoration: none;">
                    <div class="ytp-menuitem-label">
                        <div style="display: flex; justify-content: space-between; white-space: nowrap;">
                            <span>${streamList[i].label} <sup class="ytp-swatch-color">${streamList[i].badge}</sup></span>
                        </div>
                    </div>
                    <div class="ytp-menuitem-content">
                        <span>${streamList[i].codec}.${streamList[i].fileType} </span>
                        <span class="ytp-menu-label-secondary">
                            <span>${streamList[i].size}</span>
                        </span>
                    </div>
                </div>`;

        }

        template = `
            <div data-iri-panel-target="type" id="iri-video-panel" class="ytp-panel ytp-quality-menu" style="width: 250px;">
                <div data-iri-panel-target="type" class="ytp-panel-header">
                     <button data-iri-panel-target="type" class="ytp-button ytp-panel-title">Video</button>
                </div>
                <div class="ytp-panel-menu">
                    ${videoList}
                </div>
            </div>`;

        return new DOMParser()
            .parseFromString(template, "text/html")
            .querySelector("#iri-video-panel");

    }

    function createNonDashPanel() {

        if (!window.streams.url_encoded_fmt_stream_map) {
            return null;
        }

        let i;
        let size;
        let codec;
        let label;
        let typeInfo;
        let streamList;

        streamList = [];

        for (i = 0; i < window.streams.url_encoded_fmt_stream_map.length; i++) {

            label = getQualityLabel(window.streams.url_encoded_fmt_stream_map[i].quality);
            typeInfo = window.streams.url_encoded_fmt_stream_map[i].type.split(/[\/;]/);
            codec = typeInfo.length > 2 ? typeInfo[2].split(/codecs="([a-z0-9]+)/) : "";
            size = window.streams.url_encoded_fmt_stream_map[i].url.match(/clen=([0-9]+)/);

            streamList.push({
                badge: "",
                codec: codec.length > 1 ? codec[1] : "",
                fileType: typeInfo.length > 0 ? typeInfo[1] : "",
                label: label,
                size: size && size.length > 1 ? formatSize(+size[1]) : "",
                url: window.streams.url_encoded_fmt_stream_map[i].url
            });

        }

        return buildTemplate(streamList);

    }

    function createDashAudioPanel() {

        if (!window.streams.adaptive_fmts) {
            return null;
        }

        let i;
        let codec;
        let label;
        let typeInfo;
        let streamList;

        streamList = [];

        for (i = 0; i < window.streams.adaptive_fmts.length; i++) {

            if (!window.streams.adaptive_fmts[i].type.startsWith("audio")) {
                continue;
            }

            label = Math.round(window.streams.adaptive_fmts[i].bitrate / 1000) + "kbps";
            typeInfo = window.streams.adaptive_fmts[i].type.split(/[\/;]/);
            codec = typeInfo.length > 2 ? typeInfo[2].split(/codecs="([a-z0-9]+)/) : "";

            streamList.push({
                badge: "",
                quality: window.streams.adaptive_fmts[i].bitrate,
                codec: codec.length > 1 ? codec[1] : "",
                fileType: typeInfo.length > 0 ? typeInfo[1] : "",
                type: typeInfo.length > -1 ? typeInfo[0] : "",
                label: label,
                clen: +window.streams.adaptive_fmts[i].clen,
                size: formatSize(+window.streams.adaptive_fmts[i].clen),
                url: window.streams.adaptive_fmts[i].url
            });

        }

        return buildTemplate(streamList);

    }

    function createDashVideoPanel() {

        if (!window.streams.adaptive_fmts) {
            return null;
        }

        let i;
        let label;
        let codec;
        let quality;
        let typeInfo;
        let streamList;

        streamList = [];

        for (i = 0; i < window.streams.adaptive_fmts.length; i++) {

            if (!window.streams.adaptive_fmts[i].type.startsWith("video")) {
                continue;
            }

            label = window.streams.adaptive_fmts[i].quality_label.replace(/\+/, " ");
            typeInfo = window.streams.adaptive_fmts[i].type.split(/[\/;]/);
            codec = typeInfo.length > 2 ? typeInfo[2].split(/codecs="([a-z0-9]+)/) : "";
            quality = window.parseInt(label);

            streamList.push({
                badge: getBadge(quality),
                codec: codec.length > 1 ? codec[1] : "",
                fileType: typeInfo.length > 0 ? typeInfo[1] : "",
                quality: quality || 0,
                label: label,
                fps: window.streams.adaptive_fmts[i].fps,
                clen: +window.streams.adaptive_fmts[i].clen,
                size: formatSize(+window.streams.adaptive_fmts[i].clen),
                url: window.streams.adaptive_fmts[i].url
            });

        }

        return buildTemplate(streamList);

    }

    function createTypePanel() {

        let i;
        let type;
        let typeAttribute;
        let typeList;
        let htmlTypeList;

        typeList = {
            Audio: 0,
            Video: 0,
            "Audio + Video": window.streams.url_encoded_fmt_stream_map ? window.streams.url_encoded_fmt_stream_map.length : 0
        };

        if (window.streams.adaptive_fmts) {
            for (i = 0; i < window.streams.adaptive_fmts.length; i++) {
                if (window.streams.adaptive_fmts[i].type.startsWith("video")) {
                    typeList.Video++;
                } else {
                    typeList.Audio++;
                }
            }
        }

        htmlTypeList = "";

        for (type in typeList) {

            if (!typeList[type]) {
                continue;
            }

            typeAttribute = `data-iri-panel-target="${type.toLowerCase()}"`;

            htmlTypeList += `
                <div ${typeAttribute} class="ytp-menuitem" aria-haspopup="true" style="color: #fff; text-decoration: none;">
                    <div ${typeAttribute} class="ytp-menuitem-label">
                        <div style="pointer-events: none; display: flex; justify-content: space-between; white-space: nowrap;">
                            <span>${type}</span>
                        </div>
                    </div>
                    <div ${typeAttribute} class="ytp-menuitem-content">
                        <span class="ytp-menu-label-secondary" style="pointer-events: none;">
                            <span>${typeList[type]}</span>
                        </span>
                    </div>
                </div>`;

        }

        return new DOMParser()
            .parseFromString(`
                <div id="iri-type-panel" class="ytp-panel" style="width: 250px;">
                    <div class="ytp-panel-menu">${htmlTypeList}</div>
                </div>`,
                "text/html"
            )
            .querySelector("#iri-type-panel");

    }

    function createStreamListMenu() {

        let container;

        container = document.createElement("div");
        container.id = "iri-stream-list";
        container.classList.add("ytp-popup", "ytp-settings-menu");

        return container;

    }

    function formatSize(size) {

        if (!size) {
            return "";
        }

        let pow;
        let transform;
        let sizeLabel;

        pow = 0;
        transform = size;

        while (transform > 1024) {

            pow++;
            transform /= 1024;

        }

        sizeLabel = [
            "B",
            "KB",
            "MB",
            "GB",
            "TB"
        ];

        pow = pow >= sizeLabel.length ? sizeLabel.length - 1 : pow;

        return (size / Math.pow(1024, pow))
            .toFixed(2) + " " + sizeLabel[pow];

    }

    function updateContainerSize(
        container,
        element
    ) {

        if (element) {

            element.style.height = container.style.height = (element.clientHeight > 300 ? 300 : element.clientHeight) + "px";
            element.style.width = container.style.width = (element.clientWidth < 250 ? 250 : element.clientWidth) + "px";

        }

    }

    function switchPanel(
        reverse,
        container,
        previousPanel,
        nextPanel
    ) {

        let element;
        let firstClass;
        let secondClass;

        firstClass = reverse ? "ytp-panel-animate-back" : "ytp-panel-animate-forward";
        secondClass = reverse ? "ytp-panel-animate-forward" : "ytp-panel-animate-back";

        if (nextPanel) {

            nextPanel.classList.add(firstClass);
            container.appendChild(nextPanel);
            element = nextPanel;

        }

        container.classList.add("ytp-popup-animating");

        updateContainerSize(container, element);

        if (previousPanel) {
            previousPanel.classList.add(secondClass);
        }

        if (nextPanel) {
            nextPanel.classList.remove(firstClass);
        }

        container.addEventListener("transitionend", function () {

            container.classList.remove("ytp-popup-animating");

            if (previousPanel) {

                previousPanel.classList.remove(secondClass);
                previousPanel.remove();

            }

        }, {once: true});

    }

    function toggleStreamListMenu(posX, posY) {

        let streamListContainer;
        let typePanel;
        let dashVideoPanel;
        let dashAudioPanel;
        let nonDashAudioPanel;
        let secondPanel;
        let clickListener;
        let resizeListener;

        if ((streamListContainer = document.getElementById("iri-stream-list"))) {
            return streamListContainer.remove();
        }

        typePanel = createTypePanel();
        nonDashAudioPanel = createNonDashPanel();
        dashAudioPanel = createDashAudioPanel();
        dashVideoPanel = createDashVideoPanel();
        streamListContainer = createStreamListMenu();
        streamListContainer.appendChild(typePanel);

        clickListener = function (event) {

            if (streamListContainer !== event.target &&
                !streamListContainer.contains(event.target)
            ) {

                streamListContainer.remove();
                document.documentElement.removeEventListener("click", clickListener, false);
                return;

            }

            switch (event.target.dataset.iriPanelTarget) {

                case "type":
                    switchPanel(true, streamListContainer, secondPanel, typePanel);
                    break;

                case "audio":
                    switchPanel(false, streamListContainer, typePanel, (secondPanel = dashAudioPanel));
                    break;

                case "video":
                    switchPanel(false, streamListContainer, typePanel, (secondPanel = dashVideoPanel));
                    break;

                case "audio + video":
                    switchPanel(false, streamListContainer, typePanel, (secondPanel = nonDashAudioPanel));
                    break;

            }

        };

        resizeListener = function () {

            streamListContainer.remove();
            document.documentElement.removeEventListener("click", clickListener, false);

        };

        window.addEventListener("resize", resizeListener, {once: true});
        document.documentElement.addEventListener("click", clickListener, false);
        document.body.appendChild(streamListContainer);

        updateContainerSize(streamListContainer, typePanel);

        streamListContainer.style.right = document.documentElement.clientWidth - posX + "px";
        streamListContainer.style.bottom = document.documentElement.clientHeight - posY + "px";

    }

    function onDocumentClick(event) {

        let key;
        let data;
        let element;

        if (!event.target.tagName.toLowerCase().startsWith("yt-icon") ||
            !(element = event.target.querySelector("[data-iri-feature]")) ||
            !(key = element.getAttribute("data-iri-feature"))
        ) {
            return;
        }

        if (document.activeElement &&
            document.activeElement.blur
        ) {
            document.activeElement.blur();
        }

        switch (key) {

            case "iridiumLogo":
                broadcastChannel.postMessage({
                    type: "action",
                    payload: "iridiumLogo"
                });
                return;

            case "saveVideo":
                return;

            case "streamList":
                toggleStreamListMenu(event.clientX, event.clientY);
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