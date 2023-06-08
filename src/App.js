import { useState, useEffect, useContext } from "react";
import ComCard from "./components/ComCard";
import TypeCom from "./components/TypeCom";
import { ComContext } from "./components/ComContext";
import Modal from "./components/Modal";

function App() {
  const [state, dispatch, handleModal] = useContext(ComContext);
  const { comments, currentUser } = state;
  const getRep = (parentId) => {
    const childCom = comments.filter((comment) => comment.parent === parentId);
    return childCom;
  };

  // useEffect(() => {
  //   const textareas = document.querySelectorAll(".textarea");
  //   textareas.forEach((textarea) => {
  //     textarea.style.height = textarea.scrollHeight + "px";
  //   });
  // }, []);

  return (
    <main className="wrap">
      <div className="container container--px container--py">
        <div className="comments-container">
          {comments.map(
            (comment, index) =>
              comment.parent === null && (
                <ComCard
                  key={index}
                  currUser={currentUser}
                  comment={comment}
                  getRep={getRep}
                />
              )
          )}
        </div>
        <div className="post-comments">
          <TypeCom currUser={currentUser} />
        </div>
      </div>
      <Modal handleModal={handleModal} />
    </main>
  );
}

export default App;
