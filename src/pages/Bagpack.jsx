import React, { useEffect, useState, useRef } from "react";
import "./Bagpack.css"; 
import "material-icons/iconfont/material-icons.css";

const bagpackProducts = [
  {
    id: "1",
    title: "Suede Buckley Backpack",
    price: 1790,
    images: ["/images/7.1.png", "/images/7.2.png", "/images/7.3.png"],
    link: "#",
  },
  {
    id: "2",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/2.1.png", "/images/2.2.png", "/images/2.3.png"],
    link: "#",
  },
  {
    id: "3",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/3.1.png", "/images/3.2.png", "/images/3.3.png"],
    link: "#",
  },
  {
    id: "4",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/4.1.png", "/images/4.2.png", "/images/4.1.png"],
    link: "#",
  },
  {
    id: "5",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/5.1.png", "/images/5.2.png", "/images/5.1.png"],
    link: "#",
  },
  {
    id: "6",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/6.1.png", "/images/6.2.png", "/images/6.3.png"],
    link: "#",
  },
  {
    id: "7",
    title: "Grain Leather Buckley Backpack",
    price: 1350,
    images: ["/images/1.1.png", "/images/1.2.png", "/images/1.3.png"],
    link: "#",
  },
];

const Bagpack = () => {
  const [favorites, setFavorites] = useState({});
  const [hoveredImageIndexes, setHoveredImageIndexes] = useState({});
  const intervalsRef = useRef({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMouseEnter = (id, images) => {
    let index = 0;
    intervalsRef.current[id] = setInterval(() => {
      index = (index + 1) % images.length;
      setHoveredImageIndexes((prev) => ({
        ...prev,
        [id]: index,
      }));
    }, 1000);
  };

  const handleMouseLeave = (id) => {
    clearInterval(intervalsRef.current[id]);
    setHoveredImageIndexes((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  return (
    <div>
      <header>
        <h1>BAGPACKS</h1>
      </header>

      <div className="product-grid">
        {bagpackProducts.map((product) => (
          <a
            href={product.link}
            key={product.id}
            className="product-item"
            onMouseEnter={() => handleMouseEnter(product.id, product.images)}
            onMouseLeave={() => handleMouseLeave(product.id)}
          >
            <div className="image-container">
              <img
                className="product-image"
                src={product.images[hoveredImageIndexes[product.id] || 0]}
                alt={product.title}
              />
              <div
                className="heart-icon"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
              >
                <span className="material-icons">
                  {favorites[product.id] ? "favorite" : "favorite_border"}
                </span>
              </div>
            </div>
            <h3>{product.title}</h3>
            <p>${product.price.toLocaleString()}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Bagpack;
