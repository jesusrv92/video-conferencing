import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chat from '../chat/chat.component';
import useStyles from './sideBar.styles';
import CloseIcon from '@material-ui/icons/Close';

//State Managment
import { Context } from '../../App.js';
import { toggleSidebar } from '../../utils/actions';

export default function SideBar(){

  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { sidebar } = state;

  return(
    <Grid container className={classes.sidebarContainer} direction='column'>
      <Grid item>
        <CloseIcon 
          className={classes.closeIcon}
          onClick={() => dispatch(toggleSidebar(!sidebar))}
        />
        <Chat/>
      </Grid>      
    </Grid>
  );

};