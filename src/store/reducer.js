import rawData from "../data.json";

import {
  POST_NEW_COM,
  UPDATE_COM,
  DELETE_COM,
  REPLY_COM,
  VOTE_UP_COM,
} from "./constants";

const flatTree = (
  (id) =>
  (parent) =>
  ({ replies = [], ...object }) =>
    [{ id: ++id, ...object, parent }, ...replies.flatMap(flatTree(id))]
)(0);
let tree = rawData.comments;
let comments = tree.flatMap(flatTree(null));
export const initState = {
  comments: comments,
  currentUser: rawData.currentUser,
};

export default function reducer(state, action) {
  let newState;
  let otherComs;
  let newCom;
  let {
    id,
    content,
    createdAt,
    parent,
    imageUrl,
    replyingTo,
    currUser: user,
    score,
  } = action.payload;
  switch (action.type) {
    case DELETE_COM:
      let delComId = id;
      otherComs = state.comments.filter((comment) => comment.id !== delComId);
      newState = { ...state, comments: [...otherComs] };
      return newState;
      break;

    case UPDATE_COM:
      let updateComId = id;
      const foundCom = state.comments.find(
        (comment) => comment.id === updateComId
      );
      otherComs = state.comments.filter(
        (comment) => comment.id !== updateComId
      );
      newCom = { ...foundCom, content };
      newState = { ...state, comments: [...otherComs, newCom] };
      return newState;
      break;

    case POST_NEW_COM:
      newCom = {
        id,
        content,
        createdAt,
        parent,
        imageUrl,
        replyingTo,
        user,
        score,
      };
      newState = { ...state, comments: [...state.comments, newCom] };
      return newState;
      break;

    default:
      console.log(state);

      break;
  }
}
