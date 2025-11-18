const addButtons = document.querySelectorAll(".add-btn");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCart = document.getElementById("clearCart");
const closeCart = document.getElementById("closeCart");

let cartData = [];

// Add product to cart
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cartData.find(item => item.name === name);
    if (existing) existing.qty++;
    else cartData.push({ name, price, qty: 1 });

    updateCart();
  });
});

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cartData.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.textContent = `${item.name} (x${item.qty})`;
    cartItems.appendChild(div);
  });

  cartCount.textContent = cartData.reduce((sum, i) => sum + i.qty, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Open and close cart
cartBtn.addEventListener("click", () => cart.classList.add("open"));
closeCart.addEventListener("click", () => cart.classList.remove("open"));

// Clear cart
clearCart.addEventListener("click", () => {
  cartData = [];
  updateCart();
});
