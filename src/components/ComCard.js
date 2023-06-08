import { useContext, useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "./Icons";
import ComHeader from "./ComHeader";
import ComDescBody from "./ComDescBody";
import ComAction from "./ComAction";
import TypeCom from "./TypeCom";
import { updateCom } from "../store/actions";
import { ComContext } from "./ComContext";

function ComCard({ currUser, comment, getRep }) {
  const [state, dispatch] = useContext(ComContext);
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editComContent, setEditComContent] = useState(comment.content);

  let isOwner = comment.user.username === currUser.username;
  const repComs = getRep(comment.id);

  useEffect(() => {
    const textareas = document.querySelectorAll(".textarea");
    textareas.forEach((textarea) => {
      textarea.style.minHeight = textarea.scrollHeight + "px";
    });
  }, [editComContent, editing]);

  const handleEditComContent = (editConContent) => {
    setEditComContent(editConContent);
  };

  const handleEdit = (editComId, imageUrl) => {
    setEditing(!editing);
    const updateComData = {
      id: editComId,
      content: editComContent,
    };
    if (editComId) {
      dispatch(updateCom(updateComData));
    }
  };

  const handleReply = () => {
    setReplying(!replying);
    return comment.user.username;
  };

  return (
    <div className="com">
      <div className="com__owner">
        <div className="vote hide-for-mobile">
          <PlusIcon className="icon btn--plus" />
          <span className="score">{comment.score}</span>
          <MinusIcon className="icon btn--minus" />
        </div>
        <div className="com__content">
          <ComHeader
            {...{
              currUser,
              comment,
              editing,
              isOwner,
            }}
          />
          <ComDescBody
            {...{
              comment,
              currUser,
              editing,
              isOwner,
              editComContent,
              handleEditComContent,
            }}
          />
          <ComAction
            {...{
              isOwner,
              currUser,
              comment,
              editing,
              handleEdit,
              handleReply,
            }}
          />
        </div>
      </div>
      <div className={`reply-container container--py  `}>
        {repComs.map((comment, index) => (
          <ComCard
            key={index}
            currUser={currUser}
            comment={comment}
            getRep={getRep}
          />
        ))}
        {replying && (
          <TypeCom
            type="reply"
            parent={comment.id}
            {...{
              currUser,
              comment,
              handleReply,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ComCard;
