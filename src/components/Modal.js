import React, { useContext } from "react";
import { ComContext } from "./ComContext";
import { delCom } from "../store/actions";

function Modal({ handleModal }) {
  const [state, dispatch] = useContext(ComContext);

  const handleDelCom = (e, delComId) => {
    e.preventDefault();
    const delComData = {
      id: delComId,
    };
    if (delComId) {
      dispatch(delCom(delComData));
    }
  };
  return (
    <div className="modal fade" id="modal-delete" tabIndex={-1}>
      <div className="modal__body">
        <h2>Delete comment</h2>
        <p className="desc">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="action">
          <button
            className="round cancel btn--modal"
            onClick={(e) => handleModal()}
          >
            No, Cancel
          </button>
          <button
            className="round danger btn--modal"
            onClick={(e) => {
              let delComId = handleModal();
              handleDelCom(e, delComId);
            }}
          >
            YES,Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
