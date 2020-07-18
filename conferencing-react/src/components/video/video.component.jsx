import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

import useStyles from './video.styles';

export default function Video({imageURL, user, height}){

  const classes = useStyles();

  return(
    <React.Fragment>
        <img 
          src={imageURL}
          alt="video-user-component" 
          style={{
            width: `${100}%`,
            height: `${100}%`,
          }}
        />
        <Grid container className={classes.userInfo}>
          <Grid item>
            <Typography className={classes.username}>{user.name}</Typography>
          </Grid>
          <Grid item className={classes.buttonsContainer}>
            <Grid container className={classes.innerButtonsContainer}>
              <Grid item>
                <IconButton className={classes.micButton} style={{ backgroundColor: user.micro === true ? '#ff2052' : '#89cff0'}}>
                  <MicIcon className={classes.icon}/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={classes.hangButton}>
                  <CallEndIcon className={classes.icon}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </React.Fragment>
  )
};