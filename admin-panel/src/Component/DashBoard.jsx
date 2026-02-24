import React from "react";
import TotalCountUser from "./TotalCountUser";
import UserCard from "./UserCard";
import Navbar from "./Navbar";
import "../Stylesheets/DashBoard.css";
import AllorderCount from "./AllorderCount";


function DashBoard() {
  return (
    <>
      {/* <Navbar /> */}

      <div className="dashboard-container">
        <div className="stats-row">
          <AllorderCount/>
          <TotalCountUser />
        </div>

        <UserCard />
      </div>
    </>
  );
}

export default DashBoard;
