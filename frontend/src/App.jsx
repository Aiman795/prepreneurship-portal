import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ApplicationForm from "./components/ApplicationForm.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  function handleLogin(newToken) {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    setToken("");
  }

  return (
    <div className="page">
      <header className="topbar">
        <span className="brand">Prepreneurship</span>
        <nav>
          <Link to="/">Apply</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route
            path="/admin"
            element={
              token ? (
                <AdminDashboard token={token} onLogout={handleLogout} />
              ) : (
                <AdminLogin onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}
