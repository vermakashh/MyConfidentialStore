import React, { useEffect, useRef, useState, useCallback } from 'react';
import './styles/ProductCarousel.css';

const products = [
  { id: 1, name: 'Product 1', price: '$100', img: '/images/p1.jpg', hoverImg: '/images/p11.jpg' },
  { id: 2, name: 'Product 2', price: '$200', img: '/images/p2.jpg', hoverImg: '/images/p22.jpg' },
  { id: 3, name: 'Product 3', price: '$300', img: '/images/p3.jpg', hoverImg: '/images/p33.jpg' },
  { id: 4, name: 'Product 4', price: '$400', img: '/images/p4.jpg', hoverImg: '/images/p44.jpg' },
  { id: 5, name: 'Product 5', price: '$500', img: '/images/p5.jpg', hoverImg: '/images/p55.jpg' },
  { id: 6, name: 'Product 6', price: '$100', img: '/images/p1.jpg', hoverImg: '/images/p11.jpg' },
  { id: 7, name: 'Product 7', price: '$200', img: '/images/p2.jpg', hoverImg: '/images/p22.jpg' },
  { id: 8, name: 'Product 8', price: '$300', img: '/images/p3.jpg', hoverImg: '/images/p33.jpg' },
  { id: 9, name: 'Product 9', price: '$400', img: '/images/p4.jpg', hoverImg: '/images/p44.jpg' },
  { id: 10, name: 'Product 10', price: '$500', img: '/images/p5.jpg', hoverImg: '/images/p55.jpg' },
];

const ProductCarousel = () => {
  const wrapperRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 5;

  const updateCarousel = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const itemWidth = wrapper.querySelector('.product-card')?.offsetWidth || 0;
      wrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    updateCarousel();
  }, [updateCarousel]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < products.length - visibleItems ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : products.length - visibleItems
    );
  };

  return (
    <div className="carousel-section">
      <h2 className="text-center mb-4">NEW ARRIVALS</h2>
      <div className="carousel-container">
        <button className="carousel-btn left" onClick={handlePrev}>
          &lt;
        </button>

        <div className="carousel-wrapper" ref={wrapperRef}>
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.img}
                alt={product.name}
                onMouseOver={(e) => (e.currentTarget.src = product.hoverImg)}
                onMouseOut={(e) => (e.currentTarget.src = product.img)}
              />
              <h5>{product.name}</h5>
              <p>{product.price}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn right" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
