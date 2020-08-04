import shortid from 'shortid'

export default {
  page: 'home', // Dictates which page is being displayed
  micro: false, // Microphone active state
  video: false, // Camera active state
  record: false, // Meeting recording state
  detailsMenu: false, // Display details menu in videocall component
  optionsMenu: false, // Display options menu in videocall component
  sidebar: false, // Display sidebar menu in videocall component
  users: [], // Current users in call
  openVidu: {
    mySessionID: `${shortid.generate()}${shortid.generate()}`, // Session you're going to join
    myUserName: 'Participant' + Math.floor(Math.random() * 100), // The username that you're going to use
    session: undefined, // OpenVidu Session API object
    publisher: undefined, // OpenVidu Publisher API object
    recordingID: '', // keeps track of the ID if the call is being recorded.
  }
}