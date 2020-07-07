// getUserMedia

export default async function getUserMedia(constraints) {
    try {
        return await navigator.mediaDevices.getUserMedia(constraints || {
            audio: true,
            video: true
        });
    }
    catch (e) {
        console.error('Error while obtaining user media', e);
    }
}