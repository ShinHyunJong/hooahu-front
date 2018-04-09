/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/
import { SUCCEED_TO_SIGNUP } from "../ActionCreators/AuthAction";

import { combineReducers } from "redux";

const initialState = {
  data: null,
  token: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCEED_TO_SIGNUP:
      return Object.assign({}, state, {
        token: action.payload
      });
    default:
      return state;
  }
};

const Reducer = combineReducers({ reducer });
export default Reducer;
