import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  participantContainer: {
    padding: '0.5em',
  },
  participantName: {
    fontSize: '1.1em'
  },
  mediaIconON: {
    color: 'rgba(0, 141, 191, 0.7)',
    marginLeft: '0.2em',
    marginRight: '0.2em',
    cursor: 'pointer',

    '&:hover': {
      color: 'rgba(0, 122, 165)',
    }
  },
  mediaIconOFF: {
    color: 'rgb(255,104,135)',
    marginLeft: '0.2em',
    marginRight: '0.2em',
    cursor: 'pointer',

    '&:hover': {
      color: 'rgb(255,2,53)',
    }
  }
})));