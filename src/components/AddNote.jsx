import React, { useRef, useState } from "react";
import "../styles/AddNote.css";
import "../styles/AddNoteNavbar.css";
import done from "../svgs/check-svgrepo-com.svg";
import back from "../svgs/back-svgrepo-com.svg";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

const AddNote = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [userUID, setUserUID] = useState();
  const textareaRef = useRef(null);

  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUID(user.uid);
    }
  });

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      const scHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scHeight}px`;
    }
  };

  const handleClick = async (e) => {
    try {
      const addNote = await addDoc(collection(db, "notes"), {
        uid: userUID,
        id: null,
        title,
        body: body + "",
      });

      // Retrieve the ID of the newly added note
      const noteID = addNote.id;

      // Update the document with the generated ID
      const noteDocRef = doc(db, "notes", noteID);
      await updateDoc(noteDocRef, { id: noteID });

      nav("/");
    } catch (error) {
      alert("No title or body");
    }
  };

  return (
    <div className="addNoteContainer">
      <div className="addNavbar">
        <div className="icons">
          <button>
            <img onClick={handleClick} src={done} alt="" />
            <img src={back} onClick={() => nav("/")} alt="" />
          </button>
        </div>
      </div>
      <input type="text" onKeyDown={(e) => setTitle(e.target.value)} />
      <textarea
        id="textArea"
        ref={textareaRef}
        onKeyUp={handleTextareaChange}
        onKeyDown={(e) => setBody(e.target.value)}
      />
    </div>
  );
};

export default AddNote;
