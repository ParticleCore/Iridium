// ==UserScript==
// @version         0.0.1a
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

            function fillSettingsContainer(options_list) {

                var
                i,
                label,
                header,
                option,
                section,
                setting,
                sub_section;

                if ((section = document.getElementById("settings_sub_section"))) {
                    section.innerHTML = "";
                } else {
                    return;
                }
                
                if ((header = document.getElementById("settings_section_header"))) {
                    header.textContent = "";
                }

                for (i = 0; i < options_list.length; i++) {

                    option = options_list[i];

                    if (header.textContent === "") {
                        header.textContent = option.title;
                    }

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

                    if (option.type === "checkbox") {
                        input = document.createElement("input");
                        input.setAttribute("class", "setting");
                        input.id = option.id;
                        input.type = option.type;
                        input.checked = option.value;

                        label = document.createElement("label");
                        label.setAttribute("class", "setting");
                        label.setAttribute("for", option.id);
                        label.textContent = option.label;

                        setting.appendChild(input);
                        setting.appendChild(label);
                    }

                    sub_section.appendChild(setting);
                }
            }

            function loadSelectedSection() {

                var
                key,
                header,
                option,
                active_id,
                sub_section,
                active_sidebar,
                options_list;

                if ((active_sidebar = document.querySelector(".sidebar_section.active_sidebar"))) {
                    active_id = active_sidebar.dataset.section;
                } else {
                    return;
                }

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

                fillSettingsContainer(options_list);
            }

            function settingsBuilder(option) {

                var
                input,
                label,
                anchor,
                header,
                divider,
                setting,
                section,
                sub_section,
                active_section,
                active_sidebar,
                sidebar_section,
                settings_sidebar,
                settings_container;

                if (!(settings_sidebar = document.getElementById("iridium_settings_sidebar"))) {
                    settings_sidebar = document.createElement("div");
                    settings_sidebar.id = "iridium_settings_sidebar";
                    settings_sidebar.setAttribute("class", "settings_sidebar");

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
                    settings_container.setAttribute("class", "settings_container");

                    document.body.appendChild(settings_container);
                }

                if (!(section = document.getElementById("settings_section"))) {
                    section = document.createElement("div");
                    section.id = "settings_section";
                    section.setAttribute("class", "settings_section");

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

                if (!(active_sidebar = document.querySelector(".active_sidebar"))) {
                    sidebar_section.classList.add("active_sidebar");
                }

                if (!(active_section = document.querySelector(".active_section"))) {
                    section.classList.add("active_section");
                }
            }

            function updateSidebarSelection(event) {

                var
                next,
                current,
                sidebar_next,
                sidebar_current;

                if (event.target.dataset.section) {
                    current = document.querySelector(".active_section");
                    next = document.getElementById(event.target.dataset.section);

                    if (next !== current) {

                        if ((sidebar_current = document.querySelector(".active_sidebar"))) {
                            sidebar_current.classList.remove("active_sidebar");
                        }

                        event.target.classList.add("active_sidebar");

                        loadSelectedSection();
                    }
                }
            }

            function saveSettings(id, value) {

            }

            function loadSettingsMenu() {

                var
                i,
                name,
                title,
                anchor,
                option,
                container,
                new_option;

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
                }

                document.body.id = "iridium_settings";
                document.body.style.display = "none";

                for (i = 0; i < modules.length; i++) {
                    if (modules[i].options) {
                        for (name in modules[i].options) {
                            if (modules[i].options.hasOwnProperty(name)) {
                                option = modules[i].options[name];
                                settingsBuilder(option);
                            }
                        }
                    }
                }

                loadSelectedSection();

                document.addEventListener("click", updateSidebarSelection);
            }

            function initializeModules() {

                var
                i;

                i = modules.length;

                for (i = 0; i < modules.length; i++) {
                    if (modules[i].ini) {
                        modules[i].ini();
                    }
                }
            }

            var
            fsexit,
            modules,
            iridiumApi,
            user_settings;

            user_settings = {};

            modules = [
                {
                    options: {
                        player_auto_play: {
                            id:          "player_auto_play",
                            section:     "video",
                            sub_section: "player",
                            type:        "checkbox",
                            value:       true,
                            title:       "video settings",
                            label:       "Play videos automatically"
                        },
                        channel_trailer_auto_play: {
                            id:          "channel_trailer_auto_play",
                            section:     "video",
                            sub_section: "channel",
                            type:        "checkbox",
                            value:       true,
                            title:       "video settings",
                            label:       "Play channel trailers automatically"
                        }
                    },
                    ini: function() {

                        var
                        key,
                        auto_play,
                        channel_regex;

                        auto_play = this;

                        if (auto_play.started) {
                            return;
                        }

                        auto_play.started = true;
                        channel_regex = /^\/(user|channel)\//;

                        for (key in auto_play.options) {
                            if (auto_play.options.hasOwnProperty(key)) {
                                if (!(key in user_settings)) {
                                    user_settings[key] = auto_play.options[key].value;
                                }
                            }
                        }

                        Object.defineProperty(Object.prototype, "TIMING_AFT_KEYS", {
                            set: function(data) {
                                this._TIMING_AFT_KEYS = data;
                            },
                            get: function() {

                                var
                                key,
                                is_channel;

                                is_channel = channel_regex.test(location.pathname);

                                if (is_channel ? user_settings.channel_trailer_auto_play : user_settings.player_auto_play) {

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
                            set: function(data) {
                                this._loaded = data;
                            },
                            get: function() {

                                var
                                is_channel;

                                is_channel = channel_regex.test(location.pathname);

                                if (this.args && (is_channel ? user_settings.channel_trailer_auto_play : user_settings.player_auto_play)) {
                                    return false;
                                }

                                return this._loaded;
                            },
                            configurable: true
                        });

                        Object.defineProperty(Object.prototype, "loadVideoByPlayerVars", {
                            set: function(data) {
                                this._loadVideoByPlayerVars = data;
                            },
                            get: function() {

                                var
                                is_channel;

                                is_channel = channel_regex.test(location.pathname);

                                if (is_channel ? user_settings.channel_trailer_auto_play : user_settings.player_auto_play) {
                                    return this.cueVideoByPlayerVars;
                                }

                                return this._loadVideoByPlayerVars;
                            }
                        });

                        Object.defineProperty(Object.prototype, "autoplay", {
                            set: function(data) {
                                this._autoplay = data;
                            },
                            get: function() {

                                var
                                is_channel;

                                is_channel = channel_regex.test(location.pathname);
                                
                                if (this.ucid && this._autoplay === "1" && (is_channel ? user_settings.channel_trailer_auto_play : user_settings.player_auto_play)) {
                                    return "0";
                                }

                                return this._autoplay;
                            }
                        });

                        Object.defineProperty(Object.prototype, "fflags", {
                            set: function(data) {
                                this._fflags = data;
                            },
                            get: function() {

                                var
                                is_channel;

                                is_channel = channel_regex.test(location.pathname);

                                if (this.ucid && (is_channel ? user_settings.channel_trailer_auto_play : user_settings.player_auto_play)) {
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
                        about: {
                            id:      "about",
                            section: "about",
                            type:    "custom",
                            title:   "information and useful links"
                        }
                    }
                }
            ];

            iridiumApi = {
                ini: function() {
                    if (window.location.pathname === "/iridium-settings") {
                        loadSettingsMenu();
                    } else {
                        initializeModules();
                    }
                }
            };

            iridiumApi.ini();
        },
        contentScriptMessages: function() {

            var
            key1,
            key2,
            gate,
            sets,
            locs,
            observer;

            key1 = "iridium-save-settings";
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

                document.documentElement.removeAttribute("data-iridium-save-settings");
            } else if (locs) {
                document.documentElement.dataset.setlocale = chrome.i18n.getMessage(locs);
            }
        },
        filterChromeKeys: function(keys) {
            if (keys[iridium.id] && keys[iridium.id].new_value) {
                document.documentElement.dataset.iridiumLoadSettings = JSON.stringify(
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
                document.documentElement.dataset.iridiumUserSettings = event;

                if (iridium.is_userscript) {
                    holder = document.createElement("link");
                    holder.rel = "stylesheet";
                    holder.type = "text/css";
                    holder.href = "https://iridiumcore.github.io/Particle/stylesheets/Iridium.css?v=0.0.1";
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
