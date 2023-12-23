import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import pencil from "../svgs/pencil-svgrepo-com(1).svg";
import "../styles/AddNote.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState();

  const nav = useNavigate();

  const handleClick = () => {
    nav("/add-note");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleDelete = async () => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);

    snapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    window.location.reload();
  };

  return (
    <div className="navbarContainer">
      <div className="contents">
        <button onClick={handleDelete} className="delete">
          Delete All
        </button>
        <button>
          <img
            className="pencil"
            onClick={handleClick}
            src={pencil}
            alt="add note"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
