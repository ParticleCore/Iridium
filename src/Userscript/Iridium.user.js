// ==UserScript==
// @version         0.1.5a
// @name            Iridium
// @namespace       https://github.com/ParticleCore
// @description     YouTube with more freedom
// @compatible      firefox
// @compatible      opera
// @icon            https://raw.githubusercontent.com/ParticleCore/Iridium/gh-pages/images/i-icon.png
// @match           *://www.youtube.com/*
// @exclude         *://www.youtube.com/tv*
// @exclude         *://www.youtube.com/embed/*
// @exclude         *://www.youtube.com/live_chat*
// @run-at          document-start
// @homepageURL     https://github.com/ParticleCore/Iridium
// @supportURL      https://github.com/ParticleCore/Iridium/wiki
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UMVQJJFG4BFHW
// @grant           GM_getValue
// @grant           GM_setValue
// @noframes
// ==/UserScript==
(function () {
    "use strict";

    var iridium = {

        inject: function(is_userscript) {

            var i18n;
            var modules;
            var iridium_api;
            var options_order;
            var user_settings;

            options_order = {
                general: [],
                video: [
                    "player",
                    [],
                    "channel",
                    []
                ],
                about: []
            };

            i18n = {
                language: "English (US)",
                section_titles: {
                    general: "general settings",
                    video: "video settings",
                    about: "information and useful links",
                    settings: "iridium settings"
                },
                sub_section_titles: {
                    layout: "layout",
                    thumbnails: "thumbnails",
                    player: "player",
                    channel: "channel",
                    general: "general"
                },
                iridium_api: {
                    settings_button: "Iridium settings"
                },
                square_avatars: {
                    label: "Make user images squared"
                },
                thumbnail_preview: {
                    label: "Preview videos by hovering the thumbnails"
                },
                player_auto_play: {
                    label: "Play videos automatically"
                },
                channel_trailer_auto_play: {
                    label: "Play channel trailers automatically"
                },
                player_ads: {
                    label: "Allow ads on videos"
                },
                subscribed_channel_player_ads: {
                    label: "Allow ads only on videos of subscribed channels"
                },
                player_hfr: {
                    label: "Allow HFR (60fps) streams"
                },
                player_volume_wheel: {
                    label: "Change volume using the mouse wheel"
                },
                iridium_language: {
                    label: "Current language: "
                }
            };

            modules = [
                {
                    options: {
                        square_avatars: {
                            id:          "square_avatars",
                            section:     "general",
                            sub_section: i18n.sub_section_titles.layout,
                            type:        "checkbox",
                            value:       true,
                            label:       i18n.square_avatars.label
                        }
                    },
                    ini: function() {

                        var key;

                        if (this.started) {
                            return;
                        }

                        this.started = true;

                        for (key in this.options) {
                            if (this.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = this.options[key].value;
                                }
                            }
                        }

                        if (user_settings.square_avatars) {
                            document.documentElement.classList.add("iri-square-avatars");
                        } else {
                            document.documentElement.classList.remove("iri-square-avatars");
                        }
                    }
                }, {
                    options: {
                        thumbnail_preview: {
                            id:          "thumbnail_preview",
                            section:     "general",
                            sub_section: i18n.sub_section_titles.thumbnails,
                            type:        "checkbox",
                            value:       false,
                            label:       i18n.thumbnail_preview.label
                        }
                    },
                    setPreviewArgs: function(args) {
                        args.autoplay = 1;
                        args.controls = "0";
                        args.enablecastapi = "0";
                        args.iv_load_policy = "3";
                        args.modestbranding = "1";
                        args.mute = "1";
                        args.player_wide = "0";
                        args.rel = "0";
                        args.showinfo = "0";
                        args.vq = "small";

                        delete args.ad3_module;
                        delete args.baseUrl;
                        delete args.iv_endscreen_url;
                        delete args.ppv_remarketing_url;
                        delete args.probe_url;
                        delete args.remarketing_url;
                        delete args.videostats_playback_base_url;
                    },
                    iniPreview: function(context, event) {

                        var i;
                        var args;
                        var temp;
                        var config;
                        var data_list;

                        delete context.getPreviewArgs.request;

                        args = {};
                        data_list = event.target.responseText.split("&");

                        for (i = 0; i < data_list.length; i++) {
                            temp = data_list[i].split("=");
                            args[temp[0]] = window.decodeURIComponent(temp[1]);
                        }

                        context.setPreviewArgs(args);

                        config = JSON.parse(JSON.stringify(window.yt.config_.FILLER_DATA.player));
                        config.args = args;
                        config.attrs.id = "iri-preview-player";

                        window.yt.player.Application.create("iri-video-preview", config);
                    },
                    getPreviewArgs: function(video_id) {

                        var xhr;
                        var sts;
                        var params;
                        var context;

                        context = this;
                        sts = window.yt.config_.FILLER_DATA.player.sts;

                        params = [
                            "video_id=" + video_id,
                            "sts=" + sts,
                            "ps=gaming",
                            "el=detailpage",
                            "c=WEB_GAMING",
                            "cplayer=UNIPLAYER",
                            "mute=true",
                            "authuser=0"
                        ];

                        xhr = new XMLHttpRequest();
                        xhr.addEventListener("load", function(event) {
                            context.iniPreview(context, event);
                        });

                        xhr.open("GET", "/get_video_info?" + params.join("&"), true);
                        xhr.send();
                        return xhr;
                    },
                    endPreviewContainer: function(context, event, container, listener, xhr, timer, video_container, clicked) {

                        var video_container;

                        if (clicked || !container.parentNode.contains(event.toElement || event.relatedTarget)) {
                            container.parentNode.removeEventListener("click", listener, false);
                            container.parentNode.removeEventListener("mouseleave", listener, false);

                            if (timer) {
                                window.clearInterval(timer);
                            }

                            if ((video_container = document.getElementById("iri-video-preview"))) {
                                if (xhr) {
                                    xhr.abort();
                                }

                                if (video_container.firstChild) {
                                    video_container.firstChild.destroy();
                                }
                            }

                            if (clicked && video_container) {
                                video_container.remove();
                            }
                        }
                    },
                    iniPreviewContainer: function(event) {

                        var xhr;
                        var timer;
                        var context;
                        var video_id;
                        var container;
                        var video_container;

                        if (user_settings.thumbnail_preview) {

                            container = event.target;
                            video_id = container.dataHost && container.dataHost.data && container.dataHost.data.videoId;

                            if (container.tagName === "YT-IMG-SHADOW" && video_id && !container.querySelector("#iri-preview-player")) {

                                if (!(video_container = document.getElementById("iri-video-preview"))) {
                                    video_container = document.createElement("iri-video-preview");
                                    video_container.id = "iri-video-preview";
                                    video_container.setAttribute("class", "ytp-small-mode");
                                }

                                if (video_container.parentNode !== container) {
                                    container.appendChild(video_container);
                                }

                                context = this;

                                if (!window.yt || !window.yt.player || !window.yt.player.Application || !window.yt.player.Application.create) {
                                    timer = window.setInterval(function() {
                                        if (window.yt && window.yt.player && window.yt.player.Application && window.yt.player.Application.create) {
                                            window.clearInterval(timer);
                                            xhr = context.getPreviewArgs(video_id);
                                        }
                                    });
                                } else {
                                    xhr = context.getPreviewArgs(video_id);
                                }

                                container.parentNode.addEventListener("click", function listener(event) {
                                    context.endPreviewContainer(context, event, container, listener, xhr, timer, video_container, true);
                                }, false);

                                container.parentNode.addEventListener("mouseleave", function listener(event) {
                                    context.endPreviewContainer(context, event, container, listener, xhr, timer);
                                }, false);
                            }
                        }
                    },
                    ini: function() {

                        var key;

                        if (this.started) {
                            return;
                        }

                        this.started = true;

                        for (key in this.options) {
                            if (this.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = this.options[key].value;
                                }
                            }
                        }

                        document.addEventListener("mouseenter", this.iniPreviewContainer.bind(this), true);
                    }
                }, {
                    options: {
                        player_auto_play: {
                            id:          "player_auto_play",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.player,
                            type:        "checkbox",
                            value:       false,
                            label:       "Play videos automatically"
                        },
                        channel_trailer_auto_play: {
                            id:          "channel_trailer_auto_play",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.channel,
                            type:        "checkbox",
                            value:       false,
                            label:       "Play channel trailers automatically"
                        }, 
                        player_ads: {
                            id:          "player_ads",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.player,
                            type:        "checkbox",
                            value:       false,
                            label:       "Allow ads on videos"
                        },
                        subscribed_channel_player_ads: {
                            id:          "subscribed_channel_player_ads",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.player,
                            type:        "checkbox",
                            value:       false,
                            label:       "Allow ads only on videos of subscribed channels"
                        },
                        player_hfr: {
                            id:          "player_hfr",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.player,
                            type:        "checkbox",
                            value:       true,
                            label:       "Allow HFR (60fps) streams"
                        }
                    },
                    modArgs: function(args) {

                        var i;
                        var list;
                        var temp;

                        if (user_settings.subscribed_channel_player_ads ? args.subscribed !== "1" : !user_settings.player_ads) {
                            delete args.ad3_module;
                        }

                        if (args.adaptive_fmts && !user_settings.player_hfr) {
                            list = args.adaptive_fmts.split(",");

                            for (i = 0; i < list.length; i++) {
                                temp = list[i].split(/fps=([0-9]{2})/);
                                temp = temp && temp[1];

                                if (temp > 30) {
                                    list.splice(i--, 1);
                                }
                            }

                            args.adaptive_fmts = list.join(",");
                        }
                    },
                    modVideoByPlayerVars: function(original) {

                        var context = this;

                        return function(args) {
                            context.modArgs(args);
                            return original.apply(this, arguments);
                        };
                    },
                    modJSONParse: function(original) {

                        var context = this;

                        return function(text, reviver) {

                            var temp = original.apply(this, arguments);

                            if (temp && temp.player && temp.player.args) {
                                context.modArgs(temp.player.args);
                            }

                            return temp;
                        };
                    },
                    isChannel: function() {
                        return /^\/(user|channel)\//.test(window.location.pathname);
                    },
                    ini: function() {

                        var key;
                        var context;

                        if (this.started) {
                            return;
                        }

                        this.started = true;

                        for (key in this.options) {
                            if (this.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = this.options[key].value;
                                }
                            }
                        }

                        context = this;

                        JSON.parse = context.modJSONParse(JSON.parse);

                        Object.defineProperties(Object.prototype, {
                            cueVideoByPlayerVars: {
                                set: function(data) { this._cueVideoByPlayerVars = data; },
                                get: function() { return context.modVideoByPlayerVars(this._cueVideoByPlayerVars); }
                            },
                            loadVideoByPlayerVars: {
                                set: function(data) { this._loadVideoByPlayerVars = data; },
                                get: function() {

                                    if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {
                                        return this.cueVideoByPlayerVars;
                                    }

                                    return context.modVideoByPlayerVars(this._loadVideoByPlayerVars);
                                }
                            },
                            TIMING_AFT_KEYS: {
                                set: function(data) { this._TIMING_AFT_KEYS = data; },
                                get: function() {

                                    var key;

                                    if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {

                                        if (window.ytcsi && window.ytcsi.data_ && window.ytcsi.data_.tick) {
                                            for (key in window.ytcsi.data_.tick) {
                                                return [key];
                                            }
                                        } else {
                                            return ["srt"];
                                        }
                                    }

                                    return this._TIMING_AFT_KEYS;
                                }
                            },
                            loaded: {
                                set: function(data) { this._loaded = data; },
                                get: function() {

                                    if (this.args && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                        return false;
                                    }

                                    return this._loaded;
                                }
                            },
                            load: {
                                set: function(data) { this._load = data; },
                                get: function() {

                                    var temp = this._load && this._load.toString();

                                    if (temp && temp.match("Application.create")) {
                                        context.modArgs(window.ytplayer.config.args);
                                    }

                                    return this._load;
                                }
                            },
                            autoplay: {
                                set: function(data) { this._autoplay = data; },
                                get: function() {

                                    if (this.ucid && this._autoplay === "1" && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                        return "0";
                                    }

                                    return this._autoplay;
                                }
                            },
                            fflags: {
                                set: function(data) { this._fflags = data; },
                                get: function() {

                                    if (this.ucid && (!this.autoplay || this.autoplay === "1") && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                        return this._fflags
                                            .replace(
                                                "legacy_autoplay_flag=true",
                                                "legacy_autoplay_flag=false"
                                            ).replace(
                                                "disable_new_pause_state3=true",
                                                "disable_new_pause_state3=false"
                                            );
                                    }

                                    return this._fflags;
                                }
                            }
                        });
                    }
                }, {
                    options: {
                        player_volume_wheel: {
                            id:          "player_volume_wheel",
                            section:     "video",
                            sub_section: i18n.sub_section_titles.player,
                            type:        "checkbox",
                            value:       false,
                            label:       i18n.player_volume_wheel.label
                        }
                    },
                    changeVolume: function(event) {

                        var api;
                        var player;
                        var direction;
                        var timestamp;
                        var can_scroll;
                        var new_volume;
                        var player_state;
                        var chrome_bottom;
                        var invideo_drawer;
                        var player_settings;
                        var fullscreen_playlist;

                        api = document.getElementById("movie_player");
                        player = document.querySelector("video");
                        invideo_drawer = document.querySelector(".iv-drawer");
                        player_settings = document.querySelector(".ytp-settings-menu");
                        fullscreen_playlist = document.querySelector(".ytp-playlist-menu");
                        can_scroll = (!fullscreen_playlist || !fullscreen_playlist.contains(event.target)) && (!invideo_drawer || !invideo_drawer.contains(event.target)) && (!player_settings || !player_settings.contains(event.target));

                        if (can_scroll && player && api && api.contains(event.target)) {

                            player_state = api.getPlayerState();

                            if (player_state > 0 && player_state < 5) {

                                event.preventDefault();
                                chrome_bottom = document.querySelector(".ytp-chrome-bottom");

                                if (chrome_bottom) {

                                    if (!chrome_bottom.classList.contains("ytp-volume-slider-active")) {
                                        chrome_bottom.classList.add("ytp-volume-slider-active");
                                    }

                                    if (chrome_bottom.timer) {
                                        window.clearTimeout(chrome_bottom.timer);
                                    }

                                    api.dispatchEvent(new Event("mousemove"));

                                    chrome_bottom.timer = window.setTimeout(function() {
                                        if (chrome_bottom && chrome_bottom.classList.contains("ytp-volume-slider-active")) {
                                            chrome_bottom.classList.remove("ytp-volume-slider-active");
                                            delete chrome_bottom.timer;
                                        }
                                    }, 4000);
                                }

                                direction = event.deltaY || event.wheelDeltaY;
                                new_volume = api.getVolume() - (Math.sign(direction) * 5);

                                if (new_volume < 0) {
                                    new_volume = 0;
                                } else if (new_volume > 100) {
                                    new_volume = 100;
                                }

                                api.setVolume(new_volume);

                                timestamp = Date.now();

                                window.localStorage.setItem(
                                    "yt-player-volume",
                                    JSON.stringify({
                                        creation: timestamp,
                                        data: JSON.stringify({
                                            volume: new_volume,
                                            muted: false
                                        }),
                                        expiration: timestamp + 2592E6
                                    })
                                );

                                return false;
                            }
                        }
                    },
                    ini: function() {

                        var key;

                        if (this.started) {
                            return;
                        }

                        this.started = true;

                        for (key in this.options) {
                            if (this.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = this.options[key].value;
                                }
                            }
                        }

                        if (user_settings.player_volume_wheel) {
                            document.addEventListener("wheel", this.changeVolume.bind(this));
                        }
                    }
                }, {
                    options: {
                        about: {
                            id:      "about",
                            section: "about",
                            type:    "custom"
                        }
                    }
                }, {
                    options: {
                        iridium_language: {
                            id:          "iridium_language",
                            section:     "settings",
                            sub_section: i18n.sub_section_titles.general,
                            type:        "custom",
                            value:       function() {

                                var element;
                                var element_list;

                                element_list = [];

                                element = document.createElement("div");
                                element.setAttribute("class", "setting");
                                element.textContent = i18n.iridium_language.label;

                                element_list.push(element);

                                element = document.createElement("button");
                                element.setAttribute("class", "setting");
                                element.textContent = i18n.language;
                                element.addEventListener("click", this.languageEditor.bind(this));

                                element_list.push(element);

                                return element_list;
                            },
                            languageEditor: function(event) {

                                var editor;
                                var button;
                                var textarea;
                                var buttons_section;

                                if (!(editor = document.getElementById("iridium-i18n-editor"))) {
                                    editor = document.createElement("div");
                                    editor.id = "iridium-i18n-editor";
                                    document.body.appendChild(editor);
                                }

                                buttons_section = document.createElement("div");
                                buttons_section.id = "buttons-section";

                                button = document.createElement("button");
                                button.textContent = "Save";

                                buttons_section.appendChild(button);

                                button = document.createElement("button");
                                button.textContent = "Cancel";
                                button.addEventListener("click", function() {
                                    editor.remove();
                                });

                                buttons_section.appendChild(button);

                                textarea = document.createElement("textarea");
                                textarea.value = JSON.stringify(i18n, null, 4);

                                editor.appendChild(buttons_section);
                                editor.appendChild(textarea);
                            }
                        }
                    },
                    ini: function() {
                        // check for language update
                    }
                }
            ];

            iridium_api = {
                fillSettingsContainer: function(options_list) {

                    var i;
                    var j;
                    var temp;
                    var label;
                    var header;
                    var option;
                    var section;
                    var setting;
                    var sub_section;

                    if (!(section = document.getElementById("settings_sub_section"))) {
                        return;
                    }

                    section.innerHTML = "";

                    if ((header = document.getElementById("settings_section_header"))) {
                        header.textContent = i18n.section_titles[options_list[0].section];
                    }

                    for (i = 0; i < options_list.length; i++) {

                        option = options_list[i];

                        if (!(sub_section = document.getElementById(option.sub_section))) {
                            sub_section = document.createElement("div");
                            sub_section.id = option.sub_section;

                            header = document.createElement("h3");
                            header.textContent = option.sub_section;

                            sub_section.appendChild(header);
                            section.appendChild(sub_section);
                        }

                        setting = document.createElement("div");
                        setting.setAttribute("class", "settings_setting");

                        switch (option.type) {
                            case "checkbox":
                                input = document.createElement("input");
                                input.setAttribute("class", "setting");
                                input.id = option.id;
                                input.type = option.type;
                                input.checked = user_settings[option.id];

                                label = document.createElement("label");
                                label.setAttribute("class", "setting");
                                label.setAttribute("for", option.id);
                                label.textContent = option.label;

                                setting.appendChild(input);
                                setting.appendChild(label);
                                break;
                            case "custom":

                                if (option.value) {
                                    temp = option.value();

                                    for (j = 0; j < temp.length; j++) {
                                        setting.appendChild(temp[j]);
                                    }
                                }

                                break;
                        }

                        sub_section.appendChild(setting);
                    }
                },
                loadSelectedSection: function() {

                    var option;
                    var active_id;
                    var options_list;
                    var active_sidebar;

                    if (!(active_sidebar = document.querySelector(".sidebar_section.active_sidebar"))) {
                        return;
                    }

                    active_id = active_sidebar.dataset.section;

                    options_list = [];

                    for (i = 0; i < modules.length; i++) {
                        if (modules[i].options) {
                            for (name in modules[i].options) {
                                if (modules[i].options.hasOwnProperty(name)) {
                                    option = modules[i].options[name];
                                    if (option.section === active_id) {
                                        options_list.push(option);
                                    }
                                }
                            }
                        }
                    }

                    iridium_api.fillSettingsContainer(options_list);
                },
                updateSidebarSelection: function(event) {

                    var next;
                    var current;
                    var sidebar_next;
                    var sidebar_current;

                    if (event.target.dataset.section) {
                        current = document.querySelector(".active_sidebar");
                        next = document.getElementById("sidebar_" + event.target.dataset.section);

                        if (next !== current) {

                            if ((sidebar_current = document.querySelector(".active_sidebar"))) {
                                sidebar_current.classList.remove("active_sidebar");
                            }

                            event.target.classList.add("active_sidebar");

                            iridium_api.loadSelectedSection();
                        }
                    }
                },
                settingsBuilder: function(option) {

                    var header;
                    var divider;
                    var section;
                    var sub_section;
                    var active_sidebar;
                    var sidebar_section;
                    var settings_sidebar;
                    var settings_container;

                    if (!(settings_sidebar = document.getElementById("iridium_settings_sidebar"))) {
                        settings_sidebar = document.createElement("div");
                        settings_sidebar.id = "iridium_settings_sidebar";

                        document.body.appendChild(settings_sidebar);
                    }

                    if (!(sidebar_section = document.getElementById("sidebar_" + option.section))) {
                        sidebar_section = document.createElement("div");
                        sidebar_section.id = "sidebar_" + option.section;
                        sidebar_section.setAttribute("class", "sidebar_section");
                        sidebar_section.dataset.section = option.section;
                        sidebar_section.textContent = option.section;

                        settings_sidebar.appendChild(sidebar_section);
                    }

                    if (!(settings_container = document.getElementById("iridium_settings_container"))) {
                        settings_container = document.createElement("div");
                        settings_container.id = "iridium_settings_container";

                        if (!(section = document.getElementById("settings_section"))) {
                            section = document.createElement("div");
                            section.id = "settings_section";

                            section.addEventListener("change", iridium_api.autoSaveSettings, true);

                            header = document.createElement("h2");
                            header.id = "settings_section_header";

                            divider = document.createElement("div");
                            divider.setAttribute("class", "settings_divider");

                            section.appendChild(header);
                            section.appendChild(divider);

                            settings_container.appendChild(section);
                        }

                        if (!(sub_section = document.getElementById("settings_sub_section"))) {
                            sub_section = document.createElement("div");
                            sub_section.id = "settings_sub_section";

                            section.appendChild(sub_section);
                        }

                        document.body.appendChild(settings_container);
                    }

                    if (!(active_sidebar = document.querySelector(".active_sidebar"))) {
                        sidebar_section.classList.add("active_sidebar");
                    }
                },
                loadSettingsMenu: function() {

                    var i;
                    var name;
                    var title;
                    var anchor;
                    var option;
                    var container;
                    var new_option;

                    if (document.head) {
                        document.head.textContent = "";
                    } else {
                        document.documentElement.appendChild(document.createElement("head"));
                    }

                    if (document.body) {
                        document.body.textContent = "";
                    } else {
                        document.documentElement.appendChild(document.createElement("body"));
                    }

                    if (!(title = document.querySelector("title"))) {
                        title = document.createElement("title");
                        document.head.appendChild(title);
                    }

                    title.textContent = "Iridium settings";

                    document.body.id = "iridium_settings";
                    document.body.style.display = "none";

                    for (i = 0; i < modules.length; i++) {
                        if (modules[i].options) {
                            for (name in modules[i].options) {
                                if (modules[i].options.hasOwnProperty(name)) {
                                    option = modules[i].options[name];
                                    iridium_api.settingsBuilder(option);
                                }
                            }
                        }
                    }

                    document.addEventListener("click", iridium_api.updateSidebarSelection);

                    iridium_api.loadSelectedSection();
                },
                autoSaveSettings: function(event) {

                    switch (event.target.type) {
                        case "checkbox":
                            user_settings[event.target.id] = event.target.checked;
                            break;
                    }

                    iridium_api.saveSettings();
                },
                saveSettings: function(id, value) {
                    document.documentElement.dataset.iridium_save_settings = JSON.stringify(user_settings);
                },
                initializeSettings: function() {

                    var i;
                    var option;
                    var options;

                    user_settings = JSON.parse(document.documentElement.dataset.iridium_user_settings || null) || {};

                    if (document.documentElement.dataset.iridium_user_settings) {
                        document.documentElement.removeAttribute("data-iridium_user_settings");
                    }

                    for (i = 0; i < modules.length; i++) {
                        for (options in modules[i].options) {
                            option = modules[i].options[options];

                            if (!(option.id in user_settings)) {
                                user_settings[option.id] = option.value;
                            }
                        }
                    }
                },
                initializeSettingsButton: function() {

                    var buttons;
                    var iridium_settings_button;

                    buttons = document.querySelector("#end #buttons");

                    if (buttons && !(iridium_settings_button = document.getElementById("iridium_settings_button"))) {
                        iridium_settings_button           = document.createElement("a");
                        iridium_settings_button.id        = "iridium_settings_button";
                        iridium_settings_button.href      = "/iridium-settings";
                        iridium_settings_button.target    = "_blank";
                        iridium_settings_button.title     = i18n.iridium_api.settings_button;
                        iridium_settings_button.innerHTML = //
                            "<svg viewBox='0 0 24 24' style='height:24px;'>" +
                            //"    <linearGradient id='iri-gradient' gradientUnits='userSpaceOnUse' x1='6' y1='22' x2='15' y2='6'>" +
                            "    <radialGradient id='iri-gradient' gradientUnits='userSpaceOnUse' cx='6' cy='22' r='18.5'>" +
                            "        <stop class='iri-start-gradient' offset='0'/>" +
                            "        <stop class='iri-stop-gradient' offset='1'/>" +
                            "    </radialGradient>" +
                            //"    </linearGradient>" +
                            "    <polygon points='24,11.8 6,1.6 6,22'/>" +
                            "    <path d='M6,1.6V22l18-10.2L6,1.6z M9,6.8l9,5.1L9,17V6.8z'/>" +
                            "</svg>";
                        buttons.parentNode.insertBefore(iridium_settings_button, buttons);
                        
                        document.documentElement.removeEventListener("load", iridium_api.initializeSettingsButton, true);
                    }
                },
                initializeModules: function() {

                    var i = modules.length;

                    for (i = 0; i < modules.length; i++) {
                        if (modules[i].ini) {
                            modules[i].ini();
                        }
                    }
                },
                ini: function() {

                    iridium_api.initializeSettings();

                    if (window.location.pathname === "/iridium-settings") {
                        iridium_api.loadSettingsMenu();
                    } else {
                        iridium_api.initializeModules();
                    }

                    document.documentElement.addEventListener("load", iridium_api.initializeSettingsButton, true);
                }
            };

            iridium_api.ini();
        },
        contentScriptMessages: function() {

            var key1;
            var key2;
            var gate;
            var sets;
            var locs;
            var observer;

            key1 = "iridium_save_settings";
            key2 = "getlocale";
            gate = document.documentElement;
            sets = JSON.parse(gate.dataset[key1] || null);
            locs = gate.dataset[key2] || null;

            if (!gate.contentscript) {
                gate.contentscript = true;
                observer = new MutationObserver(iridium.contentScriptMessages);

                return observer.observe(gate, {
                    attributes: true,
                    attributeFilter: ["data-" + key1, "data-" + key2]
                });
            }

            if (sets) {

                if (iridium.is_userscript) {
                    iridium.GM_setValue(iridium.id, JSON.stringify(sets));
                } else {
                    chrome.storage.local.set({iridiumSettings: sets});
                }

                document.documentElement.removeAttribute("data-iridium_save_settings");
            } else if (locs) {
                document.documentElement.dataset.setlocale = chrome.i18n.getMessage(locs);
            }
        },
        filterChromeKeys: function(keys) {

            if (keys[iridium.id] && keys[iridium.id].new_value) {
                document.documentElement.dataset.iridium_load_settings = JSON.stringify(
                    (keys[iridium.id].new_value && keys[iridium.id].new_value[iridium.id]) || keys[iridium.id].new_value || {}
                );
            }
        },
        main: function(event) {

            var holder;

            if (!event && iridium.is_userscript) {
                event = JSON.parse(iridium.GM_getValue(iridium.id, "{}"));
            }

            if (event) {
                event = JSON.stringify(event[iridium.id] || event);
                document.documentElement.dataset.iridium_user_settings = event;

                if (iridium.is_userscript) {
                    holder = document.createElement("link");
                    holder.rel = "stylesheet";
                    holder.type = "text/css";
                    holder.href = "https://particlecore.github.io/Iridium/css/Iridium.css?v=0.1.5a";
                    document.documentElement.appendChild(holder);
                }

                holder = document.createElement("script");
                holder.textContent = "(" + iridium.inject + "(" + iridium.is_userscript + "))";
                document.documentElement.appendChild(holder);
                holder.remove();

                if (!iridium.is_userscript) {
                    chrome.storage.onChanged.addListener(iridium.filterChromeKeys);
                }
            }
        },
        ini: function() {

            if (window.location.pathname === "/iridium-settings") {
                window.stop();
            }

            iridium.id = "iridiumSettings";
            iridium.is_userscript = typeof GM_info === "object";

            if (iridium.is_userscript) {
                iridium.GM_getValue = GM_getValue;
                iridium.GM_setValue = GM_setValue;
                iridium.main();
            } else {
                chrome.storage.local.get(iridium.id, iridium.main);
            }

            iridium.contentScriptMessages();
        }
    };

    iridium.ini();
}());
