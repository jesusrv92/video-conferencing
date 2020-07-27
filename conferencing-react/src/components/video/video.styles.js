import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  userInfo: {
    marginTop: '-4.85em',
    justifyContent: 'space-between',
    padding: '0.5em',
  },
  username: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'rgb(255, 255, 255)',
    padding: '1em'
  },
  innerButtonsContainer: {
    height: '100%',
    alignItems: 'center',
    paddingRight: '0.5em'
  },
  hangButton: {
    backgroundColor: 'rgb(227, 38, 54)',
    width: '0.75em',
    height: '0.75em',
    opacity: '0.7',

    '&:hover': {
      backgroundColor: 'rgb(227, 38, 54)',
      opacity: '1',
    }
  },
  micButton: {
    width: '0.75em',
    height: '0.75em',
    marginRight: '0.7em',
    opacity: '0.7',

    '&:hover': {
      backgroundColor: 'rgb(255, 0, 0)',
      opacity: '1'
    }
  },
  icon: {
    color: 'rgb(255, 255, 255)',
    padding: '0.2em'
  },
  streamComponent: {
    position: 'absolute',
    backgroundColor: '#f8f8f8',
    paddingLeft: '5px',
    paddingRight: '5px',
    color: '#777777',
    fontWeight: 'bold'
  }
})));