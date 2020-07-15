import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
  chatContainer: {
    height: '90vh'
  },
  titleContainer: {
    height: '8%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: '1.50em'
  },
  messagesContainer: {
    borderTop: '1px solid rgba(200, 200, 200, 0.3)',
    borderBottom: '1px solid rgba(200, 200, 200, 0.3)',
    height: '84%',
    padding: '1em'
  },
  messageItem: {
    marginTop: '0.8em',
    marginBottom: '0.8em'
  },
  messageName: {
    fontWeight: 'bold',
    marginRight: '0.8em'
  },
  messageInputContainer: { 
    padding: '0.5em',
    height: '8%'
  },
  messageInput: {
    height: '40px',
    width: '98%'
  },
  sendIconButton: {
    padding: '8px'
  }
})));