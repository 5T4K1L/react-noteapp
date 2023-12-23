import React, { useState } from "react";
import "../styles/Login.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      alert("Logged in");
    });
  };

  return (
    <div className="registerContainer">
      <div className="inputFields">
        <h1>Login</h1>
        <form onSubmit={handleRegister}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            name=""
            placeholder="Password"
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
