const SettingData = {
    extensionButton: {
        id: "extensionButton",
        default: true,
    },
    syncSettings: {
        id: "syncSettings",
        default: false,
    },
    fullTitles: {
        id: "fullTitles",
        default: true,
    },
    theme: {
        id: "theme",
        default: "deviceTheme",
    },
    logoSubscriptions: {
        id: "logoSubscriptions",
        default: false,
    },
    autoplayChannelTrailer: {
        id: "autoplayChannelTrailer",
        default: false,
    },
    channelTab: {
        id: "channelTab",
        default: "featured",
    },
    homeShorts: {
        id: "homeShorts",
        default: true,
    },
    subscriptionsShorts: {
        id: "subscriptionsShorts",
        default: true,
    },
    videoPageShorts: {
        id: "videoPageShorts",
        default: true,
    },
    searchShorts: {
        id: "searchShorts",
        default: true,
    },
    adOptOutAll: {
        id: "adOptOutAll",
        default: false,
    },
    adSubscribed: {
        id: "adSubscribed",
        default: false,
    },
    adVideoFeed: {
        id: "adVideoFeed",
        default: false,
    },
    adInVideo: {
        id: "adInVideo",
        default: false,
    },
    adTaggedProducts: {
        id: "adTaggedProducts",
        default: false,
    },
    adMasthead: {
        id: "adMasthead",
        default: false,
    },
    adHomeFeed: {
        id: "adHomeFeed",
        default: false,
    },
    adSearchFeed: {
        id: "adSearchFeed",
        default: false,
    },
    videoFocus: {
        id: "videoFocus",
        default: true,
    },
    creatorMerch: {
        id: "creatorMerch",
        default: true,
    },
    videoCount: {
        id: "videoCount",
        default: true,
    },
    ambientMode: {
        id: "ambientMode",
        default: true,
    },
    reversePlaylist: {
        id: "reversePlaylist",
        default: true,
    },
    reversePlaylistToggled: {
        id: "reversePlaylistToggled",
        default: false,
    },
    superTheater: {
        id: "superTheater",
        default: true,
    },
    superTheaterScrollbar: {
        id: "superTheaterScrollbar",
        default: true,
    },
    defaultQuality: {
        id: "defaultQuality",
        default: "auto",
    },
    defaultSpeed: {
        id: "defaultSpeed",
        default: "-1",
    },
    alwaysVisible: {
        id: "alwaysVisible",
        default: true,
    },
    alwaysVisiblePosition: {
        id: "alwaysVisiblePosition",
        default: {},
    },
    hfrAllowed: {
        id: "hfrAllowed",
        default: true,
    },
    autoplay: {
        id: "autoplay",
        default: false,
    },
    loudness: {
        id: "loudness",
        default: false,
    },
    scrollVolume: {
        id: "scrollVolume",
        default: true,
    },
    scrollVolumeShift: {
        id: "scrollVolumeShift",
        default: true,
    },
    scrollVolumeStep: {
        id: "scrollVolumeStep",
        default: 5,
    },
    infoCards: {
        id: "infoCards",
        default: false,
    },
    annotations: {
        id: "annotations",
        default: true,
    },
    endScreen: {
        id: "endScreen",
        default: false,
    },
    autoplayShortcut: {
        id: "autoplayShortcut",
        default: true,
    },
    videoFocusToggle: {
        id: "videoFocusToggle",
        default: true,
    },
    videoScreenshot: {
        id: "videoScreenshot",
        default: true,
    },
    videoThumbnail: {
        id: "videoThumbnail",
        default: true,
    },
    monetizationInfo: {
        id: "monetizationInfo",
        default: true,
    },
    blacklistEnabled: {
        id: "blacklistEnabled",
        default: true,
    },
    blacklistButton: {
        id: "blacklistButton",
        default: true,
    },
    blacklist: {
        id: "blacklist",
        default: {},
    },
};
const getDefaultSettings = () => Object.keys(SettingData).reduce((previousValue, currentValue) => ({
    ...previousValue,
    [currentValue]: SettingData[currentValue].default
}), {});