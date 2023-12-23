import React, { useState } from "react";
import "../styles/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [userError, setUserError] = useState(false);

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username,
            email,
          });
        }
      );
    } catch (error) {
      setUserError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="inputFields">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Create Username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Create Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Create Password"
          />

          <button>Register</button>
          {userError && <p className="invalid">Email already taken.</p>}
        </form>
        <p className="dohave">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
