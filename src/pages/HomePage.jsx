import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProductCarousel from '../components/ProductCarousel';
import ProductGrid from '../components/ProductGrid';
import ImagePair from '../components/ImagePair';
import FooterBanner from '../components/FooterBanner';
import AuthModal from '../components/AuthModal';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const videoContainer = document.querySelector('.video-container');
      const video = videoRef.current;

      if (!video || !videoContainer) return;

      const videoHeight = videoContainer.offsetHeight;
      const scrollPercent = Math.min(scrollTop / videoHeight, 1);

      if (video.readyState >= 3 && !isNaN(video.duration)) {
        video.currentTime = video.duration * scrollPercent;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Animations
    gsap.from('.hero', { duration: 1, opacity: 0, y: -50 });
    gsap.fromTo(
      '.navbar',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll-Controlled Video Section */}
      <div className="video-container">
        <div className="company-heading">Confidential</div>
        <video id="scrollVideo" muted ref={videoRef} playsInline>
          <source src="/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Timeless Elegance, Redefined</h1>
          <p>
            Discover our exclusive collection of luxury bags designed for sophistication and style.
          </p>
          <a href="#products" className="btn btn-light">
            Explore Collection
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container text-center">
          <h2>About Us</h2>
          <p className="lead">
            Luxury Bags is dedicated to crafting timeless and elegant pieces that embody
            sophistication and class. Each bag is a testament to unparalleled craftsmanship and
            premium quality materials.
          </p>
        </div>
      </section>

      <ProductCarousel />
      <ProductGrid />
      <ImagePair />
      <FooterBanner />
      <AuthModal />
    </>
  );
};

export default HomePage;
