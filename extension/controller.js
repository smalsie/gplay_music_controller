chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.control) {

            switch(request.control) {

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

var socket = io('https://localhost:8001', {secure: true});

socket.on('command', function(data) {
    document.querySelector('[data-id="forward"]').click();
});

socket.emit('gplay_connected', '');
