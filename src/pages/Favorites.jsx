import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <div className="favorites-info">
        <h2>Don’t lose your favorites anymore</h2>
        <p>Sign In or Create an account to save your selection</p>
        <div className="buttons">
          <a href="/login" className="sign-in-link">
            <button className="sign-in-button">Sign In</button>
          </a>
        </div>
      </div>

      <div className="product-grid">
        {favorites.length === 0 ? (
          <p className="no-favorites">No items in your favorites yet!</p>
        ) : (
          favorites.map((product, index) => (
            <div className="product-item" key={index}>
              <div className="image-container">
                <img
                  className="product-image"
                  src={product.image || "/images/default.jpg"}
                  alt={product.name || "Favorite Product"}
                />
              </div>
              <h3>{product.name || "Unnamed Product"}</h3>
              <p>{product.price ? `$${product.price}` : "Price not available"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
