import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

//Styles
import useStyles from './settingsMenu.styles';

export default function SettingsMenu(){

  const classes = useStyles();


  return(
    <Grid container className={classes.settingsMenuContainer}>
      <Grid container item>
        <Typography className={classes.itemElement}>Options</Typography>
      </Grid>
      <Hidden smUp>
        <Button 
          color="primary"
          endIcon={<FiberManualRecordIcon/>}
        >
          Record
        </Button>
      </Hidden>
    </Grid>
  )

};