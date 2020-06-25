/*
Modified by: Jesus Romero
https://github.com/jesusrv92/video-conferencing
*/

// Muaz Khan     - https://github.com/muaz-khan
// MIT License   - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/video-conferencing

var invited = false;
if (!location.hash.replace('#', '').length) {
    location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
}
else {
    invited = true;
}

document.getElementById('conference-input').hidden = invited;
new ClipboardJS('.invitation', {
    text: function (trigger) {
        return window.location.href;
    }
});

var config = {
    // via: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs
    openSocket: function (config) {
        var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';

        config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var sender = Math.round(Math.random() * 999999999) + 999999999;

        io.connect(SIGNALING_SERVER).emit('new-channel', {
            channel: config.channel,
            sender: sender
        });

        var socket = io.connect(SIGNALING_SERVER + config.channel);
        socket.channel = config.channel;
        socket.on('connect', function () {
            if (config.callback) config.callback(socket);
        });

        socket.send = function (message) {
            socket.emit('message', {
                sender: sender,
                data: message
            });
        };

        socket.on('message', config.onmessage);
    },
    onRemoteStream: function (media) {
        var mediaElement = getMediaElement(media.video, {
            width: '30%',
            buttons: ['mute-audio', 'mute-video']
        });
        mediaElement.id = media.stream.id.slice(1, -1);
        videosContainer.appendChild(mediaElement);
    },
    onRemoteStreamEnded: function (stream, video) {
        if (video.parentNode && video.parentNode.parentNode && video.parentNode.parentNode.parentNode) {
            video.parentNode.parentNode.parentNode.removeChild(video.parentNode.parentNode);
        }
    },
    onRoomFound: function (room) {
        var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster + '"]');
        if (alreadyExist) return;

        if (typeof roomsList === 'undefined') roomsList = document.body;

        var tr = document.createElement('tr');
        tr.innerHTML = '<td>Room available</td>' +
            '<td><button class="join">Join</button></td>';
        roomsList.appendChild(tr);

        var joinRoomButton = tr.querySelector('.join');
        joinRoomButton.setAttribute('data-broadcaster', room.broadcaster);
        joinRoomButton.setAttribute('data-roomToken', room.roomToken);
        joinRoomButton.onclick = function () {
            this.disabled = true;
            hangUp.disabled = false;
            var broadcaster = this.getAttribute('data-broadcaster');
            var roomToken = this.getAttribute('data-roomToken');
            captureUserMedia(function () {
                conferenceUI.joinRoom({
                    roomToken: roomToken,
                    joinUser: broadcaster
                });
            }, function () {
                joinRoomButton.disabled = false;
            });
        };
    },
    onRoomClosed: function (room) {
        var joinButton = document.querySelector('button[data-roomToken="' + room.roomToken + '"]');
        if (joinButton) {
            joinButton.parentNode.parentNode.parentNode.parentNode.removeChild(joinButton.parentNode.parentNode.parentNode);
        }
    },
    onReady: function () {
        console.log('now you can open or join rooms');
    }
};

function setupNewRoomButtonClickHandler() {
    btnSetupNewRoom.disabled = true;
    hangUp.disabled = false;
    invitation.disabled = false;
    captureUserMedia(function () {
        conferenceUI.createRoom({
            roomName: (document.getElementById('conference-name') || {}).value || 'Anonymous'
        });
    }, function () {
        btnSetupNewRoom.disabled = false;
        hangUp.disabled = true;
        invitation.disabled = true;
    });
}

const bandwidthSelector = document.getElementById('bandwidth');

function captureUserMedia(callback, failure_callback) {
    var video = document.createElement('video');
    video.muted = true;
    video.volume = 0;

    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
        video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.setAttribute('controls', true);
    }

    getUserMedia({
        video: video,
        onsuccess: function (stream) {
            config.attachStream = stream;

            var mediaElement = getMediaElement(video, {
                width: '30%',
                buttons: ['mute-audio', 'mute-video'],
                selfStream: true
            });
            // mediaElement.toggle('mute-audio');
            videosContainer.appendChild(mediaElement);
            bandwidthSelector.disabled = false;

            callback && callback();
        },
        onerror: function () {
            alert('unable to get access to your webcam');
            callback && callback();
        }
    });
}

