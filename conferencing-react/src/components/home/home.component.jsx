import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import Paper from '@material-ui/core/Paper';

//Styles
import useStyles from './home.styles';

import intekGlobalLogo from '../../assets/images/logo.png';

export default function Home({setPage}){

  const classes = useStyles();

  const [ meetingCode, setMeetingCode ] = React.useState('');

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
              onClick={ () => setPage('join')}
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
              disabled={meetingCode.length === 0}
              onClick={ () => setPage('join')}
            >
                Join
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}
