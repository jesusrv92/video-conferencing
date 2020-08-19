import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Clipboard from 'react-clipboard.js';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import TextField from '@material-ui/core/TextField';

//Styles
import useStyles from './join.styles.js';

//State managment
import { Context } from '../../App.js';
import { setPage, toggleMic, toggleVideo, setDisplayName, addUser, removeUser, resetState, setLocalStream } from '../../utils/actions';

//Stream manager
import connectSignalingChannel from './connectSignalingChannel'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../utils/AWSConfig'

import AWS from 'aws-sdk';
import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc'

let { location } = window;

export default function Join() {

  const classes = useStyles();

  const { state, dispatch } = React.useContext(Context);
  const { video, micro, localStream } = state;
  const [userName, setUserName] = React.useState(state.myUserName); // For setting the username of the participant

  React.useEffect(() => {
    // This line will set the URL to match the sessionID of the state
    // if you were invited and you joined the session, it will stay the same
    // if you create a new session, it will update the id even if you were invited.
    location.href = location.origin + '#' + state.meetingCode;

    // React.useEffect doesn't take async functions so we have to create one
    // within it and then run it within the same function
    const init = async () => {
      const constraints = {
        video: true,
        audio: true,
      };
      // This will retrieve the media that is going to be streamed
      let stream = await navigator.mediaDevices.getUserMedia(constraints);
      dispatch(setLocalStream(stream));
      dispatch(toggleVideo(!video));
      dispatch(toggleMic(!micro));
    }
    init();
    // connectSignalingChannel({
    //   region: 'us-east-1',
    //   accessKeyId: AWS_ACCESS_KEY_ID,
    //   secretAccessKey: AWS_SECRET_ACCESS_KEY,
    //   channelName: 'conferencing-channel'
    // });

    // Since we only want to run this operation once,
    // we set an empty array as the watch dependencies.
    // the eslint disable line makes sure it doesn't throw a warning
    // because we're using variables that aren't declared within the UseEffect
    // eslint-disable-next-line
  }, [])

  const toggleCamera = () => {
    if (localStream) {
      let [videoTrack] = localStream.getVideoTracks();
      videoTrack.enabled = !video;
      dispatch(toggleVideo(!video));
    }
    // This doesn't disable the recording, only the publishing of the camera
  }

  const toggleMicrophone = () => {
    if (localStream) {
      let [audioTrack] = localStream.getAudioTracks();
      audioTrack.enabled = !micro;
      dispatch(toggleMic(!micro));
    }
    // This doesn't disable the recording, only the publishing of the microphone
  };

  const joinNow = () => {
    // This function will be run when you click the join button
    // Nothing will be streamed before that, all will remain local
    // const connect = async () => {
    //   let { openVidu } = state;
    //   // First we create a sesssion object that will handle all the operations
    //   let session = OV.initSession();
    //   openVidu.session = session;

    //   // This event will trigger once a new participant joins the conference
    //   session.on('streamCreated', event => {
    //     let subscriber = session.subscribe(event.stream, undefined);
    //     dispatch(addUser(subscriber));
    //   });

    //   // This event will trigger once a participant leaves the conference
    //   session.on('streamDestroyed', event => {
    //     event.preventDefault();
    //     let removedStream = event.stream.streamManager
    //     dispatch(removeUser(removedStream));
    //   });

    //   // This event will trigger when the participant is removed from the conference
    //   // The structure of the event is different from the previous ones because it's using
    //   // the signaling interface of the API. For more info: https://docs.openvidu.io/en/2.15.0/api/openvidu-browser/classes/signalevent.html
    //   session.on('signal:removed', () => {
    //     dispatch(resetState());
    //   });

    //   // Generating the token to the session you will connect
    //   let token = await getToken(openVidu.mySessionID);

    //   // Obtainig the tracks from the stream so they can be published to the server
    //   const [audioTracks] = await mediastream.getAudioTracks();
    //   const [videoTracks] = await mediastream.getVideoTracks();

    //   openVidu.myUserName = userName;

    //   try {
    //     // Connecting to the server using the generated token.
    //     // The username isn't required to connect to the server but helps identify the participants
    //     await session.connect(token, { clientData: openVidu.myUserName });
    //     // Create the publisher object that will be sent to the server
    //     let publisher = OV.initPublisher(undefined, {
    //       audioSource: audioTracks,     // The source of audio. If undefined default microphone
    //       videoSource: videoTracks,     // The source of video. If undefined default webcam
    //       publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
    //       publishVideo: true,     // Whether you want to start publishing with your video enabled or not
    //       resolution: '640x480',  // The resolution of your video
    //       frameRate: 15,          // The frame rate of your video
    //       insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
    //       mirror: false           // Whether to mirror your local video or not
    //     });
    //     await session.publish(publisher);
    //     openVidu.publisher = publisher;
    //     dispatch(setOpenVidu(openVidu));
    //   }
    //   catch (error) {
    //     console.log('There was an error connecting to the session:', error.code, error.message);
    //   }

    // }
    // connect();
    // Connect is an async function, so it's possible that it won't be done
    // before the following actions. But, this allows for a more seamless experience
    // where one can join the session and then it will update on the fly if any users are already there
    // instead of waiting for everything to be ready
    dispatch(setPage('video'));
    dispatch(setDisplayName(userName));
  };

  const master = {
    signalingClient: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
  };

  const viewer = {};

  const createMaster = async () => {
    const onRemoteDataMessage = () => console.log('Master received message');
    // const onStatsReport = stats => console.log('Reporting stats', stats, master);
    const onStatsReport = () => '';

    let formValues = {
      region: 'us-east-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      channelName: 'conferencing-channel',
      sendAudio: true,
      sendVideo: true,
      widescreen: true,
    };

    // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
      region: formValues.region,
      accessKeyId: formValues.accessKeyId,
      secretAccessKey: formValues.secretAccessKey,
      sessionToken: formValues.sessionToken,
      endpoint: formValues.endpoint,
      correctClockSkew: true,
    });

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: formValues.channelName,
      })
      .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[MASTER] Channel ARN: ', channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
      .getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ['WSS', 'HTTPS'],
          Role: Role.MASTER,
        },
      })
      .promise();
    const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
      endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
      return endpoints;
    }, {});
    console.log('[MASTER] Endpoints: ', endpointsByProtocol);

    // Create Signaling Client
    master.signalingClient = new SignalingClient({
      channelARN,
      channelEndpoint: endpointsByProtocol.WSS,
      role: Role.MASTER,
      region: formValues.region,
      credentials: {
        accessKeyId: formValues.accessKeyId,
        secretAccessKey: formValues.secretAccessKey,
        sessionToken: formValues.sessionToken,
      },
      systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    });

    // Get ICE server configuration
    const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
      region: formValues.region,
      accessKeyId: formValues.accessKeyId,
      secretAccessKey: formValues.secretAccessKey,
      sessionToken: formValues.sessionToken,
      endpoint: endpointsByProtocol.HTTPS,
      correctClockSkew: true,
    });
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
      .getIceServerConfig({
        ChannelARN: channelARN,
      })
      .promise();
    const iceServers = [];

    iceServers.push({ urls: `stun:stun.kinesisvideo.${formValues.region}.amazonaws.com:443` });
    getIceServerConfigResponse.IceServerList.forEach(iceServer =>
      iceServers.push({
        urls: iceServer.Uris,
        username: iceServer.Username,
        credential: iceServer.Password,
      }),
    );

    console.log('[MASTER] ICE servers: ', iceServers);

    const configuration = {
      iceServers
    };

    // Get a stream from the webcam and display it in the local view. 
    // If no video/audio needed, no need to request for the sources. 
    // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
    if (formValues.sendVideo || formValues.sendAudio) {
      try {
        master.localStream = localStream;
      } catch (e) {
        console.error('[MASTER] Could not find webcam');
      }
    }

    master.signalingClient.on('open', async () => {
      console.log('[MASTER] Connected to signaling service');
    });

    master.signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
      console.log('[MASTER] Received SDP offer from client: ' + remoteClientId);

      // Create a new peer connection using the offer from the given client
      const peerConnection = new RTCPeerConnection(configuration);
      master.peerConnectionByClientId[remoteClientId] = peerConnection;

      master.dataChannelByClientId[remoteClientId] = peerConnection.createDataChannel('kvsDataChannel');
      peerConnection.ondatachannel = event => {
        event.channel.onmessage = onRemoteDataMessage;
      };

      // Poll for connection stats
      if (!master.peerConnectionStatsInterval) {
        master.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(onStatsReport), 1000);
      }

      // Send any ICE candidates to the other peer
      peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (candidate) {
          console.log('[MASTER] Generated ICE candidate for client: ' + remoteClientId);

          // When trickle ICE is enabled, send the ICE candidates as they are generated.
          // if (formValues.useTrickleICE) {
          console.log('[MASTER] Sending ICE candidate to client: ' + remoteClientId);
          master.signalingClient.sendIceCandidate(candidate, remoteClientId);
          // }
        } else {
          console.log('[MASTER] All ICE candidates have been generated for client: ' + remoteClientId);

          // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.
          // if (!formValues.useTrickleICE) {
          // console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
          // master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
          // }
        }
      });

      // As remote tracks are received, add them to the remote view
      // peerConnection.addEventListener('track', event => {
      //   console.log('[MASTER] Received remote track from client: ' + remoteClientId);
      //   // if (remoteView.srcObject) {
      //   //   return;
      //   // }
      //   // dispatch(addUser(event.streams[0]));
      //   // remoteView.srcObject = event.streams[0];
      // });

      // If there's no video/audio, master.localStream will be null. So, we should skip adding the tracks from it.
      if (master.localStream) {
        master.localStream.getTracks().forEach(track => peerConnection.addTrack(track, master.localStream));
      }
      await peerConnection.setRemoteDescription(offer);

      // Create an SDP answer to send back to the client
      console.log('[MASTER] Creating SDP answer for client: ' + remoteClientId);
      await peerConnection.setLocalDescription(
        await peerConnection.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        }),
      );

      // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
      // if (formValues.useTrickleICE) {
      console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
      master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
      // }
      console.log('[MASTER] Generating ICE candidates for client: ' + remoteClientId);
      dispatch(addUser({ remoteClientId, peerConnection }));
    });

    master.signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
      console.log('[MASTER] Received ICE candidate from client: ' + remoteClientId);

      // Add the ICE candidate received from the client to the peer connection
      const peerConnection = master.peerConnectionByClientId[remoteClientId];
      peerConnection.addIceCandidate(candidate);
    });

    master.signalingClient.on('close', () => {
      console.log('[MASTER] Disconnected from signaling channel');
    });

    master.signalingClient.on('error', () => {
      console.error('[MASTER] Signaling client error');
    });

    console.log('[MASTER] Starting master connection');
    master.signalingClient.open();
  }

  const stopMaster = () => {
    console.log('[MASTER] Stopping master connection');
    if (master.signalingClient) {
      master.signalingClient.close();
      master.signalingClient = null;
    }

    Object.keys(master.peerConnectionByClientId).forEach(clientId => {
      master.peerConnectionByClientId[clientId].close();
    });
    master.peerConnectionByClientId = [];

    if (master.localStream) {
      master.localStream.getTracks().forEach(track => track.stop());
      master.localStream = null;
    }

    master.remoteStreams.forEach(remoteStream => remoteStream.getTracks().forEach(track => track.stop()));
    master.remoteStreams = [];

    if (master.peerConnectionStatsInterval) {
      clearInterval(master.peerConnectionStatsInterval);
      master.peerConnectionStatsInterval = null;
    }

    if (master.localView) {
      master.localView.srcObject = null;
    }

    if (master.remoteView) {
      master.remoteView.srcObject = null;
    }

    if (master.dataChannelByClientId) {
      master.dataChannelByClientId = {};
    }
  }

  const createViewer = async () => {
    const onRemoteDataMessage = () => console.log('Viewer received message');
    const onStatsReport = stats => console.log('Reporting stats', stats, viewer);

    let formValues = {
      region: 'us-east-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      channelName: 'conferencing-channel',
      clientId: 'testingID' + Math.random()
        .toString(36)
        .substring(2)
        .toUpperCase(),
      sendAudio: true,
      sendVideo: true,
      widescreen: true,
    };
    // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
      region: formValues.region,
      accessKeyId: formValues.accessKeyId,
      secretAccessKey: formValues.secretAccessKey,
      sessionToken: formValues.sessionToken,
      endpoint: formValues.endpoint,
      correctClockSkew: true,
    });

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: formValues.channelName,
      })
      .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[VIEWER] Channel ARN: ', channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
      .getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ['WSS', 'HTTPS'],
          Role: Role.VIEWER,
        },
      })
      .promise();
    const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
      endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
      return endpoints;
    }, {});
    console.log('[VIEWER] Endpoints: ', endpointsByProtocol);

    const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
      region: formValues.region,
      accessKeyId: formValues.accessKeyId,
      secretAccessKey: formValues.secretAccessKey,
      sessionToken: formValues.sessionToken,
      endpoint: endpointsByProtocol.HTTPS,
      correctClockSkew: true,
    });

    // Get ICE server configuration
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
      .getIceServerConfig({
        ChannelARN: channelARN,
      })
      .promise();
    const iceServers = [];
    if (!formValues.natTraversalDisabled && !formValues.forceTURN) {
      iceServers.push({ urls: `stun:stun.kinesisvideo.${formValues.region}.amazonaws.com:443` });
    }
    if (!formValues.natTraversalDisabled) {
      getIceServerConfigResponse.IceServerList.forEach(iceServer =>
        iceServers.push({
          urls: iceServer.Uris,
          username: iceServer.Username,
          credential: iceServer.Password,
        }),
      );
    }
    console.log('[VIEWER] ICE servers: ', iceServers);

    // Create Signaling Client
    viewer.signalingClient = new SignalingClient({
      channelARN,
      channelEndpoint: endpointsByProtocol.WSS,
      clientId: formValues.clientId,
      role: Role.VIEWER,
      region: formValues.region,
      credentials: {
        accessKeyId: formValues.accessKeyId,
        secretAccessKey: formValues.secretAccessKey,
        sessionToken: formValues.sessionToken,
      },
      systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    });

    const configuration = {
      iceServers
    };

    viewer.peerConnection = new RTCPeerConnection(configuration);
    if (formValues.openDataChannel) {
      viewer.dataChannel = viewer.peerConnection.createDataChannel('kvsDataChannel');
      viewer.peerConnection.ondatachannel = event => {
        event.channel.onmessage = onRemoteDataMessage;
      };
    }

    // Poll for connection stats
    viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(onStatsReport), 1000);

    viewer.signalingClient.on('open', async () => {
      console.log('[VIEWER] Connected to signaling service');

      // Get a stream from the webcam, add it to the peer connection, and display it in the local view.
      // If no video/audio needed, no need to request for the sources. 
      // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
      if (formValues.sendVideo || formValues.sendAudio) {
        try {
          viewer.localStream = localStream;
          viewer.localStream.getTracks().forEach(track => viewer.peerConnection.addTrack(track, viewer.localStream));
        } catch (e) {
          console.error('[VIEWER] Could not find webcam');
          return;
        }
      }

      // Create an SDP offer to send to the master
      console.log('[VIEWER] Creating SDP offer');
      await viewer.peerConnection.setLocalDescription(
        await viewer.peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        }),
      );

      // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
      // if (formValues.useTrickleICE) {
      console.log('[VIEWER] Sending SDP offer');
      viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
      // }
      console.log('[VIEWER] Generating ICE candidates');
    });

    viewer.signalingClient.on('sdpAnswer', async answer => {
      // Add the SDP answer to the peer connection
      console.log('[VIEWER] Received SDP answer');
      await viewer.peerConnection.setRemoteDescription(answer);
      dispatch(addUser({ remoteClientId: 'master', peerConnection: viewer.peerConnection }));
    });

    viewer.signalingClient.on('iceCandidate', candidate => {
      // Add the ICE candidate received from the MASTER to the peer connection
      console.log('[VIEWER] Received ICE candidate');
      viewer.peerConnection.addIceCandidate(candidate);
    });

    viewer.signalingClient.on('close', () => {
      console.log('[VIEWER] Disconnected from signaling channel');
    });

    viewer.signalingClient.on('error', error => {
      console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    viewer.peerConnection.addEventListener('icecandidate', ({ candidate }) => {
      if (candidate) {
        console.log('[VIEWER] Generated ICE candidate');

        // When trickle ICE is enabled, send the ICE candidates as they are generated.
        // if (formValues.useTrickleICE) {
        console.log('[VIEWER] Sending ICE candidate');
        viewer.signalingClient.sendIceCandidate(candidate);
        // }
      } else {
        console.log('[VIEWER] All ICE candidates have been generated');

        // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
        // if (!formValues.useTrickleICE) {
        // console.log('[VIEWER] Sending SDP offer');
        // viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
        // }
      }
    });

    // As remote tracks are received, add them to the remote view
    // viewer.peerConnection.addEventListener('track', event => {
    //   console.log('[VIEWER] Received remote track');
    //   // if (remoteView.srcObject) {
    //   //   return;
    //   // }
    //   viewer.remoteStream = event.streams[0];
    //   // remoteView.srcObject = viewer.remoteStream;
    // });

    console.log('[VIEWER] Starting viewer connection');
    viewer.signalingClient.open();
  }

  const stopViewer = () => {
    console.log('[VIEWER] Stopping viewer connection');
    if (viewer.signalingClient) {
      viewer.signalingClient.close();
      viewer.signalingClient = null;
    }

    if (viewer.peerConnection) {
      viewer.peerConnection.close();
      viewer.peerConnection = null;
    }

    if (viewer.localStream) {
      viewer.localStream.getTracks().forEach(track => track.stop());
      viewer.localStream = null;
    }

    if (viewer.remoteStream) {
      viewer.remoteStream.getTracks().forEach(track => track.stop());
      viewer.remoteStream = null;
    }

    if (viewer.peerConnectionStatsInterval) {
      clearInterval(viewer.peerConnectionStatsInterval);
      viewer.peerConnectionStatsInterval = null;
    }

    if (viewer.localView) {
      viewer.localView.srcObject = null;
    }

    if (viewer.remoteView) {
      viewer.remoteView.srcObject = null;
    }

    if (viewer.dataChannel) {
      viewer.dataChannel = null;
    }
  }

  const sendMasterMessage = (message) => {
    Object.keys(master.dataChannelByClientId).forEach(clientId => {
      try {
        master.dataChannelByClientId[clientId].send(message);
      } catch (e) {
        console.error('[MASTER] Send DataChannel: ', e.toString());
      }
    });
  }

  const sendViewerMessage = (message) => {
    if (viewer.dataChannel) {
      try {
        viewer.dataChannel.send(message);
      } catch (e) {
        console.error('[VIEWER] Send DataChannel: ', e.toString());
      }
    }
  }

  const renderVideo = React.useMemo(() => {
    // This has to be done this way. Otherwise, the page will refresh everytime you update the username
    // and it will look like the video is flickering.
    return <video className={classes.video} ref={videoTag => {
      if (!videoTag) return // Sometimes, the video element isn't created when this function is run. This prevents errors
      if (localStream) {
        videoTag.srcObject = video ? localStream : null;
      }
      // These are set so you don't listen to your own microphone
      videoTag.volume = 0;
      videoTag.muted = true;
    }} autoPlay playsInline>
    </video>
  }, [localStream, classes.video, video]);

  return (
    <Grid item container direction="row" className={classes.joinContainer}>
      <Grid item className={classes.videoContainer} xs={12} md={8} lg={7}>
        <Grid item>
          {renderVideo}
        </Grid>
        <Grid item container direction='row' className={classes.videoButtonsContainer}>
          <Grid item>
            <Fab onClick={toggleMicrophone}
              className={micro ? `${classes.toggleButtonOn}` : `${classes.toggleButtonOff}`}
            >
              {micro ? <MicIcon /> : <MicOffIcon />}
            </Fab>
          </Grid>
          <Grid item>
            <Fab onClick={toggleCamera}
              className={video ? `${classes.toggleButtonOn}` : `${classes.toggleButtonOff}`}
            >
              {video ? <VideocamIcon /> : <VideocamOffIcon />}
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" className={classes.detailsContainer} xs={12} md={5}>
        <Grid item>
          <Typography className={classes.title}>Meeting ready</Typography>
        </Grid>
        <Grid item>
          <TextField
            className={classes.displayNameInput}
            label="Display Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.meetingCode}>Code: {state.mySessionID}</Typography>
        </Grid>
        <Grid item>
          <Clipboard
            data-clipboard-text={`${location.href}`}
            className={classes.clipboardButton}
          >
            <Typography className={classes.buttonText} >COPY CODE</Typography>
            <LibraryAddCheckIcon className={classes.buttonIcon} />
          </Clipboard>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={createMaster}
            className={classes.joinButton}
          >
            Join as master
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={stopMaster}
            className={classes.joinButton}
          >
            Stop master
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={createViewer}
            className={classes.joinButton}
          >
            Join as viewer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={stopViewer}
            className={classes.joinButton}
          >
            Stop viewer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={joinNow}
            className={classes.joinButton}
          >
            Join now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

}