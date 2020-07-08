import {
  SET_PAGE
} from './actionTypes';

export default function reducer( state, action){
  switch(action.type){
    case SET_PAGE:
      return Object.assign({}, state, { page: action.payload });
    default:
      throw new Error("Invalid action type");
  }
}