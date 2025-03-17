const video = document.getElementById("scrollVideo");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY; // How far the user has scrolled
  const videoHeight = document.querySelector(".video-container").offsetHeight;

  // Factor to reduce the speed of the animation (higher = slower)
  const speedFactor = 1; // Adjust this value to control the speed

  // Scale the scroll percentage by the speed factor
  const scrollPercent = Math.min((scrollTop / videoHeight) * speedFactor, 1);

  // Control video playback based on adjusted scroll percentage
  if (video.readyState >= 3) {
    video.currentTime = video.duration * scrollPercent;
  }
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from(".hero", { duration: 1, opacity: 0, y: -50 });

// Navbar Animation
gsap.from(".navbar", { duration: 1, opacity: 0, y: -20, delay: 0.5 });

gsap.from(".product-card", {
  scrollTrigger: {
      trigger: "#products", // Section to trigger animation
      start: "top 80%", // Start when the section is 80% into the viewport
      toggleActions: "play none none none", // Play animation only once
  },
  duration: 1.2, // Animation duration in seconds
  opacity: 0, // Start with full transparency
  y: 50, // Move up 50px from the initial position
  ease: "power2.out", // Smooth easing effect
  stagger: 0.2, // Add a delay between each product card animation
});


document.querySelectorAll('.product-item').forEach((item) => {
  const images = item.getAttribute('data-images') ? item.getAttribute('data-images').split(',') : [];
  let currentImageIndex = 0;
  const productImage = item.querySelector('.product-image');
  let imageSwitchInterval;

  function switchImage() {
      if (images.length > 1) {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          productImage.src = images[currentImageIndex];
      }
  }

  item.addEventListener('mouseenter', () => {
      if (images.length > 1) {
          clearInterval(imageSwitchInterval);
          imageSwitchInterval = setInterval(switchImage, 1000);
      }
  });

  item.addEventListener('mouseleave', () => {
      clearInterval(imageSwitchInterval);
      currentImageIndex = 0;
      productImage.src = images[0];
  });
});

function addToFavorites(event) {
  event.stopPropagation(); // Prevent click on heart icon from propagating
  const heartIcon = event.target;
  heartIcon.innerText = heartIcon.innerText === "favorite_border" ? "favorite" : "favorite_border";
}
