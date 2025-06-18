import React from 'react';
import { Link } from 'react-router-dom';
import './styles/FooterBanner.css';

const FooterBanner = () => {
  return (
    <div className="footer-banner">
      <img src="/images/Footer-Banner.jpg" alt="Footer Banner" />
      <div className="footer-banner-content">
        <h1 className="footer-heading">GENZ COLLECTION</h1>
        <Link to="/bagpack" className="footer-button">SHOP NOW</Link>
      </div>
    </div>
  );
};

export default FooterBanner;
