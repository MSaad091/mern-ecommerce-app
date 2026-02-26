import React, { useState } from "react";
import { createProduct } from "../api";
import '../Stylesheets/CreateProduct.css'

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("isActive", isActive);
      if (image) formData.append("image", image);

      await createProduct(formData);
      alert("Product created successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setIsActive(true);
      setImage(null);
    } catch (error) {
      console.log(error);
      alert("Error creating product");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="create-product-page">
      <div className="create-product-card">
        <h2>Create Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              Active Product
            </label>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
          </div>

          <button type="submit" className="submit-btn">
          {
            loading ? "Creating ..." : "  Create Product"
          }
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
