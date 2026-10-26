// Product data
const products = [
  { id: "breads", name: "Breads", price: "$5–$12" },
  { id: "pastries", name: "Pastries & Sweet Goods", price: "$2–$6" },
  { id: "cakes", name: "Cakes & Specialty Items", price: "Starting at $25" }
];

// Load favorites from localStorage
function loadFavorites() {
  const stored = localStorage.getItem("bakeryFavorites");
  return stored ? JSON.parse(stored) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

// Update the favorites list on the page
function displayFavorites() {
  const favorites = loadFavorites();
  const list = document.getElementById("favorites-list");
  const noFavMsg = document.getElementById("no-favorites");

  list.innerHTML = "";

  if (favorites.length === 0) {
    noFavMsg.style.display = "block";
    return;
  }

  noFavMsg.style.display = "none";

  favorites.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      const li = document.createElement("li");
      li.textContent = `${product.name} (${product.price})`;
      list.appendChild(li);
    }
  });
}

// Toggle favorite status
function toggleFavorite(productId) {
  let favorites = loadFavorites();

  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }

  saveFavorites(favorites);
  displayFavorites();
  updateButtons();
}

// Update button text based on current favorites
function updateButtons() {
  const favorites = loadFavorites();
  document.querySelectorAll(".fav-btn").forEach(btn => {
    const id = btn.dataset.id;
    btn.textContent = favorites.includes(id) ? "Remove from Favorites" : "Add to Favorites";
  });
}

// Set up event listeners
function initFavorites() {
  displayFavorites();
  updateButtons();

  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleFavorite(btn.dataset.id);
    });
  });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", initFavorites);
