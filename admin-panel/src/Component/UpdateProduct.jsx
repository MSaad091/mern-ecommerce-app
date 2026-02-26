import React, { useState } from "react";
import { ProductUpdate } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import '../Stylesheets/UpdateProduct.css'

function UpdateProduct() {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false)

  const updateProduct = async (e) => {
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
      if (image) {
        formData.append("image", image);
      }

       
      const res = await ProductUpdate(id, formData);

      await new Promise((resolve) => setTimeout(resolve,1000))
      
      console.log(res.data.data);

      await new Promise((resolve) => setTimeout(resolve,3000))

      alert("Product Updated Successfully ✅");
      navigate("/products"); // admin list page
    } catch (error) {
      console.log(error);
      alert("Update failed ❌");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>

      <form onSubmit={updateProduct} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button type="submit">{

          loading ? "Updating...." : "Update Product"
}</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
