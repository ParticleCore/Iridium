"use strict";

const channel = new BroadcastChannel(browser.runtime.id);
const port = browser.runtime.connect(browser.runtime.id);
let broadcastId = "";

channel.addEventListener("message", (message) => {
    if (broadcastId !== "" && message?.data?.broadcastId === broadcastId) {
        port.postMessage(message.data);
    }
});

port.onMessage.addListener((data) => {

    const id = data["broadcastId"]?.trim()  || "";
    const newId = data["newBroadcastId"]?.trim() || "";

    if (!id && !newId) {
        return;
    }

    if (newId) {
        if (newId !== broadcastId) {
            broadcastId = newId;
        }
    } else if (id && id !== broadcastId) {
        if (!broadcastId) {
            data["broadcastId"] = id;
        } else {
            data["newBroadcastId"] = broadcastId;
        }
        broadcastId = id;
    }

    channel.postMessage(data);

});