import { setLogin, setLogout } from "./type";

const initialState = {
  isLogin: false,
};

const setAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case setLogin:
      return {
        ...state,
        isLogin: true,
      };
    case setLogout:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default setAuthReducer;
