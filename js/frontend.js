const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

// This serves your frontend files (if they are in the root)
app.use(express.static(__dirname));

// This handles the connection to your backend
app.get('/api-config', (req, res) => {
    res.json({ backendUrl: process.env.BACKEND_URL });
});

app.listen(port, () => {
    console.log(`Frontend listening on port ${port}`);
});

async function loadProducts() {
  try {
    const res = await fetch("https://utd-bookstore-backend-532131639393.us-central1.run.app/products");
    if (!res.ok) {
      console.error("Failed to load products:", res.status, res.statusText);
      return;
    }
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

let selectedProduct = null;

function renderProducts(products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button class="buy-btn" data-id="${p.id}">Buy</button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const product = products.find(p => p.id === id);
      openCheckout(product);
    });
  });
}

function openCheckout(product) {
  selectedProduct = product;
  const modal = document.getElementById("checkout-modal");
  const nameEl = document.getElementById("checkout-product-name");
  nameEl.textContent = `You are buying: ${product.name} ($${product.price.toFixed(2)})`;
  modal.classList.remove("hidden");
}

function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.add("hidden");
  document.getElementById("checkout-name").value = "";
  document.getElementById("checkout-utd-id").value = "";
}

async function submitOrder(orderData) {
  try {
    const res = await fetch("https://utd-bookstore-backend-532131639393.us-central1.run.app/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) {
      console.error("Failed to submit order:", res.status, res.statusText);
      alert("There was an issue placing your order. Please try again.");
      return;
    }

    const result = await res.json();
    console.log("Order response:", result);
    alert("Order placed successfully!");
    closeCheckout();
  } catch (err) {
    console.error("Error submitting order:", err);
    alert("There was an error placing your order. Please try again.");
  }
}

function setupCheckoutHandlers() {
  const confirmBtn = document.getElementById("checkout-confirm");
  const cancelBtn = document.getElementById("checkout-cancel");

  confirmBtn.addEventListener("click", () => {
    const name = document.getElementById("checkout-name").value.trim();
    const utdId = document.getElementById("checkout-utd-id").value.trim();

    if (!name || !utdId) {
      alert("Please enter your name and UTD ID.");
      return;
    }

    const orderData = {
      productId: selectedProduct.id,
      studentName: name,
      studentId: utdId
    };

    submitOrder(orderData);
  });

  cancelBtn.addEventListener("click", () => {
    closeCheckout();
  });
}

// Initialize page
loadProducts();
setupCheckoutHandlers();
