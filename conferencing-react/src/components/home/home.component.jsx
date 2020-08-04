import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardIcon from '@material-ui/icons/Keyboard';

//Styles
import useStyles from './home.styles';
import intekGlobalLogo from '../../assets/images/logo.png';

import { Context } from '../../App.js';
import { setPage,setOpenVidu } from '../../utils/actions';

import testConnection from '../../utils/testOpenViduAPI'

let { location } = window;

export default function Home(){
  React.useEffect(()=>{
    // Testing connection to server in case it's down or certificates aren't valid
    testConnection();
  },[])

  let meetingCodeInvitation = '';

  if(location.href.includes('#')){
    // The invitation is a URL with an href value of the SessionID
    // This gives the href value
    meetingCodeInvitation = location.href.split('#')[1];
  }

  const classes = useStyles();
  const [ meetingCode, setMeetingCode ] = React.useState(meetingCodeInvitation);
  const { state, dispatch } = React.useContext(Context)

  const joinMeeting = () => {
    // If the meeting code isn't blank, 
    // set the OpenVidu session ID to the meeting code
    if(meetingCode) {
      state.openVidu.mySessionID = meetingCode;
      dispatch(setOpenVidu(state.openVidu));
    }
    // If the meeting code is blank, 
    // a session ID is generated randomly in the initial state
    dispatch(setPage('join'));
  };
  
  const startMeeting = () => {
    dispatch(setPage('join'));
  };

  return(
    <Grid item container direction="column" className={classes.homeContainer}>
      <Grid item>
        <img src={intekGlobalLogo} alt="company-logo" className={classes.companyLogo}/>
      </Grid>
      <Grid item container direction="column" className={classes.homeContent}>
        <Grid item>
          <Typography className={classes.homeTitle}>Video Conferencing App</Typography>
        </Grid>
        <Grid item container direction="column" className={classes.homeInputs} spacing={2}>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<VideocamIcon/>}
              className={classes.startButton}
              onClick={ startMeeting }
            >
                Start a meeting
            </Button>
          </Grid>
          <Grid item>
            <TextField
              id="meeting-code"
              placeholder="Enter meeting code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              onKeyDown={(e) => {if(e.keyCode === 13) joinMeeting()}}
              className={classes.meetingCode}
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                    <KeyboardIcon/>
                  </InputAdornment>
                )
              }}
            >
            </TextField>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary"
              disabled={meetingCode.length === 0}
              className={classes.joinButton}
              onClick={ joinMeeting }
            >
                Join
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}
