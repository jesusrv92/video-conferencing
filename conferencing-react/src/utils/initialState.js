import shortid from 'shortid'

export default {
  page: 'home',
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
    publisher: undefined, // local webstream
    recordingID: '', // keeps track of the ID if the call is being recorded.
  }
}