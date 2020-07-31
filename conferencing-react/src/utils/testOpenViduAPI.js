import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from './openViduConfig';
import axios from 'axios';

export default function testConnection() {
    return new Promise((resolve) => {
        axios
            .get(OPENVIDU_SERVER_URL + '/config', {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch(() => {
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
                    window.open(OPENVIDU_SERVER_URL + '/accept-certificate','_blank');
                }
            });
    });
}