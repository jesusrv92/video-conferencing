import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  sidebarContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '400px',
    bottom: '97px',
    top: '0',
    right: '0',
    boxSizing: 'border-box',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  closeIcon: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    cursor: 'pointer'
  }
})));