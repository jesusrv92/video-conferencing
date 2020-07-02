import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  homeContainer: {
    alignContent: "center",
    padding: "5em"
  },
  companyLogo: {
    textAlign: 'center'
  },
  homeContent: {
    marginTop: "5em",
    alignItems: "center",
    borderWidth: '2px',
    borderColor: 'rgba(125, 125, 125, 0.2)',
    borderStyle: 'solid',
    padding: "5em",
    borderRadius: '25px',
    width: '61%'
  },
  homeTitle: {
    fontSize: "2.75em",
    fontWeight: '300',
    fontFamily: 'Quicksand',

    [theme.breakpoints.down("lg")]: {
      color: 'red'
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em",
      color: 'green'
    },
    [theme.breakpoints.down("sm")]: {
      color: 'blue',
      fontSize: "2.5em",
    }
  },
  homeInputs: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: '5em'
  },
  startButton: {
    padding: '1.1em'
  }
}));