import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Styles
import useStyles from './videoComponent.styles';

export default function VideoCall({setPage}){

  const classes = useStyles();
  const [users, setUsers] = React.useState(0);
  const [ video, setVideo ] = React.useState(false);
  const [ micro, setMicro ] = React.useState(false);

  return(
    <Grid container className={classes.videoCallcontainer} direction='column'>
      <Grid item className={classes.videosConatiner}>
        Videos Container
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
              className={classes.circleButton}
              onClick={() => setMicro(!micro)}  
            >
              <MicIcon className={classes.buttonIcon} />
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
            <IconButton  className={classes.circleButton}>
              <VideocamIcon className={classes.buttonIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container className={classes.videoMenu} lg={4}>
          <IconButton >
            <MoreVertIcon className={classes.menuIcon} />
          </IconButton>
        </Grid>

      </Grid>
    </Grid>
  )

}