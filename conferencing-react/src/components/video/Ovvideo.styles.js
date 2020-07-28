import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  publisher: {
    position: 'absolute',
    width: '15em',
    height: '10em',
    top: '0.75em',
    right: '0',
    cursor: 'pointer'
  },
  subscriber: {
    publisher: {
    position: 'absolute',
    width: '15em',
    height: '10em',
    top: '0.75em',
    left: '0',
    cursor: 'pointer'
    },
  }
})))