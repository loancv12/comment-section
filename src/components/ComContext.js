import { createContext, useRef, useState } from "react";
import { useReducer } from "react";
import reducer, { initState } from "../store/reducer";

export const ComContext = createContext();
const ComContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const modalRef = useRef({
    data: "",
  });
  const handleModal = (delComId) => {
    if (delComId) {
      modalRef.current.data = delComId;
    }

    // animation
    const deleteModel = document.querySelector("#modal-delete");
    let delModalClasses = deleteModel.classList;
    delModalClasses.toggle("modal__open");
    if (delModalClasses.contains("fadeIn")) {
      delModalClasses.remove("fadeIn");
      delModalClasses.add("fadeOut");
      document.body.style.overflow = "auto";
    } else {
      delModalClasses.remove("fadeOut");
      delModalClasses.add("fadeIn");
      document.body.style.overflow = "hidden";
    }
    return modalRef.current.data;
  };

  return (
    <ComContext.Provider value={[state, dispatch, handleModal]}>
      {children}
    </ComContext.Provider>
  );
};
export default ComContextProvider;
