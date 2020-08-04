import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PopUpMenu from '../popupMenu/popupMenu.component';
import SettingsMenu from '../../components/settingsMenu/settingsMenu.component';
import SideBar from '../sideBar/sideBar.component';
import Video from '../video/video.component';

// import CommentIcon from '@material-ui/icons/Comment';
import GroupIcon from '@material-ui/icons/Group';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Styles
import useStyles from './videoCall.styles';

//State Managment
import { Context } from '../../App.js';
import { resetState, toggleMic, toggleVideo, toggleRecord, toggleDetailsMenu, toggleOptionsMenu, toggleSidebar, openDetailsMenu, openOptionsMenu, setOpenVidu } from '../../utils/actions';
import { recordCall, stopRecording } from './recordCall'

export default function VideoCall(){

  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { video, micro, users, record, detailsMenu, optionsMenu, sidebar, openVidu } = state;
  const theme = useTheme();
  const matchSM = useMediaQuery(theme.breakpoints.down('sm'));

  const endCall = () => {
    dispatch(resetState());
  };

  // Using the OpenVidu Publisher API to mute and unmute audio/video
  // the publishVideo/publishAudio methods take a boolean value;
  // if true, you will send the stream,
  // else you will stop sending the stream.
  const toggleCamera = () => {
    if (state.openVidu.publisher) state.openVidu.publisher.publishVideo(!video);
    dispatch(toggleVideo(!video));
  };

  const toggleMicrophone = () => {
    if (state.openVidu.publisher) state.openVidu.publisher.publishAudio(!micro);
    dispatch(toggleMic(!micro));
  };

  const handleRecord = async () => {
    // If it isn't recording, it will start and save the recording ID on the
    // recordingID property of state's openVidu object.
    // Else, it will take the value stored on record and send the signal to the server
    // to stop that recordingID and remove it from the state.
    
    // TODO: signal all participants that the call is being recorded OR
    // just allow the creator of the session to record calls
    if(!record){
      const { mySessionID } = state.openVidu;
      const recording = await recordCall(mySessionID);
      state.openVidu.recordingID = recording.id;
      dispatch(setOpenVidu(state.openVidu));
    } 
    else {
      await stopRecording(state.openVidu.recordingID);
      state.openVidu.recordingID = '';
      dispatch(setOpenVidu(state.openVidu));
    }
    dispatch(toggleRecord(!record));
  };

  const toggleMenu = (type) => {
    switch(type){
      case 'details':
        matchSM ? dispatch(openDetailsMenu(!detailsMenu)) : dispatch(toggleDetailsMenu(!detailsMenu))
        break;
      case 'options':
        matchSM ? dispatch(openOptionsMenu(!optionsMenu)) : dispatch(toggleOptionsMenu(!optionsMenu))
        break;
      case 'sidebar':
        dispatch(toggleSidebar(!sidebar));
        break;
      default:
        break;
    }
  };

  const calculateWidth = () => {
    let n;
    if(users.length === 1)
      n = 12;
    else if(users.length > 1 && users.length < 5)
      n = 6;
    else if(users.length > 4 && users.length < 7)
      n = 4;
    else if(users.length < 10)
      n = 4;
    else if(users.length < 17)
      n = 3;
    return n;
  };

  const calculateHeight = () => {
    let height;
    if(users.length === 1)
      height = 100;
    else if(users.length > 1 && users.length < 7)
      height = 50;
    else if(users.length < 13)
      height = 100/3;
    else if(users.length < 17)
      height = 25;
    return height;
  }

  return(
    <Grid container className={classes.videoCallcontainer} direction='column'>
      <Grid item className={classes.videosConatiner}>
        { openVidu.publisher ? (
        <Video
          type="publisher"
          streamManager={openVidu.publisher}
        />
        ):(<div>Loading</div>) }
        {
          users.length > 0 ? (
            <Grid container direction='row' className={classes.participantsContainer}>
              {users.map(user => (
                <Grid item
                  key={user.stream.streamId}
                  xs={calculateWidth()}
                  style={{
                    height: `${calculateHeight()}%`
                  }}
                >
                  <Video
                  type='subscriber'
                  session={state.openVidu.session}
                  streamManager={user}
                  />
                </Grid>
              ))}
            </Grid>
          )
          :null
        }
      </Grid>
      <Grid item container direction='row' className={classes.buttonsContainer}>

        <Grid item container className={classes.videoDetails} xs={3} lg={4}>
          {
            matchSM ? (
              <Button
                endIcon={ detailsMenu ? <ExpandMoreIcon/> : <ExpandLessIcon />}
                disableRipple
                onClick={() => toggleMenu('details') }
              >
              <GroupIcon className={classes.groupIcon}/>
              </Button>
              )
            :(
              <Button
                endIcon={ detailsMenu ? <ExpandMoreIcon/> : <ExpandLessIcon />}
                disableRipple
                onClick={() => toggleMenu('details') }
              >
                Meeting Details
              </Button>
            )
          }
          {
            detailsMenu ? <PopUpMenu/> : null
          }
        </Grid>

        <Grid item container className={classes.videoButtons} xs={6} lg={4}>
          <Grid item>
            <IconButton 
              className={ micro ? classes.circleButton : classes.circleButtonRed}
              onClick={ toggleMicrophone }  
            >
              {
                micro ? <MicIcon className={classes.buttonIcon} /> : <MicOffIcon className={classes.buttonIconOff} />
              }
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              className={classes.circleButton}
              onClick={ endCall }
            >
              <CallEndIcon className={classes.hangIcon}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              className={ video ? classes.circleButton : classes.circleButtonRed}
              onClick={ toggleCamera }
            >
              {
                video ? <VideocamIcon className={classes.buttonIcon} /> : <VideocamOffIcon className={classes.buttonIconOff} />
              }
            </IconButton>
          </Grid>
          <Hidden smDown>
            <Grid item>
              <IconButton 
                className={ record ? classes.circleButtonRed : classes.circleButton}
                onClick={ handleRecord }
              >
                {
                  record ? <StopIcon className={classes.recordIconStop}/> : <FiberManualRecordIcon className={classes.recordIcon} />
                }
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>

        <Grid item container className={classes.videoMenu} xs={3} lg={4}>
          {
            matchSM ? (
              <IconButton 
                onClick={() => toggleMenu('options') }
              >
                <MoreVertIcon className={classes.menuIcon} />  
              </IconButton>
            ):(
              <IconButton 
                onClick={() => toggleMenu('sidebar') }
              >
                <CommentOutlinedIcon className={classes.menuIcon} />
              </IconButton>
            )
          }
        </Grid>
        {
          optionsMenu ? <SettingsMenu/> : null
        }
        {
          sidebar ? <SideBar/> : null
        }
      </Grid>
    </Grid>
  )

}