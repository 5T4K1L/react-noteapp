import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import pencil from "../svgs/pencil-svgrepo-com(1).svg";
import signout from "../svgs/sign-out-alt-svgrepo-com.svg";
import "../styles/AddNote.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
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

  const signOutUser = () => {
    signOut(auth).then(nav("/"));
  };

  return (
    <div className="navbarContainer">
      <div className="contents">
        <button onClick={handleDelete} className="delete">
          Delete All
        </button>
        <button className="signoutpenc">
          <img onClick={signOutUser} className="signout" src={signout} alt="" />
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
