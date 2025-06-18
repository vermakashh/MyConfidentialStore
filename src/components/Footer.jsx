import React from 'react';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Customer Service */}
        <div className="footer-section">
          <h3>CUSTOMER SERVICE</h3>
          <ul>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Track Your Order</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Store Locator</a></li>
            <li><a href="/" onClick={(e) => e.preventDefault()}>FAQ</a></li>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Made to Measure */}
        <div className="footer-section">
          <h3>MADE TO MEASURE</h3>
          <ul>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Style Consultants</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h3>THE COMPANY</h3>
          <ul>
            <li><a href="/" onClick={(e) => e.preventDefault()}>News</a></li>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
            <li><a href="/" onClick={(e) => e.preventDefault()}>Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section subscribe">
          <h3>ENTER EMAIL ADDRESS</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Copyright © 2024 Confidential. All rights reserved.</p>
        <div className="footer-links">
          <a href="/" onClick={(e) => e.preventDefault()}>SITE MAP</a> |{" "}
          <a href="/" onClick={(e) => e.preventDefault()}>PRIVACY POLICY</a> |{" "}
          <a href="/" onClick={(e) => e.preventDefault()}>TERMS & CONDITIONS</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
