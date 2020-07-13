import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import useStyles from './contactList.styles.js';

//State Managment
import { Context } from '../../App.js';
import { removeUser, updateUsers } from '../../utils/actions';

export default function ContacList(){

  const { state, dispatch } = React.useContext(Context);
  const { users } = state;

  const classes = useStyles();

  const toogleMic = (user) => {
    const newUsers = users.map(current => {
      if(current.id === user.id)
        current.micro = !current.micro
      return current;
    });
    //HERE
    dispatch(updateUsers(newUsers));
  };

  const handleRemoveUser = (user) => {
    const newUsers = users.filter(current => current.id !== user.id);
    dispatch(removeUser(newUsers));
  };

  return (
    <Grid container direction='column'>
      {
        (users.length > 0) ? (
          users.map(user => (
            <Grid item container 
              key={user.id}
              direction='row'
              className={classes.participantContainer}
              justify='space-between'
            >
              <Grid item>
                <Typography className={classes.participantName}>{user.name}</Typography>
              </Grid>
              <Grid item>
                {
                  user.micro === true ? (
                    <MicIcon 
                      className={classes.mediaIconON}
                      onClick={ () => toogleMic(user) }
                    />
                  ):(
                    <MicOffIcon 
                      className={classes.mediaIconOFF}
                      onClick={ () => toogleMic(user) }
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