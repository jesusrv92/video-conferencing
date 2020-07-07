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

//Styles
import useStyles from './videoCall.styles';
import userImg from '../../assets/images/user.png';

export default function VideoCall({setPage, video, setVideo, micro, setMicro, users, setUsers}){
  
  const classes = useStyles();

  const addUser = () => {
    setUsers(
      [
        ...users,
        {
          name: 'user 1',
          key: new Date()
        }
      ]
    );
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
                  style={{
                    width: `${100/users.length}%`,
                    height: '200px'
                  }}
                >
                  <img 
                    src={userImg} 
                    alt="video-user-component" 
                    className={classes.userVideoComponent}
                    style={{
                      width: '100%',
                      height: '200px'
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
        </Grid>

        <Grid item container className={classes.videoButtons} lg={4}>
          <Grid item>
            <IconButton 
              className={ micro ? classes.circleButton : classes.circleButtonRed}
              onClick={() => setMicro(!micro)}  
            >
              {
                micro ? <MicIcon className={classes.buttonIcon} /> : <MicOffIcon className={classes.buttonIconOff} />
              }
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              className={classes.circleButton}
              onClick={ () => setPage('join')}
            >
              <CallEndIcon className={classes.hangIcon}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              className={ video ? classes.circleButton : classes.circleButtonRed}
              onClick={() => setVideo(!video)}
            >
              {
                video ? <VideocamIcon className={classes.buttonIcon} /> : <VideocamOffIcon className={classes.buttonIconOff} />
              }
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container className={classes.videoMenu} lg={4}>
          <IconButton onClick={addUser}>
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