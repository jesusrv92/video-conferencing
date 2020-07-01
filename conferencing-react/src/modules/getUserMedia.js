// getUserMedia
var video_constraints = {
    mandatory: { },
    optional: []
};

export default function getUserMedia(options) {
    navigator.mediaDevices.getUserMedia(options.constraints || {
            audio: true,
            video: video_constraints
        }).then(function(stream) {
            var video = options.video;
            if (video) {
                video.srcObject = stream;
                video.play();
            }
            options.onsuccess && options.onsuccess(stream);
        }).catch(function(e) {
            alert(e.message || JSON.stringify(e));
        });
}