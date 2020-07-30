import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import useStyles from './contactList.styles.js';

//State Managment
import { Context } from '../../App.js';
import { removeUser } from '../../utils/actions';

export default function ContacList(){

  const { state, dispatch } = React.useContext(Context);
  const { users, openVidu } = state;
  const { subscribers } = openVidu;

  const classes = useStyles();

  const toggleMic = (user) => {
    let muted = false;
    return ()=> {
      user.subscribeToAudio(muted);
      muted = !muted;
    }
  };

  const handleRemoveUser = (user) => {
    dispatch(removeUser(user));
  };

  return (
    <Grid container direction='column'>
      {
        (users.length > 0) ? (
          users.map(user => (
            <Grid item container 
              key={user.stream.connection.connectionId}
              direction='row'
              className={classes.participantContainer}
              justify='space-between'
            >
              <Grid item>
                <Typography className={classes.participantName}>{JSON.parse(user.stream.connection.data).clientData}</Typography>
              </Grid>
              <Grid item>
                {
                  user.micro === true ? (
                    <MicIcon 
                      className={classes.mediaIconON}
                      onClick={ toggleMic(user) }
                    />
                  ):(
                    <MicOffIcon 
                      className={classes.mediaIconOFF}
                      onClick={ toggleMic(user) }
                    />
                  )
                }
                <RemoveCircleOutlineIcon 
                  className={classes.endCallIcon}
                  onClick={ () => handleRemoveUser(user) }
                  />
              </Grid>
            </Grid>
          ))
        ):(<Typography>There are no participants.</Typography>)
      }
    </Grid>
  );

};