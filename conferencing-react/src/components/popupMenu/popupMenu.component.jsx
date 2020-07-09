import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//styles
import useStyles from './popupMenu.styles';

export default function PopUpMenu(){
  
  const classes = useStyles();

  return(
    <Grid className={classes.popupMenuContainer}>
      <Typography>Popup Menu</Typography>
    </Grid>
  );

};