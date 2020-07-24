import axios from 'axios'

import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from '../../utils/openViduConfig'

export async function recordCall(sessionId) {
    var data = JSON.stringify({ session: sessionId, outputMode: "INDIVIDUAL" });
    try {
        let response = await axios.post(OPENVIDU_SERVER_URL + '/api/recordings/start', data, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        });
        console.log('Recording information', response);
        return response.data;
    }
    catch (e) {
        const error = Object.assign({}, e)
        console.log(`Unable to start recording this session.`, error)
        return e;
    }
}
export async function stopRecording(recordingId) {
    var data = JSON.stringify({});
    try {
        let response = await axios.post(OPENVIDU_SERVER_URL + '/api/recordings/stop/' + recordingId, data, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        });
        console.log('Succesfully stopped recording the session with recording ID ', recordingId)
        return response.data;
    }
    catch (e) {
        const error = Object.assign({}, e)
        console.log(`Unable to stop the recording with recording ID`, recordingId, error)
        console.log(e);
        return e;
    }
}