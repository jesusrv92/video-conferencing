import {
  SET_PAGE,
  TOGGLE_MIC,
  TOGGLE_VIDEO,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USERS,
  TOGGLE_RECORD,
  TOGGLE_DETAILS_MENU,
  OPEN_DETAILS_MENU,
  TOGGLE_OPTIONS_MENU,
  OPEN_OPTIONS_MENU,
  TOGGLE_SIDEBAR,
  SET_OPENVIDU,
  SET_DISPLAY_NAME
} from './actionTypes';

export default function reducer(state, action){
  switch(action.type){
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
    case UPDATE_USERS:
      return Object.assign({}, state, { users: action.payload });
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
      return Object.assign({}, state, { openVidu: action.payload});
    case SET_DISPLAY_NAME:
      return {
        ...state,
        openVidu: {
          ...state.openVidu,
          myUserName: action.payload
        }
      }
    default:
      throw new Error("Invalid action type");
  }
}