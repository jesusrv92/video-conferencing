import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Clipboard from 'react-clipboard.js';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

//Styles
import useStyles from './join.styles.js';

//State managment
import { Context } from '../../App.js';
import { setPage, toggleMic, toggleVideo, setOpenVidu } from '../../utils/actions';

//Stream manager
import { OpenVidu } from 'openvidu-browser';
import getToken from './getToken';

let { location } = window;

export default function Join() {

  const classes = useStyles();

  const { state, dispatch } = React.useContext(Context);
  const { video, micro } = state;

  React.useEffect(() => {
    const init = async () => {
      const OV = new OpenVidu();
      console.log(OV);
      let { openVidu } = state;
      let session = OV.initSession();
      openVidu.session = session;
      console.log(session);

      let { subscribers } = openVidu;

      session.on('streamCreated', event => {

        let subscriber = session.subscribe(event.stream, undefined);
        console.log('Adding stream', subscriber);

        subscribers.push(subscriber);
        dispatch(setOpenVidu(openVidu));
        console.log(subscribers)
      });

      session.on('streamDestroyed', event => {
        event.preventDefault();
        let removedStream = event.stream.streamManager
        console.log('Removing stream', removedStream)

        subscribers = subscribers.filter(subscriber => removedStream !== subscriber);
        dispatch(setOpenVidu(openVidu));
        console.log(subscribers)
      });

      let token = await getToken(openVidu.mySessionID);
      console.log('Token', token)

      try {
        await session.connect(token, { clientData: openVidu.myUserName });
        let publisher = OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true,     // Whether you want to start publishing with your video enabled or not
          resolution: '640x480',  // The resolution of your video
          frameRate: 30,          // The frame rate of your video
          insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
          mirror: false           // Whether to mirror your local video or not
        });
        console.log("STREAM: ", publisher.stream.mediaStream)
        await session.publish(publisher);
        openVidu.mainStreamManager = publisher;
        openVidu.publisher = publisher;
        console.log('Publisher', publisher);
        dispatch(setOpenVidu(openVidu));
        dispatch(toggleVideo(!video));
        dispatch(toggleMic(!micro));
      }
      catch (error) {
        console.log('There was an error connecting to the session:', error.code, error.message);
      }

    }
    init();
    return function leaveSession() {
      console.log('Disconnecting')
      state.openVidu.session.disconnect();
    }
    // eslint-disable-next-line
  }, [])

  const toggleCamera = () => {
    state.openVidu.publisher.publishVideo(!video);
    dispatch(toggleVideo(!video));
  }

  const toggleMicrophone = () => {
    state.openVidu.publisher.publishAudio(!micro);
    dispatch(toggleMic(!micro));
  };

  const joinNow = () => {
    dispatch(setPage('video'));
  };

  return (
    <Grid item container direction="row" className={classes.joinContainer}>
      <Grid item className={classes.videoContainer} xs={12} md={8} lg={7}>
        <Grid item>
          <video className={classes.video} ref={video => {
            if (!video) return
            if (state.openVidu.publisher) {
              video.srcObject = state.openVidu.publisher.stream.mediaStream;
              video.volume = 0;
              video.muted = true;
            }
          }} autoPlay playsInline>
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
            <Fab onClick={toggleCamera}
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
          <Typography className={classes.meetingCode}>Code: {state.openVidu.mySessionID}</Typography>
        </Grid>
        <Grid item>
          <Clipboard
            data-clipboard-text={`${location.href}#${state.openVidu.mySessionID}`}
            className={classes.clipboardButton}
          >
            <Typography className={classes.buttonText} >COPY CODE</Typography>
            <LibraryAddCheckIcon className={classes.buttonIcon} />
          </Clipboard>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={joinNow}
            className={classes.joinButton}
          >
            Join now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

}