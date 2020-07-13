import {
  SET_PAGE,
  TOOGLE_MIC,
  TOOGLE_VIDEO,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USERS
} from './actionTypes';

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page
});

export const toogleMic = (status) => ({
  type: TOOGLE_MIC,
  payload: status
});

export const toogleVideo = (status) => ({
  type: TOOGLE_VIDEO,
  payload: status
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const removeUser = (users) => ({
  type: REMOVE_USER,
  payload: users
});

export const updateUsers = (users) => ({
  type: UPDATE_USERS,
  payload: users
});