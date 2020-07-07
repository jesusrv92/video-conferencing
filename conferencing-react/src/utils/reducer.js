// import {
//   SET_PAGE
// } from './actionTypes';

export default function reducer( state, action){
  console.log('inside reducer');
  console.log("Action: ",  action);
  switch(action.type){
    case 'SET_PAGE':
      console.log("Inside set page");
      return Object.assign({}, state, { page: action.payload });
    default:
      throw new Error("Invalid action type");
  }
}