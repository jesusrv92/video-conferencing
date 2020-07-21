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
} from './actionTypes';

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page
});

export const toggleMic = (status) => ({
  type: TOGGLE_MIC,
  payload: status
});

export const toggleVideo = (status) => ({
  type: TOGGLE_VIDEO,
  payload: status
});

export const toggleRecord = (status) => ({
  type: TOGGLE_RECORD,
  payload: status
});

export const toggleDetailsMenu = (status) => ({
  type: TOGGLE_DETAILS_MENU,
  payload: status
});

export const openDetailsMenu = (status) => ({
  type: OPEN_DETAILS_MENU,
  payload: status
});

export const toggleOptionsMenu = (status) => ({
  type: TOGGLE_OPTIONS_MENU,
  payload: status
});

export const openOptionsMenu = (status) => ({
  type: OPEN_OPTIONS_MENU,
  payload: status
});

export const toggleSidebar = (status) => ({
  type: TOGGLE_SIDEBAR,
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

export const setOpenVidu = (openVidu) => ({
  type: SET_OPENVIDU,
  payload: openVidu
});