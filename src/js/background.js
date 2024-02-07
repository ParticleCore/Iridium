"use strict";

const browser = chrome || browser;
const openOptions = () => {
    browser.runtime.openOptionsPage()?.then?.();
}
const Api = {
    debounce: false,
    onMessageListener: (data) => {

        if (!data.type || !data.payload || Api.debounce) {
            return;
        }

        // prevents the options page from opening in duplicate
        Api.debounce = true;
        setTimeout(() => Api.debounce = false, 1000);

        if (data.payload === SettingData.extensionButton.id) {
            openOptions();
        }

    }
}
const onConnect = (port) => {
    port.onMessage.addListener(Api.onMessageListener);
}

browser.runtime.onConnect.addListener(onConnect);

if (browser.action) {
    // mv3
    browser.action.onClicked.addListener(openOptions);
} else {
    // mv2
    browser.browserAction.onClicked.addListener(openOptions);
}