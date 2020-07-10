import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ContacList from '../contactList/contactList.component';

//styles
import useStyles from './popupMenu.styles';

export default function PopUpMenu(){
  
  const classes = useStyles();

  const [ tabSelected, setTabSelected ] = React.useState('details');

  const DetailsInfo = () => (
    <Grid container>
      <Typography className={classes.detailsTitle} >Joining Info</Typography>
      <Typography className={classes.detailsConent} >https://viceochat.app.com/byd-azgu-uvn</Typography>
    </Grid>
  );

  const handleTabClick = (value) => {
    setTabSelected(value);
  }
  

  return(
    <Grid container direction='column' className={classes.popupMenuContainer} xd={12}>
      <Grid container item className={classes.tabsBar}>
        <Grid item
          className={classes.tabItem} 
          style={{borderBottomColor: ` ${tabSelected === 'details' ? 'rgba(132, 176, 209, 0.9)' : 'rgba(132, 176, 209, 0.3)'}`}}
          onClick={() => handleTabClick('details')}
        >
          Details
        </Grid>
        <Grid item 
          className={classes.tabItem}
          style={{borderBottomColor: ` ${tabSelected === 'participants' ? 'rgba(132, 176, 209, 0.9)' : 'rgba(132, 176, 209, 0.3)'}`}}
          onClick={() => handleTabClick('participants')}
        >
          Participants
        </Grid>
      </Grid>
      <Grid container item direction='column' className={classes.tabsContent}>
        {
          tabSelected === 'details' ? <DetailsInfo/> : <ContacList/>
        }  
      </Grid>
    </Grid>
  );

};