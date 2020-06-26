/*
Modified by: Jesus Romero
https://github.com/jesusrv92/video-conferencing
*/

// IceServersHandler.js
// This is a function that returns an object with a method to return an array with the ICE servers
// that will be used.
export default (function() {
    function getIceServers(connection) {
        var iceServers = [{
            'urls': [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.l.google.com:19302?transport=udp',
            ]
        }];

        return iceServers;
    }

    return {
        getIceServers
    };
})();
