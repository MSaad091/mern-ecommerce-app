import React from "react";
import "../Stylesheets/Product.css";

function SingleProduct({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="product-image"
      />

      <h3 className="product-title">{product.title}</h3>
      <p className="product-desc">{product.description}</p>

      <div className="product-info">
        {/* <span>Rs {product.price}</span> */}
        {/* <span>Stock: {product.stock}</span> */}
      </div>

     <button className="add-btn" onClick={() => onAddToCart(product._id)}>
  View Details
</button>

    </div>
  );
}

export default SingleProduct;
