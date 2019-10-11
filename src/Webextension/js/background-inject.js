window.main = function (
    broadcastId,
    settings
) {

    let broadcastChannel;
    let featureList;
    let autoPlayVideoFeature;
    let darkThemeFeature;
    let maxResThumbnailFeature;
    let hfrOnFeature;

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
        autoPlayVideoFeature,
        darkThemeFeature,
        maxResThumbnailFeature,
        hfrOnFeature
    ];

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

    if (!settings) {
        return;
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

};