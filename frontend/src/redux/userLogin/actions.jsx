import { setLogin, setLogout } from "./type";

export const setLoginAction = (/*id,name*/) => {
  return {
    type: setLogin,
    //payload : {id: id , name: name}
  };
};

export const setLogoutAction = () => {
  return {
    type: setLogout,
  };
};
