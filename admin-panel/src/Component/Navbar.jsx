import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import '../Stylesheets/Navbar.css'
import { logoutUSer } from "../api";

function Navbar() {
  const [open, setOpen] = useState(false);
  
const handleLogout = async() => {
  try {
    const res = await logoutUSer()
    console.log(res.data);
    
  } catch (error) {
    console.log(error);
    
  }
}
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
            <li className="nav-btn"><Link to="/">Login</Link></li>
            <li className="nav-btn"><Link to="/" onClick={handleLogout}>LogOut</Link></li>
          </ul>

          {/* MENU BUTTON FOR MOBILE */}
          <button className="menu-btn" onClick={() => setOpen(true)}>
            <FaBars size={24} color="#38bdf8"/>
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
        <Link to="/" className="nav-btn" onClick={() => setOpen(false)}>Login</Link>
      </aside>
    </>
  );
}

export default Navbar;
