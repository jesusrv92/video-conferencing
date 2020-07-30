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

  const [muted, setMuted] = React.useState(false);
  const { state, dispatch } = React.useContext(Context);
  const { users, openVidu } = state;
  const { subscribers, session } = openVidu;

  const classes = useStyles();

  React.useEffect(() => {
    console.log("SESSION: ", session);
    console.log("SUBSCRIBERS: ", subscribers);
    if(subscribers.length > 0){
      subscribers.map(subscriber => {
        console.log(subscriber.stream.connection);
      });
    }
  }, [])

  const handleMicButton = (user) => {
    console.log("Inside toggleMic");
    user.subscribeToAudio(muted);
    setMuted(!muted);
    console.log("USER STREAM: ", user.stream);
  };

  const handleHangButton = (user) => {
    removeUser(session, user);
  };

  return (
    <Grid container direction='column'>
      {
        (subscribers.length > 0) ? (
          subscribers.map(user => (
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
                  user.stream.audioActive === true ? (
                    <MicIcon 
                      className={classes.mediaIconON}
                      onClick={ () => handleMicButton(user) }
                    />
                  ):(
                    <MicOffIcon 
                      className={classes.mediaIconOFF}
                      onClick={ () => handleMicButton(user) }
                    />
                  )
                }
                <RemoveCircleOutlineIcon 
                  className={classes.endCallIcon}
                  onClick={ () => handleHangButton(user) }
                  />
              </Grid>
            </Grid>
          ))
        ):(<Typography>There are no participants.</Typography>)
      }
    </Grid>
  );

};