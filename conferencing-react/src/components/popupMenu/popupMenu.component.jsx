import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ContactList from '../contactList/contactList.component';

//styles
import useStyles from './popupMenu.styles';

let { location } = window;

export default function PopUpMenu(){
  
  const classes = useStyles();
  const [ tabSelected, setTabSelected ] = React.useState('details');

  const DetailsInfo = () => (
    <Grid container>
      <Typography className={classes.detailsTitle} >Joining Info</Typography>
      <Typography className={classes.detailsConent} >{location.href}</Typography>
    </Grid>
  );

  const handleTabClick = (value) => {
    setTabSelected(value);
  };
  

  return(
    <Grid container direction='column' className={classes.popupMenuContainer}>
      <Grid container item className={classes.tabsBar}>
        <Grid item
          className={ `${classes.tabItem} ${tabSelected === 'details' ? classes.tabSelected : classes.tabNotSelected}`}
          onClick={() => handleTabClick('details')}
        >
          Details
        </Grid>
        <Grid item 
          className={ `${classes.tabItem} ${tabSelected === 'participants' ? classes.tabSelected : classes.tabNotSelected}`}
          onClick={() => handleTabClick('participants')}
        >
          Participants
        </Grid>
      </Grid>
      <Grid container item direction='column' className={classes.tabsContent}>
        {
          tabSelected === 'details' ? <DetailsInfo/> : <ContactList/>
        }  
      </Grid>
    </Grid>
  );

};