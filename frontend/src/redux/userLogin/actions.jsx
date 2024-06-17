import { SET_LOGIN, SET_LOGOUT } from "./type";

export const setLoginAction = () => {
  return {
    type: SET_LOGIN,
  };
};

export const setLogoutAction = () => {
  return {
    type: SET_LOGOUT,
  };
};
