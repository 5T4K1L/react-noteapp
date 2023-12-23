import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNote from "./components/AddNote";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
