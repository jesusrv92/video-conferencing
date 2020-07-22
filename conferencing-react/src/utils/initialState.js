import shortid from 'shortid'

export default {
  page: 'join',
  micro: false,
  video: false,
  record: false,
  detailsMenu: false,
  optionsMenu: false,
  sidebar: false,
  users: [],
  openVidu: {
    mySessionID: `${shortid.generate()}${shortid.generate()}`,
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page, will be 'publisher' or one of the 'subscribers',
    publisher: undefined, // local webstream
    subscribers: [], // active streams from other users
  }
}