import React from "react";

import Navbar from "../components//Navbar";
import Notes from "../components/Notes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      nav("/login");
    }
  });

  return (
    <div>
      <Navbar />
      <Notes />
    </div>
  );
};

export default Homepage;
