import React, { useEffect, useState } from "react";
import "./CheckoutPage.css"; 

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    phone: "",
  });
  const [states, setStates] = useState([]);

  const usStates = {
    AL: "Alabama", CA: "California", TX: "Texas", NY: "New York", LA: "Louisiana"
    // ... Add more as needed
  };

  const canadaProvinces = {
    ON: "Ontario", QC: "Quebec", BC: "British Columbia", AB: "Alberta"
    // ... Add more as needed
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    storedCart.forEach(item => total += item.price * item.quantity);
    setCartItems(storedCart);
    setSubtotal(total);
  }, []);

  useEffect(() => {
    if (form.country === "US") setStates(usStates);
    else if (form.country === "CA") setStates(canadaProvinces);
    else setStates({});
  }, [form.country]);

  const handleInput = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.state) {
      alert("Please select a state/province.");
      return;
    }

    if (subtotal <= 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const orderData = {
      customer: form,
      items: cartItems,
      subtotal,
      shipping: 0,
      tax: 0,
      total: subtotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.removeItem("cart");
        alert(`Order placed! Order number: ${result.orderNumber}`);
        window.location.href = "/";
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order: " + err.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>CHECKOUT</h1>
      </header>
      <main>
        <div className="checkout-container">
          {/* Left */}
          <div className="checkout-form">
            <section className="customer-section">
              <h2>CUSTOMER</h2>
              <div className="customer-info">
                <p>CUSTOMER INFORMATION:</p>
                <p className="email">{form.email || "Guest"}</p>
              </div>
            </section>

            <section className="shipping-section">
              <h2>SHIPPING</h2>
              <form onSubmit={handleSubmit}>
                <div className="name-group">
                  <div className="form-group">
                    <label>FIRST NAME *</label>
                    <input name="firstName" value={form.firstName} onChange={handleInput} required />
                  </div>
                  <div className="form-group">
                    <label>LAST NAME *</label>
                    <input name="lastName" value={form.lastName} onChange={handleInput} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>ADDRESS 1 *</label>
                  <input name="address1" value={form.address1} onChange={handleInput} required />
                </div>

                <div className="form-group">
                  <label>ADDRESS 2</label>
                  <input name="address2" value={form.address2} onChange={handleInput} />
                </div>

                <div className="location-group">
                  <div className="form-group">
                    <label>COUNTRY *</label>
                    <select name="country" value={form.country} onChange={handleInput} required>
                      <option value="">SELECT</option>
                      <option value="US">UNITED STATES</option>
                      <option value="CA">CANADA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>STATE *</label>
                    <select name="state" value={form.state} onChange={handleInput} required>
                      <option value="">SELECT</option>
                      {Object.entries(states).map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="location-group">
                  <div className="form-group">
                    <label>CITY *</label>
                    <input name="city" value={form.city} onChange={handleInput} required />
                  </div>
                  <div className="form-group">
                    <label>ZIP CODE *</label>
                    <input name="zipCode" value={form.zipCode} onChange={handleInput} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>PHONE NUMBER *</label>
                  <input name="phone" value={form.phone} onChange={handleInput} required />
                </div>

                <button type="submit" className="submit-button">PLACE ORDER</button>
              </form>
            </section>
          </div>

          {/* Right */}
          <div className="order-summary">
            <h2>ORDER SUMMARY</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>SUBTOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>SHIPPING</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row">
                <span>TAX</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total">
                <span>TOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <div className="item-title">{item.title}</div>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    <div className="item-quantity">Quantity: {item.quantity}</div>
                    <div className="item-total">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
