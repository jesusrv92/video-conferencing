import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  popupMenuContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '400px',
    bottom: '110px',
    left: '15px',
    borderRadius: '15px'
  },
  tabItem: {
    padding: '0.75em',
    width: '50%',
    textAlign: 'center',
    borderBottom: '3px solid',
    cursor: 'pointer'
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