// ==UserScript==
// @version         0.1.2a
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

            var modules;
            var iridiumApi;
            var user_settings;
            var section_titles;

            section_titles = {
                video: "video settings",
                about: "information and useful links"
            };

            modules = [
                {
                    options: {
                        player_auto_play: {
                            id:          "player_auto_play",
                            section:     "video",
                            sub_section: "player",
                            type:        "checkbox",
                            value:       false,
                            label:       "Play videos automatically"
                        },
                        channel_trailer_auto_play: {
                            id:          "channel_trailer_auto_play",
                            section:     "video",
                            sub_section: "channel",
                            type:        "checkbox",
                            value:       false,
                            label:       "Play channel trailers automatically"
                        }, 
                        player_ads: {
                            id:          "player_ads",
                            section:     "video",
                            sub_section: "player",
                            type:        "checkbox",
                            value:       false,
                            label:       "Allow ads on videos"
                        },
                        subscribed_channel_player_ads: {
                            id:          "subscribed_channel_player_ads",
                            section:     "video",
                            sub_section: "player",
                            type:        "checkbox",
                            value:       false,
                            label:       "Allow ads only on videos of subscribed channels"
                        },
                        player_hfr: {
                            id:          "player_hfr",
                            section:     "video",
                            sub_section: "player",
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
                        }
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

                        context = this;

                        if (context.started) {
                            return;
                        }

                        context.started = true;

                        for (key in context.options) {
                            if (context.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = context.options[key].value;
                                }
                            }
                        }

                        JSON.parse = context.modJSONParse(JSON.parse);

                        Object.defineProperty(Object.prototype, "cueVideoByPlayerVars", {
                            set: function(data) { this._cueVideoByPlayerVars = data; },
                            get: function() { return context.modVideoByPlayerVars(this._cueVideoByPlayerVars); }
                        });

                        Object.defineProperty(Object.prototype, "loadVideoByPlayerVars", {
                            set: function(data) { this._loadVideoByPlayerVars = data; },
                            get: function() {

                                if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {
                                    return this.cueVideoByPlayerVars;
                                }

                                return context.modVideoByPlayerVars(this._loadVideoByPlayerVars);
                                return this._loadVideoByPlayerVars;
                            }
                        });

                        Object.defineProperty(Object.prototype, "TIMING_AFT_KEYS", {
                            set: function(data) {
                                this._TIMING_AFT_KEYS = data;
                            },
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
                        });

                        Object.defineProperty(Object.prototype, "loaded", {
                            set: function(data) { this._loaded = data; },
                            get: function() {

                                if (this.args && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                    return false;
                                }

                                return this._loaded;
                            }
                        });

                        Object.defineProperty(Object.prototype, "load", {
                            set: function(data) { this._load = data; },
                            get: function() {

                                var temp = this._load && this._load.toString();

                                if (temp && temp.match("Application.create")) {
                                    context.modArgs(window.ytplayer.config.args);
                                }

                                return this._load;
                            }
                        });

                        Object.defineProperty(Object.prototype, "autoplay", {
                            set: function(data) { this._autoplay = data; },
                            get: function() {
                                
                                if (this.ucid && this._autoplay === "1" && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                    return "0";
                                }

                                return this._autoplay;
                            }
                        });

                        Object.defineProperty(Object.prototype, "fflags", {
                            set: function(data) { this._fflags = data; },
                            get: function() {

                                if (this.ucid && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {
                                    return this._fflags
                                        .replace(
                                            "legacy_autoplay_flag=true",
                                            "legacy_autoplay_flag=false"
                                        ).replace(
                                            "disable_new_pause_state3=true",
                                            "disable_new_pause_state3=false"
                                        ); // removes transition-delay
                                }

                                return this._fflags;
                            }
                        });
                    }
                }, {
                    options: {
                        player_volume_wheel: {
                            id:          "player_volume_wheel",
                            section:     "video",
                            sub_section: "player",
                            type:        "checkbox",
                            value:       false,
                            label:       "Change volume using the mouse wheel"
                        }
                    },
                    changeVolume: function(event) {

                        var api;
                        var player;
                        var direction;
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

                                api.setVolume(new_volume);

                                return false;
                            }
                        }
                    },
                    ini: function() {

                        var context;

                        context = this;

                        if (context.started) {
                            return;
                        }

                        context.started = true;

                        for (key in context.options) {
                            if (context.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = context.options[key].value;
                                }
                            }
                        }

                        if (user_settings.player_volume_wheel) {
                            document.addEventListener("wheel", context.changeVolume);
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
                }
            ];

            iridiumApi = {
                fillSettingsContainer: function(options_list) {

                    var i;
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
                        header.textContent = section_titles[options_list[0].section];
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

                    iridiumApi.fillSettingsContainer(options_list);
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

                            iridiumApi.loadSelectedSection();
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

                            section.addEventListener("change", iridiumApi.autoSaveSettings, true);

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

                    if (!document.head) {
                        document.documentElement.appendChild(document.createElement("head"));
                    }

                    if (!(title = document.querySelector("title"))) {
                        title = document.createElement("title");
                        document.head.appendChild(title);
                    }

                    title.textContent = "Iridium settings";

                    if (!document.body) {
                        document.documentElement.appendChild(document.createElement("body"));
                    } else {
                        document.body.innerHTML = "";
                    }

                    document.body.id = "iridium_settings";
                    document.body.style.display = "none";

                    for (i = 0; i < modules.length; i++) {
                        if (modules[i].options) {
                            for (name in modules[i].options) {
                                if (modules[i].options.hasOwnProperty(name)) {
                                    option = modules[i].options[name];
                                    iridiumApi.settingsBuilder(option);
                                }
                            }
                        }
                    }

                    document.addEventListener("click", iridiumApi.updateSidebarSelection);

                    iridiumApi.loadSelectedSection();
                },
                autoSaveSettings: function(event) {

                    switch (event.target.type) {
                        case "checkbox":
                            user_settings[event.target.id] = event.target.checked;
                            break;
                    }

                    iridiumApi.saveSettings();
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
                        iridium_settings_button = document.createElement("a");
                        iridium_settings_button.id = "iridium_settings_button";
                        iridium_settings_button.href = "/iridium-settings";
                        iridium_settings_button.textContent = "test";
                        iridium_settings_button.target = "_blank";
                        iridium_settings_button.title = "Iridium settings"
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
                        
                        document.documentElement.removeEventListener("load", iridiumApi.initializeSettingsButton, true);
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

                    iridiumApi.initializeSettings();

                    if (window.location.pathname === "/iridium-settings") {
                        iridiumApi.loadSettingsMenu();
                    } else {
                        iridiumApi.initializeModules();
                    }

                    document.documentElement.addEventListener("load", iridiumApi.initializeSettingsButton, true);
                }
            };

            iridiumApi.ini();
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
                    holder.href = "https://particlecore.github.io/Iridium/css/Iridium.css?v=0.1.2a";
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
