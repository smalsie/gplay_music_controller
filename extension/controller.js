chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.control) {
            control(request.control);
        }

    }
);

function getCurrentSong() {
    var name = document.getElementById("currently-playing-title").innerHTML;
    var image = document.getElementById("playerBarArt").src;

    return {
        name: name,
        image: image
    }
}

function control(type) {
    switch(type) {

        case "next":
            document.querySelector('[data-id="forward"]').click();
            sendResponse(getCurrentSong());
            break;
        case "previous":
            document.querySelector('[data-id="rewind"]').click();
            sendResponse(getCurrentSong());
            break;
        case "currentSong":
            sendResponse(getCurrentSong());
            break;
    }
}

var location = window.location;
var socket = io('https://localhost:8001', {secure: true});

socket.on('command', function(data) {
    control(data);
});

socket.emit('gplay_connected', '');

setInterval(function() {
    socket.emit('song', getCurrentSong());
}, 500);
