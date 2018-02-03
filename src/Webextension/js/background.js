chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({
        url: "https://www.youtube.com/iridium-settings"
    });
});
