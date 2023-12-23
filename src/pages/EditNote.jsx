import React, { useEffect, useRef, useState } from "react";
import "../styles/AddNote.css";
import "../styles/AddNoteNavbar.css";
import done from "../svgs/check-svgrepo-com.svg";
import back from "../svgs/back-svgrepo-com.svg";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const AddNote = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [userUID, setUserUID] = useState();
  const [notes, setNotes] = useState([]);
  const textareaRef = useRef(null);
  const { id } = useParams();

  const nav = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      const q = query(collection(db, "notes"), where("id", "==", id));
      const snapshot = await getDocs(q);
      setNotes(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };

    getNotes();
  }, [id]);

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      const scHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scHeight}px`;
    }
  };

  const handleSubmit = async () => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, {
      title,
      body,
    });

    nav("/");
  };

  return (
    <div className="addNoteContainer">
      <div className="addNavbar">
        <div className="icons">
          <button>
            <img src={done} onClick={handleSubmit} alt="" />
            <img src={back} onClick={() => nav("/")} alt="" />
          </button>
        </div>
      </div>
      <input
        type="text"
        defaultValue={title || (notes.length > 0 ? notes[0].title : "")}
        onKeyDown={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        id="textArea"
        ref={textareaRef}
        defaultValue={body || (notes.length > 0 ? notes[0].body : "")}
        onKeyUp={handleTextareaChange}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
};

export default AddNote;
