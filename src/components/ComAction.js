import React, { useContext, useRef } from "react";
import {
  ComReplyBtn,
  ComDeleteBtn,
  ComEditBtn,
  ComVoteBtn,
  ComUpdateBtn,
} from "./ComBtn";
import { ComContext } from "./ComContext";

function ComAction({ comment, editing, handleEdit, handleReply, isOwner }) {
  const [state, dispatch, handleModal] = useContext(ComContext);

  return (
    <div className="com__action">
      {isOwner ? (
        !editing ? (
          <>
            <ComVoteBtn classes={"hide-for-desktop"} score={comment.score} />
            <div className="reply">
              <ComDeleteBtn onclick={(e) => handleModal(comment.id)} />
              <ComEditBtn
                onclick={(e) => {
                  handleEdit();
                }}
              />
            </div>
          </>
        ) : (
          <ComUpdateBtn
            onclick={(e) => {
              handleEdit(comment.id);
            }}
          />
        )
      ) : (
        <>
          <ComVoteBtn classes={"hide-for-desktop"} score={comment.score} />
          <ComReplyBtn
            classes="reply"
            onclick={(e) => {
              handleReply();
            }}
          />
        </>
      )}
    </div>
  );
}

export default ComAction;
