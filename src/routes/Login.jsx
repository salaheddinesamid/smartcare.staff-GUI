import axios from "axios";
import React, { useState } from "react";
import "../style/Login.css";
import logo from "../assets/logo.jpg";

export const Login = () => {
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log(loginRequest);
      // const response = await axios.post("/api/auth/login", loginRequest);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
          <h4>Welcome Back 👋</h4>
          <p>Please sign in to continue to SmartCare</p>
        </div>

        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="form-control"
              value={loginRequest.email}
              onChange={handleLoginChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={loginRequest.password}
              onChange={handleLoginChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="footer-text">
          <p>
            Forgot your password? <a href="#">Reset here</a>
          </p>
        </div>
      </div>
    </div>
  );
};
