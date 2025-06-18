// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Bagpack from './pages/Bagpack';
import ContactUs from './pages/ContactUs';
import Favorites from './pages/Favorites';
import ShoppingCart from './components/ShoppingCart'; // assuming it's inside /components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles.css';
import './components/styles/navbar.css';

// Optional: Not Found Page
const NotFound = () => (
  <h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bagpack" element={<Bagpack />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/favourite" element={<Favorites />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
