import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../styles/Notes.css";
import pencil from "../svgs/pencil-svgrepo-com(1).svg";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [userUID, setUserUID] = useState();
  const [notes, setNotes] = useState([]);
  const [none, setNone] = useState("");

  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUID(user.uid);
    }
  });

  useEffect(() => {
    const getNotes = async () => {
      if (userUID) {
        const q = query(collection(db, "notes"), where("uid", "==", userUID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setNone("You have no notes yet");
        } else {
          setNotes(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      }
    };

    getNotes();
  }, [userUID]);

  const deleteNote = async (noteId) => {
    await deleteDoc(doc(db, "notes", noteId));
    window.location.reload();
  };

  return (
    <div className="notesContainer">
      {none ? (
        <div className="noneContainer">
          <p className="none">
            {none}. <br />
            Click the <span>pencil icon</span> above to add.
          </p>
        </div>
      ) : (
        notes.map((note) => (
          <div className="contents" key={note.id}>
            <div className="upper">
              <div className="upperOne">
                <h1>{note.title}</h1>
              </div>
              <div className="upperTwo">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="deleteNote"
                >
                  <div className="forX"></div>
                  <div className="forX"></div>
                </button>
                <button>
                  <img
                    className="edit"
                    onClick={() => nav(`/edit-note/${note.id}`)}
                    src={pencil}
                    alt="edit"
                  />
                </button>
              </div>
            </div>
            <div className="lower">
              <p className="body">{note.body.slice(0, 50)}</p>
            </div>
            {/* date */}
            <div className="lowest"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
