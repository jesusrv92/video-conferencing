import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { removeUser, updateUsers } from '../../utils/actions';
import Tooltip from '@material-ui/core/Tooltip';


//Styles
import useStyles from './video.styles';

//State Managment
import { Context } from '../../App.js';

export default function Video({imageURL, user, height}){

  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { users } = state;

  const toogleMic = (user) => {
    const newUsers = users.map(current => {
      if(current.id === user.id)
        current.micro = !current.micro
      return current;
    });
    dispatch(updateUsers(newUsers));
  };

  const handleRemoveUser = (user) => {
    const newUsers = users.filter(current => current.id !== user.id);
    dispatch(removeUser(newUsers));
  };

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
                {
                  user.micro === true ? (
                    <Tooltip title="Mute">
                      <IconButton 
                        className={classes.micButton} 
                        style={{ backgroundColor: '#89cff0', color: '#ffffff'}}
                        onClick={() => toogleMic(user)}
                      >
                        <MicIcon className={classes.icon}/>
                      </IconButton>
                    </Tooltip>
                  ):(
                    <Tooltip title="Unmute">
                      <IconButton 
                        className={classes.micButton} 
                        style={{ backgroundColor: '#e32636', color: '#ffffff'}}
                        onClick={() => toogleMic(user)}
                      >
                        <MicOffIcon/>
                      </IconButton>
                    </Tooltip>
                  )
                }
              </Grid>
              <Grid item>
                <Tooltip title="End Call">
                  <IconButton 
                    className={classes.hangButton}
                    onClick={ () => handleRemoveUser(user) }
                  >
                    <CallEndIcon className={classes.icon}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </React.Fragment>
  )
};