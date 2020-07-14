export default {
  page: 'video',
  micro: false,
  video: false,
  users: [],
  openVidu: {
    mySessionID: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page, will be 'publisher' or one of the 'subscribers',
    publisher: undefined, // local webstream
    subscribers: [], // active streams from other users
  }
}