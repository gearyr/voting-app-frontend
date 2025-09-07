import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import AdminSummary from "./pages/AdminSummary";
import AdminUser from "./pages/AdminUser";
import Navbar from "./components/Navbar";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = token ? parseJwt(token) : null;
  const role = user?.role || "user";

  return (
    <Router>
      {token && <Navbar setToken={setToken} role={role} />} {/* Show navbar only when logged in */}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vote" element={token && role === "user" ? <Vote /> : <Navigate to="/login" />} />
        <Route path="/results" element={token && role === "user" ? <Results /> : <Navigate to="/login" />} />
        <Route path="/summary" element={token && role === "admin" ? <AdminSummary /> : <Navigate to="/login" />} />
        <Route path="/users" element={token && role === "admin" ? <AdminUser /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
