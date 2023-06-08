import { ReplyIcon, EditIcon, DeleteIcon, MinusIcon, PlusIcon } from "./Icons";

export const ComReplyBtn = ({ classes, onclick }) => {
  return (
    <button className={`plain confirm ${classes}`} onClick={onclick}>
      <ReplyIcon className="icon" />
      Reply
    </button>
  );
};

export const ComEditBtn = ({ classes = "", onclick }) => {
  return (
    <button className={`plain confirm ${classes}`} onClick={onclick}>
      <EditIcon className="icon" />
      Edit
    </button>
  );
};

export const ComDeleteBtn = ({ classes = "", onclick }) => {
  return (
    <button className={`plain danger ${classes}`} onClick={onclick}>
      <DeleteIcon className="icon " />
      Delete
    </button>
  );
};

export const ComVoteBtn = ({ classes = "", onclick, score = 0 }) => {
  return (
    <div className={`vote ${classes}`}>
      <PlusIcon className="icon btn--vote" onClick={onclick} />
      <span className="score">{score}</span>
      <MinusIcon className="icon btn--vote" />
    </div>
  );
};

export const ComUpdateBtn = ({ classes = "", onclick }) => {
  return (
    <button
      className={`btn--update round confirm ${classes}`}
      onClick={onclick}
    >
      Update
    </button>
  );
};
export const ComSendReplyBtn = ({ classes = "", onclick, type }) => {
  return (
    <button className={`round confirm ${classes}`} onClick={onclick}>
      {type}
    </button>
  );
};
