import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import useStyles from './chat.styles';

export default function Chat(){

  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      name: 'You',
      message: 'Hi',
      datetime: '3:53',
      id:1
    },{
      name: 'John Doe',
      message: 'Hello',
      datetime: '3:54',
      id:2 
    },{
      name: 'John Stiles',
      message: 'How are you guys?',
      datetime: '3:54',
      id:3
    },{
      name: 'You',
      message: 'Fine, thanks for asking',
      datetime: '3:55',
      id:4
    },{
      name: 'Richard Miles',
      message: 'What are you doing?',
      datetime: '3:56',
      id:5
    },{
      name: 'John Blogs',
      message: 'Is this working?',
      datetime: '3:56',
      id:6
    }
  ]);

  const classes = useStyles();

  const sendMessage = () => {
    let d = new Date();
    setMessages([
      ...messages,
      {
        name: 'You',
        message: message,
        datetime: `${d.getHours()}:${d.getMinutes()}`,
        id: messages.length + 1
      }
    ]);
    setMessage('');
  };

  return(
    <Grid container
     className={classes.chatContainer}
     direction='column'
    >
      <Grid item container className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Chat</Typography>
        </Grid>  
      </Grid>
      <Grid item className={classes.messagesContainer}>
        {
          messages.map( message => (
            <Grid container direction='column' className={classes.messageItem} key={message.id}>
              <Grid item container>
                <Typography className={classes.messageName} style={{color: message.name==='You' ? '#2e8b57' : '#0067a5'}}>{message.name}</Typography>
                <Typography className={classes.messageDate} >{message.datetime}</Typography>
              </Grid>
              <Grid item className={classes.messageText}>
                {message.message}
              </Grid>
            </Grid>
          ))
        }
      </Grid>
      <Grid item container className={classes.messageInputContainer} >
        <Grid item xs={11}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {if(e.keyCode === 13) sendMessage()}}
            placeholder="Type a message"
            className={classes.messageInput}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton 
            color="primary" 
            className={classes.sendIconButton}
            onClick={ sendMessage }
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )

}