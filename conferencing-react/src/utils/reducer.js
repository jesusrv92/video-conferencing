import {
  SET_PAGE,
  TOGGLE_MIC,
  TOGGLE_VIDEO,
  ADD_USER,
  REMOVE_USER,
  TOGGLE_RECORD,
  TOGGLE_DETAILS_MENU,
  OPEN_DETAILS_MENU,
  TOGGLE_OPTIONS_MENU,
  OPEN_OPTIONS_MENU,
  TOGGLE_SIDEBAR,
  SET_OPENVIDU,
  SET_DISPLAY_NAME,
  RESET_STATE,
  SET_LOCAL_STREAM,
  SET_MEETING_CODE,
} from './actionTypes';

import initialState from './initialState'

export default function reducer(state, action) {
  switch (action.type) {
    case SET_PAGE:
      return Object.assign({}, state, { page: action.payload });
    case TOGGLE_MIC:
      return Object.assign({}, state, { micro: action.payload });
    case TOGGLE_VIDEO:
      return Object.assign({}, state, { video: action.payload });
    case TOGGLE_RECORD:
      return Object.assign({}, state, { record: action.payload });
    case ADD_USER:
      let newUsers = [...state.users, action.payload];
      return Object.assign({}, state, { users: newUsers });
    case REMOVE_USER:
      let filteredUsers = state.users.filter(user => action.payload !== user);
      return Object.assign({}, state, { users: filteredUsers });
    case TOGGLE_DETAILS_MENU:
      return Object.assign({}, state, { detailsMenu: action.payload });
    case OPEN_DETAILS_MENU:
      return Object.assign({}, state, { detailsMenu: action.payload, optionsMenu: false, sidebar: false });
    case TOGGLE_OPTIONS_MENU:
      return Object.assign({}, state, { optionsMenu: action.payload });
    case OPEN_OPTIONS_MENU:
      return Object.assign({}, state, { optionsMenu: action.payload, detailsMenu: false, sidebar: false });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebar: action.payload,
        optionsMenu: false
      });
    case SET_OPENVIDU:
      return state;
    case SET_DISPLAY_NAME:
      return Object.assign({}, state, { myUserName: action.payload });
    case RESET_STATE:
      if (state.localStream) {
        state.localStream.getTracks().forEach(track => track.stop());
      }
      if (state.users) {
        state.users.forEach(user => user.peerConnection.close());
      }
      return initialState;
    case SET_LOCAL_STREAM:
      return Object.assign({}, state, { localStream: action.payload });
    case SET_MEETING_CODE:
      return Object.assign({}, state, { meetingCode: action.payload });
    default:
      throw new Error("Invalid action type");
  }
}