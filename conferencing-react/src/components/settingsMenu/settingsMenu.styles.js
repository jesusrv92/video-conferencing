import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  settingsMenuContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '400px',
    bottom: '110px',
    right: '15px',
    borderRadius: '15px',
    boxSizing: 'border-box',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
      textAlign: 'center',
      left: '5%',
      right: '5%'
    }
  },
  itemElement: {
    padding: '0.75em',
    textAlign: 'center',
    borderBottom: '1px solid',
    cursor: 'pointer',
    width: '100%'
  },
  tabsContent: {
    padding: '1em',
  },
  detailsTitle: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    fontWeight: 'bold'
  },
  detailsConent: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  }
})));