/*
To be able to join an OpenVidu session, you need to create a Token.
First, we have to create the session on the server.
Then, you create the token with the sessionID.
Once you have the token you return it.
This token will be used by the OpenVidu Session API object to connect to the session.
*/
import axios from 'axios'

import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from '../../utils/openViduConfig'

function createToken(sessionId) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ session: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
}

function createSession(sessionId) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({
            customSessionId: sessionId, // REQUIRED
            recordingMode: "MANUAL", // This can be either "MANUAL" or "ALWAYS".
            defaultOutputMode : "INDIVIDUAL", // This can be "COMPOSED", "COMPOSED_QUICK_START" or "INDIVIDUAL"
        });
        // If you set recording mode to "ALWAYS", the server will start recording as soon as a participant joins the call
        // If you set recording mode to "MANUAL", you have to tell the server when to start recording
        // Setting the defaultOutputMode to "INDIVIDUAL" will save each participant stream in their own file.
        // All these settings can be overridden by the REST API call to /api/recording in the data parameters.
        // For more info:https://docs.openvidu.io/en/2.15.0/reference-docs/REST-API/
        axios
            .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                resolve(response.data.id);
            })
            .catch((response) => {
                // The response has to be assigned to an object
                // otherwise we can't acces the response status
                var error = Object.assign({}, response);
                // We need to access the response status to verify it
                // because if the response is a 409, it means the session was already created
                // and there's no need to create it again
                // https://docs.openvidu.io/en/2.15.0/reference-docs/REST-API/#post-apisessions
                if (error.response && error.response.status === 409) {
                    resolve(sessionId);
                } else {
                    // console.log(error);
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' +
                        OPENVIDU_SERVER_URL,
                    );
                    if (
                        window.confirm(
                            'No connection to OpenVidu Server. This may be a certificate error at "' +
                            OPENVIDU_SERVER_URL +
                            '"\n\nClick OK to navigate and accept it. ' +
                            'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                            OPENVIDU_SERVER_URL +
                            '"',
                        )
                    ) {
                        window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
                }
            });
    });
}

export default function getToken(mySessionID) {
    return createSession(mySessionID).then(createToken);
}