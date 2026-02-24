import React, { useState } from "react";
import { Registeruser } from "../Api";
import { useNavigate, Link } from "react-router-dom";
import "../Stylesheets/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !fullname || !email || !password || !contact || !address) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await Registeruser({
        username,
        fullname,
        email,
        password,
        contact,
        address,
      });

      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">Register to start shopping</p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Full Name</label>
          <input value={fullname} onChange={(e) => setFullname(e.target.value)} />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Contact</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} />

          <label>Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />

          <button type="submit">Register</button>
        </form>

        <p className="switch-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
