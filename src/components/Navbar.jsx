// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import './styles/navbar.css';
import 'material-icons/iconfont/material-icons.css';

const Navbar = () => {
  useEffect(() => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');

    if (searchIcon && searchBar) {
      const toggleSearch = () => {
        searchBar.classList.toggle('active');
        searchBar.focus();
      };
      searchIcon.addEventListener('click', toggleSearch);
      return () => searchIcon.removeEventListener('click', toggleSearch);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">CONFIDENTIAL</a>
        <ul className="nav-links">
          <li><a href="#">NEW</a></li>
          <li><a href="#">MEN</a></li>
          <li><a href="#">WOMEN</a></li>
          <li><a href="/bagpack">BAGPACK</a></li>
          <li><a href="#">FOOTWEAR</a></li>
          <li><a href="/contact">CONTACT US</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <span className="material-icons search-icon">search</span>
          <input type="text" className="search-bar" placeholder="SEARCH" />
        </div>
        <a href="/profile" className="nav-item"><span className="material-icons">person</span></a>
        <a href="/favourite" className="nav-item"><span className="material-icons">favorite_border</span></a>
        <a href="/cart" className="nav-item"><span className="material-icons">shopping_bag</span></a>
      </div>
    </nav>
  );
};

export default Navbar;
