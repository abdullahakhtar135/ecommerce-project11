const SUPABASE_URL = "https://ktzxeqvrliqauctlbajt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0enhlcXZybGlxYXVjdGxiYWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMDI0MDYsImV4cCI6MjEwNzU3ODQwNn0.j5m4E_V_qySuVayJCkR3j_2b8wL3cIqKMT_XNHJl8Os";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let products = [];
let currentCategory = "All";
let currentSearch = "";
let currentSort = "default";

/* ---------- PRODUCTS ---------- */

function renderProducts(list) {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";
  list.forEach(prod => {
    const stockLabel = prod.stock === 0 ? "Out of Stock"
      : prod.stock <= 5 ? "Low Stock" : "In Stock";
    const stockClass = prod.stock === 0 ? "out" : prod.stock <= 5 ? "low" : "in";
    container.innerHTML += `
      <div class="product">
        <img src="images/${prod.name}.${prod.name === "Smartphone" ? "avif" : "jpg"}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>AED ${prod.price.toLocaleString()}</p>
        <p class="stock ${stockClass}">${stockLabel}</p>
        <button ${prod.stock === 0 ? "disabled" : ""} onclick='addToCart(${JSON.stringify(prod)})'>Add to Cart</button>
        <a href="product-detail.html?id=${prod.product_id}">View details</a>
      </div>`;
  });
}

function applyAll() {
  let result = products.filter(p =>
    (currentCategory === "All" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(currentSearch)
  );
  if (currentSort === "low-high") result.sort((a, b) => a.price - b.price);
  if (currentSort === "high-low") result.sort((a, b) => b.price - a.price);
  renderProducts(result);
}

async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("product").select("*, category(category_name)").order("name");
  if (error) {
    document.getElementById("product-list").innerHTML =
      `<p>Could not load products: ${error.message}</p>`;
    return;
  }
  products = data.map(p => ({ ...p, category: p.category.category_name }));
  renderProducts(products);
}

// Only run product code on pages that have the product list
if (document.getElementById("product-list")) {
  const searchBox = document.getElementById("search-box");
  if (searchBox) {
    searchBox.addEventListener("input", e => {
      currentSearch = e.target.value.toLowerCase();
      applyAll();
    });
  }

  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      applyAll();
    });
  });

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      currentSort = e.target.value;
      applyAll();
    });
  }

  loadProducts();
}

/* ---------- CART ---------- */

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.product_id === product.product_id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(product.name + " added to cart");
}

function removeFromCart(productId) {
  saveCart(getCart().filter(item => item.product_id !== productId));
}

function updateQuantity(productId, quantity) {
  quantity = Number(quantity);
  if (quantity <= 0) return removeFromCart(productId);
  const cart = getCart().map(item =>
    item.product_id === productId ? { ...item, quantity } : item
  );
  saveCart(cart);
}

/* ---------- AUTH ---------- */

async function updateNavForAuth() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  const navSlot = document.getElementById("auth-nav-slot");
  if (!navSlot) return;
  if (user) {
    navSlot.innerHTML = `<span>Hi, ${user.email}</span> <a href="#" onclick="logout()">Log out</a>`;
  } else {
    navSlot.innerHTML = `<a href="login.html">Login</a>`;
  }
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

async function requireLogin() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) window.location.href = "login.html";
  return user;
}

updateNavForAuth();
async function updateNavForAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  const navSlot = document.getElementById("auth-nav-slot");
  if (!navSlot) return;
  if (user) {
    navSlot.innerHTML = `<span>Hi, ${user.email}</span> <a href="#" onclick="logout()">Log out</a>`;
  } else {
    navSlot.innerHTML = `<a href="login.html">Login</a>`;
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

updateNavForAuth();
async function requireLogin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) window.location.href = "login.html";
  return user;
}