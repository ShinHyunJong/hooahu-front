/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/
import {
  SUCCEED_TO_SIGNUP,
  SUCCEED_TO_SIGNIN,
  SUCCEED_TO_SIGNOUT
} from "../ActionCreators/AuthAction";

import { combineReducers } from "redux";

const initialState = {
  data: "",
  token: "",
  isLogin: !!localStorage.getItem("token")
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCEED_TO_SIGNUP:
      localStorage.setItem("token", action.payload);
      return Object.assign({}, state, {
        token: action.payload,
        isLogin: true
      });
    case SUCCEED_TO_SIGNIN:
      localStorage.setItem("token", action.payload);
      return Object.assign({}, state, {
        token: action.payload,
        isLogin: true
      });
    case SUCCEED_TO_SIGNOUT:
      localStorage.removeItem("token");
      return Object.assign({}, state, {
        isLogin: false
      });
    default:
      return state;
  }
};

const Reducer = combineReducers({ reducer });
export default Reducer;
