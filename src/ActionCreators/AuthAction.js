import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_SIGNIN = "SUCCEED_TO_SIGNIN";
export const FAILED_TO_SIGNIN = "FAILED_TO_SIGNIN";

export const SUCCEED_TO_SIGNUP = "SUCCEED_TO_SIGNUP";
export const FAILED_TO_SIGNUP = "FAILED_TO_SIGNUP";

export const SUCCEED_TO_SIGNOUT = "SUCCEED_TO_SIGNOUT";

export const postSignUp = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: params.first_name,
          last_name: params.last_name,
          nickname: params.nickname,
          email: params.email,
          password: params.password,
          type: params.type,
          c_type: params.c_type,
          w_type: params.w_type,
          area: params.area,
          camp: params.camp,
          reason: params.reason
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_SIGNUP,
        payload: responseJson.token
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SIGNUP,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postSignIn = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_SIGNIN,
        payload: responseJson.token
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SIGNIN,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({
      type: SUCCEED_TO_SIGNOUT
    });
  };
};
