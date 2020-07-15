import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chat from '../chat/chat.component';

import useStyles from './sideBar.styles';

export default function SideBar(){

  const classes = useStyles();

  return(
    <Grid container className={classes.sidebarContainer} direction='column'>
      <Grid item>
        <Chat/>
      </Grid>      
    </Grid>
  );

};