import React, { useState, useEffect, useContext, useRef } from "react";
import { ComSendReplyBtn } from "./ComBtn";
import { ComContext } from "./ComContext";
import { postNewCom } from "../store/actions";
import { UploadIcon } from "./Icons";
import uuid from "../hooks/uuid";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";
init({ data });
TimeAgo.addDefaultLocale(vi);
const timeAgo = new TimeAgo("en-US");

function TypeCom({
  currUser,
  type = "send",
  parent = null,
  handleReply,
  classes,
}) {
  const [newComContent, setNewComContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [state, dispatch] = useContext(ComContext);
  const textRef = useRef();
  const imageRef = useRef();
  const inputFileRef = useRef();

  let avatarImageName = currUser?.image?.png?.split("/").slice(-1);

  useEffect(() => {
    const textareas = document.querySelectorAll(".textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }, [newComContent]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const validateCom = (newComContent) => {
    if (newComContent.length === 0 && preview === 0) {
      alert("enter your com");
      return;
    }
    return true;
  };
  const handleCreateCom = (e) => {
    e.preventDefault();
    let replyingTo = parent ? handleReply() : undefined;

    const comAceptable = validateCom(newComContent);
    const newCom = {
      id: uuid(),
      content: newComContent,
      createdAt: timeAgo.format(new Date()),
      parent,
      imageUrl: preview,
      replyingTo,
      score: 0,
      currUser,
    };
    comAceptable && dispatch(postNewCom(newCom));
    setNewComContent("");
    setSelectedFile("");
    inputFileRef.current.value = null;
  };
  const handleEnter = (e) => {
    const keyCode = e.which || e.keyCode;
    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
      handleCreateCom(e);
    }
  };

  const handleEmoji = (emojiObj) => {
    let emoji = emojiObj.native;
    if (emoji) {
      setNewComContent((prev) => `${prev}${emoji}`);
    }
    textRef.current.focus();
  };
  const toggleOpen = (e) => {
    const typeComElParent = e.currentTarget.closest(".type__com");
    const className = e.currentTarget.dataset.toggle;
    const funcElTooltip = typeComElParent.querySelector(`.${className}`);
    if (funcElTooltip) {
      funcElTooltip.classList.toggle("hide");
    }
  };

  return (
    <form className={`type__com ${classes}`}>
      <div className="com__user">
        <img
          src={`/assets/images/avatars/${avatarImageName}`}
          alt={currUser.username}
          className="avatar"
        />
      </div>
      <div className="com__content">
        <textarea
          ref={textRef}
          name="desc"
          placeholder="Add a comment"
          className="textarea"
          value={newComContent}
          onChange={(e) => {
            setNewComContent(e.target.value);
          }}
          onKeyDown={handleEnter}
        ></textarea>
      </div>
      <div className="type-btns">
        <div className="func-block" onClick={toggleOpen} data-toggle="emoji">
          <em-emoji
            shortcodes=":slightly_smiling_face:"
            class="toggle-emoji-btn"
            size="20px"
          ></em-emoji>
        </div>
        <div className="func-block" data-toggle="uploadImage">
          <label htmlFor="upload-images">
            <UploadIcon />
          </label>
          <input
            type="file"
            name="image"
            ref={inputFileRef}
            hidden
            id="upload-images"
            onChange={onSelectFile}
          />
        </div>
      </div>
      <ComSendReplyBtn
        type={type}
        onclick={handleCreateCom}
        classes={"btn--send"}
      />
      <div className="func-tooltip">
        <div className="emoji hide">
          <Picker data={data} onEmojiSelect={handleEmoji} theme="light" />
        </div>
        {selectedFile && (
          <div className="upload-images">
            <div className="upload-image">
              <img src={preview} ref={imageRef} alt="" />
              <button
                className="btn--remove"
                onClick={() => setSelectedFile(null)}
              >
                x
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default TypeCom;
