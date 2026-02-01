const products = [
  { name: "Smartphone", price: 25000, rating: 4.5, category: "Electronics" },
  { name: "Laptop", price: 60000, rating: 4.7, category: "Electronics" },
  { name: "Headphones", price: 3000, rating: 4.2, category: "Electronics" },
  { name: "Smartwatch", price: 8000, rating: 4.1, category: "Electronics" },
  { name: "T-shirt", price: 700, rating: 4.0, category: "Clothing" },
  { name: "Jeans", price: 2000, rating: 4.3, category: "Clothing" },
  { name: "Jacket", price: 3500, rating: 4.6, category: "Clothing" },
  { name: "Hoodie", price: 2500, rating: 4.4, category: "Clothing" },
  { name: "Sunglasses", price: 1200, rating: 4.4, category: "Accessories" },
  { name: "Wallet", price: 900, rating: 4.1, category: "Accessories" },
  { name: "Backpack", price: 1800, rating: 4.5, category: "Accessories" },
  { name: "Watch", price: 5500, rating: 4.5, category: "Accessories" },
  { name: "Running Shoes", price: 4500, rating: 4.6, category: "Footwear" },
  { name: "Sneakers", price: 3000, rating: 4.3, category: "Footwear" },
  { name: "Sandals", price: 1500, rating: 4.0, category: "Footwear" },
  { name: "Formal Shoes", price: 5000, rating: 4.4, category: "Footwear" },
  { name: "Bluetooth Speaker", price: 3500, rating: 4.2, category: "Electronics" },
  { name: "Power Bank", price: 2000, rating: 4.1, category: "Electronics" },
  { name: "Cap", price: 400, rating: 3.9, category: "Clothing" },
  { name: "Belt", price: 600, rating: 3.8, category: "Accessories" }
];

function stars(rating) {
  return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <div class="price">₹${product.price}</div>
      <div class="rating">${stars(product.rating)}</div>
      <div class="category">${product.category}</div>
    `;

    container.appendChild(card);
  });
}

function applyFilterSort() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortOption").value;

  let filtered = products.filter(p =>
    category === "all" || p.category === category
  );

  const sortMap = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "rating-asc": (a, b) => a.rating - b.rating,
    "rating-desc": (a, b) => b.rating - a.rating
  };

  if (sortMap[sort]) filtered.sort(sortMap[sort]);

  displayProducts(filtered);
}

displayProducts(products);
