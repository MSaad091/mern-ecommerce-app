import React, { useEffect, useState } from "react";
import { DeletUser, Users } from "../api";
import "../Stylesheets/DashBoard.css";

function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const UserDetailes = async () => {
      try {
        const request = await Users();
        setUsers(request.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    UserDetailes();
  }, []);

  const UserDelete = async (id) => {
    try {
      const res = await DeletUser(id);
      if (res.data.success) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="table-card">
        <h2>All Users</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.role}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => UserDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mobile-user-list">
        {users.map((user, index) => (
          <div className="mobile-user-card" key={user._id}>
            <div><b>#</b> {index + 1}</div>
            <div><b>Username:</b> {user.username}</div>
            <div><b>Name:</b> {user.fullname}</div>
            <div><b>Email:</b> {user.email}</div>
            <div><b>Contact:</b> {user.contact}</div>
            <div><b>Role:</b> {user.role}</div>
            <div><b>Address:</b> {user.address}</div>

            <button
              className="delete-btn"
              onClick={() => UserDelete(user._id)}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserCard;
