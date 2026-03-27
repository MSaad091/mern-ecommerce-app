import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Stylesheets/Navbar.css";
import { logoutUSer } from "../api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  // ✅ Hide Navbar on Auth pages
  if (location.pathname === "/") {
    return null;
  }

  // 🔥 Logout Function
  const handleLogout = async () => {
    try {
      await logoutUSer();
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* LOGO */}
          <div className="nav-logo">
            <Link to="/">ShopMate</Link>
          </div>

          {/* LINKS */}
          <ul className="nav-links desktop">
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/order">Orders</Link></li>
            <li><Link to="/create-product">Create</Link></li>
            <li><Link to="/order-chart">Sales</Link></li>

            {/* ✅ FIXED LOGIC */}
            {token ? (
              <li className="nav-btn">
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-btn">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>

          {/* MOBILE BUTTON */}
          <button className="menu-btn" onClick={() => setOpen(true)}>
            <FaBars size={24} color="#38bdf8" />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <FaTimes />
        </button>

        <Link to="/dashboard" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
        <Link to="/order" onClick={() => setOpen(false)}>Orders</Link>
        <Link to="/create-product" onClick={() => setOpen(false)}>Create</Link>
        <Link to="/order-chart" onClick={() => setOpen(false)}>Sales</Link>

        {/* ✅ SAME FIX HERE */}
        {token ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-btn" onClick={() => setOpen(false)}>
            Login
          </Link>
        )}
      </aside>
    </>
  );
}

export default Navbar;