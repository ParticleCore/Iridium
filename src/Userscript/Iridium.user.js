// ==UserScript==
// @version         0.3.0a
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

        inject: function (is_userscript) {

            var i18n;
            var modules;
            var iridium_api;
            var user_settings;
            var default_language;

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
                    settings_button: "Iridium settings",
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
                        thumbnail_preview: {
                            id: "thumbnail_preview",
                            section: "general",
                            sub_section: "thumbnails",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Preview videos by hovering the thumbnails"
                            }
                        },
                        thumbnail_preview_mute: {
                            id: "thumbnail_preview_mute",
                            section: "general",
                            sub_section: "thumbnails",
                            type: "checkbox",
                            value: false,
                            i18n: {
                                label: "Shift key toggles audio on video preview"
                            }
                        }
                    },
                    togglePreviewMute: function (event) {

                        var player_api;

                        if (user_settings.thumbnail_preview_mute && event.which === 16 && (player_api = document.getElementById("iri-preview-player"))) {

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

                        if ((player_api = document.getElementById("iri-preview-player"))) {

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

                                if (video_container.firstChild) {

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

                        if (user_settings.thumbnail_preview) {

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

                                if (!window.yt || !window.yt.player || !window.yt.player.Application || !window.yt.player.Application.create) {

                                    timer = window.setInterval(function () {

                                        if (window.yt && window.yt.player && window.yt.player.Application && window.yt.player.Application.create) {

                                            window.clearInterval(timer);
                                            xhr = context.getPreviewArgs(video_id);

                                        }

                                    });

                                } else {

                                    xhr = this.getPreviewArgs(video_id);

                                }

                                document.addEventListener("keydown", this.togglePreviewMute, false);

                                container.parentNode.addEventListener("click", function listener(event) {

                                    context.endPreviewContainer(event, container, listener, xhr, timer, context, video_container, true);

                                }, false);

                                container.parentNode.addEventListener("mouseleave", function listener(event) {

                                    context.endPreviewContainer(event, container, listener, xhr, timer, context);

                                }, false);

                            }

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
                                    iridium_api.saveSettings();

                                    window.alert(i18n.blacklist_settings.reset_success);

                                }

                            },
                            importBlacklist: function () {

                                var editor;
                                var textarea;

                                if ((textarea = document.getElementById("iridium-textarea")) && window.confirm(i18n.blacklist_settings.confirm_import)) {

                                    try {

                                        user_settings.blacklist_settings = JSON.parse(textarea.value);

                                        iridium_api.saveSettings();

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
                                            "        <button class='close' title='" + i18n.blacklist_settings.button_remove + "'>" +
                                            "            <svg viewBox='0 0 10 10' height='10' width='10'>" +
                                            "                <polygon points='10 1.4 8.6 0 5 3.6 1.4 0 0 1.4 3.6 5 0 8.6 1.4 10 5 6.4 8.6 10 10 8.6 6.4 5'/>" +
                                            "            </svg>" +
                                            "        </button><a target='_blank'></a>" +
                                            "</div>";
                                        channel = channel.content;
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

                                            iridium_api.saveSettings();

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
                    getObjectByKey: function (obj, keys, match, list, pos) {

                        var i;
                        var results;
                        var property;

                        results = [];

                        for (property in obj) {

                            if (obj.hasOwnProperty(property) && obj[property] !== null) {

                                if (keys.indexOf(property) > -1 && (!match || typeof obj[property] !== "object" && match(obj[property]))) {

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

                        videos = this.getObjectByKey(obj, video_tag);

                        for (i = 0; i < videos.length; i++) {

                            ids = this.getObjectByKey(videos[i].target, ["browseId"], function (string) {
                                return string.indexOf("UC") === 0;
                            });

                            if (ids[0] && user_settings.blacklist_settings[ids[0].target["browseId"]]) {

                                videos[i].list.splice(videos[i].list.indexOf(videos[i].target), 1);

                            }

                        }

                        shelves = this.getObjectByKey(obj, shelf_tag);

                        for (i = 0; i < shelves.length; i++) {

                            videos = this.getObjectByKey(shelves[i].target, video_tag);

                            if (videos.length === 0) {

                                shelves[i].list.splice(shelves[i].list.indexOf(shelves[i].target), 1);

                            }

                        }

                        if (this.hasContainers()) {

                            sections = this.getObjectByKey(obj, section_tag);

                            for (i = 0; i < sections.length; i++) {

                                if (sections[i].target[sections[i].property].contents.length === 0) {

                                    sections[i].list.splice(sections[i].list.indexOf(sections[i].target), 1);

                                }

                            }

                        }

                    },
                    checkParse: function (original) {

                        var context = this;

                        return function (text, reviver) {

                            var temp = original.apply(this, arguments);

                            if (context.allowedBlacklistPage()) {

                                context.clearList(temp);

                            }

                            return temp;

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

                            ucid = this.getObjectByKey(container[i].data, ["browseId"], function (string) {
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

                                ucid = this.getObjectByKey(temp.data, ["browseId"], function (string) {
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

                        blacklist_button = document.createElement("div");
                        blacklist_button.className = "iri-add-to-blacklist";
                        blacklist_button.innerHTML =
                            "<svg viewBox='0 0 24 24' height='16' width='16'>" +
                            "    <polygon points='24 2.1 21.9 0 12 9.9 2.1 0 0 2.1 9.9 12 0 21.9 2.1 24 12 14.1 21.9 24 24 21.9 14.1 12'/>" +
                            "</svg>" +
                            "<div class='iri-tooltip'>" + i18n.blacklist_settings.button_add_title + "</div>";

                        return function (externalNode, deep) {

                            var node;
                            var container;

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

                        if (user_settings.enable_blacklist && event.target.className === "iri-add-to-blacklist") {

                            event.preventDefault();
                            event.stopPropagation();

                            parent = event.target.parentNode;

                            while (parent) {

                                if (this.tag_list.indexOf(parent.tagName) > -1) {

                                    if (parent.data) {

                                        ucid = this.getObjectByKey(parent.data, ["browseId"], function (string) {
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

                                iridium_api.saveSettings();

                                this.applyBlacklist();

                            }

                            return false;

                        }

                    },
                    iniBlacklist: function () {

                        if (this.allowedBlacklistPage()) {

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

                        if (user_settings.enable_blacklist) {

                            context = this;

                            JSON.parse = this.checkParse(JSON.parse);
                            HTMLDocument.prototype.importNode = this.modImportNode(HTMLDocument.prototype.importNode);

                            document.addEventListener("readystatechange", this.iniBlacklist.bind(this), false);
                            document.addEventListener("yt-page-data-fetched", this.iniBlacklist.bind(this), false);
                            document.addEventListener("click", this.addToBlacklist.bind(this), true);

                            Object.defineProperty(Object.prototype, "ytInitialData", {
                                set: function (data) {
                                    this._ytInitialData = data;
                                },
                                get: function () {

                                    if (context.allowedBlacklistPage()) {

                                        context.clearList(this._ytInitialData);

                                    }

                                    return this._ytInitialData;

                                }
                            });

                        }

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

                        var count_match;
                        var video_count;
                        var video_count_dot;
                        var owner_container;

                        delete this.addVideoCount.fetching;

                        count_match = event.target.response.match(/"(?:stats|briefStats)":\[{"runs":\[{"text":"([\w\W ]+?")}]}/);

                        if (count_match && (count_match = count_match[1].replace("\"", "")) && (owner_container = document.getElementById("owner-container"))) {

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

                        var time_match;
                        var time_container;

                        delete this.addVideoTime.fetching;

                        time_match = event.target.response.match(/"publishedTimeText":{"simpleText":"([\w\W ]+?")}/);

                        if (time_match && (time_match = time_match[1].replace("\"", ""))) {

                            time_container = document.createElement("span");
                            time_container.id = "iri-video-time";
                            time_container.textContent = " · " + time_match;

                            published_date.appendChild(time_container);

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
                                    xhr.send();

                                    this.removeVideoCount.xhr = xhr;

                                    context = this;

                                    document.addEventListener("yt-navigate-finish", function listener() {

                                        context.removeVideoCount(listener);

                                    }, false);

                                }

                                if (user_settings.channel_video_time && !this.addVideoTime.fetching && (upload_info = document.querySelector("#upload-info .date")) && upload_info.textContent.indexOf("·") === -1) {

                                    if ((video_id = window.location.href.match(/v=([\w-]+)/)) && (video_id = video_id[1])) {

                                        if (this.removeVideoTime.xhr) {

                                            this.removeVideoTime.xhr.abort();

                                        }

                                        this.addVideoTime.fetching = true;

                                        xhr = new XMLHttpRequest();
                                        xhr.addEventListener("load", this.addVideoTime.bind(this, upload_info));
                                        xhr.open("GET", "/channel/UC" + channel_id + "/search?query=%22com%2Fwatch%3Fv%3D" + video_id + "%22", true);
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
                                label: "Allow loudness normalisation"
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
                        }
                    },
                    modArgs: function (args) {

                        var i;
                        var fps;
                        var list;
                        var key_type;

                        if (user_settings.subscribed_channel_player_ads ? args.subscribed !== "1" : !user_settings.player_ads) {

                            delete args.ad3_module;

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

                            window.localStorage.setItem("yt-html5-player-modules::subtitlesModuleData::module-enabled", "false");

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


                            if (!this.getUpdatedConfigurationData) {

                                return original.apply(this, arguments);

                            }

                            current_config = this.getUpdatedConfigurationData();

                            if (current_config && current_config.args && (current_config.args.eventid === args.eventid || current_config.args.loaderUrl === args.loaderUrl) && !document.querySelector(".ended-mode")) {

                                return;

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

                        return function (text, reviver) {

                            var temp;
                            var player;

                            context.modArgs(this.config.args);

                            temp = original.apply(this, arguments);

                            if (user_settings.player_quality !== "auto" && (player = document.getElementById("movie_player"))) {

                                player.setPlaybackQuality(user_settings.player_quality);

                            }

                            return temp;

                        };

                    },
                    modJSONParse: function (original) {

                        var context = this;

                        return function (text, reviver) {

                            var temp = original.apply(this, arguments);

                            if (temp && temp.player && temp.player.args) {

                                context.modArgs(temp.player.args);

                            }

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
                                temp_list[key_value[0]] = key_value[1] || "";

                            }

                            this.modArgs(temp_list);

                            Object.defineProperty(event.target, "responseText", {writable: true});

                            event.target.responseText = "";
                            temp = Object.keys(temp_list);

                            for (i = 0; i < temp.length; i++) {

                                event.target.responseText += temp[i] + "=" + temp_list[temp[i]];

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

                            user_settings.userVolume = event.volume;

                        } else {

                            user_settings.theaterMode = event;

                        }

                        iridium_api.saveSettings();

                    },
                    playerReady: function (api) {

                        var watch_page_api;

                        if (api) {

                            if (user_settings.player_memorize_size) {

                                api.addEventListener("SIZE_CLICKED", this.handleCustoms);

                            }

                            if (user_settings.player_memorize_volume) {

                                api.setVolume(user_settings.userVolume);
                                api.addEventListener("onVolumeChange", this.handleCustoms);

                            }

                            if (user_settings.player_memorize_size && (watch_page_api = document.querySelector("ytd-watch"))) {

                                watch_page_api.playerApiReady_(api);
                                watch_page_api.theaterModeChanged_(user_settings.theaterMode);

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
                    ini: function () {

                        var context;

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        context = this;

                        JSON.parse = this.modJSONParse(JSON.parse);
                        XMLHttpRequest.prototype.open = this.modOpen(XMLHttpRequest.prototype.open);
                        DOMParser.prototype.parseFromString = this.modParseFromString(DOMParser.prototype.parseFromString);
                        window.onYouTubePlayerReady = this.shareApi(window.onYouTubePlayerReady);

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

                                        if (window.ytcsi && window.ytcsi.data_ && window.ytcsi.data_.tick) {

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
                            loaded: {
                                set: function (data) {
                                    this._loaded = data;
                                },
                                get: function () {

                                    if (this.args && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {

                                        return false;

                                    }

                                    return this._loaded;

                                }

                            },
                            load: {
                                set: function (data) {
                                    this._load = data;
                                },
                                get: function () {

                                    var temp = this._load && this._load.toString();

                                    if (temp && temp.match("Application.create")) {

                                        return context.modPlayerLoad(this._load);

                                    }

                                    return this._load;

                                }

                            },
                            autoplay: {
                                set: function (data) {
                                    this._autoplay = data;
                                },
                                get: function () {

                                    if (this.ucid && this._autoplay === "1" && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {

                                        return "0";

                                    }

                                    return this._autoplay;

                                }

                            },
                            fflags: {
                                set: function (data) {
                                    this._fflags = data;
                                },
                                get: function () {

                                    if (this.ucid && (!this.autoplay || this.autoplay === "1") && (context.isChannel() ? !user_settings.channel_trailer_auto_play : !user_settings.player_auto_play)) {

                                        if (this._fflags && this._fflags.replace) {

                                            return this._fflags
                                                .replace(
                                                    "legacy_autoplay_flag=true",
                                                    "legacy_autoplay_flag=false"
                                                ).replace(
                                                    "disable_new_pause_state3=true",
                                                    "disable_new_pause_state3=false"
                                                );

                                        }

                                    }

                                    return this._fflags;

                                }

                            }
                        });

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

                        if (user_settings.shortcuts_always_active && (api = document.getElementById("movie_player"))) {

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

                                window.localStorage.setItem(
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

                        if (user_settings.player_volume_wheel) {

                            document.addEventListener("wheel", this.changeVolume.bind(this));

                        }

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
                    endMiniPlayer: function (class_name) {

                        var player_api;
                        var is_in_theater_mode;

                        document.documentElement.classList.remove(class_name);

                        if ((player_api = document.getElementById("movie_player"))) {

                            is_in_theater_mode = document.querySelector("ytd-watch[theater]");

                            player_api.setSizeStyle(true, is_in_theater_mode);

                        }

                    },
                    iniMiniPlayer: function (class_name) {

                        var player_api;

                        document.documentElement.classList.add(class_name);

                        if ((player_api = document.getElementById("movie_player"))) {

                            player_api.setSizeStyle(false, true);

                            this.iniMiniPlayerControls(player_api);

                        }

                    },
                    iniAlwaysVisible: function (event) {

                        var player;
                        var player_bounds;
                        var is_out_of_sight;
                        var player_container;
                        var is_already_floating;

                        if (user_settings.player_always_visible) {

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

                        }

                    },
                    iniAlwaysPlaying: function (event) {

                        if (user_settings.player_always_playing) {

                            if (event.detail && event.detail.pageType === "watch") {

                                this.endMiniPlayer("iri-always-playing");

                            } else if (!document.querySelector(".ended-mode")) {

                                this.iniMiniPlayer("iri-always-playing");

                            }

                        }

                    },
                    restorePlayer: function () {

                        var player_api;
                        var current_data;
                        var original_url;
                        var history_state;
                        var watch_page_api;
                        var page_manager_api;

                        if ((watch_page_api = document.querySelector("ytd-watch"))) {

                            if ((player_api = document.getElementById("movie_player"))) {

                                current_data = player_api.getUpdatedConfigurationData();
                                original_url = current_data.args.loaderUrl.replace(window.location.origin, "");
                                document.title = current_data.args.title + " - YouTube";

                                history_state = {
                                    endpoint: {
                                        clickTrackingParams: "",
                                        watchEndpoint: {
                                            videoId: current_data.args.video_id
                                        },
                                        webNavigationEndpointData: {
                                            url: original_url,
                                            webPageType: "WATCH"
                                        }
                                    },
                                    entryTime: window.performance.now(),
                                    savedComponentState: null
                                };

                                window.history.pushState(history_state, document.title, original_url);

                            }

                            this.endMiniPlayer("iri-always-playing");

                            if ((page_manager_api = document.querySelector("ytd-page-manager"))) {

                                page_manager_api.setActivePage_(watch_page_api);

                            }

                            watch_page_api.initComments_();

                            document.dispatchEvent(new Event("yt-page-data-fetched"));
                            document.dispatchEvent(new Event("yt-page-data-updated"));

                        }

                    },
                    closePlayer: function () {

                        var player_api;

                        this.endMiniPlayer("iri-always-playing");

                        if ((player_api = document.getElementById("movie_player"))) {

                            player_api.stopVideo(true);

                        }

                    },
                    iniMiniPlayerControls: function (player_api) {

                        var restore_page;
                        var close_mini_player;
                        var mini_player_controls;

                        if (!(mini_player_controls = document.getElementById("iri-mini-player-controls")) && player_api) {

                            mini_player_controls = document.createElement("div");
                            mini_player_controls.id = "iri-mini-player-controls";

                            restore_page = document.createElement("div");
                            restore_page.id = "iri-mini-player-restore";
                            restore_page.className = "iri-mini-player-control iri-mini-player-left-control";
                            restore_page.innerHTML =
                                "<svg height='24' width='24' fill='#FFF'>" +
                                "    <use xlink:href='#iri-svg-restore' class='iri-svg-shadow'/>" +
                                "    <path id='iri-svg-restore' d='M21 4H1v16h22V4h-2zm0 14H3v-6h10V6h8v12z'/>" +
                                "</svg>" +
                                "<div class='iri-mini-player-tooltip'>" + i18n.player_always_playing.button_restore + "</div>";
                            restore_page.addEventListener("click", this.restorePlayer.bind(this), false);

                            close_mini_player = document.createElement("div");
                            close_mini_player.id = "iri-mini-player-close";
                            close_mini_player.className = "iri-mini-player-control iri-mini-player-right-control";
                            close_mini_player.innerHTML =
                                "<svg height='24' width='24' fill='#FFF'>" +
                                "    <use xlink:href='#iri-svg-close' class='iri-svg-shadow'/>" +
                                "    <path id='iri-svg-close' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>" +
                                "</svg>" +
                                "<div class='iri-mini-player-tooltip'>" + i18n.player_always_playing.button_close + "</div>";
                            close_mini_player.addEventListener("click", this.closePlayer.bind(this), false);

                            mini_player_controls.appendChild(restore_page);
                            mini_player_controls.appendChild(close_mini_player);

                            player_api.appendChild(mini_player_controls);

                        }

                    },
                    modStopVideo: function (original) {

                        return function (bypass) {

                            if (user_settings.player_always_playing && !bypass) {

                                return;

                            }

                            return original.apply(this, arguments);

                        };

                    },
                    ini: function () {

                        var context;

                        if (iridium_api.initializeOption.call(this)) {

                            return;

                        }

                        window.addEventListener("scroll", this.iniAlwaysVisible.bind(this), false);
                        window.addEventListener("yt-navigate-start", this.iniAlwaysVisible.bind(this), false);
                        window.addEventListener("yt-navigate-finish", this.iniAlwaysVisible.bind(this), false);
                        window.addEventListener("yt-navigate-start", this.iniAlwaysPlaying.bind(this), false);
                        window.addEventListener("yt-navigate-finish", this.iniAlwaysPlaying.bind(this), false);

                        context = this;

                        Object.defineProperty(Object.prototype, "stopVideo", {
                            set: function (data) {
                                this._stopVideo = data;
                            },
                            get: function () {
                                return context.modStopVideo(this._stopVideo);
                            }
                        })

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
                                element.textContent = i18n.iridium_user_settings.button_export;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "export"));

                                element_list.push(element);

                                element = document.createElement("button");
                                element.textContent = i18n.iridium_user_settings.button_import;
                                element.className = "setting iri-settings-button";
                                element.addEventListener("click", this.textEditor.bind(this, "import"));

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

                                    user_settings = null;

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
                                        iridium_api.saveSettings();

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

                                    if (user_settings[option.id] === options.value) {

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
                loadSettingsMenu: function () {

                    var i;
                    var name;
                    var title;
                    var option;

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

                    document.addEventListener("click", iridium_api.updateSidebarSelection);

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
                saveSettings: function () {

                    document.documentElement.dataset.iridium_save_settings = JSON.stringify(user_settings);

                },
                initializeSettings: function () {

                    var i;
                    var option;
                    var options;

                    user_settings = JSON.parse(document.documentElement.dataset.iridium_user_settings || "{}");

                    if (document.documentElement.dataset.iridium_user_settings) {

                        document.documentElement.removeAttribute("data-iridium_user_settings");

                    }

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

                        iridium_settings_button = document.createElement("a");
                        iridium_settings_button.id = "iridium_settings_button";
                        iridium_settings_button.href = "/iridium-settings";
                        iridium_settings_button.target = "_blank";
                        iridium_settings_button.innerHTML =
                            "<svg viewBox='0 0 24 24' style='height:24px;'>" +
                            "    <radialGradient id='iri-gradient' gradientUnits='userSpaceOnUse' cx='6' cy='22' r='18.5'>" +
                            "        <stop class='iri-start-gradient' offset='0'/>" +
                            "        <stop class='iri-stop-gradient' offset='1'/>" +
                            "    </radialGradient>" +
                            "    <polygon points='24,11.8 6,1.6 6,22'/>" +
                            "    <path d='M6 1.6V22l18-10.2L6 1.6z M9 6.8l9 5.1L9 17V6.8z'/>" +
                            "</svg>" +
                            "<div class='iri-tooltip' style='opacity: 0'>" + i18n.iridium_api.settings_button + "</div>";
                        buttons.parentNode.insertBefore(iridium_settings_button, buttons);

                        document.documentElement.removeEventListener("load", iridium_api.initializeSettingsButton, true);

                    }

                },
                initializeModules: function () {

                    var i;
                    var timestamp;

                    for (i = 0; i < modules.length; i++) {

                        if (modules[i].ini) {

                            modules[i].ini();

                        }

                    }

                    if (user_settings.player_quality !== "auto") {

                        timestamp = Date.now();

                        window.localStorage.setItem(
                            "yt-player-quality",
                            JSON.stringify({
                                data: user_settings.player_quality,
                                creation: timestamp,
                                expiration: timestamp + 2592E6
                            })
                        );

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
                ini: function () {

                    iridium_api.initializeSettings();

                    if (window.location.pathname === "/iridium-settings") {

                        iridium_api.loadSettingsMenu();

                        if (user_settings.iridium_dark_mode) {

                            document.documentElement.classList.add("iri-dark-mode-settings");

                        }

                    } else {

                        iridium_api.initializeModules();

                    }

                    document.documentElement.addEventListener("load", iridium_api.initializeSettingsButton, true);

                }

            };

            iridium_api.ini();

        },
        contentScriptMessages: function () {

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
        filterChromeKeys: function (keys) {

            if (keys[iridium.id] && keys[iridium.id].new_value) {

                document.documentElement.dataset.iridium_load_settings = JSON.stringify(
                    (keys[iridium.id].new_value && keys[iridium.id].new_value[iridium.id]) || keys[iridium.id].new_value || {}
                );

            }

        },
        main: function (event) {

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
                    holder.href = "https://particlecore.github.io/Iridium/css/Iridium.css?v=0.3.0a";
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
        ini: function () {

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
