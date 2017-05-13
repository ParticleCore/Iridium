// ==UserScript==
// @version         0.0.5a
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

            var fsexit;
            var modules;
            var iridiumApi;
            var user_settings;

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

                    iridiumApi.loadSelectedSection();

                    document.addEventListener("click", iridiumApi.updateSidebarSelection);
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
                            "<svg viewBox='0 0 18 20'>" +
                            "    <polygon points='0,20 14,12 0,4'></polygon>" +
                            "    <polygon points='15,3 15,0 13,0 13,3 10,3 10,5 13,5 13,8 15,8 15,5 18,5 18,3'></polygon>" +
                            "</svg>";
                        buttons.parentNode.insertBefore(iridium_settings_button, buttons);
                        
                        window.removeEventListener("readystatechange", iridiumApi.initializeSettingsButton, true);
                    }
                },
                initializeModules: function() {

                    var i;

                    i = modules.length;

                    for (i = 0; i < modules.length; i++) {
                        if (modules[i].ini) {
                            modules[i].ini();
                        }
                    }
                },
                ini: function() {

                    if (window.location.pathname === "/iridium-settings") {
                        iridiumApi.loadSettingsMenu();
                    } else {
                        iridiumApi.initializeModules();
                    }

                    window.addEventListener("readystatechange", iridiumApi.initializeSettingsButton, true);

                    iridiumApi.initializeSettingsButton();
                }
            };

            iridiumApi.initializeSettings();

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
                    holder.href = "https://particlecore.github.io/Iridium/css/Iridium.css?v=0.0.5a";
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
