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
  videoButton: {
    marginLeft: '1em',
    marginRight: '1em',
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
  meetingCode: {
    fontSize: '1em',
    fontWeight: '300',
    fontFamily: 'Quicksand',
    marginTop: '2em',
    marginBottom: '3em',
    [theme.breakpoints.down("xs")]: {
      marginTop: '0.5em',
      marginBottom: '1em',
    }
  },
})));