import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PopUpMenu from '../popupMenu/popupMenu.component';

//Styles
import useStyles from './videoCall.styles';
import userImg from '../../assets/images/user.png';

//State MAnagment
import { Context } from '../../App.js';
import { setPage, toogleMic, toogleVideo, addUser } from '../../utils/actions';

export default function VideoCall(){
  
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { video, micro, users } = state;

  const [ record, setRecord ] = React.useState(false);

  const addParticipant = () => {
    dispatch(addUser([
      ...users,
        {
          name: 'user 1',
          key: new Date()
        }
    ]))
  }

  const endCall = () => {
    dispatch(setPage('join'));
  };

  const toogleMicrophone = () => {
    dispatch(toogleMic(!micro));
  };

  const toogleCamera = () => {
    dispatch(toogleVideo(!video));
  };

  const handleRecord = () => {
    setRecord(!record);
  }

  const calculateSize = () => {
    let n;
    if(users.length === 1)
      n = 12;
    else if(users.length > 1 && users.length < 5)
      n = 6;
    else if(users.length > 1 && users.length < 7)
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
        {
          users.length > 0 ? (
            <Grid container direction='row' className={classes.participantsContainer}>
              {users.map(user => (
                <Grid item
                  key={user.key}
                  lg={calculateSize()}
                  style={{
                    height: `${calculateHeight()}%`,
                  }}
                >
                  <img 
                    src={userImg} 
                    alt="video-user-component" 
                    className={classes.userVideoComponent}
                    style={{
                      width: `${100}%`,
                      height: `${100}%`,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )
          :null
        }
      </Grid>
      <Grid item container direction='row' className={classes.buttonsContainer}>

        <Grid item container className={classes.videoDetails} lg={4}>
          <Button
            endIcon={<ExpandLessIcon />}
            disableRipple
          >
            Meeting Details
          </Button>
          <PopUpMenu/>
        </Grid>

        <Grid item container className={classes.videoButtons} lg={4}>
          <Grid item>
            <IconButton 
              className={ micro ? classes.circleButton : classes.circleButtonRed}
              onClick={ toogleMicrophone }  
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
              onClick={ toogleCamera }
            >
              {
                video ? <VideocamIcon className={classes.buttonIcon} /> : <VideocamOffIcon className={classes.buttonIconOff} />
              }
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              className={classes.circleButton}
              onClick={ handleRecord }
            >
              {
                record ? <StopIcon className={classes.menuIcon}/> : <FiberManualRecordIcon className={classes.recordIcon} />
              }
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container className={classes.videoMenu} lg={4}>
          <IconButton onClick={ addParticipant }>
            <AddIcon className={classes.menuIcon} />
          </IconButton>
          <IconButton >
            <MoreVertIcon className={classes.menuIcon} />
          </IconButton>
        </Grid>

      </Grid>
    </Grid>
  )

}