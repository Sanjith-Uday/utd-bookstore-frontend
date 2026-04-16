// Mock product data for now
const products = [
  { id: 1, name: "Champion UTD Hoodie", price: 49.99 },
  { id: 2, name: "UTD Tumbler", price: 19.99 },
  { id: 3, name: "Temoc Stickers", price: 9.99 }
];

let selectedProduct = null;

function renderProducts() {
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

    console.log("Mock order submitted:", {
      productId: selectedProduct.id,
      studentName: name,
      studentId: utdId
    });

    alert("Order submitted (mock). This will later call the backend API.");
    closeCheckout();
  });

  cancelBtn.addEventListener("click", () => {
    closeCheckout();
  });
}

// Initialize page
renderProducts();
setupCheckoutHandlers();
