/*
These functions will use the OpenVidu Server API to start and stop the recording of the sessions

recordCall will take a sessionId to start recording the call. The function will return a recording ID that
will be needed to stop the recording of the call. You can modify the parameters of the recording in the data object.
For more info about the parameters: https://docs.openvidu.io/en/2.15.0/reference-docs/REST-API/#post-apirecordingsstart

stopRecording takes the recordingId that is returned by recordCall and sends the signal to the server to stop
the recording of the session.
*/
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