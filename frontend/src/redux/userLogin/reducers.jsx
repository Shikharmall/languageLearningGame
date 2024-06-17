import { SET_LOGIN, SET_LOGOUT } from "./type";

const initialState = {
  isLogin: false,
};

const setAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case SET_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default setAuthReducer;
