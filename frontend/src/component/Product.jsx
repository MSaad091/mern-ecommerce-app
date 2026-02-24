// import React, { useEffect, useState } from "react";
// import { AddToCart, GetAllProduct, GetProduct } from "../Api";
// import SingleProduct from "./SingleProduct";
// import "../Stylesheets/Product.css";
// import { useNavigate } from "react-router-dom";

// function Product() {
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await GetAllProduct();
//         console.log("API RESPONSE:", res.data);

//         // ✅ safe access
//         setProducts(res.data.data || []);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);


//   const opendetail = async (id) => {
//   try {
//     const request = await GetProduct(id);
//     console.log("Single Product:", request.data);
//     navigate(`/product/${id}`); // Navigate to detail page
//   } catch (error) {
//     console.log(error);
//   }
// };


//   if (loading) {
//     return <h2 className="loading">Loading Products...</h2>;
//   }

//   if (products.length === 0) {
//     return <h2 className="loading">No Products Found</h2>;
//   }


//   return (
//     <div className="product-container">
//       {products.map((item) => (
//         <SingleProduct
//           key={item._id}
//           product={item}
//           onAddToCart={opendetail}
//         />
//       ))}
//     </div>
//   );
// }

// export default Product;

import React, { useEffect, useState } from "react";
import { GetAllProduct, GetProduct } from "../Api";
import SingleProduct from "./SingleProduct";
import "../Stylesheets/Product.css";
import { useNavigate } from "react-router-dom";

function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProduct();
        const data = res.data.data || [];
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 SEARCH + CATEGORY FILTER
  useEffect(() => {
    let updated = products;

    if (activeCategory !== "all") {
      updated = updated.filter(
        (item) =>
          item.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      updated = updated.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(updated);
  }, [search, activeCategory, products]);

  const opendetail = async (id) => {
    try {
      await GetProduct(id);
      navigate(`/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  if (filteredProducts.length === 0) {
    return <h2 className="loading">No Products Found</h2>;
  }

  return (
    <>
      {/* 🔍 SEARCH BAR */}
      <div className="product-filter-bar">
        <input
          type="text"
          placeholder="Search products or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">
          <button
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          <button
            className={activeCategory === "electronics" ? "active" : ""}
            onClick={() => setActiveCategory("Electronic")}
          >
            Electronics
          </button>
          <button
            className={activeCategory === "cosmetics" ? "active" : ""}
            onClick={() => setActiveCategory("cosmetics")}
          >
            Cosmetics
          </button>
          <button
            className={activeCategory === "footwear" ? "active" : ""}
            onClick={() => setActiveCategory("footwear")}
          >
            Footwear
          </button>
        </div>
      </div>

      {/* 🛒 PRODUCTS */}
      <div className="product-container">
        {filteredProducts.map((item) => (
          <SingleProduct
            key={item._id}
            product={item}
            onAddToCart={opendetail}
          />
        ))}
      </div>
    </>
  );
}

export default Product;
