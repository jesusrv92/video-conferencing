/**
 * This file demonstrates the process of creating a KVS Signaling Channel.
 */

import AWS from 'aws-sdk';
import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc'
console.log(Role);

const master = {
    signalingClient: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
};

export default async function connectSignalingChannel(options) {
    // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
        region: options.region,
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        sessionToken: options.sessionToken || null,
        endpoint: options.endpoint || null,
    });

    // Get signaling channel ARN
    // await kinesisVideoClient.
    // .createSignalingChannel({
    //     ChannelName: options.channelName,
    // })
    // .promise();

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
        .describeSignalingChannel({
            ChannelName: options.channelName,
        })
        .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[CONNECT_SIGNALING_CHANNEL] Channel ARN: ', channelARN);

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
}
