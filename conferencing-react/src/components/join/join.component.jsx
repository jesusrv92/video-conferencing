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
import TextField from '@material-ui/core/TextField';


//Styles
import useStyles from './join.styles.js';

//State managment
import { Context } from '../../App.js';
import { setPage, toggleMic, toggleVideo, setOpenVidu, setDisplayName, addUser, removeUser, resetState } from '../../utils/actions';

//Stream manager
import { OpenVidu } from 'openvidu-browser';
import getToken from './getToken';

let { location } = window;
const OV = new OpenVidu();

export default function Join() {

  const classes = useStyles();

  const { state, dispatch } = React.useContext(Context);
  const { video, micro } = state;
  const [userName, setUserName] = React.useState(state.openVidu.myUserName); // For setting the username of the participant
  const [mediastream, setMediastream] = React.useState(); // To add the stream to a video object

  React.useEffect(() => {
    // This line will set the URL to match the sessionID of the state
    // if you were invited and you joined the session, it will stay the same
    // if you create a new session, it will update the id even if you were invited.
    location.href = location.origin + '#' + state.openVidu.mySessionID;
    const init = async () => {
      // This will retrieve the media that is going to be streamed
      // For more properties that can be set, look into: https://docs.openvidu.io/en/2.15.0/api/openvidu-browser/interfaces/publisherproperties.html
      const response = await OV.getUserMedia({
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true,     // Whether you want to start publishing with your video enabled or not
        resolution: '640x480',  // The resolution of your video
        frameRate: 15,          // The frame rate of your video
        mirror: false           // Whether to mirror your local video or not
      });
      setMediastream(response);
      dispatch(toggleVideo(!video));
      dispatch(toggleMic(!micro));
    }
    init();
    // Since we only want to run this operation once,
    // we set an empty array as the watch dependencies.
    // the eslint disable line makes sure it doesn't throw a warning
    // because we're using variables that aren't declared within the UseEffect
    // eslint-disable-next-line
  }, [])

  const toggleCamera = () => {
    // if (state.openVidu.publisher) state.openVidu.publisher.publishVideo(!video);
    // This doesn't disable the recording, only the publishing of the camera
    dispatch(toggleVideo(!video));
  }

  const toggleMicrophone = () => {
    // if (state.openVidu.publisher) state.openVidu.publisher.publishAudio(!micro);
    // This doesn't disable the recording, only the publishing of the microphone
    dispatch(toggleMic(!micro));
  };

  const joinNow = () => {
    // This function will be run when you click the join button
    // Nothing will be streamed before that, all will remain local
    const connect = async () => {
      let { openVidu } = state;
      // First we create a sesssion object that will handle all the operations
      let session = OV.initSession();
      openVidu.session = session;

      // This event will trigger once a new participant joins the conference
      session.on('streamCreated', event => {
        let subscriber = session.subscribe(event.stream, undefined);
        dispatch(addUser(subscriber));
      });

      // This event will trigger once a participant leaves the conference
      session.on('streamDestroyed', event => {
        event.preventDefault();
        let removedStream = event.stream.streamManager
        dispatch(removeUser(removedStream));
      });

      // This event will trigger when the participant is removed from the conference
      // The structure of the event is different from the previous ones because it's using
      // the signaling interface of the API. For more info: https://docs.openvidu.io/en/2.15.0/api/openvidu-browser/classes/signalevent.html
      session.on('signal:removed', () => {
        dispatch(resetState());
      });

      // Generating the token to the session you will connect
      let token = await getToken(openVidu.mySessionID);

      // Obtainig the tracks from the stream so they can be published to the server
      const [audioTracks] = await mediastream.getAudioTracks();
      const [videoTracks] = await mediastream.getVideoTracks();

      openVidu.myUserName = userName;

      try {
        // Connecting to the server using the generated token.
        // The username isn't required to connect to the server but helps identify the participants
        await session.connect(token, { clientData: openVidu.myUserName });
        // Create the publisher object that will be sent to the server
        let publisher = OV.initPublisher(undefined, {
          audioSource: audioTracks,     // The source of audio. If undefined default microphone
          videoSource: videoTracks,     // The source of video. If undefined default webcam
          publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true,     // Whether you want to start publishing with your video enabled or not
          resolution: '640x480',  // The resolution of your video
          frameRate: 15,          // The frame rate of your video
          insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
          mirror: false           // Whether to mirror your local video or not
        });
        await session.publish(publisher);
        openVidu.publisher = publisher;
        dispatch(setOpenVidu(openVidu));
      }
      catch (error) {
        console.log('There was an error connecting to the session:', error.code, error.message);
      }

    }
    connect();
    // Connect is an async function, so it's possible that it won't be done
    // before the following actions. But, this allows for a more seamless experience
    // where one can join the session and then it will update on the fly if any users are already there
    // instead of waiting for everything to be ready
    dispatch(setPage('video'));
    dispatch(setDisplayName(userName));
  };

  const renderVideo = React.useMemo(()=>{
    // This has to be done this way. Otherwise, the page will refresh everytime you update the username
    // and it will look like the video is flickering.
    return <video className={classes.video} ref={videoTag => {
      if (!videoTag) return // Sometimes, the video element isn't created when this function is run. This prevents errors
      if (mediastream) {
        videoTag.srcObject = video ? mediastream : null;
      }
      // These are set so you don't listen to your own microphone
      videoTag.volume = 0;
      videoTag.muted = true;
    }} autoPlay playsInline>
    </video>
  },[mediastream, classes.video, video]);
  
  return (
    <Grid item container direction="row" className={classes.joinContainer}>
      <Grid item className={classes.videoContainer} xs={12} md={8} lg={7}>
        <Grid item>
          {renderVideo}
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
          <TextField
            className={classes.displayNameInput}
            label="Display Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.meetingCode}>Code: {state.openVidu.mySessionID}</Typography>
        </Grid>
        <Grid item>
          <Clipboard
            data-clipboard-text={`${location.href}`}
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