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

//Form validation
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const details = document.getElementById("details");
  let isValid = true;

  // Clear old messages
  document.querySelectorAll(".error").forEach(el => el.remove());

  // Required + min length for name
  if (name.value.trim().length < 2) {
    showError(name, "Name must be at least 2 characters.");
    isValid = false;
  }

  // Email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  // Required + min length for details
  if (details.value.trim().length < 10) {
    showError(details, "Please provide at least 10 characters of item details.");
    isValid = false;
  }

  if (isValid) {
    // Optional: save name to localStorage
    localStorage.setItem("bakeryUserName", name.value.trim());
    alert("Thank you! Your request has been received.");
    event.target.reset();
  }
}

function showError(input, message) {
  const error = document.createElement("span");
  error.className = "error";
  error.style.color = "#6B3E26";
  error.style.fontSize = "0.9rem";
  error.style.display = "block";
  error.textContent = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}

// Attach to form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", validateForm);

    // Pre-fill name if saved
    const savedName = localStorage.getItem("bakeryUserName");
    if (savedName) {
      document.getElementById("name").value = savedName;
    }
  }
});

// Run when page loads
document.addEventListener("DOMContentLoaded", initFavorites);


