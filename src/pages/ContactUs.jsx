import React, { useState } from "react";
import "./ContactUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "order-info",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, comment } = formData;

    // Basic Validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !comment.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert(
        `Thank you, ${firstName} ${lastName}! Your message on "${formData.topic}" has been sent.`
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        topic: "order-info",
        comment: "",
      });

      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      {/* Banner Image */}
      <div className="banner">
        <img src="/images/contactus.png" alt="Banner" />
      </div>

      {/* Main Section */}
      <div className="main-content">
        {/* Left Text Section */}
        <div className="text-section">
          <h1>Contact Us</h1>
          <p>
            Have a question or need assistance? We're here to help. Feel free
            to reach out to us using the form on the right, and we'll get back
            to you shortly.
          </p>
        </div>

        {/* Right Contact Form */}
        <div className="contact-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-header">
              <span className="required-text">*REQUIRED</span>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">FIRST NAME *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">LAST NAME *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">EMAIL *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="topic">YOUR TOPIC</label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
              >
                <option value="order-info">ORDER INFORMATION</option>
                <option value="customer-support">CUSTOMER SUPPORT</option>
                <option value="general-inquiry">GENERAL INQUIRY</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comment">YOUR COMMENT *</label>
              <textarea
                id="comment"
                name="comment"
                rows="5"
                value={formData.comment}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-submit">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
