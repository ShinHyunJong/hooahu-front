import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_CHOICE_COMMENT = "SUCCEED_TO_GET_CHOICE_COMMENT";
export const FAILED_TO_GET_CHOICE_COMMENT = "FAILED_TO_GET_CHOICE_COMMENT";

export const SUCCEED_TO_POST_CHOICE_COMMENT = "SUCCEED_TO_POST_CHOICE_COMMENT";
export const FAILED_TO_POST_CHOICE_COMMENT = "FAILED_TO_POST_CHOICE_COMMENT";

export const getChoiceComment = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/choice/comment/" + params.id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          }
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_CHOICE_COMMENT,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_CHOICE_COMMENT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postChoiceComment = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/choice/comment/" + params.id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": params.token
          },
          body: JSON.stringify({
            comment: params.comment
          })
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_CHOICE_COMMENT,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_CHOICE_COMMENT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
