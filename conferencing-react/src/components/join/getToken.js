import axios from 'axios'

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

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
                // console.log('TOKEN', response);
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
}

function createSession(sessionId) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ customSessionId: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                var error = Object.assign({}, response);
                if (error.response.status === 409) {
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