var conferenceUI = conference(config);

/* UI specific */
var videosContainer = document.getElementById('videos-container') || document.body;
var btnSetupNewRoom = document.getElementById('setup-new-room');
var hangUp = document.getElementById('hang-up');
var invitation = document.getElementById('invitation');
var roomsList = document.getElementById('rooms-list');

if (btnSetupNewRoom) btnSetupNewRoom.onclick = setupNewRoomButtonClickHandler;
// The hangUp button resets the page to the default state
hangUp.onclick = () => {
    // This cleans up the socket server
    conferenceUI.leaveRoom();
    btnSetupNewRoom.disabled = false;
    hangUp.disabled = true;
    invitation.disabled = true;
    // This sends a signal to stop streaming and remove the video component
    // on the others browsers
    config.attachStream.getTracks().forEach(track => {
        track.stop();
        track.dispatchEvent(new Event('ended'));
    })
    videosContainer.innerHTML = "";
}
window.onclose = window.onbeforeunload = () => {
    // This cleans up the socket server
    conferenceUI.leaveRoom();
    // This sends a signal to stop streaming and remove the video component
    // on the others browsers
    config.attachStream.getTracks().forEach(track => {
        track.dispatchEvent(new Event('ended'));
        track.stop();
    })
}
(function () {
    var uniqueToken = document.getElementById('unique-token');
    if (uniqueToken)
        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;display: block;"><a href="' + location.href + '" target="_blank">Right click to copy & share this private link</a></h2>';
        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
})();

bandwidthSelector.onchange = () => {
    bandwidthSelector.disabled = true;
    const bandwidth = bandwidthSelector.options[bandwidthSelector.selectedIndex].value;

    // In Chrome, use RTCRtpSender.setParameters to change bandwidth without
    // (local) renegotiation. Note that this will be within the envelope of
    // the initial maximum bandwidth negotiated via SDP.
    if ((adapter.browserDetails.browser === 'chrome' ||
        adapter.browserDetails.browser === 'safari' ||
        (adapter.browserDetails.browser === 'firefox' &&
            adapter.browserDetails.version >= 64)) &&
        'RTCRtpSender' in window &&
        'setParameters' in window.RTCRtpSender.prototype) {
        conferenceUI.peers.forEach((peer) => {
            const senders = peer.peer.getSenders();
            const [videoSender] = senders.filter(sender => sender.track.kind === 'video')
            const parameters = videoSender.getParameters();
            if (!parameters.encodings) {
                parameters.encodings = [{}];
            }
            if (bandwidth === 'unlimited') {
                delete parameters.encodings[0].maxBitrate;
            } else {
                parameters.encodings[0].maxBitrate = bandwidth * 1000;
            }
            videoSender.setParameters(parameters)
                .then(() => {
                    bandwidthSelector.disabled = false;
                })
                .catch(e => console.error(e));
        });
        return;
    }
    // Fallback to the SDP munging with local renegotiation way of limiting
    // the bandwidth.
    conferenceUI.peers.forEach(peer => {
        peer.peer.createOffer()
            .then(offer => peer.setLocalDescription(offer))
            .then(() => {
                const desc = {
                    type: peer.remoteDescription.type,
                    sdp: bandwidth === 'unlimited' ?
                        removeBandwidthRestriction(peer.remoteDescription.sdp) :
                        updateBandwidthRestriction(peer.remoteDescription.sdp, bandwidth)
                };
                console.log('Applying bandwidth restriction to setRemoteDescription:\n' +
                    desc.sdp);
                return peer.setRemoteDescription(desc);
            })
            .then(() => {
                bandwidthSelector.disabled = false;
            })
            .catch(error => console.log('Failed to set session description: ' + error.toString()));
    });
};