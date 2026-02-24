import React, { useEffect, useState } from "react";
import { AllProducts, DeleteProducts } from "../api";
import { useNavigate } from "react-router-dom";
import "../Stylesheets/AllProduct.css";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch all products
  const fetchProduct = async () => {
    try {
      const res = await AllProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 DELETE PRODUCT
  const deleteCard = async (id) => {
    try {
      await DeleteProducts(id);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  // 👉 UPDATE BUTTON CLICK
  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="admin-product-container">
      <h2 className="page-title">All Products (Admin)</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="product-image"
            />

            <div className="product-info">
              <h3>{item.title}</h3>
              <p className="category">Category: {item.category}</p>
              <p className="price">Rs {item.price}</p>
              <p className="stock">Stock: {item.stock}</p>
            </div>

            <div className="product-actions">
              <button
                className="update-btn"
                onClick={() => handleUpdate(item._id)}
              >
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteCard(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProduct;
