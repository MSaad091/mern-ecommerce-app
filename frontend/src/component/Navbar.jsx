import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import "../Stylesheets/Navbar.css";
import { LoGOutUser } from "../Api";


function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  //   setOpen(false);
  // };
  // const handleLogout = async() => {
  //   try {
  //     const res = await LoGOutUser()
  //     console.log(res.data);
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  const handleLogout = async () => {
  try {
    const res = await LoGOutUser();
    console.log(res.data);
    localStorage.removeItem("token");
    navigate("/login");
  } catch (err) {
    console.log(err);
    alert("Logout failed!");
  }
};
 

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <FaShoppingBag className="logo-icon" />
          <Link to="/" className="logo-text">ShopMate</Link>
        </div>

        {/* Hamburger Button */}
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <FaBars />
        </button>

        {/* Desktop Menu */}
        <ul className="nav-links desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart 🛒</Link></li>
          <li><Link to="/history">Orders</Link></li>
          {token ? (
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <FaTimes />
        </button>

        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
        <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        <Link to="/history" onClick={() => setOpen(false)}>Orders</Link>

        {token ? (
          <button className="logout-btn full" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        )}
      </aside>
    </>
  );
}

export default Navbar;
