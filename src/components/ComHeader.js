import React from "react";

function ComHeader({ currUser, comment, isOwner }) {
  const avatarLinkName = comment.user.image.png.split("/").slice(-1);

  return (
    <div className="com__user">
      <img
        src={`/assets/images/avatars/${avatarLinkName}`}
        alt={comment.user.username}
        className="avatar"
      />
      <h2 className="username">{comment.user.username}</h2>
      {isOwner && <span className="identify">You</span>}
      <span className="time-post">{comment.createdAt}</span>
    </div>
  );
}

export default ComHeader;
