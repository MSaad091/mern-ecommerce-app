import React, { useEffect, useState } from "react";
import { Cart, CheckOut, RemoveCart } from "../Api";
import "../Stylesheets/Cart.css";

function Carts() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetchCart now accessible everywhere inside this component
  const fetchCart = async () => {
    try {
      const request = await Cart(); // backend API call
      const response = request.data.data;
      console.log("Cart Response:", response);
      setCart(response);
    } catch (error) {
      console.log(error);
      alert("Login required to view cart!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const RemoveFromCart = async (productId) => {
    try {
      const request = await RemoveCart({ productId });
      console.log(request.data.data);
      fetchCart(); // now works!
    } catch (error) {
      console.log(error);
      alert("Error removing product");
    }
  };
const handleCheckout = async () => {
  try {
    const response = await CheckOut(); // no data needed
    console.log(response.data);
    alert("Order placed successfully!");
    fetchCart(); // optional: refresh cart to show empty
  } catch (error) {
    console.log(error);
    alert("Checkout failed!");
  }
};


  if (loading)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Cart...</h2>;
  if (!cart || cart.products.length === 0)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No items in cart</h2>;

  const totalPrice = cart.products.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.products.map((item) => (
        <div key={item._id} className="cart-item">
          <img
            src={item.productId.images?.[0]}
            alt={item.productId.title}
            className="cart-image"
          />
          <div className="cart-info">
            <h3>{item.productId.title}</h3>
            <p>Price: Rs {item.productId.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: Rs {item.productId.price * item.quantity}</p>
            <button className="remove-btn" onClick={() => RemoveFromCart(item.productId._id)}>
              Remove
            </button>
         
          </div>
        </div>
      ))}
      <h3 className="cart-total">Total: Rs {totalPrice}</h3>
         <button  onClick={handleCheckout}>Check Out</button>
    </div>
  );
}

export default Carts;
