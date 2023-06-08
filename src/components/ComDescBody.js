import { useState, useEffect, useRef } from "react";
import { UploadIcon } from "./Icons";
import TypeCom from "./TypeCom";

function ComDescBody({
  comment,
  currUser,
  editing,
  isOwner,
  editComContent,
  handleEditComContent,
}) {
  const textRef = useRef();
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      let textLength = textRef.current.value.length;
      textRef.current.setSelectionRange(textLength, textLength);
    }
  }, [editing]);
  return (
    <>
      {isOwner && editing ? (
        <>
          <textarea
            ref={textRef}
            name="desc"
            className="textarea"
            value={editComContent}
            onChange={(e) => handleEditComContent(e.target.value)}
          ></textarea>
        </>
      ) : (
        <div className="desc">
          {comment.replyingTo && (
            <span className="tag">@{comment.replyingTo} </span>
          )}
          <span>{comment.content}</span>
          {comment.imageUrl && (
            <img className="desc-img" alt="" src={comment.imageUrl} />
          )}
        </div>
      )}
    </>
  );
}

export default ComDescBody;
