import React from 'react';

export default class OpenViduVideoComponent extends React.Component{

  constructor(props){
    super(props);
    this.videoRef = React.createRef();
  };

  componentDidUpdate(props){
    if(props && !!this.videoRef){
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  };

  componentDidMount(){
    if(this.props && !!this.videoRef){
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  };

  render() {
    return <video 
      style={{
        width: '100%',
        height: 'auto',
        float: 'left',
        cursor: 'pointer'
      }} 
      autoPlay={true} 
      ref={this.videoRef}
    />
  };

};