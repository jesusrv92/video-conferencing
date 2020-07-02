import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  homeContainer: {
    alignItems: "center",
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "3.5em",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1.5em",
    }
  },
  companyLogo: {
    alignSelf: 'center',
    width: '90%'
  },
  homeContent: {
    marginTop: "5em",
    alignItems: "center",
    borderWidth: '2px',
    borderColor: 'rgba(125, 125, 125, 0.2)',
    borderStyle: 'solid',
    padding: "5em",
    borderRadius: '25px',
    width: '40%',
    [theme.breakpoints.down("lg")]: {
      padding: "3.5em",
      width: '45%',
    },
    [theme.breakpoints.down("md")]: {
      padding: "3.5em",
      width: '55%',
    },
    [theme.breakpoints.down("sm")]: {
      padding: "3em",
      width: '90%',
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2em",
      width: '100%',
    }
  },
  homeTitle: {
    fontSize: "2.75em",
    fontWeight: '300',
    fontFamily: 'Quicksand',
    textAlign: 'center',

    [theme.breakpoints.down("lg")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.7em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.6em"
    }
  },
  homeInputs: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: '5em'
  },
  startButton: {
    padding: '1.1em',
    width: '17.5em',
    [theme.breakpoints.down("xs")]: {
      padding: '1em',
      width: '14.8em',
    }
  },
  meetingCode: {
    [theme.breakpoints.down("xs")]: {
      width: '13em',
    }
  }
}));