import React from 'react';
import './styles/ProductGrid.css';

const products = [
  {
    id: 1,
    name: 'Suede Buckley Backpack',
    price: '$1,790',
    images: ['/images/7.1.png', '/images/7.2.png', '/images/7.3.png'],
  },
  {
    id: 2,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/2.1.png', '/images/2.2.png', '/images/2.3.png'],
  },
  {
    id: 3,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/3.1.png', '/images/3.2.png', '/images/3.3.png'],
  },
  {
    id: 4,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/4.1.png', '/images/4.2.png', '/images/4.1.png'],
  },
  {
    id: 5,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/5.1.png', '/images/5.2.png', '/images/5.1.png'],
  },
  {
    id: 6,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/6.1.png', '/images/6.2.png', '/images/6.3.png'],
  },
  {
    id: 7,
    name: 'Grain Leather Buckley Backpack',
    price: '$1,350',
    images: ['/images/1.1.png', '/images/1.2.png', '/images/1.3.png'],
  },
];

const ProductGrid = () => {
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    alert('Added to favorites');
  };

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="text-center mb-4">OUR COLLECTION</h2>
        <div className="product-grid">
          {products.map((product) => (
            <button className="product-item" key={product.id}>
              <div className="image-container">
                <img
                  className="product-image"
                  src={product.images[0]}
                  alt={product.name}
                />
                <div className="heart-icon" onClick={handleAddToFavorites}>
                  <span className="material-icons">favorite_border</span>
                </div>
              </div>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
