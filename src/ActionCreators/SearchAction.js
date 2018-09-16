import * as Request from "../Utils/WebRequest";

export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const SUCCEED_TO_SEARCH_NAME = "SUCCEED_TO_SEARCH_NAME";
export const FAILED_TO_SEARCH_NAME = "FAILED_TO_SEARCH_NAME";

export const SUCCEED_TO_SEARCH_TAG = "SUCCEED_TO_SEARCH_TAG";
export const FAILED_TO_SEARCH_TAG = "FAILED_TO_SEARCH_TAG";

export const SUCCEED_TO_SEARCH_PACKAGE = "SUCCEED_TO_SEARCH_PACKAGE";
export const FAILED_TO_SEARCH_PACKAGE = "FAILED_TO_SEARCH_PACKAGE";

export const searchName = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/post/search/user?title=${params.user}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_SEARCH_NAME, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SEARCH_NAME,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const searchTag = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/post/search/tag/total?title=${params.tag}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_SEARCH_TAG, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SEARCH_TAG,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};

export const searchPackage = params => {
  return async dispatch => {
    try {
      let response = Request.postData(
        `api/post/search/package?title=${params.package}`,
        params
      ).then(result => {
        switch (result) {
          case "token_expired":
            return dispatch({ type: TOKEN_EXPIRED });

          default:
            dispatch({ type: SUCCEED_TO_SEARCH_PACKAGE, payload: result });
            return result;
        }
      });
      return response;
    } catch (error) {
      dispatch({
        type: FAILED_TO_SEARCH_PACKAGE,
        payload: { data: "NETWORK_ERROR" }
      });
      console.error(error);
    }
  };
};
