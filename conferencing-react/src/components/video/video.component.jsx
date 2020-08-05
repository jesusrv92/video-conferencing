import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';


//Styles
import useStyles from './video.styles';
import removeUser from '../../utils/removeUser';

const VideoComponent = (props) => {

  const classes = useStyles();
  const videoRef = React.createRef();
  const [muted, setMuted] = React.useState(false) 

  React.useEffect(() => {
    if(props && !!videoRef){
      props.streamManager.addVideoElement(videoRef.current);
    }
  });

  React.useEffect(() => {
    if(props && !!videoRef)
      props.streamManager.addVideoElement(videoRef.current)
  }, [props, videoRef]);

  const getUsername = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  // Taking advantage of the OpenVidu Subscriber API to mute and unmute audio
  // the subscribeToAudio method takes a boolean value;
  // if true, you will receive audio from the subscriber,
  // else you will stop receiving audio from the subscriber.
  const handleMicButton = () => {
    props.streamManager.subscribeToAudio(muted);
    setMuted(!muted);
  };
  const handleHangButton = () => {
    removeUser(props.session, props.streamManager);
  };

  return(
    <React.Fragment>
      {
        props.streamManager !== undefined ? (
          <div className={ props.type !== 'publisher' ? classes.publisherContainer : undefined } >
            <video 
              autoPlay={true} 
              ref={videoRef}
              className={ (props.type === 'publisher') ? classes.publisher : classes.subscriber }
            />
            <div className={ props.type === 'publisher' ? classes.publisherDetails : classes.subscriberDetails }>
              <Typography className={ props.type === 'publisher' ? classes.publisherName : classes.subscriberName } >{getUsername()}</Typography>
              { 
                props.type === 'subscriber' ? (
                  <React.Fragment>
                    {
                      props.streamManager.stream.audioActive === true ?(
                        <IconButton 
                          className={ `${classes.deviceButton} ${classes.deviceOn}` } 
                          onClick={handleMicButton}
                        >
                          <MicIcon className={classes.icon}/>
                        </IconButton>
                      ):(
                        <IconButton 
                        className={ `${classes.deviceButton} ${classes.deviceOff}` } 
                          onClick={handleMicButton}
                        >
                          <MicOffIcon className={classes.icon}/>
                        </IconButton>
                      )
                    }
                    <IconButton 
                      className={classes.hangButton}
                      onClick={handleHangButton}
                    >
                      <CallEndIcon className={classes.icon}/>
                    </IconButton>
                  </React.Fragment>
                ) : null
              }
            </div>
          </div>
        ): null
      }
    </React.Fragment>
  );

};

export default VideoComponent;