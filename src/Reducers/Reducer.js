/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/
import {
  SUCCEED_TO_SIGNUP,
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_SIGNOUT
} from "../ActionCreators/AuthAction";

import { SUCCEED_TO_GET_USER } from "../ActionCreators/UserAction";
import { SUCCEED_TO_GET_FEED } from "../ActionCreators/FeedAction";

import { combineReducers } from "redux";

const initialState = {
  data: "",
  token: localStorage.getItem("token"),
  isLogin: !!localStorage.getItem("token"),
  user: [],
  feeds: null
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
    case FAILED_TO_SIGNIN:
      return Object.assign({}, state, {
        token: "",
        isLogin: false
      });
    case SUCCEED_TO_SIGNOUT:
      localStorage.removeItem("token");
      return Object.assign({}, state, {
        isLogin: false,
        token: null,
        user: []
      });
    case SUCCEED_TO_GET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case SUCCEED_TO_GET_FEED:
      return Object.assign({}, state, {
        feeds: action.payload
      });
    default:
      return state;
  }
};

const Reducer = combineReducers({ reducer });
export default Reducer;
