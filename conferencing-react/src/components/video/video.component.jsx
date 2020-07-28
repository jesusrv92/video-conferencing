import React from 'react';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import CallEndIcon from '@material-ui/icons/CallEnd';
// import MicIcon from '@material-ui/icons/Mic';
// import MicOffIcon from '@material-ui/icons/MicOff';
// import { removeUser, updateUsers } from '../../utils/actions';
// import Tooltip from '@material-ui/core/Tooltip';


//Styles
import useStyles from './video.styles';
import OpenViduVideoComponent from './Ovvideo';


const VideoComponent = ({ streamManager, type }) => {

  const classes = useStyles();

  const getUsername = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return(
    <div>
      {
        streamManager !== undefined ? (
          <div>
            {/*<div className={classes.streamComponent}>*/}
            <OpenViduVideoComponent streamManager={streamManager} type={type} />
            <Typography>{getUsername()}</Typography>
          </div>
        ): null
      }
    </div>
  );

};

export default VideoComponent;