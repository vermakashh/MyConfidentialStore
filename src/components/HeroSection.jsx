import React from 'react';
import './styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Timeless Elegance, Redefined</h1>
        <p>
          Discover our exclusive collection of luxury bags designed for
          sophistication and style.
        </p>
        <a href="#products" className="btn btn-light">
          Explore Collection
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
