import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../Stylesheets/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()

  const handlenavigate = () => {
    navigate("/products")
  }
  return (
    <div className="home-hero">
      <div className="hero-overlay">
        <h1>
          Shop Smarter with <span>MyEcom</span>
        </h1>
        <p>
          Premium products, best prices, fast delivery — everything you need in
          one trusted store.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn" onClick={() => handlenavigate()}>
            <FaShoppingCart /> Shop Now
          </button>
          <button className="explore-btn">Explore Products</button>
        </div>
      </div>

      {/* Floating cards */}
      
    </div>
  );
}

export default Home;
