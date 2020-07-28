import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  videoCallcontainer: {
    height: '100vh',
    boxSizing: 'content-box'
  },
  videosConatiner: {
    height: '90vh',
    backgroundColor: '#000000',
  },
  ownVideo: {
    position: 'absolute',
    top: '1em',
    right: '1em',
    width: '7.5em',
    height: '5em',
    border: '1px solid',
    borderColor: 'rgb(137,207,240)',
    objectFit: 'cover',
    cursor: 'pointer',

    '&:hover': {
      width: '15em',
      height: '10em',
    }
  },
  participantsContainer: {
    boxSizing: 'border-box',
    height: '100%',
    alignContent: 'center'
  },
  buttonsContainer: {
    height: '10vh',
  },
  videoDetails: {
    alignContent: 'center',
    paddingLeft: '1em',

    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0.2em',
    }
  },
  groupIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '2em'
  },
  videoButtons: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  videoMenu: {
    justifyContent: 'flex-end',
    paddingRight: '0.5em',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '0.2em'
    }
  },
  circleButton: {
    border: '1px solid',
    borderColor: 'rgba(125, 125, 125, 0.5)',
    padding: '0.8em',
    marginLeft: '0.4em',
    marginRight: '0.4em',

    [theme.breakpoints.down('sm')]: {
      padding: '0.4em',
      marginLeft: '0.2em',
      marginRight: '0.2em',
    },

    [theme.breakpoints.down('xs')]: {
      padding: '0.2em',
      marginLeft: '0.1em',
      marginRight: '0.1em',
    },

  },
  circleButtonRed: {
    border: '1px solid',
    borderColor: 'rgba(125, 125, 125, 0.5)',
    padding: '0.8em',
    marginLeft: '0.4em',
    marginRight: '0.4em',
    backgroundColor: '#fe6f5e',

    [theme.breakpoints.down('sm')]: {
      padding: '0.4em',
      marginLeft: '0.2em',
      marginRight: '0.2em',
    },

    [theme.breakpoints.down('xs')]: {
      padding: '0.2em',
      marginLeft: '0.1em',
      marginRight: '0.1em',
    },

    '&:hover': {
      backgroundColor: '#fe2b12',
    }

  },
  buttonIcon: {
    color: '#546E7a',
    fontSize: '1.3em'
  },
  buttonIconOff: {
    color: '#ffffff',
    fontSize: '1.3em'
  },
  hangIcon: {
    color: '#fe6f5e',
    fontSize: '1.3em'
  },
  recordIcon: {
    color: '#fe6f5e',
    fontSize: '1.3em'
  },
  menuIcon: {
    fontSize: '1.3em',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  }
})));