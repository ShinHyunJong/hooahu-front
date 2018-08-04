import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_USER = "SUCCEED_TO_GET_USER";
export const FAILED_TO_GET_USER = "FAILED_TO_GET_USER";

export const SUCCEED_TO_CHECKNAME = "SUCCEED_TO_CHECKNAME";
export const FAILED_TO_CHECKNAME = "FAILED_TO_CHECKNAME";

export const getUser = token => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/user/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        }
      });
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_GET_USER,
        payload: responseJson.result[0]
      });
      return responseJson.result[0];
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_USER,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const checkEmail = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/auth/email/test?email=${params.email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_CHECKNAME,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_CHECKNAME,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};