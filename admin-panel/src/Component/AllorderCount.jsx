import React, { useEffect, useState } from "react";
import { allOrdercount } from "../api";
import "../Stylesheets/DashBoard.css";

function AllorderCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchcountorders = async () => {
      try {
        const request = await allOrdercount();
        setCount(request.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchcountorders();
  }, []);

  return (
    <div className="stat-card">
      <p className="stat-title">Total Orders</p>
      <h1 className="stat-value">{count}</h1>
      <span className="stat-sub">All time orders</span>
    </div>
  );
}

export default AllorderCount;
