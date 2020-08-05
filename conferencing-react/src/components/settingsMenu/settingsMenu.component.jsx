import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import StopIcon from '@material-ui/icons/Stop';
import Brightness1Icon from '@material-ui/icons/Brightness1';

//State Managment
import { Context } from '../../App.js';
import { toggleRecord, toggleSidebar, toggleDetailsMenu, toggleOptionsMenu } from '../../utils/actions.js';

//Styles
import useStyles from './settingsMenu.styles';

export default function SettingsMenu(){

  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context);
  const { detailsMenu, optionsMenu, sidebar, record } = state;

  const toggleMenu = (type) => {
    switch(type){
      case 'details':
        dispatch(toggleDetailsMenu(!detailsMenu));
        break;
      case 'options':
        dispatch(toggleOptionsMenu(!optionsMenu));
        break;
      case 'sidebar':
        dispatch(toggleSidebar(!sidebar));
        break;
      default:
        break;
    }
  };

  return(
    <Grid container className={classes.settingsMenuContainer}>
      <Grid container item>
        <Typography className={classes.itemElement}>Options</Typography>
      </Grid>
      <Hidden mdUp>
        <Grid item container direction='column' className={classes.optionsContainer}>
          <Grid item className={classes.itemOption}>
            <Button 
              onClick={() => dispatch(toggleRecord(!record))}
              className={record ? classes.recordActiveButton : classes.regularButton}
              endIcon={ record ? <StopIcon/> : <Brightness1Icon/>}
            >
              Record
            </Button>
          </Grid>
          <Grid item className={classes.itemOption}>
            <Button 
              className={classes.regularButton}
              onClick={() => toggleMenu('sidebar') }
              endIcon={<MessageOutlinedIcon className={classes.itemIcon}/>}
            >
              Chat
            </Button>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )

};