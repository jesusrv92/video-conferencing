import React from  'react';
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
import { useTheme } from '@material-ui/core/styles';


export default function Join() {

  const classes = useStyles();
  const theme = useTheme();

  const [ video, setVideo ] = React.useState(false);
  const [ micro, setMicro ] = React.useState(false);
  
  const localVideoRef = React.createRef();
  const constraints = { video: true };
  const pc_config = null;
  const pc = new RTCPeerConnection(pc_config);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia(constraints)
    .then( stream => {
      window.localeStream = stream;
      localVideoRef.current.srcObject = stream;
      pc.addStream(stream);
      setVideo(!video);
    })
    .catch(error => console.log("getUserMedia Error: ", error));
  }

  return(
    <Grid item container direction="row" className={classes.joinContainer}>
      <Grid item className={classes.videoContainer} xs={12} md={7}>
        <Grid item>
          <video className={classes.video} ref={localVideoRef} autoPlay>
          </video>
        </Grid>
        <Grid item container direction='row' className={classes.videoButtonsContainer}> 
          <Grid item>
            <Fab onClick={() => setMicro(!micro)} 
              className={classes.videoButton}
              style={{
                backgroundColor: micro ? "#337ab7" : "#e52b50",
                color: '#ffffff'
              }}
            >
              { micro ? <MicIcon/> : <MicOffIcon/>}
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
              { video ? <VideocamIcon/> : <VideocamOffIcon/>}
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
          >
            Join now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

}