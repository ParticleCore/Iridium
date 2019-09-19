"use strict";

const GET_BROADCAST_ID = 0;

let broadcastChannel;

chrome.runtime.sendMessage(
    GET_BROADCAST_ID,
    function (data) {

        console.log("response data", data);

        broadcastChannel = new BroadcastChannel(data);
        broadcastChannel.addEventListener("message", function (event) {
            console.log("channel message received");
        });

        chrome.storage.onChanged.addListener(function (
            changes,
            namespace
        ) {

            let data;

            console.log("content script", changes);

            data = {};

            for (let key in changes) {
                data[key] = changes[key].newValue;
            }

            broadcastChannel.postMessage({
                type: "setting-update",
                payload: data
            });

        });

    }
);