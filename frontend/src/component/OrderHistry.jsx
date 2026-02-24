import React, { useEffect, useState } from "react";
import { OrderHistory } from "../Api";
import "../Stylesheets/OrderHistory.css";

function OrderHistry() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await OrderHistory();
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
        alert("Login required to view order history!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading)
    return <h2 className="center-text">Loading Order History...</h2>;

  if (!orders || orders.length === 0)
    return <h2 className="center-text">No orders found</h2>;

  return (
    <div className="order-container">
      <h2 className="order-title">Your Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          
          {/* Header */}
          <div className="order-header">
            <span className="order-id">Order ID: {order._id}</span>
            <span className="order-total">
              Total: Rs {order.totalAmount}
            </span>
          </div>

          {/* Status */}
          <p className="order-status">
            Status:
            <span
              className={
                order.status === "delivered" ? "delivered" : "pending"
              }
            >
              {order.status}
            </span>
          </p>

          {/* Products */}
          {order.products.map((item, index) => (
            <div key={index} className="order-item">
              <p>
                <strong>Product:</strong>{" "}
                {item.productId?.title || "Deleted Product"}
              </p>
              <p>
                <strong>Price:</strong> Rs {item.price}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderHistry;
