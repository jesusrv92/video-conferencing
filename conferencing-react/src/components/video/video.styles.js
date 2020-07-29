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
  },
  publisherContainer : {
    height: '100%'
  },
  publisher: {
    position: 'absolute',
    width: '15em',
    height: '10em',
    top: '0.75em',
    right: '0',
    cursor: 'pointer'
  },
  subscriber: {
    cursor: 'pointer',
    width: '100%',
    height:'100%',
    objectFit: 'cover'
  },
  publisherDetails: {
    position: 'absolute',
    top: '8.5em',
    right: '1.25em',
  },
  publisherName: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'rgb(255, 255, 255)',
    padding: '0.25em 0.5em',
  },
  subscriberDetails: {
    display: 'flex',
    marginTop: '-2.5em',
    marginLeft: '0.25em',
  },
  subscriberName: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'rgb(255, 255, 255)',
    padding: '0.25em 0.5em',
    position: 'relative',
    marginRight: '1em',
    width: 'fit-content',
    zIndex: '3'
  },
})));