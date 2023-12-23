import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddNote from "./components/AddNote";
import EditNote from "./pages/EditNote";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

function App() {
  const [isIn, setisIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
