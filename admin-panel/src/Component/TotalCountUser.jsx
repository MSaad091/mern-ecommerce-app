import React, { useEffect, useState } from "react";
import { Totaluser } from "../api";
import "../Stylesheets/DashBoard.css";

function TotalCountUser() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleTotaluser = async () => {
      try {
        const request = await Totaluser();
        setTotal(request.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    handleTotaluser();
  }, []);

  return (
    <div className="stat-cardd">
      <p className="stat-title">Total Users</p>
      <h1 className="stat-value">{total}</h1>
       <span className="stat-sub">All Users</span>
    </div>
  );
}

export default TotalCountUser;
