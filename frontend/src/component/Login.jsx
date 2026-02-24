import React, { useState } from "react";
import { LoginUser } from "../Api";
import { useNavigate, Link } from "react-router-dom";
import "../Stylesheets/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const request = await LoginUser({ email, password });
      const response = request.data;

      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="main">
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="sub-text">Login to continue shopping</p>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          {/* Register option */}
          <p className="register-text">
            Don’t have an account?
            <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
