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
