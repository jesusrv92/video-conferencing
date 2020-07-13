import {
  SET_PAGE,
  TOGGLE_MIC,
  TOGGLE_VIDEO,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USERS,
} from './actionTypes';

export default function reducer( state, action){
  switch(action.type){
    case SET_PAGE:
      return Object.assign({}, state, { page: action.payload });
    case TOGGLE_MIC:
      return Object.assign({}, state, { micro: action.payload });
    case TOGGLE_VIDEO:
      return Object.assign({}, state, { video: action.payload });
    case ADD_USER:
      return Object.assign({}, state, { users: action.payload });
    case REMOVE_USER:
        return Object.assign({}, state, { users: action.payload });
    case UPDATE_USERS:
          return Object.assign({}, state, { users: action.payload });
    default:
      throw new Error("Invalid action type");
  }
}