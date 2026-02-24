import React from "react";
import "../Stylesheets/CategortFilter.css";

function CategoryFilter({ activeCategory, setActiveCategory }) {
  const categories = ["all", "electronics", "cosmetics", "footwear"];

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={activeCategory === cat ? "active" : ""}
          onClick={() => setActiveCategory(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
