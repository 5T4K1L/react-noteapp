import React, { useState } from "react";
import "../styles/Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorUser, setErrorUser] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          nav("/");
        }
      );
    } catch (error) {
      setErrorUser(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="inputFields">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
          {errorUser && <p className="invalid">Invalid email and password.</p>}
        </form>
        <p className="donthave">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
