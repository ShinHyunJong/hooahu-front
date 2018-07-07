import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_FEED = "SUCCEED_TO_GET_FEED";
export const FAILED_TO_GET_FEED = "FAILED_TO_GET_FEED";

export const SUCCEED_TO_POST_FEED = "SUCCEED_TO_POST_FEED";
export const FAILED_TO_POST_FEED = "FAILED_TO_POST_FEED";

export const getAllFeed = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/post/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": params.token
        }
      });
      let responseJson = await response.json();
      await dispatch({
        type: SUCCEED_TO_GET_FEED,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getFeed = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + `api/post?post_type=${params.type}`,
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
        type: SUCCEED_TO_GET_FEED,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postFeed = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": params.token
        },
        body: JSON.stringify({
          content: params.content,
          post_type: params.type,
          pic_list: params.pic_list,
          tags: ["#sample", "#cafeSpot"]
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_FEED,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_FEED,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
