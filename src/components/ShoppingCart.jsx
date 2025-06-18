import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import "./styles/ShoppingCart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const SHIPPING_COST = 5.0;
  const TAX_RATE = 0.1;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const sanitizedCart = storedCart.map((item) => ({
      ...item,
      quantity: parseInt(item.quantity) || 1,
      price: parseFloat(item.price),
    }));
    setCart(sanitizedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  return (
    <div>
      <Navbar />

      <div className="cart-container">
        <div className="cart-items">
          <h1 className="cart-title">Shopping Bag</h1>
          {cart.length === 0 ? (
            <p className="cart-empty">No items added</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="cart-item-quantity">
                    Quantity:
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  &times;
                </span>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="order-summary">
            <h2 className="order-summary-title">Order Summary</h2>
            <div className="summary-row">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="summary-row">
              <p>Shipping</p>
              <p>${SHIPPING_COST.toFixed(2)}</p>
            </div>
            <div className="summary-row">
              <p>Tax (10%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <hr />
            <div className="summary-row summary-total">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <a href="/billing" className="checkout-button">
              Checkout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
