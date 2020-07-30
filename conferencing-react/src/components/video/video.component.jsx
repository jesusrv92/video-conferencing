import React from 'react';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
// import MicOffIcon from '@material-ui/icons/MicOff';
// import { removeUser, updateUsers } from '../../utils/actions';
// import Tooltip from '@material-ui/core/Tooltip';


//Styles
import useStyles from './video.styles';
// import OpenViduVideoComponent from './Ovvideo';
import removeUser from './removeUser'

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
                    <IconButton 
                      className={classes.micButton} 
                      style={{ backgroundColor: '#89cff0', color: '#ffffff'}}
                      onClick={handleMicButton}
                    >
                      <MicIcon className={classes.icon}/>
                    </IconButton>
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