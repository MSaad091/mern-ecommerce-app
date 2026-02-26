import React, { useState } from "react";
import { AdminLogin } from "../api";
import { useNavigate } from "react-router-dom";
import "../Stylesheets/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const request = await AdminLogin({ email, password });
      await new Promise((resolve) => setTimeout(resolve,1000))
      const response = request.data;


      if (response.success) {
        navigate("/dashboard");
        localStorage.setItem("token")
        
        
      }
    } catch (error) {
      console.log(error);
    } finally{
setLoading(false)
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p className="login-subtitle">Login to your dashboard</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {
              loading ? "Logging..." : "Login"
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
