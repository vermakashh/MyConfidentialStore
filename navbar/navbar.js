function loadNavbar(placeholderId, navbarPath) {
  fetch(navbarPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch navbar: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(placeholderId).innerHTML = data;
      initializeNavbar(); // Reinitialize navbar JavaScript functionality
    })
    .catch(error => console.error("Error loading navbar:", error));
}

function initializeNavbar() {
  const searchIcon = document.querySelector(".search-icon");
  const searchBar = document.querySelector(".search-bar");

  if (searchIcon && searchBar) {
    searchIcon.addEventListener("click", () => {
      searchBar.classList.toggle("active");
      searchBar.focus();
    });
  } else {
    console.error("Navbar elements not found!");
  }
}