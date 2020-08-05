import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
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
  deviceButton: {
    width: '0.75em',
    height: '0.75em',
    marginRight: '0.7em',
    opacity: '0.7',

    '&:hover': {
      backgroundColor: 'rgb(255, 0, 0)',
      opacity: '1'
    }
  },
  deviceOn: {
    backgroundColor: '#89cff0', 
    color: '#ffffff'
  },
  deviceOff: {
    backgroundColor: '#e32636',
    color: '#ffffff'
  },
  icon: {
    color: 'rgb(255, 255, 255)',
    padding: '0.2em'
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
  },
})));