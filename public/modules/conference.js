﻿import RTCPeerConnectionHandler from './RTCPeerConnectionHandler.js'
/*
Modified by: Jesus Romero
https://github.com/jesusrv92/video-conferencing
*/

// Muaz Khan         - www.MuazKhan.com
// MIT License       - www.WebRTC-Experiment.com/licence
// Experiments       - github.com/muaz-khan/WebRTC-Experiment

// This library is known as multi-user connectivity wrapper!
// It handles connectivity tasks to make sure two or more users can interconnect!

export default function conference(config) {
    var self = {
        userToken: uniqueToken()
    };
    var channels = '--', isbroadcaster;
    var isGetNewRoom = true;
    var sockets = [];
    var defaultSocket = {};
    var peers = []

    function openDefaultSocket(callback) {
        config.openSocket({
            onmessage: onDefaultSocketResponse,
            callback: function (socket) {
                defaultSocket = socket;
                callback();
            }
        });
    }

    function onDefaultSocketResponse(response) {
        if (response.userToken == self.userToken) return;

        if (isGetNewRoom && response.roomToken && response.broadcaster)
            config.onRoomFound(response);

        if (response.newParticipant && self.joinedARoom && self.broadcasterid == response.userToken)
            onNewParticipant(response.newParticipant);

        if (response.userToken &&
            response.joinUser == self.userToken &&
            response.participant &&
            channels.indexOf(response.userToken) == -1) {
            channels += response.userToken + '--';
            // Sending your info to the peer you're going to connect
            openSubSocket({
                isofferer: true,
                channel: response.channel || response.userToken
            });
        }

        // to make sure room is unlisted if owner leaves        
        if (response.left && config.onRoomClosed) {
            config.onRoomClosed(response);
        }
    }

    function openSubSocket(_config) {
        if (!_config.channel) return;
        var socketConfig = {
            channel: _config.channel,
            onmessage: socketResponse,
            onopen: function () {
                if (isofferer && !peer) initPeer();
                sockets[sockets.length] = socket;
            }
        };

        socketConfig.callback = function (_socket) {
            socket = _socket;
            this.onopen();

            if (_config.callback) {
                _config.callback();
            }
        };

        var socket = config.openSocket(socketConfig)
        var isofferer = _config.isofferer
        var gotstream
        var video = document.createElement('video')
        var inner = {}
        var peer

        var peerConfig = {
            attachStream: config.attachStream,
            onICE: function (candidate) {
                socket.send({
                    userToken: self.userToken,
                    candidate: {
                        sdpMLineIndex: candidate.sdpMLineIndex,
                        candidate: JSON.stringify(candidate.candidate)
                    }
                });
            },
            onRemoteStream: function (stream) {
                if (!stream) return;

                try {
                    video.setAttributeNode(document.createAttribute('autoplay'));
                    video.setAttributeNode(document.createAttribute('playsinline'));
                    video.setAttributeNode(document.createAttribute('controls'));
                } catch (e) {
                    video.setAttribute('autoplay', true);
                    video.setAttribute('playsinline', true);
                    video.setAttribute('controls', true);
                }

                video.srcObject = stream;

                _config.stream = stream;
                onRemoteStreamStartsFlowing();
            },
            onRemoteStreamEnded: function (stream) {
                if (config.onRemoteStreamEnded)
                    config.onRemoteStreamEnded(stream, video);
            }
        };

        function initPeer(offerSDP) {
            if (!offerSDP) {
                peerConfig.onOfferSDP = sendsdp;
            } else {
                peerConfig.offerSDP = offerSDP;
                peerConfig.onAnswerSDP = sendsdp;
            }

            peer = RTCPeerConnectionHandler(peerConfig);
            // console.log(peer)
            peers.push(peer);
            peer.peer.oniceconnectionstatechange = () => {
                if (peer.peer.iceConnectionState === 'connected' || peer.peer.iceConnectionState === 'completed') {
                    if (!video.parentElement) return;
                    const [disconnectedContainer] = video.parentElement.parentElement.getElementsByClassName('disconnected');
                    disconnectedContainer.hidden = true;
                }
                if (peer.peer.iceConnectionState === 'disconnected') {
                    const [disconnectedContainer] = video.parentElement.parentElement.getElementsByClassName('disconnected');
                    disconnectedContainer.hidden = false;
                }
                if (peer.peer.iceConnectionState === 'failed') peer.peer.close();
            }
        }

        function afterRemoteStreamStartedFlowing() {
            gotstream = true;

            if (config.onRemoteStream)
                config.onRemoteStream({
                    video: video,
                    stream: _config.stream
                });

            if (isbroadcaster && channels.split('--').length > 3) {
                /* broadcasting newly connected participant for video-conferencing! */
                defaultSocket.send({
                    newParticipant: socket.channel,
                    userToken: self.userToken
                });
            }
        }

        function onRemoteStreamStartsFlowing() {
            if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i)) {
                // if mobile device
                return afterRemoteStreamStartedFlowing();
            }

            if (!(video.readyState <= HTMLMediaElement.HAVE_CURRENT_DATA || video.paused || video.currentTime <= 0)) {
                afterRemoteStreamStartedFlowing();
            } else setTimeout(onRemoteStreamStartsFlowing, 50);
        }

        function sendsdp(sdp) {
            socket.send({
                userToken: self.userToken,
                sdp: JSON.stringify(sdp)
            });
        }

        function socketResponse(response) {
            if (response.userToken == self.userToken) return;
            if (response.sdp) {
                inner.sdp = JSON.parse(response.sdp);
                selfInvoker();
            }

            if (response.candidate && !gotstream) {
                if (!peer) console.error('missed an ice', response.candidate);
                else
                    peer.addICE({
                        sdpMLineIndex: response.candidate.sdpMLineIndex,
                        candidate: JSON.parse(response.candidate.candidate)
                    });
            }

            if (response.left) {
                if (peer && peer.peer) {
                    peer.peer.close();
                    peer.peer = null;
                }
            }

            if (response.remove) {
                if (response.remove === config.attachStream.id) leave();
            }
        }

        var invokedOnce = false;

        function selfInvoker() {
            if (invokedOnce) return;

            invokedOnce = true;

            if (isofferer) peer.addAnswerSDP(inner.sdp);
            else initPeer(inner.sdp);
        }
    }

    function leave() {
        sockets.forEach(socket => {
            socket.send({
                left: true,
                userToken: self.userToken
            });
        });
        sockets = [];
        // if owner leaves; try to remove his room from all other users side
        if (isbroadcaster) {
            defaultSocket.send({
                left: true,
                userToken: self.userToken,
                roomToken: self.roomToken
            });
        }

        if (config.attachStream) {
            if ('stop' in config.attachStream) {
                config.attachStream.stop();
            }
            else {
                config.attachStream.getTracks().forEach(function (track) {
                    track.stop();
                    track.dispatchEvent(new Event('ended'));
                });
            }
        }
    }

    function startBroadcasting() {
        defaultSocket && defaultSocket.send({
            roomToken: self.roomToken,
            roomName: self.roomName,
            broadcaster: self.userToken
        });
        setTimeout(startBroadcasting, 3000);
    }

    function onNewParticipant(channel) {
        if (!channel || channels.indexOf(channel) != -1 || channel == self.userToken) return;
        channels += channel + '--';

        var new_channel = uniqueToken();
        openSubSocket({
            channel: new_channel
        });

        defaultSocket.send({
            participant: true,
            userToken: self.userToken,
            joinUser: channel,
            channel: new_channel
        });
    }

    function uniqueToken() {
        var s4 = function () {
            return Math.floor(Math.random() * 0x10000).toString(16);
        };
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }

    openDefaultSocket(config.onReady || function () { });

    return {
        createRoom: function (_config) {
            self.roomName = _config.roomName || 'Anonymous';
            self.roomToken = uniqueToken();

            isbroadcaster = true;
            isGetNewRoom = false;
            startBroadcasting();
        },
        joinRoom: function (_config) {
            self.roomToken = _config.roomToken;
            isGetNewRoom = false;

            self.joinedARoom = true;
            self.broadcasterid = _config.joinUser;
            // Sending connection information to host
            openSubSocket({
                channel: self.userToken,
                callback: function () {
                    defaultSocket.send({
                        participant: true,
                        userToken: self.userToken,
                        joinUser: _config.joinUser
                    });
                }
            });
        },
        leaveRoom: leave,
        peers,
        remove(streamID) {
            sockets.forEach(socket => {
                socket.send({
                    remove: streamID
                })
            })
        }
    };
};