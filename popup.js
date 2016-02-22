// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function playMusicOpen(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
  };

    chrome.tabs.query(queryInfo, function(tabs) {

        var isOpen = false;
        var tabId = -1;

        for(var i = 0; i < tabs.length; i++) {

            if(tabs[i].url.indexOf("play.google.com/music") > 1) {
                isOpen = true;
                tabId = tabs[i].id;
                break;
            }
        }

        callback(isOpen, tabId);

    });
}

document.addEventListener('DOMContentLoaded', function() {
    playMusicOpen(function(open, tabId) {
        var openDiv = document.getElementById("open");
        var closedDiv = document.getElementById("closed");

        if(open) {
            closedDiv.hidden = true;
            openDiv.hidden = false;

            var name = document.getElementById("name");
            var image = document.getElementById("image");
            var previous = document.getElementById("previous");
            var next = document.getElementById("next");

            chrome.tabs.sendMessage(tabId, {control: "currentSong"}, function(response) {
                setCurrentSong(response);
            });

            previous.onclick = function() {
                chrome.tabs.sendMessage(tabId, {control: "previous"}, function(response) {
                    setCurrentSong(response);
                });
            };

            next.onclick = function() {

                chrome.tabs.sendMessage(tabId, {control: "next"}, function(response) {
                    setCurrentSong(response);
                });

            };


        } else {
            closedDiv.hidden = false;
            openDiv.hidden = true;
        }

    });
});

function setCurrentSong(info) {

    console.log(name);
    console.log(document.getElementById("name"))

    if(info.name)
        document.getElementById("name").innerHTML = info.name;

    console.log(info.name);

    if(info.image)
        image.src = info.image;
}
