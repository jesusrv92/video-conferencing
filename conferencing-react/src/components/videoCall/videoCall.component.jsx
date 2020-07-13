import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
// import CommentIcon from '@material-ui/icons/Comment';
import GroupIcon from '@material-ui/icons/Group';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Styles
import useStyles from './videoCall.styles';

//State Managment
import { Context } from '../../App.js';
import { setPage, toogleMic, toogleVideo, addUser } from '../../utils/actions';


export default function VideoCall(){
  
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { video, micro, users } = state;

  const [ record, setRecord ] = React.useState(false);
  const [ detailsMenuOpen, setDetailsMenuOpen ] = React.useState(false);
  const theme = useTheme();

  const matchSM = useMediaQuery(theme.breakpoints.down('sm'));

  const addParticipant = () => {
    dispatch(addUser([
      ...users,
        {
          name: `User ${users.length}`,
          id: users.length,
          micro: false,
          video: false,
          imageUrl: Math.floor(Math.random()*Math.floor(4))
        }
    ]));

    console.log(users);
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
                  key={user.id}
                  lg={calculateSize()}
                  style={{
                    height: `${calculateHeight()}%`,
                  }}
                >
                  <img 
                    src={require(`../../assets/images/${user.imageUrl}.jpg`)}
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

        <Grid item container className={classes.videoDetails} xs={3} lg={4}>
          {
            matchSM ? (
              <Button
                endIcon={ detailsMenuOpen ? <ExpandMoreIcon/> : <ExpandLessIcon />}
                disableRipple
                onClick={() => setDetailsMenuOpen(!detailsMenuOpen) }
              >
              <GroupIcon className={classes.groupIcon}/>
              </Button>
              )
            :(
              <Button
                endIcon={ detailsMenuOpen ? <ExpandMoreIcon/> : <ExpandLessIcon />}
                disableRipple
                onClick={() => setDetailsMenuOpen(!detailsMenuOpen) }
              >
                Meeting Details
              </Button>
            )
          }
          {
            detailsMenuOpen ? <PopUpMenu/> : null
          }
        </Grid>

        <Grid item container className={classes.videoButtons} xs={6} lg={4}>
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

        <Grid item container className={classes.videoMenu} xs={3} lg={4}>
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