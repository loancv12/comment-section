import {
  POST_NEW_COM,
  UPDATE_COM,
  DELETE_COM,
  REPLY_COM,
  VOTE_UP_COM,
} from "./constants";

//
export const updateCom = (payload) => {
  return {
    type: UPDATE_COM,
    payload,
  };
};
export const delCom = (payload) => {
  return {
    type: DELETE_COM,
    payload,
  };
};

export const postNewCom = (payload) => {
  return {
    type: POST_NEW_COM,
    payload,
  };
};
