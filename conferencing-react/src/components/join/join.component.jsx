import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

//Styles
import useStyles from './join.styles.js';

//State managment
import { Context } from '../../App.js';
import { setPage, toggleMic, toggleVideo } from '../../utils/actions';

//Stream manager
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import getUserMedia from '../../modules/getUserMedia-async';
const OPENVIDU_SERVER_URL = 'https://localhost:4443' //'https://34.234.174.140:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

export default function Join() {

  const classes = useStyles();

  const { state, dispatch } = React.useContext(Context);
  const { video, micro } = state;
  
  const localVideoRef = React.createRef();

  // function createToken(sessionId) {
  //   return new Promise((resolve, reject) => {
  //     var data = JSON.stringify({ session: sessionId });
  //     axios
  //       .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
  //         headers: {
  //           Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then((response) => {
  //         console.log('TOKEN', response);
  //         resolve(response.data.token);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }

  // function createSession(sessionId) {
  //   return new Promise((resolve, reject) => {
  //     var data = JSON.stringify({ customSessionId: sessionId });
  //     axios
  //       .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
  //         headers: {
  //           Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then((response) => {
  //         console.log('CREATE SESION', response);
  //         resolve(response.data.id);
  //       })
  //       .catch((response) => {
  //         var error = Object.assign({}, response);
  //         if (error.response.status === 409) {
  //           resolve(sessionId);
  //         } else {
  //           console.log(error);
  //           console.warn(
  //             'No connection to OpenVidu Server. This may be a certificate error at ' +
  //             OPENVIDU_SERVER_URL,
  //           );
  //           if (
  //             window.confirm(
  //               'No connection to OpenVidu Server. This may be a certificate error at "' +
  //               OPENVIDU_SERVER_URL +
  //               '"\n\nClick OK to navigate and accept it. ' +
  //               'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //               OPENVIDU_SERVER_URL +
  //               '"',
  //             )
  //           ) {
  //             window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
  //           }
  //         }
  //       });
  //   });
  // }

  // function getToken() {
  //   return createSession(state.mySessionId).then((sessionId) => createToken(sessionId));
  // }

  // React.useEffect(() => {
  //   const init = async () => {
  //     const OV = new OpenVidu();
  //     console.log(OV);

  //     let session = OV.initSession();
  //     console.log(session);

  //     let subscribers = [];

  //     session.on('streamCreated', event => {

  //       let subscriber = session.subscribe(event.stream, undefined);
  //       console.log('Adding stream', subscriber);

  //       subscribers.push(subscriber);
  //       console.log(subscribers)
  //     });

  //     session.on('streamDestroyed', event => {
  //       event.preventDefault();
  //       let removedStream = event.stream.streamManager
  //       console.log('Removing stream', removedStream)

  //       subscribers = subscribers.filter(subscriber => removedStream !== subscriber);
  //       console.log(subscribers)
  //     });

  //     let token = await getToken();
  //     console.log('Token', token)

  //     try {
  //       await session.connect(token, { clientData: state.myUserName });
  //       let publisher = await OV.initPublisher(undefined, {
  //         audioSource: undefined, // The source of audio. If undefined default microphone
  //         videoSource: undefined, // The source of video. If undefined default webcam
  //         publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
  //         publishVideo: true,     // Whether you want to start publishing with your video enabled or not
  //         resolution: '640x480',  // The resolution of your video
  //         frameRate: 30,          // The frame rate of your video
  //         insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
  //         mirror: false           // Whether to mirror your local video or not
  //       });
  //       console.log("REF: ", localVideoRef);
  //       console.log("STREAM: ", publisher.stream.mediaStream)
  //       localVideoRef.current.srcObject = publisher.stream.mediaStream;
  //       dispatch(toggleVideo(!video));
  //       session.publish(publisher)
  //       console.log('Publisher', publisher);
  //     }
  //     catch (error) {
  //       console.log('There was an error connecting to the session:', error.code, error.message);
  //     }

  //     return function leaveSession() {
  //       console.log('Disconnecting')
  //       session.disconnect();
  //     }
  //   }
  //   init();
  //   // eslint-disable-next-line
  // }, [])

  const startCamera = async () => {
  //   try {
  //     let stream = await getUserMedia();
  //     window.localeStream = stream;
  //     localVideoRef.current.srcObject = stream;
      dispatch(toggleVideo(!video));
  //   }
  //   catch (error) {
  //     console.log("getUserMedia Error: ", error)
  //   }
  }

  const joinNow = () => {
    dispatch(setPage('video'));
  };

  const toggleMicrophone = () => {
    dispatch(toggleMic(!micro));
  };

  return(
    <Grid item container direction="row" className={classes.joinContainer}>
      <Grid item className={classes.videoContainer} xs={12} md={8} lg={7}>
        <Grid item>
          <video className={classes.video}   ref={localVideoRef} autoPlay>
          </video>
        </Grid>
        <Grid item container direction='row' className={classes.videoButtonsContainer}> 
          <Grid item>
            <Fab onClick={toggleMicrophone}
              className={classes.videoButton}
              style={{
                backgroundColor: micro ? "#337ab7" : "#e52b50",
                color: '#ffffff'
              }}
            >
              {micro ? <MicIcon /> : <MicOffIcon />}
            </Fab>
          </Grid>
          <Grid item>
            <Fab onClick={startCamera}
              className={classes.videoButton}
              style={{
                backgroundColor: video ? "#337ab7" : "#e52b50",
                color: '#ffffff'
              }}
            >
              {video ? <VideocamIcon /> : <VideocamOffIcon />}
            </Fab>
          </Grid>
        </Grid>
      </Grid> 
      <Grid item container direction="column" className={classes.detailsContainer} xs={12} md={5}>
        <Grid item>
          <Typography className={classes.title}>Meeting ready</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.meetingCode}>Code: XXXYYYXXX</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={joinNow}
          >
            Join now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

}