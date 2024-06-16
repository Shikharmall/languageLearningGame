import { createStore, combineReducers } from "redux";
import setAuthReducer  from "./userLogin/reducers";

const rootReducer = combineReducers({
  auth: setAuthReducer,
});

const store = createStore(rootReducer);
export default store;
