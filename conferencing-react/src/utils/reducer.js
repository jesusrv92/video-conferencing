import {
  SET_PAGE,
  TOOGLE_MIC,
  TOOGLE_VIDEO,
  ADD_USER
} from './actionTypes';

export default function reducer( state, action){
  switch(action.type){
    case SET_PAGE:
      return Object.assign({}, state, { page: action.payload });
    case TOOGLE_MIC:
      return Object.assign({}, state, { micro: action.payload });
    case TOOGLE_VIDEO:
      return Object.assign({}, state, { video: action.payload });
    case ADD_USER:
      return Object.assign({}, state, { users: action.payload });
    default:
      throw new Error("Invalid action type");
  }
}