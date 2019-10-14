"use strict";

const GET_BROADCAST_ID = 0;

function onMessageResponse(data) {

    function onMessageListener(event) {

        if (!event.data ||
            !event.data.payload ||
            event.data.type !== "setting-update"
        ) {
            return;
        }

        chrome.storage.local.set(event.data.payload, function (event) {
            console.log("onMessageListener", event);
        });

    }

    function onStorageChangedListener(
        changes,
        namespace
    ) {

        let data;

        data = {};

        for (let key in changes) {
            if (changes.hasOwnProperty(key)) {
                data[key] = changes[key].newValue;
            }
        }

        broadcastChannel.postMessage({
            type: "setting-update",
            payload: data
        });

    }

    let broadcastChannel;

    broadcastChannel = new BroadcastChannel(data);
    broadcastChannel.addEventListener("message", onMessageListener);

    chrome.storage.onChanged.addListener(onStorageChangedListener);

}

chrome.runtime.sendMessage(GET_BROADCAST_ID, onMessageResponse);
