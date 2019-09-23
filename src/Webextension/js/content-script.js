"use strict";

const GET_BROADCAST_ID = 0;

function onMessageResponse(data) {

    function onMessageListener(event) {
        console.log("channel message received");
    }

    function onStorageChangedListener(
        changes,
        namespace
    ) {

        let data;

        console.log("content script", changes);

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

    console.log("response data", data);

    broadcastChannel = new BroadcastChannel(data);
    broadcastChannel.addEventListener("message", onMessageListener);

    chrome.storage.onChanged.addListener(onStorageChangedListener);

}

chrome.runtime.sendMessage(GET_BROADCAST_ID, onMessageResponse);
