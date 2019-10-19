"use strict";

const GET_BROADCAST_ID = 0;

function onMessageResponse(data) {

    function onMessageListener(event) {
        if (event.data &&
            event.data.payload
        ) {
            chrome.runtime.sendMessage(event.data.payload);
        }
    }

    function onStorageChangedListener(changes) {

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
