const products = [
  { id: 1,  name: "Dell Laptop",         category: "Computers",   price: 3499, stock: 10 },
  { id: 2,  name: "Wireless Mouse",      category: "Accessories", price: 129,  stock: 25 },
  { id: 3,  name: "Smartphone",          category: "Phones",      price: 2499, stock: 0 },
  { id: 4,  name: "Gaming Desktop",      category: "Computers",   price: 5999, stock: 4 },
  { id: 5,  name: "MacBook Air",         category: "Computers",   price: 4599, stock: 7 },
  { id: 6,  name: "Chromebook",          category: "Computers",   price: 1299, stock: 15 },
  { id: 7,  name: "All-in-One PC",       category: "Computers",   price: 3299, stock: 0 },
  { id: 8,  name: "Mechanical Keyboard", category: "Accessories", price: 299,  stock: 18 },
  { id: 9,  name: "USB-C Hub",           category: "Accessories", price: 149,  stock: 3 },
  { id: 10, name: "Laptop Bag",          category: "Accessories", price: 99,   stock: 30 },
  { id: 11, name: "Webcam HD",           category: "Accessories", price: 199,  stock: 5 },
  { id: 12, name: "Headphones",          category: "Accessories", price: 349,  stock: 12 },
  { id: 13, name: "iPhone 15",           category: "Phones",      price: 3399, stock: 9 },
  { id: 14, name: "Samsung Galaxy S24",  category: "Phones",      price: 3199, stock: 6 },
  { id: 15, name: "Google Pixel 8",      category: "Phones",      price: 2799, stock: 2 },
  { id: 16, name: "Budget Android Phone",category: "Phones",      price: 599,  stock: 40 },
  { id: 17, name: "Phone Case",          category: "Accessories", price: 49,   stock: 50 },
  { id: 18, name: "Tablet 10-inch",      category: "Phones",      price: 1199, stock: 0 }
];

function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No products match your search.</p>";
    return;
  }
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
        <button ${prod.stock === 0 ? "disabled" : ""}>Add to Cart</button>
      </div>`;
  });
}

let currentCategory = "All";
let currentSearch = "";
let currentSort = "default";

function applyAll() {
  let result = products.filter(p =>
    (currentCategory === "All" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(currentSearch)
  );
  if (currentSort === "low-high") result.sort((a, b) => a.price - b.price);
  if (currentSort === "high-low") result.sort((a, b) => b.price - a.price);
  renderProducts(result);
}

document.getElementById("search-box").addEventListener("input", e => {
  currentSearch = e.target.value.toLowerCase();
  applyAll();
});

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    applyAll();
  });
});

document.getElementById("sort-select").addEventListener("change", e => {
  currentSort = e.target.value;
  applyAll();
});

renderProducts(products);