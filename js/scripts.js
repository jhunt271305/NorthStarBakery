// Product data
const products = [
  { id: "breads", name: "Breads", price: "$5–$12" },
  { id: "pastries", name: "Pastries & Sweet Goods", price: "$2–$6" },
  { id: "cakes", name: "Cakes & Specialty Items", price: "Starting at $25" }
];

// ---------- Favorites ----------
function loadFavorites() {
  const stored = localStorage.getItem("bakeryFavorites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

function displayFavorites() {
  const favorites = loadFavorites();
  const list = document.getElementById("favorites-list");
  const noFavMsg = document.getElementById("no-favorites");

  if (!list || !noFavMsg) return;

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

function updateButtons() {
  const favorites = loadFavorites();
  document.querySelectorAll(".fav-btn").forEach(btn => {
    const id = btn.dataset.id;
    btn.textContent = favorites.includes(id) ? "Remove from Favorites" : "Add to Favorites";
  });
}

function initFavorites() {
  if (!document.getElementById("favorites-list")) return;

  displayFavorites();
  updateButtons();

  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleFavorite(btn.dataset.id);
    });
  });
}

// ---------- Form Validation ----------
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const details = document.getElementById("details");
  let isValid = true;

  document.querySelectorAll(".error").forEach(el => el.remove());

  if (name.value.trim().length < 2) {
    showError(name, "Name must be at least 2 characters.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (details.value.trim().length < 10) {
    showError(details, "Please provide at least 10 characters of item details.");
    isValid = false;
  }

  if (isValid) {
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

// ---------- Single DOMContentLoaded ----------
document.addEventListener("DOMContentLoaded", () => {
  // Favorites (products page)
  initFavorites();

  // Form (contact page)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", validateForm);

    const savedName = localStorage.getItem("bakeryUserName");
    if (savedName) {
      document.getElementById("name").value = savedName;
    }
  }
});
