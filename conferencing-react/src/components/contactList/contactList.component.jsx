import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

import useStyles from './contactList.styles.js';

export default function ContacList(){

  const [ participants, setParticipants ] = React.useState([
    {
      name: 'John Doe',
      id: '000001',
      micro: false,
      video: false
    },
    {
      name: 'John Smith',
      id: '000002',
      micro: false,
      video: false
    },
    {
      name: 'Joe Bloggs',
      id: '000003',
      micro: false,
      video: false
    }
  ]);

  const classes = useStyles();

  const toogleMic = (participant) => {
    const newParticipants = participants.map(current => {
      if(current.id === participant.id)
        current.micro = !current.micro
      return current;
    });
    setParticipants(newParticipants);
  };

  const toogleVideo = (participant) => {
    const newParticipants = participants.map(current => {
      if(current.id === participant.id)
        current.video = !current.video
      return current;
    });
    setParticipants(newParticipants);
  };

  return (
    <Grid container direction='column'>
      {
        (participants.length > 0) ? (
          participants.map(participant => (
            <Grid item container 
              key={participant.id}
              direction='row'
              className={classes.participantContainer}
              justify='space-between'
            >
              <Grid item>
                <Typography className={classes.participantName}>{participant.name}</Typography>
              </Grid>
              <Grid item>
                {
                  participant.micro === true ? (
                    <MicIcon 
                      className={classes.mediaIconON}
                      onClick={ () => toogleMic(participant) }
                    />
                  ):(
                    <MicOffIcon 
                      className={classes.mediaIconOFF}
                      onClick={ () => toogleMic(participant) }
                    />
                  )
                }
                {
                  participant.video === true ? (
                    <VideocamIcon 
                      className={classes.mediaIconON}
                      onClick={ () => toogleVideo(participant) }
                    />
                  ):(
                    <VideocamOffIcon 
                      className={classes.mediaIconOFF}
                      onClick={ () => toogleVideo(participant) }
                    />
                  )
                }
              </Grid>
            </Grid>
          ))
        ):(<Typography>There are no participants.</Typography>)
      }
    </Grid>
  );

};