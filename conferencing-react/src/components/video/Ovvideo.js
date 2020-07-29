import React from 'react';
import useStyles from './Ovvideo.styles';

export default function OpenViduVideoComponent(props){
    
  const videoRef = React.createRef();
  const classes = useStyles();

  React.useEffect(() => {
    if(props && !!videoRef){
      props.streamManager.addVideoElement(videoRef.current);
    }
  });

  React.useEffect(() => {
    if(props && !!videoRef)
      props.streamManager.addVideoElement(videoRef.current)
  }, []);

  return (
    <video 
      autoPlay={true} 
      ref={videoRef}
      className={ (props.type === 'publisher') ? classes.publisher : classes.subscriber }
    />
  );

};