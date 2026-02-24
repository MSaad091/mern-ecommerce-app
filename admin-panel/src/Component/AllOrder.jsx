import React, { useEffect, useState } from "react";
import { allOrder, OrderStatus } from "../api";
import "../Stylesheets/Allorder.css";

function AllOrder() {
  const [orders, setOrders] = useState([]);

  // 🔹 Fetch all orders
  const fetchOrder = async () => {
    try {
      const res = await allOrder();
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Update order status
  const orderstatus = async (orderId) => {
    try {
      await OrderStatus(orderId);
      alert("Order marked as Delivered");
      fetchOrder(); // ✅ refresh list
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="admin-order-container">
      {/* <h2 className="page-title">All Orders (Admin)</h2> */}

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <span>
              <b>Order ID:</b> {order._id}
            </span>

            <span className={`status ${order.status}`}>
              {order.status.toUpperCase()}
            </span>
          </div>

          <p>
            <b>Total Amount:</b> Rs {order.totalAmount}
          </p>

          <p>
            <b>Order Date:</b>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* PRODUCTS */}
          <div className="order-products">
            <h4>Products</h4>

            {order.products.map((item, index) => (
              <div className="order-product" key={index}>
                <span>
                  {item.productId?.title || "Product"}
                </span>
                <span>Qty: {item.quantity}</span>
                <span>Rs {item.price}</span>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="order-actions">
           {order.status === "pending" && (
  <button
    className="approve-btn"
    onClick={() => orderstatus(order._id)}
  >
    Mark as Delivered
  </button>
)}

          </div>
        </div>
      ))}
    </div>
  );
}

export default AllOrder;
