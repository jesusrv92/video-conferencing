import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  videoCallcontainer: {
    height: '100vh',
    boxSizing: 'content-box'
  },
  videosConatiner: {
    height: '90vh',
    backgroundColor: '#000000'
  },
  buttonsContainer: {
    height: '10vh',
  },
  videoDetails: {
    alignContent: 'center',
    paddingLeft: '1em'
  },
  videoButtons: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  videoMenu: {
    justifyContent: 'flex-end',
    paddingRight: '0.5em'
  },
  circleButton: {
    border: '1px solid',
    borderColor: 'rgba(125, 125, 125, 0.5)',
    padding: '0.8em',
    marginLeft: '0.4em',
    marginRight: '0.4em'
  },
  buttonIcon: {
    color: '#546E7a',
    fontSize: '1.3em'
  },
  hangIcon: {
    color: '#fe6f5e',
    fontSize: '1.3em'
  },
  menuIcon: {
    fontSize: '1.3em'
  }
})));