import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  joinContainer: {
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoContainer: {
    padding: '2em',
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    }
  },
  video: {
    backgroundColor: '#000000',
    borderRadius: '10px',
    width: '100%',
    height: '37.7em',
    objectFit: 'cover' ,
    
    [theme.breakpoints.down("sm")]: {
      // backgroundColor: 'rgb(255, 0, 0)',
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      height: '40em',
    }
  },
  videoButtonsContainer: {
    justifyContent: 'center',
    marginTop: '-5em',
  },
  toggleButtonOn: {
    marginLeft: '1em',
    marginRight: '1em',
    backgroundColor: '#337ab7',
    color: '#ffffff',

    '&:hover':{
      backgroundColor: '#337ab7',
    }
  },
  toggleButtonOff: {
    marginLeft: '1em',
    marginRight: '1em',
    backgroundColor: '#e52b50',
    color: '#ffffff',

    '&:hover':{
      backgroundColor: '#e52b50',
    }
  },
  detailsContainer: {
    alignItems: 'center',
    [theme.breakpoints.down("xs")]: {
      padding: "1em"
    }
  },
  title: {
    fontSize: '2.3em',
    fontWeight: '300',
    fontFamily: 'Quicksand',
  },
  displayNameInput: {
    marginTop: '2em',
  },
  meetingCode: {
    fontSize: '1em',
    fontWeight: '300',
    fontFamily: 'Quicksand',
    marginTop: '2em',
    marginBottom: '2em',
    [theme.breakpoints.down("xs")]: {
      marginTop: '0.5em',
      marginBottom: '1em',
    }
  },
  clipboardButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: '0.65em',
    color: 'rgb(51, 122, 183)',
    borderColor: 'rgb(51, 122, 183)',
    border: '1px solid',
    marginBottom: '2em',

    '&:hover': {
      cursor: 'pointer'
    },

    root: {
      '&:focus': {
        borderColor: 'rgb(51, 122, 183)',
      },
    }
  },
  buttonText: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    fontSize:'1em'
  },
  buttonIcon: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    fontSize: '1.4em',
    marginLeft: '0.25em'
  },
  joinButton: {
    width: '8.5em',
    borderRadius: '0'
  }
})));