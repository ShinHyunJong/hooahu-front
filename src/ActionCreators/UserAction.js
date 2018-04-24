import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_USER = "SUCCEED_TO_GET_USER";
export const FAILED_TO_GET_USER = "FAILED_TO_GET_USER";

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
