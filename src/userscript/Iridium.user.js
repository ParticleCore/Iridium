// ==UserScript==
// @version         0.2.5b
// @name            Iridium
// @namespace       https://github.com/ParticleCore
// @description     YouTube with more freedom
// @compatible      firefox
// @compatible      chrome
// @resource        iridium_css https://particlecore.github.io/Iridium/css/Iridium.css?v=0.2.5b
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
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @noframes
// ==/UserScript==
(function () {
    "use strict";

    var iridium = {

        inject: function () {

            var i18n;
            var modules;
            var iridium_api;
            var is_userscript;
            var user_settings;
            var default_language;
            var send_settings_to_page;
            var receive_settings_from_page;

            default_language = {
                language: "English (US)",
                section_titles: {
                    about: "Information and useful links",
                    general: "General settings",
                    video: "Video settings",
                    settings: "Iridium settings"
                },
                sub_section_titles: {
                    channel: "Channel",
                    blacklist: "Blacklist",
                    general: "General",
                    language: "Language",
                    layout: "Layout",
                    player: "Player",
                    settings: "Settings",
                    thumbnails: "Thumbnails"
                },
                iridium_api: {
                    settings_button: "Iridium",
                    feature_link: "Find out what this does"
                }
            };

            modules = [
                {
                    options: {
                        default_logo_page: {
                            id: "default_logo_page",
                            section: "general",
                            sub_section: "general",
                            type: "dropdown",
                            value: "home",
                            i18n: {
                                label: "Default YouTube logo page:",
                                options: [
                                    "Home",
                                    "Trending",
                                    "Subscriptions"
                                ]
                            },
                            options: [
                                "home",
                                "trending",
                                "subscriptions"
                            ]
                        },
                        default_channel_tab: {
                            id: "default_channel_tab",
                            section: "general",
                            sub_section: "general",
                            type: "dropdown",
                            value: "home",
                            i18n: {
                                label: "Default channel tab:",
                                options: [
                                    "Home",
                                    "Videos",
                                    "Playlists",
                                    "Channels",
                                    "Discussion",
                                    "About"
                                ]
                            },
                            options: [
                                "home",
                                "videos",
                                "playlists",
                                "channels",
                                "discussion",
                                "about"
                            ]
                        }
                    },
                    setDestination: function (event) {

                        var url;
                        var data;

                        if ((data = event.target.data) && (url = data.webNavigationEndpointData && data.webNavigationEndpointData.url)) {

                            if (user_settings.default_channel_tab !== "home" && url.match(/^\/(?:channel|user)\/(?:[^\/])+$/)) {

                                data.webNavigationEndpointData.url += "/" + user_settings.default_channel_tab;
                                event.target.href = data.webNavigationEndpointData.url;

                            }

                            if (user_settings.default_logo_page !== "home" && url === "/" && event.target.tagName === "A" && event.target.id === "logo") {

                                data.browseEndpoint.browseId = "FE" + user_settings.default_logo_page;
                                data.webNavigationEndpointData.url += "feed/" + user_settings.default_logo_page;
                                event.target.href = data.webNavigationEndpointData.url;

                            }

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        window.addEventListener("mouseup", this.setDestination.bind(this), true);

                    }
                },
                {
                    options: {
                        square_avatars: {
                            id: "square_avatars",
                            section: "general",
                            sub_section: "layout",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Make user images squared"
                            }
                        }
                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        if (user_settings.square_avatars) {

                            document.documentElement.classList.add("iri-square-avatars");

                        } else {

                            document.documentElement.classList.remove("iri-square-avatars");

                        }

                    }
                },
                {
                    options: {
                        improved_logo: {
                            id: "improved_logo",
                            section: "general",
                            sub_section: "layout",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Improve the YouTube logo"
                            }
                        }
                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        if (user_settings.improved_logo) {

                            document.documentElement.classList.add("iri-improved-logo");

                        } else {

                            document.documentElement.classList.remove("iri-improved-logo");

                        }

                    }
                },
                {
                    options: {
                        thumbnail_preview: {
                            id: "thumbnail_preview",
                            section: "general",
                            sub_section: "thumbnails",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Play videos by hovering the thumbnails"
                            }
                        },
                        thumbnail_preview_mute: {
                            id: "thumbnail_preview_mute",
                            section: "general",
                            sub_section: "thumbnails",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Shift key toggles audio on video thumbnail playback"
                            }
                        }
                    },
                    togglePreviewMute: function (event) {

                        var player_api;

                        if (!user_settings.thumbnail_preview_mute) {

                            return;

                        }

                        if (event.which === 16 && (player_api = document.getElementById("iri-preview-player"))) {

                            player_api.handleGlobalKeyDown(77, false);

                        }

                    },
                    setPreviewArgs: function (args) {

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

                        args.ad3_module = null;
                        // args.player_response = null;
                        args.baseUrl = null;
                        args.eventid = null; // excludes from watch history
                        args.iv_endscreen_url = null;
                        args.ppv_remarketing_url = null;
                        args.probe_url = null;
                        args.remarketing_url = null;
                        args.videostats_playback_base_url = null;

                    },
                    iniPreview: function (context, event) {

                        var i;
                        var args;
                        var temp;
                        var config;
                        var data_list;
                        var player_api;

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

                        if ((player_api = document.getElementById("iri-preview-player")) && player.setVolume) {

                            player_api.setVolume(50);

                        }

                    },
                    getPreviewArgs: function (video_id) {

                        var sts;
                        var xhr;
                        var params;
                        var context;

                        context = this;
                        sts = window.yt.config_.FILLER_DATA.player.sts;
                        params =
                            "video_id=" + video_id + "&" +
                            "sts=" + sts + "&" +
                            "ps=gaming" + "&" +
                            "el=detailpage" + "&" +
                            "c=WEB_GAMING" + "&" +
                            "cplayer=UNIPLAYER" + "&" +
                            "mute=true" + "&" +
                            "authuser=0";

                        xhr = new XMLHttpRequest();
                        xhr.addEventListener("load", function (event) {

                            context.iniPreview(context, event);

                        });
                        xhr.open("GET", "/get_video_info?" + params, true);
                        xhr.send();

                        return xhr;

                    },
                    endPreviewContainer: function (event, container, listener, xhr, timer, context, video_container, clicked) {

                        if (clicked || !container.parentNode.contains(event.toElement || event.relatedTarget)) {

                            document.removeEventListener("keydown", context.togglePreviewMute, false);

                            container.parentNode.removeEventListener("click", listener, false);
                            container.parentNode.removeEventListener("mouseleave", listener, false);

                            if (timer) {

                                window.clearInterval(timer);

                            }

                            if ((video_container = document.getElementById("iri-video-preview"))) {

                                if (xhr) {

                                    xhr.abort();

                                }

                                if (iridium_api.checkIfExists("firstChild.destroy", video_container)) {

                                    video_container.firstChild.destroy();

                                }
                            }

                            if (clicked && video_container) {

                                // video_container.remove();

                            }
                        }

                    },
                    iniPreviewContainer: function (event) {

                        var xhr;
                        var timer;
                        var context;
                        var video_id;
                        var container;
                        var video_container;
                        var player_container;
                        var player_manager_api;

                        if (!user_settings.thumbnail_preview) {

                            return;

                        }

                        event.stopPropagation();

                        container = event.target;
                        video_id = container.dataHost && container.dataHost.data && container.dataHost.data.videoId;

                        if (container.tagName === "YT-IMG-SHADOW" && video_id && !container.querySelector("#iri-preview-player")) {

                            context = this;

                            if (!(video_container = document.getElementById("iri-video-preview"))) {

                                video_container = document.createElement("iri-video-preview");
                                video_container.id = "iri-video-preview";
                                video_container.className = "ytp-small-mode";

                            }

                            if (video_container.parentNode !== container) {

                                container.appendChild(video_container);

                            }

                            if (iridium_api.checkIfExists("window.yt.player.Application.create")) {

                                xhr = this.getPreviewArgs(video_id);

                            } else {

                                if ((player_manager_api = document.querySelector("yt-player-manager")) && (player_container = document.getElementById("player-container")) && iridium_api.checkIfExists("yt.config_.FILLER_DATA.player")) {

                                    player_manager_api.acquireApi(player_container, window.yt.config_.FILLER_DATA.player);

                                }

                                timer = window.setInterval(function () {

                                    if (window.yt && window.yt.player && window.yt.player.Application && window.yt.player.Application.create) {

                                        window.clearInterval(timer);
                                        xhr = context.getPreviewArgs(video_id);

                                    }

                                });

                            }

                            document.addEventListener("keydown", this.togglePreviewMute, false);

                            container.parentNode.addEventListener("click", function listener(event) {

                                context.endPreviewContainer(event, container, listener, xhr, timer, context, video_container, true);

                            }, false);

                            container.parentNode.addEventListener("mouseleave", function listener(event) {

                                context.endPreviewContainer(event, container, listener, xhr, timer, context);

                            }, false);

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        document.addEventListener("mouseenter", this.iniPreviewContainer.bind(this), true);

                    }
                },
                {
                    options: {
                        enable_blacklist: {
                            id: "enable_blacklist",
                            section: "general",
                            sub_section: "blacklist",
                            type: "checkbox",
                            value: "home",
                            i18n: {
                                label: "Enable blacklist"
                            }
                        },
                        blacklist_settings: {
                            id: "blacklist_settings",
                            section: "general",
                            sub_section: "blacklist",
                            type: "custom",
                            value: {},
                            i18n: {
                                button_add_title: "Block",
                                button_edit: "Edit",
                                button_import: "Import",
                                button_export: "Export",
                                button_reset: "Reset",
                                button_save: "Save",
                                button_close: "Close",
                                button_remove: "Remove from blacklist",
                                placeholder: "Paste your new blacklist here",
                                confirm_reset: "You are about to reset your blacklist. It is advised to backup your current blacklist before continuing.\n\nDo you wish to contiue?\n\n",
                                reset_success: "Blacklist has been reset.\n\nChanges will be applied after a page refresh.\n\n",
                                confirm_import: "You are about to override your current blacklist. It is advised to backup your current blacklist before continuing.\n\nDo you wish to contiue?\n\n",
                                import_success: "Your blacklist has been imported with success.\n\nChanges will be applied after a page refresh.\n\n",
                                import_error: "Your blacklist could not be imported because it appears to be invalid.\n\n"
                            },
                            custom: function () {

                                var element;
                                var element_list;

                                element_list = [];

                                element = document.createElement("button");
                                element.textContent = i18n.blacklist_settings.button_edit;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "edit"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.blacklist_settings.button_import;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "import"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.blacklist_settings.button_export;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "export"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.blacklist_settings.button_reset;
                                element.className = "setting iri-settings-button danger";
                                element.addEventListener("click", this.resetBlacklist.bind(this));

                                element_list.push(element);

                                return element_list;

                            },
                            resetBlacklist: function () {

                                if (window.confirm(i18n.blacklist_settings.confirm_reset)) {

                                    user_settings.blacklist_settings = [];

                                    iridium_api.initializeSettings();
                                    iridium_api.saveSettings("blacklist_settings");

                                    window.alert(i18n.blacklist_settings.reset_success);

                                }

                            },
                            importBlacklist: function () {

                                var editor;
                                var textarea;

                                if ((textarea = document.getElementById("iridium-textarea")) && window.confirm(i18n.blacklist_settings.confirm_import)) {

                                    try {

                                        user_settings.blacklist_settings = JSON.parse(textarea.value);

                                        iridium_api.saveSettings("blacklist_settings");

                                        window.alert(i18n.blacklist_settings.import_success);

                                        if ((editor = document.getElementById("iridium-text-editor"))) {

                                            editor.remove();

                                        }

                                    } catch (error) {

                                        window.alert(i18n.blacklist_settings.import_error + error.name + ": " + error.message);

                                    }

                                }

                            },
                            closeEditor: function (editor) {

                                editor.remove();

                            },
                            textEditor: function (type, event) {

                                var i;
                                var obj;
                                var temp;
                                var editor;
                                var button;
                                var channel;
                                var textarea;
                                var temp_list;
                                var blocked_list;
                                var close_button;
                                var channel_link;
                                var buttons_section;

                                if (!(editor = document.getElementById("iridium-text-editor"))) {

                                    editor = document.createElement("div");
                                    editor.id = "iridium-text-editor";

                                    document.body.appendChild(editor);

                                } else {

                                    editor.textContent = "";

                                }

                                buttons_section = document.createElement("div");
                                buttons_section.id = "buttons-section";

                                editor.appendChild(buttons_section);

                                if (type === "import" || type === "export") {

                                    textarea = document.createElement("textarea");
                                    textarea.id = "iridium-textarea";
                                    textarea.setAttribute("spellcheck", "false");

                                    if (type === "import") {

                                        textarea.setAttribute("placeholder", i18n.blacklist_settings.placeholder);

                                        button = document.createElement("button");
                                        button.textContent = i18n.blacklist_settings.button_save;
                                        button.className = "iri-settings-button";
                                        button.addEventListener("click", this.importBlacklist.bind(this));

                                        buttons_section.appendChild(button);

                                    } else {

                                        textarea.value = JSON.stringify(user_settings.blacklist_settings, null, 4);

                                    }

                                    editor.appendChild(textarea);

                                } else if (type === "edit") {

                                    blocked_list = document.createElement("div");
                                    blocked_list.id = "iridium-blacklist";

                                    temp = Object.keys(user_settings.blacklist_settings);
                                    temp_list = [];

                                    for (i = 0; i < temp.length; i++) {

                                        obj = {};
                                        obj[temp[i]] = user_settings.blacklist_settings[temp[i]];

                                        temp_list.push([
                                            temp[i],
                                            user_settings.blacklist_settings[temp[i]]
                                        ]);

                                    }

                                    temp_list = temp_list.sort(function (previous, next) {
                                        return previous[1].localeCompare(next[1]);
                                    });

                                    for (i = 0; i < temp_list.length; i++) {

                                        channel = document.createElement("template");
                                        channel.innerHTML =
                                            "<div class='iri-blacklist-channel'>" +
                                            "    <button class='close' data-locale='title|button_remove'>" +
                                            "        <svg viewBox='0 0 10 10' height='10' width='10'>" +
                                            "            <polygon points='10 1.4 8.6 0 5 3.6 1.4 0 0 1.4 3.6 5 0 8.6 1.4 10 5 6.4 8.6 10 10 8.6 6.4 5'/>" +
                                            "        </svg>" +
                                            "    </button><a target='_blank'></a>" +
                                            "</div>";
                                        channel = channel.content;
                                        iridium_api.applyText(channel, i18n.blacklist_settings);
                                        channel.firstChild.data = true;

                                        channel_link = channel.querySelector("a");
                                        channel_link.href = "/channel/" + temp_list[i][0];
                                        channel_link.textContent = temp_list[i][1];

                                        close_button = channel.querySelector(".close");
                                        close_button.container = channel.firstChild;
                                        close_button.ucid = temp_list[i][0];
                                        close_button.addEventListener("click", function (event) {

                                            event.target.container.remove();
                                            delete user_settings.blacklist_settings[event.target.ucid];

                                            iridium_api.saveSettings("blacklist_settings");

                                        });

                                        blocked_list.appendChild(channel);

                                    }

                                    editor.appendChild(blocked_list);

                                }

                                button = document.createElement("button");
                                button.textContent = i18n.blacklist_settings.button_close;
                                button.className = "iri-settings-button";
                                button.addEventListener("click", this.closeEditor.bind(this, editor));

                                buttons_section.appendChild(button);

                            }
                        }
                    },
                    tag_list: [
                        "YTD-COMPACT-LINK-RENDERER",
                        "YTD-COMPACT-PLAYLIST-RENDERER",
                        "YTD-COMPACT-PROMOTED-VIDEO-RENDERER",
                        "YTD-COMPACT-RADIO-RENDERER",
                        "YTD-COMPACT-VIDEO-RENDERER",
                        "YTD-GRID-CHANNEL-RENDERER",
                        "YTD-GRID-MOVIE-PLAYLIST-RENDERER",
                        "YTD-GRID-MOVIE-RENDERER",
                        "YTD-GRID-PLAYLIST-RENDERER",
                        "YTD-GRID-RADIO-RENDERER",
                        "YTD-GRID-RENDERER",
                        "YTD-GRID-SHOW-RENDERER",
                        "YTD-GRID-VIDEO-RENDERER",
                        "YTD-CHANNEL-RENDERER",
                        "YTD-MOVIE-RENDERER",
                        "YTD-PLAYLIST-RENDERER",
                        "YTD-RADIO-RENDERER",
                        "YTD-SHOW-RENDERER",
                        "YTD-VIDEO-RENDERER"
                    ],
                    allowedBlacklistPage: function () {

                        return /^\/($|feed\/(?!subscriptions)|watch|results|shared)/.test(window.location.pathname);

                    },
                    hasContainers: function () {

                        return window.location.pathname.match(/^\/(?:(?:|results)$|feed\/)/);

                    },
                    clearList: function (obj) {

                        var i;
                        var ids;
                        var videos;
                        var shelves;
                        var sections;
                        var shelf_tag;
                        var video_tag;
                        var section_tag;

                        section_tag = [
                            "itemSectionRenderer",
                            "showingResultsForRenderer",
                            "includingResultsForRenderer",
                        ];
                        shelf_tag = [
                            "shelfRenderer",
                            "compactAutoplayRenderer"
                        ];
                        video_tag = [
                            "playlistRenderer",
                            "channelRenderer",
                            "radioRenderer",
                            "showRenderer",
                            "videoRenderer",
                            "gridChannelRenderer",
                            "gridMoviePlaylistRenderer",
                            "gridMovieRenderer",
                            "gridPlaylistRenderer",
                            "gridRadioRenderer",
                            "gridShowRenderer",
                            "gridVideoRenderer",
                            "compactVideoRenderer",
                            "compactPlaylistRenderer",
                            "compactPromotedVideoRenderer",
                            "playlistPanelVideoRenderer"
                        ];

                        videos = iridium_api.getObjectByKey(obj, video_tag);

                        for (i = 0; i < videos.length; i++) {

                            ids = iridium_api.getObjectByKey(videos[i].target, ["browseId"], function (string) {
                                return string.indexOf("UC") === 0;
                            });

                            if (ids[0] && user_settings.blacklist_settings[ids[0].target["browseId"]]) {

                                videos[i].list.splice(videos[i].list.indexOf(videos[i].target), 1);

                            }

                        }

                        shelves = iridium_api.getObjectByKey(obj, shelf_tag);

                        for (i = 0; i < shelves.length; i++) {

                            videos = iridium_api.getObjectByKey(shelves[i].target, video_tag);

                            if (videos.length === 0) {

                                shelves[i].list.splice(shelves[i].list.indexOf(shelves[i].target), 1);

                            }

                        }

                        if (this.hasContainers()) {

                            sections = iridium_api.getObjectByKey(obj, section_tag);

                            for (i = 0; i < sections.length; i++) {

                                if (sections[i].target[sections[i].property].contents.length === 0) {

                                    sections[i].list.splice(sections[i].list.indexOf(sections[i].target), 1);

                                }

                            }

                        }

                    },
                    modOnDone: function (original) {

                        var context = this;

                        return function(data) {

                            context.clearList(data);

                            return original.apply(this, arguments);

                        };

                    },
                    getEmptyContainers: function () {

                        var i;
                        var temp;
                        var shelf;
                        var container;
                        var container_nodes;

                        container_nodes = "#contents ytd-item-section-renderer, #contents ytd-shelf-renderer";
                        container = document.querySelectorAll(container_nodes);

                        for (i = 0; i < container.length; i++) {

                            shelf = container[i].querySelector("yt-horizontal-list-renderer");

                            if (shelf && (shelf.hasAttribute("at-start") || shelf.hasAttribute("at-end"))) {

                                shelf.fillRemainingListItems();

                            }

                            temp = container[i].querySelector(this.tag_list.join(","));

                            if (!temp) {

                                container[i].remove();

                            }

                        }

                        window.dispatchEvent(new Event("resize"));

                    },
                    getContainers: function () {

                        var i;
                        var ucid;
                        var container;
                        var container_nodes;

                        container_nodes = "#contents ytd-item-section-renderer, #contents ytd-shelf-renderer";
                        container = document.querySelectorAll(container_nodes);

                        for (i = 0; i < container.length; i++) {

                            ucid = iridium_api.getObjectByKey(container[i].data, ["browseId"], function (string) {
                                return string.indexOf("UC") === 0;
                            });

                            if (ucid[0] && ucid.length === 1 && ucid[0].target.browseId) {

                                if (user_settings.blacklist_settings[ucid]) {

                                    container[i].remove();

                                }

                            }

                        }

                    },
                    getVideos: function () {

                        var i;
                        var temp;
                        var ucid;
                        var child;
                        var parent;
                        var videos;
                        var remove;
                        var up_next;

                        remove = [];
                        up_next = document.querySelector("ytd-compact-autoplay-renderer");
                        videos = document.querySelectorAll(this.tag_list.join(","));

                        for (i = 0; i < videos.length; i++) {

                            if (videos[i].data) {

                                temp = videos[i];

                            }

                            if (temp && temp.data) {

                                ucid = iridium_api.getObjectByKey(temp.data, ["browseId"], function (string) {
                                    return string.indexOf("UC") === 0;
                                });

                                if (ucid[0] && ucid[0].target.browseId) {

                                    ucid = ucid[0].target.browseId;

                                }

                            }

                            if (ucid) {

                                if (user_settings.blacklist_settings[ucid]) {

                                    if (up_next && up_next.contains(videos[i])) {

                                        if (up_next.tagName === "YTD-COMPACT-AUTOPLAY-RENDERER") {

                                            up_next.remove();

                                        } else {

                                            up_next.parentNode.remove();
                                            up_next = document.querySelector(".watch-sidebar-separation-line");

                                            if (up_next) {

                                                up_next.remove();

                                            }

                                        }

                                    } else {

                                        remove.push(videos[i]);

                                    }

                                }

                            }

                        }

                        if (remove.length) {

                            for (i = 0; i < remove.length; i++) {

                                child = remove[i];

                                while (child) {

                                    parent = child.parentNode;

                                    if (parent.childElementCount > 1 || parent.id === "contents" || parent.id === "items") {

                                        child.remove();
                                        break;

                                    }

                                    child = parent;

                                }

                            }

                            if (this.hasContainers()) {

                                // ignore.containers = [];

                            } else {

                                window.dispatchEvent(new Event("resize"));
                            }

                        }

                    },
                    modImportNode: function (original) {

                        var blacklist_button;

                        blacklist_button = document.createElement("template");
                        blacklist_button.innerHTML =
                            "<div class='iri-add-to-blacklist'>" +
                            "    <svg viewBox='0 0 24 24' height='16' width='16'>" +
                            "        <polygon points='24 2.1 21.9 0 12 9.9 2.1 0 0 2.1 9.9 12 0 21.9 2.1 24 12 14.1 21.9 24 24 21.9 14.1 12'/>" +
                            "    </svg>" +
                            "    <div class='iri-tooltip' data-locale='text|button_add_title'></div>" +
                            "</div>";
                        blacklist_button = blacklist_button.content;
                        iridium_api.applyText(blacklist_button, i18n.blacklist_settings);

                        return function (externalNode, deep) {

                            var node;
                            var container;

                            if (!user_settings.enable_blacklist) {

                                return original.apply(this, arguments);

                            }

                            node = externalNode.firstElementChild;

                            if (node && (node.id === "thumbnail" || node.id === "img")) {

                                container = node.id === "img" ? node.parentNode : node;

                                if (!container.querySelector(".iri-add-to-blacklist")) {

                                    container.appendChild(blacklist_button.cloneNode(true));

                                }
                            }

                            return original.apply(this, arguments);

                        };

                    },
                    applyBlacklist: function () {

                        var hasContainers;

                        if (!this.allowedBlacklistPage()) {

                            return;

                        }

                        hasContainers = this.hasContainers();

                        if (hasContainers) {

                            this.getContainers();

                        }

                        this.getVideos();

                        if (hasContainers) {

                            this.getEmptyContainers();

                        }

                    },
                    addToBlacklist: function (event) {

                        var ucid;
                        var brand;
                        var parent;

                        if (!user_settings.enable_blacklist) {

                            return;

                        }

                        if (event.target.className === "iri-add-to-blacklist") {

                            event.preventDefault();
                            event.stopPropagation();

                            parent = event.target.parentNode;

                            while (parent) {

                                if (this.tag_list.indexOf(parent.tagName) > -1) {

                                    if (parent.data) {

                                        ucid = iridium_api.getObjectByKey(parent.data, ["browseId"], function (string) {
                                            return string.indexOf("UC") === 0;
                                        });

                                        if (ucid[0] && ucid[0].target.browseId) {

                                            brand = ucid[0].list[0].text;

                                            ucid = ucid[0].target.browseId;

                                        }

                                    }

                                    break;

                                }

                                parent = parent.parentNode;

                            }

                            if (ucid && brand) {

                                user_settings.blacklist_settings[ucid] = brand;

                                iridium_api.saveSettings("blacklist_settings");

                                this.applyBlacklist();

                            }

                            return false;

                        }

                    },
                    iniBlacklist: function () {

                        if (user_settings.enable_blacklist && this.allowedBlacklistPage()) {

                            document.documentElement.classList.add("iri-blacklist-allowed");

                        } else {

                            document.documentElement.classList.remove("iri-blacklist-allowed");

                        }

                    },
                    ini: function () {

                        var context;

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        document.addEventListener("readystatechange", this.iniBlacklist.bind(this), false);
                        document.addEventListener("yt-page-data-fetched", this.iniBlacklist.bind(this), false);
                        document.addEventListener("click", this.addToBlacklist.bind(this), true);

                        HTMLDocument.prototype.importNode = this.modImportNode(HTMLDocument.prototype.importNode);

                        context = this;

                        Object.defineProperties(Object.prototype, {
                            ytInitialData: {
                                set: function (data) {
                                    this._ytInitialData = data;
                                },
                                get: function () {

                                    if (user_settings.enable_blacklist && context.allowedBlacklistPage()) {

                                        context.clearList(this._ytInitialData);

                                    }

                                    return this._ytInitialData;

                                }
                            },
                            onDone: {
                                set: function (data) {
                                    this._onDone = data;
                                },
                                get: function () {

                                    if (user_settings.enable_blacklist && context.allowedBlacklistPage()) {

                                        return context.modOnDone(this._onDone);

                                    }

                                    return this._onDone;

                                }
                            }
                        });

                    }
                },
                {
                    options: {
                        channel_video_count: {
                            id: "channel_video_count",
                            section: "video",
                            sub_section: "general",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Display uploaded videos number"
                            }
                        },
                        channel_video_time: {
                            id: "channel_video_time",
                            section: "video",
                            sub_section: "general",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Display how long the video was uploaded"
                            }
                        }
                    },
                    removeVideoCount: function (listener) {

                        var xhr;
                        var video_count;
                        var video_count_dot;

                        delete this.addVideoCount.fetching;

                        document.removeEventListener("yt-navigate-finish", listener, false);

                        xhr = this.removeVideoCount.xhr;

                        if (xhr && xhr.abort) {

                            xhr.abort();

                            delete this.removeVideoCount.xhr;

                        }

                        if ((video_count_dot = document.querySelector("span.iri-video-count"))) {

                            video_count_dot.remove();

                        }

                        if ((video_count = document.getElementById("iri-video-count"))) {

                            video_count.remove();

                        }

                    },
                    addVideoCount: function (channel_url, event) {

                        var i;
                        var page_data;
                        var count_match;
                        var script_list;
                        var video_count;
                        var playlist_data;
                        var video_count_dot;
                        var owner_container;

                        delete this.addVideoCount.fetching;

                        script_list = event.target.response.querySelectorAll("script");

                        for (i = 0; i < script_list.length; i++) {

                            if ((page_data = script_list[i].textContent.match(/window\["ytInitialData"] = ({[\w\W]+});/))) {

                                if ((page_data = JSON.parse(page_data[1], null, true))) {

                                    playlist_data = iridium_api.getObjectByKey(page_data.sidebar, ["playlistSidebarPrimaryInfoRenderer"]);

                                    for (i = 0; i < playlist_data.length; i++) {

                                        if (iridium_api.checkIfExists("target.playlistSidebarPrimaryInfoRenderer.stats", playlist_data[i])) {

                                            count_match = iridium_api.getObjectByKey(playlist_data[i].target.playlistSidebarPrimaryInfoRenderer.stats, ["text"]);

                                            if (count_match.length > 0 && (owner_container = document.getElementById("owner-container"))) {

                                                count_match = count_match[0].target.text;

                                                video_count_dot = document.createElement("span");
                                                video_count_dot.textContent = " · ";
                                                video_count_dot.className = "iri-video-count";

                                                video_count = document.createElement("a");
                                                video_count.id = "iri-video-count";
                                                video_count.textContent = count_match;
                                                video_count.className = "yt-simple-endpoint iri-video-count";
                                                video_count.setAttribute("href", channel_url + "/videos");
                                                video_count.data = {
                                                    webNavigationEndpointData: {
                                                        url: channel_url + "/videos"
                                                    }
                                                };

                                                owner_container.appendChild(video_count_dot);
                                                owner_container.appendChild(video_count);

                                                owner_container.channel_url = channel_url;
                                                owner_container.video_count = count_match;

                                            }

                                            break;

                                        }

                                    }

                                    break;

                                }

                            }

                        }

                    },
                    removeVideoTime: function (listener) {

                        var xhr;
                        var time_container;

                        delete this.addVideoTime.fetching;

                        document.removeEventListener("yt-navigate-finish", listener, false);

                        xhr = this.removeVideoTime.xhr;

                        if (xhr && xhr.abort) {

                            xhr.abort();

                            delete this.removeVideoTime.xhr;

                        }

                        if ((time_container = document.getElementById("iri-video-time"))) {

                            time_container.remove();

                        }

                    },
                    addVideoTime: function (published_date, event) {

                        var i;
                        var page_data;
                        var video_data;
                        var script_list;
                        var time_container;

                        delete this.addVideoTime.fetching;

                        script_list = event.target.response.querySelectorAll("script");

                        for (i = 0; i < script_list.length; i++) {

                            if ((page_data = script_list[i].textContent.match(/window\["ytInitialData"] = ({[\w\W]+});/))) {

                                if ((page_data = JSON.parse(page_data[1], null, true))) {

                                    video_data = iridium_api.getObjectByKey(page_data.contents, ["videoId"], function (video_id, obj) {

                                        var current_video_id;

                                        if (obj && obj.publishedTimeText) {

                                            if ((current_video_id = window.location.href.match(iridium_api.videoIdPattern))) {

                                                if ((current_video_id = current_video_id[1])) {

                                                    return video_id === current_video_id;

                                                }

                                            }

                                        }

                                    });

                                    for (i = 0; i < video_data.length; i++) {

                                        if (video_data[i].target.publishedTimeText && video_data[i].target.publishedTimeText.simpleText) {

                                            time_container = document.createElement("span");
                                            time_container.id = "iri-video-time";
                                            time_container.textContent = " · " + video_data[i].target.publishedTimeText.simpleText;

                                            published_date.appendChild(time_container);

                                            break;

                                        }

                                    }

                                    break;

                                }

                            }

                        }

                    },
                    loadStart: function () {

                        var xhr;
                        var context;
                        var video_id;
                        var channel_id;
                        var channel_url;
                        var upload_info;
                        var watch_page_active;

                        watch_page_active = document.querySelector("ytd-watch:not([hidden])");

                        if (watch_page_active && (channel_url = document.querySelector("#owner-name a"))) {

                            channel_url = channel_url.getAttribute("href");
                            channel_id = channel_url.match(/UC([a-z0-9-_]{22})/i);

                            if (channel_id && (channel_id = channel_id[1])) {

                                if (user_settings.channel_video_count && !this.addVideoCount.fetching && document.getElementById("owner-container") && !document.getElementById("iri-video-count") && (channel_url = document.querySelector("#owner-name a"))) {

                                    if (this.removeVideoCount.xhr) {

                                        this.removeVideoCount.xhr.abort();

                                    }

                                    this.addVideoCount.fetching = true;
                                    channel_url = channel_url.getAttribute("href");

                                    xhr = new XMLHttpRequest();
                                    xhr.addEventListener("load", this.addVideoCount.bind(this, channel_url));
                                    xhr.open("GET", "/playlist?list=UU" + channel_id, true);
                                    xhr.responseType = "document";
                                    xhr.send();

                                    this.removeVideoCount.xhr = xhr;

                                    context = this;

                                    document.addEventListener("yt-navigate-finish", function listener() {

                                        context.removeVideoCount(listener);

                                    }, false);

                                }

                                if (user_settings.channel_video_time && !this.addVideoTime.fetching && (upload_info = document.querySelector("#upload-info .date")) && upload_info.textContent.indexOf("·") === -1) {

                                    if ((video_id = window.location.href.match(iridium_api.videoIdPattern)) && (video_id = video_id[1])) {

                                        if (this.removeVideoTime.xhr) {

                                            this.removeVideoTime.xhr.abort();

                                        }

                                        this.addVideoTime.fetching = true;

                                        xhr = new XMLHttpRequest();
                                        xhr.addEventListener("load", this.addVideoTime.bind(this, upload_info));
                                        xhr.open("GET", "/channel/UC" + channel_id + "/search?query=%22" + video_id + "%22", true);
                                        xhr.responseType = "document";
                                        xhr.send();

                                        this.removeVideoTime.xhr = xhr;

                                        context = this;

                                        document.addEventListener("yt-navigate-finish", function listener() {

                                            context.removeVideoTime(listener);

                                        }, false);

                                    }

                                }

                            }

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        window.addEventListener("yt-page-data-updated", this.loadStart.bind(this), true);

                    }
                },
                {
                    options: {
                        player_quality: {
                            id: "player_quality",
                            section: "video",
                            sub_section: "player",
                            type: "dropdown",
                            value: "auto",
                            i18n: {
                                label: "Default video quality:",
                                options: [
                                    "Auto",
                                    "4320p (8k)",
                                    "2880p (5k)",
                                    "2160p (4k)",
                                    "1440p",
                                    "1080p",
                                    "720p",
                                    "480p",
                                    "360p",
                                    "240p",
                                    "144p"
                                ]
                            },
                            options: [
                                "auto",
                                "highres",
                                "hd2880",
                                "hd2160",
                                "hd1440",
                                "hd1080",
                                "hd720",
                                "large",
                                "medium",
                                "small",
                                "tiny"
                            ]
                        },
                        player_auto_play: {
                            id: "player_auto_play",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Play videos automatically"
                            }
                        },
                        channel_trailer_auto_play: {
                            id: "channel_trailer_auto_play",
                            section: "video",
                            sub_section: "channel",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Play channel trailers automatically"
                            }
                        },
                        player_annotations: {
                            id: "player_annotations",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Allow annotations on videos"
                            }
                        },
                        player_subtitles: {
                            id: "player_subtitles",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Allow subtitles on videos"
                            }
                        },
                        player_loudness: {
                            id: "player_loudness",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Allow loudness normalization"
                            }
                        },
                        player_ads: {
                            id: "player_ads",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Allow ads on videos"
                            }
                        },
                        subscribed_channel_player_ads: {
                            id: "subscribed_channel_player_ads",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Allow ads only on videos of subscribed channels"
                            }
                        },
                        player_hfr: {
                            id: "player_hfr",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Allow HFR (60fps) streams"
                            }
                        },
                        player_memorize_size: {
                            id: "player_memorize_size",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Memorize player size"
                            }
                        },
                        player_memorize_volume: {
                            id: "player_memorize_volume",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Memorize player volume"
                            }
                        },
                        player_quick_controls: {
                            id: "player_quick_controls",
                            section: "video",
                            sub_section: "general",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Enable quick controls",
                                button_auto_play: "Autoplay",
                                button_full_browser: "Full Browser",
                                button_screen_shot: "Screen Shot",
                                button_thumbnails: "Thumbnails",
                                thumbnails_title: "Click to download\nRight click for options",
                                screen_shot_title: "Right click for options",
                                full_browser_info: "Press \"Esc\" to exit"
                            }
                        },
                        player_max_res_thumbnail: {
                            id: "player_max_res_thumbnail",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Force high quality player thumbnail"
                            }
                        }
                    },
                    modArgs: function (args) {

                        var i;
                        var fps;
                        var list;
                        var key_type;
                        var player_response;

                        if (args.fflags) {

                            args.fflags = args.fflags.replace("new_pause_state3=true" , "new_pause_state3=false");

                        }

                        if (user_settings.player_max_res_thumbnail && args.thumbnail_url) {

                            args.iurlmaxres = args.thumbnail_url.replace(/\/[^\/]+$/, "/maxresdefault.jpg");

                        }

                        if (user_settings.subscribed_channel_player_ads ? args.subscribed !== "1" : !user_settings.player_ads) {

                            delete args.ad3_module;

                            player_response = JSON.parse(args.player_response);

                            if (player_response && player_response.adPlacements) {

                                delete player_response.adPlacements;
                                args.player_response = JSON.stringify(player_response);

                            }

                        }

                        if (!user_settings.player_annotations) {

                            args.iv_load_policy = "3";

                        }

                        if (user_settings.player_memorize_size) {

                            args.player_wide = user_settings.theaterMode ? "1" : "0";

                        }

                        if (!user_settings.player_loudness) {

                            args.loudness = null;
                            args.relative_loudness = null;

                            delete args.loudness;
                            delete args.relative_loudness;

                        }

                        if (!user_settings.player_subtitles) {

                            iridium_api.setStorage(
                                "yt-html5-player-modules::subtitlesModuleData::module-enabled",
                                "false"
                            );

                            if (args.caption_audio_tracks) {

                                args.caption_audio_tracks = args.caption_audio_tracks.split(/&d=[0-9]|d=[0-9]&/).join("");

                            }

                        }

                        if (!user_settings.player_hfr && args.adaptive_fmts) {

                            key_type = args.adaptive_fmts.indexOf(",") > -1 ? "," : "%2C";
                            list = args.adaptive_fmts.split(key_type);

                            for (i = 0; i < list.length; i++) {

                                fps = list[i].split(/fps(?:=|%3D)([0-9]{2})/);
                                fps = fps && fps[1];

                                if (fps > 30) {

                                    list.splice(i--, 1);

                                }

                            }

                            args.adaptive_fmts = list.join(key_type);

                        }

                    },
                    modVideoByPlayerVars: function (original) {

                        var context = this;

                        return function (args) {

                            var temp;
                            var current_config;
                            var current_video_id;

                            if (!this.getUpdatedConfigurationData) {

                                return original.apply(this, arguments);

                            }

                            current_config = this.getUpdatedConfigurationData();

                            if (current_config && current_config.args) {

                                if ((current_config.args.eventid === args.eventid || current_config.args.loaderUrl === args.loaderUrl)) {

                                    if (!document.querySelector(".ended-mode") && (current_video_id = window.location.href.match(iridium_api.videoIdPattern))) {

                                        if (current_video_id[1] === current_config.args.video_id) {

                                            return function () {};

                                        }

                                    }

                                }

                            }

                            context.modArgs(args);

                            temp = original.apply(this, arguments);

                            if (user_settings.player_quality !== "auto") {

                                this.setPlaybackQuality(user_settings.player_quality);

                            }

                            return temp;

                        };

                    },
                    modPlayerLoad: function (original) {

                        var context = this;

                        return function (api_name, config) {

                            var temp;
                            var player;

                            context.modArgs(config.args);

                            temp = original.apply(this, arguments);

                            if (user_settings.player_quality !== "auto" && (player = document.getElementById("movie_player"))) {

                                player.setPlaybackQuality(user_settings.player_quality);

                            }

                            return temp;

                        };

                    },
                    modJSONParse: function (original) {

                        var context = this;

                        return function (text, reviver, bypass) {

                            var temp = original.apply(this, arguments);

                            if (!bypass && temp && temp.player && temp.player.args) {

                                context.modArgs(temp.player.args);

                            }

                            return temp;

                        };

                    },
                    modMatchMedia: function (original) {

                        return function(text) {

                            var temp = original.apply(this, arguments);

                            if (temp.matches && (text === "(max-width: 656px)" || text === "(min-width: 882px)")) {

                                return temp;

                            }

                            Object.defineProperty(temp, "matches", {writable: true});
                            temp.matches = false;

                            return temp;

                        };

                    },
                    patchXHR: function (event) {

                        var i;
                        var temp;
                        var temp_list;
                        var key_value;
                        var player_api;

                        if (event.target.readyState === 4 && event.target.responseText.match(/eventid=/)) {

                            temp_list = {};
                            temp = event.target.responseText.split("&");

                            for (i = 0; i < temp.length; i++) {

                                key_value = temp[i].split("=");
                                temp_list[key_value[0]] = window.decodeURIComponent(key_value[1]) || "";

                            }

                            this.modArgs(temp_list);

                            Object.defineProperty(event.target, "responseText", {writable: true});

                            event.target.responseText = "";
                            temp = Object.keys(temp_list);

                            for (i = 0; i < temp.length; i++) {

                                event.target.responseText += temp[i] + "=" + window.encodeURIComponent(temp_list[temp[i]]);

                                if (i + 1 < temp.length) {

                                    event.target.responseText += "&";

                                }

                            }

                            if (user_settings.player_quality !== "auto" && (player_api = document.getElementById("movie_player"))) {

                                player_api.setPlaybackQuality(user_settings.player_quality);

                            }

                        }

                    },
                    modOpen: function (original) {

                        var context = this;

                        return function (method, url) {

                            if (url.match("get_video_info")) {

                                this.addEventListener("readystatechange", context.patchXHR.bind(context));

                            }

                            return original.apply(this, arguments);

                        };

                    },
                    modParseFromString: function (original) {

                        return function () {

                            var i;
                            var fps;
                            var result;
                            var streams;

                            if (!user_settings.player_hfr) {

                                result = original.apply(this, arguments);
                                streams = result.getElementsByTagName("Representation");
                                i = streams.length;

                                while (i--) {

                                    fps = streams[i].getAttribute("frameRate");

                                    if (fps > 30) {

                                        streams[i].remove();

                                    }

                                }

                                return result;

                            }

                            return original.apply(this, arguments);

                        };

                    },
                    handleCustoms: function (event) {

                        if (typeof event === "object") {

                            if (user_settings.player_memorize_volume && user_settings.userVolume !== event.volume) {

                                user_settings.userVolume = event.volume;

                                iridium_api.saveSettings("userVolume");

                            }

                        } else {

                            if (user_settings.player_memorize_size && user_settings.theaterMode !== event) {

                                user_settings.theaterMode = event;

                                iridium_api.saveSettings("theaterMode");

                            }

                        }

                    },
                    onStateChange: function (event) {

                        document.documentElement.classList.remove("video_unstarted", "video_active", "video_ended", "video_playing", "video_paused", "video_buffering", "video_cued");

                        switch (event) {

                            case -1:
                                document.documentElement.classList.add("video_unstarted");
                                break;
                            case 0:
                                document.documentElement.classList.add("video_ended");
                                break;
                            case 1:
                                document.documentElement.classList.add("video_active", "video_playing");
                                break;
                            case 2:
                                document.documentElement.classList.add("video_active", "video_paused");
                                break;
                            case 3:
                                document.documentElement.classList.add("video_active", "video_buffering");
                                break;
                            case 5:
                                document.documentElement.classList.add("video_cued");
                                break;

                        }

                        if (user_settings.fullBrowser) {

                            window.dispatchEvent(new Event("resize"));

                        }

                    },
                    playerReady: function (api) {

                        var timestamp;
                        var watch_page_api;

                        if (api) {

                            api.addEventListener("SIZE_CLICKED", this.handleCustoms);
                            api.addEventListener("onVolumeChange", this.handleCustoms);
                            api.addEventListener("onStateChange", this.onStateChange);

                            if (user_settings.player_memorize_volume) {

                                api.setVolume(user_settings.userVolume);

                                timestamp = Date.now();

                                iridium_api.setStorage(
                                    "yt-player-volume",
                                    JSON.stringify({
                                        data: JSON.stringify({
                                            volume: user_settings.userVolume,
                                            muted: false
                                        }),
                                        creation: timestamp,
                                        expiration: timestamp + 2592E6
                                    })
                                );

                            }

                            if (user_settings.player_memorize_size && (watch_page_api = document.querySelector("ytd-watch"))) {

                                try {

                                    watch_page_api.theaterModeChanged_(user_settings.theaterMode);

                                } catch (ignore) {}

                            }

                        }

                    },
                    shareApi: function (original) {

                        var context = this;

                        return function (api) {

                            context.playerReady(api);

                            if (original) {

                                return original.apply(this, arguments);

                            }

                        };
                    },
                    isChannel: function () {

                        return /^\/(user|channel)\//.test(window.location.pathname);

                    },
                    exitFullBrowser: function (event) {

                        if (!user_settings.fullBrowser || (event.keyCode === 27 || event.key === "Escape")) {

                            window.removeEventListener("keydown", this.exitFullBrowserlistener, false);
                            this.exitFullBrowserlistener = null;
                            document.documentElement.classList.remove("iri-full-browser");
                            user_settings.fullBrowser = false;
                            iridium_api.saveSettings("fullBrowser");
                            window.dispatchEvent(new Event("resize"));

                            this.quickControlsState();

                        }

                    },
                    quickControlAutoPlay: function () {

                        user_settings.player_auto_play = !user_settings.player_auto_play;
                        iridium_api.saveSettings("player_auto_play");
                        this.quickControlsState();

                    },
                    closeThumbnails: function (event) {

                        var thumbnail_gallery;

                        if (event.target.tagName !== "IMG" && (thumbnail_gallery = document.getElementById("iri-thumbnail-gallery"))) {

                            thumbnail_gallery.remove();

                        }

                    },
                    closeScreenShot: function (event) {

                        var link;
                        var screen_shot_container;

                        if (event.target.tagName !== "CANVAS" && (screen_shot_container = document.getElementById("iri-screen-shot-container"))) {

                            if ((link = screen_shot_container.querySelector("a"))) {

                                URL.revokeObjectURL(link.href);

                            }

                            screen_shot_container.remove();

                        }

                    },
                    quickControlThumbnail: function () {

                        var i;
                        var video_id;
                        var thumbnail_list;
                        var thumbnail_base;
                        var thumbnail_size;
                        var thumbnail_gallery;
                        var thumbnail_size_list;

                        if ((video_id = window.location.href.match(iridium_api.videoIdPattern))) {

                            thumbnail_base = window.location.protocol + "//i.ytimg.com/vi/";

                            thumbnail_size_list = {
                                iurl: "default.jpg",
                                iurlmq: "mqdefault.jpg",
                                iurlhq: "hqdefault.jpg",
                                iurlsd: "sddefault.jpg",
                                iurlhq720: "hq720.jpg",
                                iurlmaxres: "maxresdefault.jpg"
                            };

                            thumbnail_gallery = document.createElement("template");
                            thumbnail_gallery.innerHTML =
                                "<div id='iri-thumbnail-gallery'>" +
                                "    <div id='iri-thumbnail-gallery-first-row'>" +
                                "        <div class='iri-thumbnail-labels'>" +
                                "            <div>MAXRES</div>" +
                                "            <div>HQ720</div>" +
                                "            <div>SD</div>" +
                                "        </div>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurlmaxres' />" +
                                "        </a>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurlhq720' />" +
                                "        </a>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurlsd' />" +
                                "        </a>" +
                                "    </div>" +
                                "    <div id='iri-thumbnail-gallery-second-row'>" +
                                "        <div class='iri-thumbnail-labels'>" +
                                "            <div>HQ</div>" +
                                "            <div>MQ</div>" +
                                "            <div>DEFAULT</div>" +
                                "        </div>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurlhq' />" +
                                "        </a>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurlmq' />" +
                                "        </a>" +
                                "        <a target='_blank' download>" +
                                "            <img data-thumbnail-type='iurl' />" +
                                "        </a>" +
                                "    </div>" +
                                "</div>";
                            thumbnail_gallery = thumbnail_gallery.content;

                            thumbnail_list = thumbnail_gallery.querySelectorAll("[data-thumbnail-type]");

                            for (i = 0; i < thumbnail_list.length; i++) {

                                thumbnail_size = thumbnail_list[i].dataset.thumbnailType;

                                if ((thumbnail_size = thumbnail_size_list[thumbnail_size])){

                                    thumbnail_list[i].src = thumbnail_base + video_id[1] + "/" + thumbnail_size;
                                    thumbnail_list[i].parentNode.href = thumbnail_list[i].src;
                                    thumbnail_list[i].parentNode.title = i18n.player_quick_controls.thumbnails_title;

                                }

                            }

                            thumbnail_gallery.firstChild.addEventListener("click", this.closeThumbnails.bind(this), false);

                            document.documentElement.appendChild(thumbnail_gallery);

                        }

                    },
                    quickControlFullBrowser: function (event) {

                        var video_player;
                        var full_browser_info;

                        if (this.exitFullBrowserlistener) {

                            window.removeEventListener("keydown", this.exitFullBrowserlistener, false);
                            this.exitFullBrowserlistener = null;

                        }

                        if (event) {

                            user_settings.fullBrowser = !user_settings.fullBrowser;
                            iridium_api.saveSettings("fullBrowser");

                        }

                        if (user_settings.fullBrowser) {

                            document.documentElement.classList.add("iri-full-browser");

                            if ((video_player = document.getElementById("movie_player"))) {

                                if (!document.getElementById("iri-full-browser-info")) {

                                    full_browser_info = document.createElement("template");
                                    full_browser_info.innerHTML =
                                        "<div id='iri-full-browser-info'>" +
                                        "    <div id='iri-full-browser-info-message' data-locale='text|full_browser_info'></div>" +
                                        "</div>";
                                    full_browser_info = full_browser_info.content;

                                    iridium_api.applyText(full_browser_info, i18n.player_quick_controls);
                                    video_player.insertBefore(full_browser_info.firstChild, video_player.firstChild);

                                }

                                this.exitFullBrowserlistener = this.exitFullBrowser.bind(this);
                                window.addEventListener("keydown", this.exitFullBrowserlistener, false);
                                window.dispatchEvent(new Event("resize"));

                            }

                        } else if (!user_settings.fullBrowser) {

                            document.documentElement.classList.remove("iri-full-browser");
                            window.dispatchEvent(new Event("resize"));

                        }

                        if (event) {

                            this.quickControlsState();

                        }

                    },
                    quickControlScreenShot: function () {

                        var canvas;
                        var aspect_ratio;
                        var video;
                        var canvas_height;
                        var canvas_width;
                        var canvas_context;
                        var screen_shot_container;

                        if ((video = document.querySelector("video")) && video.src) {

                            if (!(screen_shot_container = document.getElementById("iri-screen-shot-container"))) {

                                screen_shot_container = document.createElement("template");
                                screen_shot_container.innerHTML =
                                    "<div id='iri-screen-shot-container'>" +
                                    "    <a target='_blank' download data-locale='title|screen_shot_title'>" +
                                    "        <canvas></canvas>" +
                                    "    </a>" +
                                    "</div>";
                                screen_shot_container = screen_shot_container.content;

                            }

                            iridium_api.applyText(screen_shot_container, i18n.player_quick_controls);

                            canvas = screen_shot_container.querySelector("canvas");
                            canvas_context = canvas.getContext("2d");
                            aspect_ratio = video.videoWidth / video.videoHeight;
                            canvas_width = video.videoWidth;
                            canvas_height = parseInt(canvas_width / aspect_ratio, 10);
                            canvas.width = canvas_width;
                            canvas.height = canvas_height;
                            canvas_context.drawImage(video, 0, 0, canvas_width, canvas_height);

                            canvas.toBlob(function (blob) {

                                canvas.parentNode.href = URL.createObjectURL(blob);

                            });

                            screen_shot_container.firstChild.addEventListener("click", this.closeScreenShot.bind(this), false);

                            document.documentElement.appendChild(screen_shot_container);

                        }

                    },
                    quickControls: function (event) {

                        switch (event.target.id) {

                            case "iri-quick-control-auto-play":
                                this.quickControlAutoPlay();
                                break;

                            case "iri-quick-control-thumbnail":
                                this.quickControlThumbnail();
                                break;

                            case "iri-quick-control-full-browser":
                                this.quickControlFullBrowser(event);
                                break;

                            case "iri-quick-control-screen-shot":
                                this.quickControlScreenShot(event);
                                break;

                        }

                    },
                    quickControlsState: function () {

                        var button;

                        if ((button = document.getElementById("iri-quick-control-auto-play"))) {

                            if (user_settings.player_auto_play) {

                                button.setAttribute("enabled", "true");

                            } else {

                                button.removeAttribute("enabled");

                            }

                        }

                        if ((button = document.getElementById("iri-quick-control-full-browser"))) {

                            if (user_settings.fullBrowser) {

                                button.setAttribute("enabled", "true");
                                this.quickControlFullBrowser();

                            } else {

                                button.removeAttribute("enabled");
                                this.quickControlFullBrowser();

                            }

                        }

                    },
                    loadStart: function () {

                        var meta_section;
                        var quick_controls;

                        if (this.quickControlsListener) {

                            document.removeEventListener("click", this.quickControlsListener, false);
                            this.quickControlsListener = null;

                        }

                        quick_controls = document.querySelector("#iri-quick-controls");

                        if (user_settings.player_quick_controls && document.querySelector("ytd-watch:not([hidden])") && (meta_section = document.querySelector("ytd-watch #meta"))) {

                            if (!quick_controls) {

                                quick_controls = document.createElement("template");
                                quick_controls.innerHTML =
                                    "<div id='iri-quick-controls' class='closed-mode'>" +
                                    "    <div id='iri-quick-controls-container'>" +
                                    "        <button id='iri-quick-control-auto-play'>" +
                                    "            <svg viewBox='0 0 20 20' height='20' width='20'>" +
                                    "                <polygon points='3 2 16.9 10 3 18'/>" +
                                    "            </svg>" +
                                    "            <div class='iri-quick-controls-tooltip' data-locale='text|button_auto_play'></div>" +
                                    "        </button>" +
                                    "        <button id='iri-quick-control-thumbnail'>" +
                                    "            <svg viewBox='0 0 20 20' height='20' width='20'>" +
                                    "                <circle cx='8' cy='7.2' r='2'/>" +
                                    "                <path d='M0 2v16h20V2H0z M18 16H2V4h16V16z'/>" +
                                    "                <polygon points='17 10.9 14 7.9 9 12.9 6 9.9 3 12.9 3 15 17 15'/>" +
                                    "            </svg>" +
                                    "            <div class='iri-quick-controls-tooltip' data-locale='text|button_thumbnails'></div>" +
                                    "        </button>" +
                                    "        <button id='iri-quick-control-full-browser'>" +
                                    "            <svg viewBox='0 0 20 20' height='20' width='20'>" +
                                    "                <path d='M0 4v12h20V4H0z M12 12H2V6h10V12'/>" +
                                    "            </svg>" +
                                    "            <div class='iri-quick-controls-tooltip' data-locale='text|button_full_browser'></div>" +
                                    "        </button>" +
                                    "        <button id='iri-quick-control-screen-shot'>" +
                                    "            <svg viewBox='0 0 20 20' height='20' width='20'>" +
                                    "                <circle cx='13' cy='10' r='3.5'/>" +
                                    "                <path d='M0 4v12h20V4H0z M7 7H1V5h6V7z M13 15c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5S15.8 15 13 15z'/>" +
                                    "            </svg>" +
                                    "            <div class='iri-quick-controls-tooltip' data-locale='text|button_screen_shot'></div>" +
                                    "        </button>" +
                                    "    </div>" +
                                    "</div>";
                                quick_controls = quick_controls.content;

                                iridium_api.applyText(quick_controls, i18n.player_quick_controls);
                                meta_section.insertBefore(quick_controls, meta_section.firstChild);

                            }

                            this.quickControlsState();

                            this.quickControlsListener = this.quickControls.bind(this);
                            document.addEventListener("click", this.quickControlsListener, false);

                        } else if (quick_controls && !user_settings.player_quick_controls) {

                            quick_controls.remove();

                        }

                    },
                    onSettingsUpdated: function () {

                        this.quickControlsState();

                    },
                    ini: function () {

                        var context;
                        var timestamp;

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        if (user_settings.player_quality !== "auto") {

                            timestamp = Date.now();

                            iridium_api.setStorage(
                                "yt-player-quality",
                                JSON.stringify({
                                    data: user_settings.player_quality,
                                    creation: timestamp,
                                    expiration: timestamp + 2592E6
                                })
                            );

                        }

                        if (this.loadStartListener) {

                            window.removeEventListener("yt-page-data-updated", this.loadStartListener, true);
                            window.removeEventListener("yt-navigate-start", this.loadStartListener, false);
                            window.removeEventListener("yt-navigate-finish", this.loadStartListener, false);
                            this.loadStartListener = null;

                        }

                        this.loadStartListener = this.loadStart.bind(this);
                        window.addEventListener("yt-page-data-updated", this.loadStartListener, true);
                        window.addEventListener("yt-navigate-start", this.loadStartListener, false);
                        window.addEventListener("yt-navigate-finish", this.loadStartListener, false);

                        window.matchMedia = this.modMatchMedia(window.matchMedia);
                        window.onYouTubePlayerReady = this.shareApi(window.onYouTubePlayerReady);
                        JSON.parse = this.modJSONParse(JSON.parse);
                        XMLHttpRequest.prototype.open = this.modOpen(XMLHttpRequest.prototype.open);
                        DOMParser.prototype.parseFromString = this.modParseFromString(DOMParser.prototype.parseFromString);

                        context = this;

                        Object.defineProperties(Object.prototype, {
                            cueVideoByPlayerVars: {
                                set: function (data) {
                                    this._cueVideoByPlayerVars = data;
                                },
                                get: function () {
                                    return context.modVideoByPlayerVars(this._cueVideoByPlayerVars);
                                }
                            },
                            loadVideoByPlayerVars: {
                                set: function (data) {
                                    this._loadVideoByPlayerVars = data;
                                },
                                get: function () {

                                    if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {

                                        return this.cueVideoByPlayerVars;

                                    }

                                    return context.modVideoByPlayerVars(this._loadVideoByPlayerVars);

                                }
                            },
                            TIMING_AFT_KEYS: {
                                set: function (data) {
                                    this._TIMING_AFT_KEYS = data;
                                },
                                get: function () {

                                    var key;

                                    if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {

                                        if (iridium_api.checkIfExists("ytcsi.data_.tick")) {

                                            for (key in window.ytcsi.data_.tick) {

                                                if (window.ytcsi.data_.tick.hasOwnProperty(key)) {

                                                    return [key];

                                                }

                                            }

                                        } else {

                                            return ["srt"];

                                        }

                                    }

                                    return this._TIMING_AFT_KEYS;

                                }
                            },
                            load: {
                                set: function (data) {
                                    this._load = data;
                                },
                                get: function () {

                                    var temp;

                                    if ((temp = this._load && this._load.toString()) && temp.match(/Application.create/)) {

                                        window.yt.player.Application.create = context.modPlayerLoad(window.yt.player.Application.create);

                                    }

                                    return this._load;

                                }
                            },
                            playVideo: {
                                set: function (data) {
                                    this._playVideo = data;
                                },
                                get: function () {

                                    if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {

                                        return function () {};

                                    }

                                    return this._playVideo;

                                }
                            },
                            isMobile: {
                                set: function (data) {
                                    this._isMobile = data;
                                },
                                get: function isMobileGetter() {

                                    var i;
                                    var matching;
                                    var keys_list;
                                    var function_string;

                                    keys_list = Object.keys(this);

                                    for (i = 0; i < keys_list.length; i++) {

                                        if (this[keys_list[i]] && this[keys_list[i]].eventid) {

                                            if (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play) {

                                                function_string = isMobileGetter["caller"].toString();
                                                matching = function_string.match(/this\.([a-z0-9$_]{1,3})=[^;]+\.autoplay/i);

                                                if (matching && matching[1]) {

                                                    this[matching[1]] = false;

                                                }

                                            }

                                            break;

                                        }

                                    }

                                    return this._isMobile;

                                }
                            }
                        });

                    }
                },
                {
                    options: {
                        comments_visibility: {
                            id: "comments_visibility",
                            section: "video",
                            sub_section: "general",
                            type: "dropdown",
                            value: 1,
                            i18n: {
                                label: "Comment section:",
                                button_show_comments: "Show comments",
                                options: [
                                    "Show",
                                    "Hide",
                                    "Remove"
                                ]
                            },
                            options: [
                                0,
                                1,
                                2
                            ]
                        }
                    },
                    modOnShow: function (original) {

                        return function (bypass) {

                            var comments_loaded;
                            var comment_contents;

                            if (user_settings.comments_visibility > 1) {

                                return function () {};

                            }

                            comments_loaded = (comment_contents = document.querySelector("ytd-comments #contents")) && !!comment_contents.firstElementChild;

                            if (bypass || comments_loaded || user_settings.comments_visibility < 1) {

                                return original.apply(this, arguments);

                            }

                            return function () {};

                        };

                    },
                    iniLoadComments: function (event) {

                        var comment_section = document.querySelector("ytd-comments yt-next-continuation");

                        event.target.remove();

                        if (comment_section) {

                            comment_section.onShow(true);

                        }

                    },
                    iniLoadCommentsButton: function () {

                        var button;
                        var comment_section;

                        button = document.getElementById("iri-show-comments");

                        if (!button && (comment_section = document.querySelector("ytd-comments"))) {

                            button = document.createElement("div");
                            button.id = "iri-show-comments";
                            button.textContent = i18n.comments_visibility.button_show_comments;
                            button.addEventListener("click", this.iniLoadComments.bind(this), false);

                            comment_section.insertBefore(button, comment_section.firstChild);

                        }

                    },
                    iniLoadStartListener: function () {

                        var button;
                        var comment_section;
                        var comment_contents;

                        if (user_settings.comments_visibility > 0) {

                            if (!((comment_contents = document.querySelector("ytd-comments #contents")) && comment_contents.firstElementChild)) {

                                if ((comment_section = document.querySelector("ytd-comments yt-next-continuation"))) {

                                    if (comment_section.onShow) {

                                        comment_section.onShow = this.modOnShow(comment_section.onShow);

                                    }

                                    if (user_settings.comments_visibility < 2) {

                                        this.iniLoadCommentsButton();

                                    }

                                }

                            } else if (comment_contents.firstElementChild && (button = document.getElementById("iri-show-comments"))) {

                                button.remove();

                            }

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        window.addEventListener("yt-visibility-refresh", this.iniLoadStartListener.bind(this), true);

                    }
                },
                {
                    options: {
                        shortcuts_always_active: {
                            id: "shortcuts_always_active",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Player shortcuts always active"
                            }
                        }
                    },
                    alwaysActive: function (event) {

                        var i;
                        var api;
                        var list;
                        var clear;
                        var length;
                        var event_clone;

                        if (!user_settings.shortcuts_always_active) {

                            return;

                        }

                        if ((api = document.getElementById("movie_player"))) {

                            clear = window.location.pathname === "/watch" && api && api !== event.target && !api.contains(event.target);

                            clear = clear && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey && !event.target.isContentEditable;

                            clear = clear && (event.which > 47 && event.which < 58 || event.which > 95 && event.which < 106 || [27, 32, 35, 36, 37, 38, 39, 40, 66, 67, 79, 87, 187, 189].indexOf(event.which) > -1);

                            if (clear && ["EMBED", "INPUT", "OBJECT", "TEXTAREA", "IFRAME"].indexOf(document.activeElement.tagName) === -1) {

                                event_clone = new Event("keydown");
                                list = Object.keys(Object.getPrototypeOf(event));
                                length = list.length;

                                for (i = 0; i < length; i++) {

                                    event_clone[list[i]] = event[list[i]];

                                }

                                event.preventDefault();
                                api.dispatchEvent(event_clone);

                            }

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        document.addEventListener("keydown", this.alwaysActive.bind(this));

                    }
                },
                {
                    options: {
                        player_volume_wheel: {
                            id: "player_volume_wheel",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Change volume using the mouse wheel"
                            }
                        }
                    },
                    changeVolume: function (event) {

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

                        if (!user_settings.player_volume_wheel) {

                            return;

                        }

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

                                    chrome_bottom.timer = window.setTimeout(function () {

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

                                iridium_api.setStorage(
                                    "yt-player-volume",
                                    JSON.stringify({
                                        data: JSON.stringify({
                                            volume: new_volume,
                                            muted: false
                                        }),
                                        creation: timestamp,
                                        expiration: timestamp + 2592E6
                                    })
                                );

                                return false;

                            }

                        }

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        document.addEventListener("wheel", this.changeVolume.bind(this));

                    }
                },
                {
                    options: {
                        player_always_visible: {
                            id: "player_always_visible",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Video stays always visible while scrolling"
                            }
                        },
                        player_always_playing: {
                            id: "player_always_playing",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: true,
                            i18n: {
                                label: "Video keeps playing when changing pages",
                                button_restore: "Restore",
                                button_close: "Close"
                            }
                        }
                    },
                    move_data: {
                        is_mini: false,
                        mouse_offset: {X: 0, Y: 0},
                        player_position: {X: 0, Y: 0, snapRight: true, snapBottom: true},
                        player_dimension: {height: 0, width: 0}
                    },
                    updatePlayerPosition: function (is_moving) {

                        var style;
                        var masthead;
                        var video_player;
                        var player_margin;
                        var masthead_offset;

                        is_moving = is_moving === true;
                        player_margin = 10;
                        masthead_offset = player_margin;

                        if (!this.move_data.is_mini || document.webkitIsFullScreen ||  window.fullScreen) {

                            return;

                        }

                        if ((masthead = document.getElementById("masthead"))) {

                            masthead_offset += masthead.offsetHeight;

                        }

                        this.move_data.player_position.snapRight = false;
                        this.move_data.player_position.snapBottom = false;

                        if (is_moving || !user_settings.miniPlayer.position.snapRight) {

                            if (this.move_data.player_position.X < player_margin) {

                                this.move_data.player_position.X = player_margin;

                            } else if (this.move_data.player_position.X + this.move_data.player_dimension.width > document.documentElement.clientWidth - player_margin) {

                                this.move_data.player_position.snapRight = true;

                            }

                        }


                        if (is_moving || !user_settings.miniPlayer.position.snapBottom) {

                            if (this.move_data.player_position.Y < masthead_offset) {

                                this.move_data.player_position.Y = masthead_offset;

                            } else if (this.move_data.player_position.Y + this.move_data.player_dimension.height > document.documentElement.clientHeight - player_margin) {

                                this.move_data.player_position.snapBottom = true;

                            }

                        }

                        if ((video_player = document.getElementById("movie_player"))) {

                            style = "";

                            if (!is_moving && user_settings.miniPlayer.position.snapRight || this.move_data.player_position.snapRight) {

                                style += "right:" + player_margin + "px;";

                            } else {

                                style += "left:" + this.move_data.player_position.X + "px;";

                            }

                            if (!is_moving && user_settings.miniPlayer.position.snapBottom || this.move_data.player_position.snapBottom) {

                                style += "bottom:" + player_margin + "px;";

                            } else {

                                style += "top:" + this.move_data.player_position.Y + "px;";

                            }

                            video_player.setAttribute("style", style);

                        }

                    },
                    iniMoveData: function (clientX, clientY) {

                        var video_rects;
                        var video_player;

                        if ((video_player = document.getElementById("movie_player"))) {

                            video_rects = video_player.getBoundingClientRect();

                            this.move_data.player_dimension.height = video_rects.height;
                            this.move_data.player_dimension.width = video_rects.width;
                            this.move_data.player_position.X = video_rects.left;
                            this.move_data.player_position.Y = video_rects.top;
                            this.move_data.mouse_offset.X = clientX - video_rects.left;
                            this.move_data.mouse_offset.Y = clientY - video_rects.top;

                        }

                    },
                    movePlayer: function (event) {

                        if (event.type === "mousemove") {

                            document.documentElement.classList.add("iri-mini-player-moving");

                            this.move_data.player_position.X = event.clientX - this.move_data.mouse_offset.X;
                            this.move_data.player_position.Y = event.clientY - this.move_data.mouse_offset.Y;

                            this.hasMoved = true;
                            this.updatePlayerPosition(true);

                        } else if (event.type === "click" || event.type === "mouseup" || event.type === "mousedown") {

                            if (this.mouseListener) {

                                window.removeEventListener("click", this.mouseListener, true);
                                window.removeEventListener("mouseup", this.mouseListener, true);
                                window.removeEventListener("mousemove", this.mouseListener, true);

                                this.mouseListener = null;

                            }

                            switch (event.type) {
                                case "mousedown":

                                    this.iniMoveData(event.clientX, event.clientY);

                                    this.mouseListener = this.movePlayer.bind(this);

                                    window.addEventListener("click", this.mouseListener, true);
                                    window.addEventListener("mouseup", this.mouseListener, true);
                                    window.addEventListener("mousemove", this.mouseListener, true);

                                    break;
                                case "mouseup":
                                case "click":

                                    document.documentElement.classList.remove("iri-mini-player-moving");

                                    user_settings.miniPlayer = {
                                        position: {
                                            X: this.move_data.player_position.X,
                                            Y: this.move_data.player_position.Y,
                                            snapRight: this.move_data.player_position.snapRight,
                                            snapBottom: this.move_data.player_position.snapBottom
                                        },
                                        size: 352
                                    };

                                    break;
                            }

                            if (this.hasMoved) {

                                iridium_api.saveSettings("miniPlayer");
                                this.hasMoved = false;

                            }

                        }

                        event.preventDefault();
                        event.stopPropagation();
                        return false;

                    },
                    restorePlayer: function () {

                        var i;
                        var keys;
                        var history;
                        var ytd_app;
                        var player_api;
                        var current_data;
                        var history_state;
                        var yt_history_manager;

                        if ((player_api = document.getElementById("movie_player"))) {

                            current_data = player_api.getUpdatedConfigurationData();

                            if ((yt_history_manager = document.querySelector("yt-history-manager"))) {

                                keys = Object.keys(yt_history_manager.historyEntryTimeToDataMap_);

                                for (i = 0; i < keys.length; i++) {

                                    history = yt_history_manager.historyEntryTimeToDataMap_[keys[i]].rootData;

                                    if (current_data.args.eventid === history.csn) {

                                        history_state = {
                                            endpoint: history.response.currentVideoEndpoint,
                                            entryTime: +keys[i],
                                            savedComponentState: null
                                        };

                                        window.history.pushState(history_state, current_data.args.title, history.url);

                                        yt_history_manager.onPopState_({state: history_state});

                                        if ((ytd_app = document.querySelector("ytd-app"))) {

                                            ytd_app.setPageTitle(current_data.args.title);

                                        }

                                        break;

                                    }

                                }

                            }

                        }

                        this.endMiniPlayer("iri-always-playing");

                    },
                    closePlayer: function () {

                        var player_api;
                        var current_config;

                        this.endMiniPlayer("iri-always-playing");

                        if ((player_api = document.getElementById("movie_player")) && iridium_api.checkIfExists("yt.config_.FILLER_DATA.player.args") && (current_config = player_api.getUpdatedConfigurationData())) {

                            player_api.cueVideoByPlayerVars(current_config.args);

                        }

                    },
                    setMiniPlayerSize: function (player_api, event) {

                        if (event) {

                            if ("fullscreen" in event) {

                                if (event.fullscreen) {

                                    player_api.removeAttribute("style");

                                } else {

                                    this.updatePlayerPosition();

                                }

                            }

                        }

                        player_api.setSizeStyle(false, true);

                    },
                    endMiniPlayer: function (class_name) {

                        var player_api;
                        var is_in_theater_mode;

                        this.move_data.is_mini = false;

                        document.documentElement.classList.remove(class_name);

                        if ((player_api = document.getElementById("movie_player"))) {

                            is_in_theater_mode = document.querySelector("ytd-watch[theater]");

                            if (!document.querySelector(".iri-always-visible,.iri-always-playing")) {

                                player_api.removeAttribute("style");

                            }

                            player_api.setSizeStyle(true, is_in_theater_mode);

                            if (this.setMiniPlayerSizeListener) {

                                player_api.removeEventListener("onFullscreenChange", this.setMiniPlayerSizeListener, false);
                                this.setMiniPlayerSizeListener = null;

                            }

                            if (this.setMiniPlayerSizeResizeListener) {

                                window.removeEventListener("resize", this.setMiniPlayerSizeResizeListener, false);
                                this.setMiniPlayerSizeResizeListener = null;

                            }

                        }

                    },
                    iniMiniPlayer: function (class_name) {

                        var player_api;

                        this.move_data.is_mini = true;

                        document.documentElement.classList.add(class_name);

                        if ((player_api = document.getElementById("movie_player"))) {

                            if (this.setMiniPlayerSizeListener) {

                                player_api.removeEventListener("onFullscreenChange", this.setMiniPlayerSizeListener, false);
                                delete this.setMiniPlayerSizeListener;

                            }

                            this.iniMiniPlayerControls(player_api);
                            this.setMiniPlayerSize(player_api);

                            this.iniMoveData(0, 0);

                            this.move_data.player_position.X = user_settings.miniPlayer.position.X;
                            this.move_data.player_position.Y = user_settings.miniPlayer.position.Y;

                            this.updatePlayerPosition();

                            this.setMiniPlayerSizeListener = this.setMiniPlayerSize.bind(this, player_api);
                            player_api.addEventListener("onFullscreenChange", this.setMiniPlayerSizeListener, false);

                            this.setMiniPlayerSizeResizeListener = this.updatePlayerPosition.bind(this);
                            window.addEventListener("resize", this.setMiniPlayerSizeResizeListener, false);

                        }

                    },
                    iniAlwaysVisible: function (event) {

                        var player_bounds;
                        var is_out_of_sight;
                        var player_container;
                        var is_already_floating;

                        if (!user_settings.player_always_visible) {

                            return;

                        }

                        is_already_floating = document.documentElement.classList.contains("iri-always-visible");

                        if (event.detail && event.detail.pageType !== "watch" && is_already_floating) {

                            this.endMiniPlayer("iri-always-visible");

                        } else if (window.location.pathname === "/watch") {

                            if ((player_container = document.getElementById("player-container")) && (player_bounds = player_container.getBoundingClientRect())) {

                                is_out_of_sight = player_bounds.bottom < ((player_bounds.height / 2) + 50);

                                if (is_out_of_sight && !is_already_floating) {

                                    this.iniMiniPlayer("iri-always-visible");

                                } else if (!is_out_of_sight && is_already_floating) {

                                    this.endMiniPlayer("iri-always-visible");

                                }

                            }

                        }

                    },
                    iniAlwaysPlaying: function (event) {

                        if (!user_settings.player_always_playing) {

                            this.endMiniPlayer("iri-always-playing");

                            return;

                        }

                        if (event.detail && event.detail.pageType === "watch") {

                            this.endMiniPlayer("iri-always-playing");

                        } else if (document.querySelector(".playing-mode")) {

                            this.iniMiniPlayer("iri-always-playing");

                        }

                    },
                    iniMiniPlayerControls: function (player_api) {

                        var move_area;
                        var restore_page;
                        var close_mini_player;
                        var mini_player_controls;

                        if (!(mini_player_controls = document.getElementById("iri-mini-player-controls")) && player_api) {

                            mini_player_controls = document.createElement("div");
                            mini_player_controls.id = "iri-mini-player-controls";

                            move_area = document.createElement("div");
                            move_area.id = "iri-mini-player-move";
                            move_area.addEventListener("mousedown", this.movePlayer.bind(this), true);

                            restore_page = document.createElement("template");
                            restore_page.innerHTML =
                                "<div id='iri-mini-player-restore' class='iri-mini-player-control iri-mini-player-left-control'>" +
                                "    <svg height='24' width='24' fill='#FFF'>" +
                                "        <use xlink:href='#iri-svg-restore' class='iri-svg-shadow'/>" +
                                "        <path id='iri-svg-restore' d='M21 4H1v16h22V4h-2zm0 14H3v-6h10V6h8v12z'/>" +
                                "    </svg>" +
                                "    <div class='iri-mini-player-tooltip' data-locale='text|button_restore'></div>" +
                                "</div>";
                            restore_page = restore_page.content;
                            iridium_api.applyText(restore_page, i18n.player_always_playing);
                            restore_page.firstChild.addEventListener("click", this.restorePlayer.bind(this), false);

                            close_mini_player = document.createElement("template");
                            close_mini_player.innerHTML =
                                "<div id='iri-mini-player-close' class='iri-mini-player-control iri-mini-player-right-control'>" +
                                "    <svg height='24' width='24' fill='#FFF'>" +
                                "        <use xlink:href='#iri-svg-close' class='iri-svg-shadow'/>" +
                                "        <path id='iri-svg-close' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>" +
                                "    </svg>" +
                                "    <div class='iri-mini-player-tooltip' data-locale='text|button_close'></div>" +
                                "</div>";
                            close_mini_player = close_mini_player.content;
                            iridium_api.applyText(close_mini_player, i18n.player_always_playing);
                            close_mini_player.firstChild.addEventListener("click", this.closePlayer.bind(this), false);

                            mini_player_controls.appendChild(move_area);
                            mini_player_controls.appendChild(restore_page);
                            mini_player_controls.appendChild(close_mini_player);

                            player_api.appendChild(mini_player_controls);

                        }

                    },
                    modStopVideo: function (original) {

                        return function () {

                            if (user_settings.player_always_playing) {

                                return;

                            }

                            return original.apply(this, arguments);

                        };

                    },
                    onSettingsUpdated: function () {

                        this.move_data.player_position.X = user_settings.miniPlayer.position.X;
                        this.move_data.player_position.Y = user_settings.miniPlayer.position.Y;

                        this.updatePlayerPosition();

                    },
                    ini: function () {

                        var context;
                        var always_playing_listener;
                        var always_visible_listener;

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        always_playing_listener = this.iniAlwaysPlaying.bind(this);
                        always_visible_listener = this.iniAlwaysVisible.bind(this);

                        window.addEventListener("scroll", always_visible_listener, false);
                        window.addEventListener("popstate", always_playing_listener, true);
                        window.addEventListener("yt-navigate-finish", always_visible_listener, false);
                        window.addEventListener("yt-navigate-finish", always_playing_listener, false);

                        context = this;

                        Object.defineProperty(Object.prototype, "stopVideo", {
                            set: function (data) {
                                this._stopVideo = data;
                            },
                            get: function () {
                                return context.modStopVideo(this._stopVideo);
                            }
                        });

                    }
                },
                {
                    options: {
                        player_hide_end_screen: {
                            id: "player_hide_end_screen",
                            section: "video",
                            sub_section: "player",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Hide end screen cards on mouse hover"
                            }
                        }
                    },
                    toggleHideCards: function () {

                        if (user_settings.player_hide_end_screen) {

                            document.documentElement.classList.add("iri-hide-end-screen-cards");

                        } else {

                            document.documentElement.classList.remove("iri-hide-end-screen-cards");

                        }

                    },
                    onSettingsUpdated: function () {

                        this.toggleHideCards();

                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        this.toggleHideCards();

                    }
                },
                {
                    options: {
                        iridium_dark_mode: {
                            id: "iridium_dark_mode",
                            section: "settings",
                            sub_section: "settings",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Use dark theme"
                            },
                            callback: function () {

                                if (user_settings.iridium_dark_mode) {

                                    document.documentElement.classList.add("iri-dark-mode-settings");

                                } else {

                                    document.documentElement.classList.remove("iri-dark-mode-settings");

                                }

                            }
                        }
                    }
                },
                {
                    options: {
                        iridium_user_settings: {
                            id: "iridium_user_settings",
                            section: "settings",
                            sub_section: "settings",
                            type: "custom",
                            i18n: {
                                button_save: "Save",
                                button_close: "Close",
                                button_export: "Export",
                                button_import: "Import",
                                button_reset: "Reset",
                                placeholder: "Paste your new settings here",
                                confirm_reset: "You are about to reset your settings. It is advised to backup your current settings before continuing.\n\nDo you wish to contiue?\n\n",
                                reset_success: "Settings have been reset.\n\nChanges will be applied after a page refresh.\n\n",
                                confirm_import: "You are about to override your current settings. It is advised to backup your current settings before continuing.\n\nDo you wish to contiue?\n\n",
                                import_success: "Your settings have been imported with success.\n\nChanges will be applied after a page refresh.\n\n",
                                import_error: "Your settings could not be imported because they appear to be invalid.\n\n"
                            },
                            custom: function () {

                                var element;
                                var element_list;

                                element_list = [];

                                element = document.createElement("button");
                                element.textContent = i18n.iridium_user_settings.button_import;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "import"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.iridium_user_settings.button_export;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "export"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.iridium_user_settings.button_reset;
                                element.className = "setting iri-settings-button danger";
                                element.addEventListener("click", this.resetSettings.bind(this));

                                element_list.push(element);

                                return element_list;

                            },
                            resetSettings: function () {

                                if (window.confirm(i18n.iridium_user_settings.confirm_reset)) {

                                    iridium_api.initializeSettings();
                                    iridium_api.saveSettings();

                                    window.alert(i18n.iridium_user_settings.reset_success);

                                }

                            },
                            importSettings: function () {

                                var editor;
                                var textarea;

                                if ((textarea = document.getElementById("iridium-textarea")) && window.confirm(i18n.iridium_user_settings.confirm_import)) {

                                    try {

                                        user_settings = JSON.parse(textarea.value);

                                        iridium_api.saveSettings();

                                        window.alert(i18n.iridium_user_settings.import_success);

                                        if ((editor = document.getElementById("iridium-text-editor"))) {

                                            editor.remove();

                                        }

                                    } catch (error) {

                                        window.alert(i18n.iridium_user_settings.import_error + error.name + ": " + error.message);

                                    }

                                }

                            },
                            closeEditor: function (editor) {

                                editor.remove();

                            },
                            textEditor: function (type, event) {

                                var editor;
                                var button;
                                var textarea;
                                var buttons_section;

                                if (!(editor = document.getElementById("iridium-text-editor"))) {

                                    editor = document.createElement("div");
                                    editor.id = "iridium-text-editor";

                                    document.body.appendChild(editor);

                                } else {

                                    editor.textContent = "";

                                }

                                buttons_section = document.createElement("div");
                                buttons_section.id = "buttons-section";
                                textarea = document.createElement("textarea");
                                textarea.id = "iridium-textarea";
                                textarea.setAttribute("spellcheck", "false");

                                if (type === "import") {

                                    textarea.setAttribute("placeholder", i18n.iridium_user_settings.placeholder);

                                    button = document.createElement("button");
                                    button.textContent = i18n.iridium_user_settings.button_save;
                                    button.className = "iri-settings-button";
                                    button.addEventListener("click", this.importSettings.bind(this));

                                    buttons_section.appendChild(button);

                                }

                                button = document.createElement("button");
                                button.textContent = i18n.iridium_user_settings.button_close;
                                button.className = "iri-settings-button";
                                button.addEventListener("click", this.closeEditor.bind(this, editor));

                                buttons_section.appendChild(button);

                                if (type === "export") {

                                    textarea.value = JSON.stringify(user_settings, null, 4);

                                }

                                editor.appendChild(buttons_section);
                                editor.appendChild(textarea);

                            }
                        },
                        iridium_language: {
                            id: "iridium_language",
                            section: "settings",
                            sub_section: "language",
                            type: "custom",
                            i18n: {
                                button_save: "Save",
                                button_close: "Close",
                                confirm_save: "You are about to replace your extension language settings.\n\nDo you wish to continue?\n\n",
                                save_success: "New language saved successfully.\n\nChanges will be applied after a page refresh.\n\n",
                                save_error: "The new language could not be saved because it appears to be invalid.\n\n"
                            },
                            custom: function () {

                                var element;
                                var element_list;

                                element_list = [];

                                element = document.createElement("button");
                                element.textContent = i18n.language;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this));

                                element_list.push(element);

                                return element_list;

                            },
                            closeEditor: function (editor) {

                                editor.remove();

                            },
                            saveLanguage: function (textarea) {

                                var editor;

                                if ((textarea = document.getElementById("iridium-textarea")) && window.confirm(i18n.iridium_language.confirm_save)) {

                                    try {

                                        user_settings.custom_language = JSON.parse(textarea.value);

                                        iridium_api.setCustomLanguage(user_settings.custom_language);
                                        iridium_api.saveSettings("custom_language");

                                        window.alert(i18n.iridium_language.save_success);

                                        if ((editor = document.getElementById("iridium-text-editor"))) {

                                            editor.remove();

                                        }

                                    } catch (error) {

                                        window.alert(i18n.iridium_language.save_error + error.name + ": " + error.message);

                                    }
                                }

                            },
                            textEditor: function (event) {

                                var editor;
                                var button;
                                var textarea;
                                var buttons_section;

                                if (!(editor = document.getElementById("iridium-text-editor"))) {

                                    editor = document.createElement("div");
                                    editor.id = "iridium-text-editor";

                                    document.body.appendChild(editor);

                                } else {

                                    editor.textContent = "";

                                }

                                buttons_section = document.createElement("div");
                                buttons_section.id = "buttons-section";

                                button = document.createElement("button");
                                button.textContent = i18n.iridium_language.button_save;
                                button.className = "iri-settings-button";
                                button.addEventListener("click", this.saveLanguage.bind(this));

                                buttons_section.appendChild(button);

                                button = document.createElement("button");
                                button.textContent = i18n.iridium_language.button_close;
                                button.className = "iri-settings-button";
                                button.addEventListener("click", this.closeEditor.bind(this, editor));

                                buttons_section.appendChild(button);

                                textarea = document.createElement("textarea");
                                textarea.id = "iridium-textarea";
                                textarea.value = JSON.stringify(i18n, null, 4);
                                textarea.setAttribute("spellcheck", "false");

                                editor.appendChild(buttons_section);
                                editor.appendChild(textarea);

                            }
                        }
                    },
                    ini: function () {

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                    }
                },
                {
                    options: {
                        about: {
                            id: "about",
                            section: "about",
                            type: "custom"
                        }
                    }
                }
            ];

            iridium_api = {

                videoIdPattern: /v=([\w-_]+)/,
                setStorage: function (id, value) {

                    try {window.localStorage.setItem(id, value);} catch (ignore) {}

                },
                checkIfExists: function (path, host) {

                    var i;
                    var path_list;

                    host = host || window;
                    path_list = path.split(".");

                    for (i = 0; i < path_list.length; i++) {

                        if (!(host = host[path_list[i]])) {

                            return null;

                        }

                    }

                    return host;

                },
                applyText: function (html, text_list) {

                    var i;
                    var j;
                    var locale;
                    var locale_text;
                    var node_list;
                    var locale_list;

                    node_list = html.querySelectorAll("[data-locale]");

                    for (i = 0; i < node_list.length; i++) {

                        locale_list = node_list[i].dataset.locale.split("&");

                        for (j = 0; j < locale_list.length; j++) {

                            locale = locale_list[j].split("|");
                            locale_text = text_list[locale[1]];

                            switch (locale[0]) {
                                case "title":
                                    node_list[i].setAttribute("title", locale_text);
                                    break;
                                case "text":
                                    node_list[i].appendChild(document.createTextNode(locale_text));
                                    break;
                                case "tooltip":
                                    node_list[i].tooltipText = locale_text;
                                    break;
                            }

                        }

                    }

                },
                getObjectByKey: function (obj, keys, match, list, pos) {

                    var i;
                    var results;
                    var property;

                    results = [];

                    for (property in obj) {

                        if (obj.hasOwnProperty(property) && obj[property] !== null) {

                            if (keys.indexOf(property) > -1 && (!match || typeof obj[property] !== "object" && match(obj[property], obj))) {

                                results.push({
                                    target: obj,
                                    property: property,
                                    list: list,
                                    pos: pos
                                });

                            } else if (obj[property].constructor === Object) {

                                results = results.concat(this.getObjectByKey(obj[property], keys, match, list, pos));

                            } else if (obj[property].constructor === Array) {

                                for (i = 0; i < obj[property].length; i++) {

                                    results = results.concat(this.getObjectByKey(obj[property][i], keys, match, obj[property], i));

                                }

                            }

                        }

                    }

                    return results;

                },
                setCustomLanguage: function (custom_language) {

                    var i;
                    var j;
                    var key;
                    var sub_key;

                    key = Object.keys(custom_language);

                    for (i = 0; i < key.length; i++) {

                        sub_key = Object.keys(custom_language[key[i]]);

                        if (!(key[i] in i18n)) {

                            i18n[key[i]] = custom_language[key[i]];

                        } else {

                            for (j = 0; j < sub_key.length; j++) {

                                i18n[key[i]][sub_key[j]] = custom_language[key[i]][sub_key[j]];

                            }

                        }

                    }

                },
                fillSettingsContainer: function (options_list) {

                    var i;
                    var j;
                    var temp;
                    var input;
                    var label;
                    var select;
                    var header;
                    var option;
                    var options;
                    var section;
                    var setting;
                    var help_link;
                    var sub_section;

                    if (!(section = document.getElementById("settings_sub_section"))) {

                        return;

                    }

                    section.textContent = "";

                    if ((header = document.getElementById("settings_section_header"))) {

                        header.textContent = i18n.section_titles[options_list[0].section];

                    }

                    for (i = 0; i < options_list.length; i++) {

                        option = options_list[i];

                        if (!(sub_section = document.getElementById(i18n.sub_section_titles[option.sub_section]))) {

                            sub_section = document.createElement("div");
                            sub_section.id = i18n.sub_section_titles[option.sub_section];

                            header = document.createElement("h3");
                            header.textContent = i18n.sub_section_titles[option.sub_section];

                            sub_section.appendChild(header);
                            section.appendChild(sub_section);

                        }

                        setting = document.createElement("div");
                        setting.className = "settings_setting";

                        switch (option.type) {

                            case "checkbox":

                                input = document.createElement("input");
                                input.className = "setting";
                                input.id = option.id;
                                input.type = option.type;
                                input.checked = user_settings[option.id];

                                label = document.createElement("label");
                                label.textContent = i18n[option.id].label;
                                label.className = "setting";
                                label.setAttribute("for", option.id);

                                setting.appendChild(input);
                                setting.appendChild(label);

                                if (option.callback) {

                                    input.callback = option.callback;

                                }

                                break;

                            case "dropdown":

                                label = document.createElement("label");
                                label.textContent = i18n[option.id].label;
                                label.className = "setting";
                                label.setAttribute("for", option.id);

                                select = document.createElement("select");
                                select.id = option.id;
                                select.className = "iri-settings-button";

                                for (j = 0; j < option.options.length; j++) {

                                    options = document.createElement("option");
                                    options.value = option.options[j];
                                    options.textContent = i18n[option.id].options[j];

                                    if (user_settings[option.id] === option.options[j]) {

                                        options.setAttribute("selected", "true");

                                    }

                                    select.appendChild(options);
                                }

                                setting.appendChild(label);
                                setting.appendChild(select);

                                break;

                            case "custom":

                                if (option.custom) {

                                    temp = option.custom();

                                    for (j = 0; j < temp.length; j++) {

                                        setting.appendChild(temp[j]);

                                    }

                                }

                                break;

                        }

                        if (option.type !== "custom") {

                            help_link = document.createElement("a");
                            help_link.textContent = "?";
                            help_link.href = "https://github.com/ParticleCore/Iridium/wiki/Features#" + option.id;
                            help_link.setAttribute("title", i18n.iridium_api.feature_link);
                            help_link.className = "feature-link";
                            help_link.setAttribute("target", "features");

                            setting.appendChild(help_link);

                        }

                        sub_section.appendChild(setting);

                    }

                },
                loadSelectedSection: function () {

                    var name;
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
                updateSidebarSelection: function (event) {

                    var next;
                    var current;
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
                settingsBuilder: function (option) {

                    var header;
                    var divider;
                    var section;
                    var sub_section;
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
                        sidebar_section.textContent = option.section;
                        sidebar_section.dataset.section = option.section;

                        sidebar_section.className = "sidebar_section";
                        settings_sidebar.appendChild(sidebar_section);

                    }

                    if (!(settings_container = document.getElementById("iridium_settings_container"))) {

                        settings_container = document.createElement("div");
                        settings_container.id = "iridium_settings_container";

                        if (!(section = document.getElementById("settings_section"))) {

                            header = document.createElement("h2");
                            header.id = "settings_section_header";

                            divider = document.createElement("div");
                            divider.className = "settings_divider";

                            section = document.createElement("div");
                            section.id = "settings_section";

                            section.addEventListener("change", iridium_api.autoSaveSettings, true);
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

                    if (!document.querySelector(".active_sidebar")) {

                        sidebar_section.classList.add("active_sidebar");

                    }

                },
                loadSettingsMenu: function (is_refresh) {

                    var i;
                    var name;
                    var title;
                    var option;
                    var new_section;
                    var current_section;

                    if (is_refresh && (current_section = document.querySelector(".sidebar_section.active_sidebar"))) {

                        current_section = current_section.id;

                    }

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

                    title.textContent = i18n.iridium_api.settings_button;
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

                    document.removeEventListener("click", iridium_api.updateSidebarSelection);
                    document.addEventListener("click", iridium_api.updateSidebarSelection);

                    if (is_refresh) {

                        if ((new_section = document.querySelector(".sidebar_section.active_sidebar"))) {

                            new_section.classList.remove("active_sidebar");

                        }

                        if ((current_section = document.getElementById(current_section))) {

                            current_section.classList.add("active_sidebar");

                        }

                    }

                    iridium_api.loadSelectedSection();

                },
                autoSaveSettings: function (event) {

                    switch (event.target.type) {

                        case "checkbox":

                            user_settings[event.target.id] = event.target.checked;

                            break;

                        case "select-one":

                            user_settings[event.target.id] = event.target.value;

                            break;

                    }

                    if (event.target.callback) {

                        event.target.callback();

                    }

                    iridium_api.saveSettings();

                },
                saveSettings: function (single_setting) {

                    var settings;

                    if (single_setting in user_settings) {

                        settings = user_settings[single_setting];

                    } else {

                        settings = user_settings;

                    }

                    window.dispatchEvent(new CustomEvent(receive_settings_from_page, {
                        detail: {
                            settings: settings,
                            single_setting: single_setting
                        }
                    }));

                },
                initializeSettings: function (new_settings) {

                    var i;
                    var option;
                    var options;
                    var loaded_settings;
                    var iridium_settings;

                    if ((iridium_settings = document.getElementById("iridium-settings"))) {

                        loaded_settings = JSON.parse(iridium_settings.textContent || "null");
                        is_userscript = !!iridium_settings.getAttribute("is-userscript");
                        receive_settings_from_page = iridium_settings.getAttribute("settings-beacon-from");
                        send_settings_to_page = iridium_settings.getAttribute("settings-beacon-to");

                        iridium_settings.remove();

                    }

                    user_settings = new_settings || loaded_settings || {};
                    i18n = default_language;

                    if (user_settings.custom_language) {

                        iridium_api.setCustomLanguage(user_settings.custom_language);

                    }

                    for (i = 0; i < modules.length; i++) {

                        for (options in modules[i].options) {

                            if (modules[i].options.hasOwnProperty(options)) {

                                option = modules[i].options[options];

                                if (!(option.id in user_settings) && "value" in option) {

                                    user_settings[option.id] = option.value;

                                }

                                if (option.i18n) {

                                    i18n[option.id] = option.i18n;

                                }

                            }

                        }

                    }

                },
                initializeSettingsButton: function () {

                    var buttons;
                    var iridium_settings_button;

                    buttons = document.querySelector("#end #buttons");

                    if (buttons && !(iridium_settings_button = document.getElementById("iridium_settings_button"))) {

                        iridium_settings_button = document.createElement("template");
                        iridium_settings_button.innerHTML =
                            "<a id='iridium_settings_button' href='/iridium-settings' target='_blank'>" +
                            "    <svg viewBox='0 0 24 24' style='height:24px;'>" +
                            "        <radialGradient id='iri-gradient' gradientUnits='userSpaceOnUse' cx='6' cy='22' r='18.5'>" +
                            "            <stop class='iri-start-gradient' offset='0'/>" +
                            "            <stop class='iri-stop-gradient' offset='1'/>" +
                            "        </radialGradient>" +
                            "        <polygon points='21 12 3,1.8 3 22.2'/>" +
                            "        <path d='M3 1.8v20.4L21 12L3 1.8z M6 7l9 5.1l-9 5.1V7z'/>" +
                            "    </svg>" +
                            "    <div class='iri-tooltip' data-locale='text|settings_button' style='opacity: 0'></div>" +
                            "</a>";
                        iridium_settings_button = iridium_settings_button.content;
                        iridium_api.applyText(iridium_settings_button, i18n.iridium_api);
                        buttons.parentNode.insertBefore(iridium_settings_button, buttons);

                        document.documentElement.removeEventListener("load", iridium_api.initializeSettingsButton, true);

                    }

                },
                initializeModulesUpdate: function () {

                    var i;

                    for (i = 0; i < modules.length; i++) {

                        if (modules[i].onSettingsUpdated) {

                            modules[i].onSettingsUpdated();

                        }

                    }

                },
                initializeModules: function () {

                    var i;

                    for (i = 0; i < modules.length; i++) {

                        if (modules[i].ini) {

                            modules[i].ini();

                        }

                    }

                },
                initializeOption: function () {

                    var key;

                    if (this.started) {

                        return true;

                    }

                    this.started = true;

                    for (key in this.options) {

                        if (this.options.hasOwnProperty(key)) {

                            if (!(key in user_settings) && this.options[key].value) {

                                user_settings[key] = this.options[key].value;

                            }

                        }

                    }

                    return false;

                },
                initializeBroadcast: function (event) {

                    if (event.data && event.data.broadcast_id === this.broadcast_channel.name) {

                        this.initializeSettings(event.data);
                        this.initializeModulesUpdate();

                    }

                },
                ini: function () {

                    this.initializeSettings();

                    this.broadcast_channel = new BroadcastChannel(user_settings.broadcast_id);
                    this.broadcast_channel.addEventListener("message", this.initializeBroadcast.bind(this));

                    document.documentElement.addEventListener("load", this.initializeSettingsButton, true);

                    if (window.location.pathname === "/iridium-settings") {

                        this.loadSettingsMenu();

                        if (user_settings.iridium_dark_mode) {

                            document.documentElement.classList.add("iri-dark-mode-settings");

                        }

                    } else {

                        this.initializeModules();

                    }

                }

            };

            iridium_api.ini();

        },
        isAllowedPage: function () {

            var current_page;
            var allowed_pages;

            if ((current_page = window.location.pathname.match(/\/[a-z-]+/))) {

                current_page = current_page[0];

            } else {

                current_page = window.location.pathname;

            }

            allowed_pages = [
                "/",
                "/index",
                "/feed",
                "/results",
                "/shared",
                "/watch",
                "/channel",
                "/user",
                "/c",
                "/playlist",
                "/iridium-settings"
            ];

            return allowed_pages.indexOf(current_page) > -1;

        },
        generateUUID: function () {

            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (point) {

                return (point ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> point / 4).toString(16);

            });

        },
        saveSettings: function () {

            if (this.is_userscript) {

                this.GM_setValue(this.id, JSON.stringify(this.user_settings));

            } else {

                chrome.storage.local.set({iridiumSettings: this.user_settings});

            }

        },
        updateSettingsOnOpenWindows: function () {

            this.broadcast_channel.postMessage(this.user_settings);

        },
        settingsUpdatedFromOtherWindow: function (event) {

            if (event.data && event.data.broadcast_id === this.broadcast_channel.name) {

                this.user_settings = event.data;

                this.saveSettings();

            }

        },
        contentScriptMessages: function (custom_event) {

            var key;
            var locale_request;
            var updated_settings;

            if ((updated_settings = custom_event.detail.settings) !== undefined) {

                if (custom_event.detail.single_setting) {

                    this.user_settings[custom_event.detail.single_setting] = custom_event.detail.settings;

                } else if (this.is_settings_page && typeof updated_settings === "object") {

                    for (key in updated_settings) {

                        if (updated_settings.hasOwnProperty(key)) {

                            this.user_settings = updated_settings;

                            break;

                        }

                    }

                }

                this.saveSettings();
                this.updateSettingsOnOpenWindows();

            } else if ((locale_request = custom_event.detail.locale)) {

                window.dispatchEvent(new CustomEvent(this.send_settings_to_page, {
                    detail: {
                        locale: chrome.i18n.getMessage(locale_request)
                    }
                }));

            }

        },
        main: function (event) {

            var holder;

            this.receive_settings_from_page = this.generateUUID();
            this.send_settings_to_page = this.generateUUID();

            window.addEventListener(this.receive_settings_from_page, this.contentScriptMessages.bind(this));

            if (!event && this.is_userscript) {

                event = JSON.parse(this.GM_getValue(this.id, "{}"));

            }

            if (event) {

                this.user_settings = event[this.id] || event;

                if (!this.user_settings.broadcast_id) {

                    this.user_settings.broadcast_id = this.generateUUID();

                    this.saveSettings();

                }

                this.broadcast_channel = new BroadcastChannel(this.user_settings.broadcast_id);
                this.broadcast_channel.addEventListener("message", this.settingsUpdatedFromOtherWindow.bind(this));

                event = JSON.stringify(this.user_settings);

                if (this.is_userscript) {

                    holder = document.createElement("style");
                    holder.textContent = GM_getResourceText("iridium_css");

                    document.documentElement.appendChild(holder);

                }

                holder = document.createElement("iridium-settings");
                holder.id = "iridium-settings";
                holder.textContent = event;
                holder.setAttribute("style", "display: none");
                holder.setAttribute("is-userscript", this.is_userscript);
                holder.setAttribute("settings-beacon-from", this.receive_settings_from_page);
                holder.setAttribute("settings-beacon-to", this.send_settings_to_page);

                document.documentElement.appendChild(holder);

                holder = document.createElement("script");
                holder.textContent = "(" + this.inject + "())";

                document.documentElement.appendChild(holder);

                holder.remove();
                this.inject = null;
                delete this.inject;

            }

        },
        ini: function () {

            if (this.isAllowedPage()) {

                this.is_settings_page = window.location.pathname === "/iridium-settings";

                this.is_settings_page && window.stop();

                this.id = "iridiumSettings";
                this.is_userscript = typeof GM_info === "object";

                if (this.is_userscript) {

                    this.GM_getValue = GM_getValue;
                    this.GM_setValue = GM_setValue;
                    this.main();

                } else {

                    chrome.storage.local.get(this.id, this.main);

                }

            }

        }

    };

    iridium.ini();

}());
