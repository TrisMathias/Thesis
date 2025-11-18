// ==================== SIMPLE CART SYSTEM ====================
const cartBtn = document.getElementById('cartBtn');
const cart = document.getElementById('cart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCart = document.getElementById('clearCart');
const closeCart = document.getElementById('closeCart');
const addBtns = document.querySelectorAll('.add-btn');

let total = 0;
let count = 0;

// Add item to cart
addBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Find the product container
    let productCard = btn.parentElement;
    while (productCard && !productCard.querySelector('h3') && !productCard.querySelector('.price')) {
      productCard = productCard.parentElement;
    }
    if (!productCard) return; // stop if container not found

    // Get product name and price
    const productNameEl = productCard.querySelector('h3');
    const productPriceEl = productCard.querySelector('.price');
    if (!productNameEl || !productPriceEl) return;

    const productName = productNameEl.textContent.trim();
    const productPrice = parseInt(productPriceEl.textContent.replace('₱','').trim()) || 0;

    // Update cart totals
    count++;
    total += productPrice;
    cartCount.textContent = count;
    cartTotal.textContent = total;

    // Check if item already exists
    let existingItem = Array.from(cartItems.querySelectorAll('.cart-item'))
      .find(item => item.querySelector('.name').textContent === productName);

    if (existingItem) {
      // Item exists: update quantity and price
      let qtyEl = existingItem.querySelector('.quantity');
      let priceEl = existingItem.querySelector('.price');

      let qty = parseInt(qtyEl.textContent);
      qty++;
      qtyEl.textContent = qty;
      priceEl.textContent = `₱${productPrice * qty}`;
    } else {
      // Item does not exist: create new element
      const item = document.createElement('p');
      item.classList.add('cart-item');
      item.innerHTML = `
        <div class="Ctems">
          <span class="name">${productName}</span>
          <span class="price">₱${productPrice}</span>
          <span class="quantity">1</span>
          <div class="remove-item">x</div>
        </div>
      `;
      cartItems.appendChild(item);

      // Remove individual item
      const removeBtn = item.querySelector('.remove-item');
      removeBtn.addEventListener('click', () => {
        const qty = parseInt(item.querySelector('.quantity').textContent);
        total -= productPrice * qty;
        count -= qty;
        cartTotal.textContent = total;
        cartCount.textContent = count;
        item.remove();
      });
    }
  });
});

// Open and close cart
cartBtn.onclick = () => cart.classList.add('active');
closeCart.onclick = () => cart.classList.remove('active');

// Clear entire cart
clearCart.onclick = () => {
  cartItems.innerHTML = '';
  total = 0;
  count = 0;
  cartCount.textContent = 0;
  cartTotal.textContent = 0;
};

// ==================== CHECKOUT / SUBMIT ORDER ====================
function submitOrder() {
  const cartItemsContainer = document.getElementById("cartItems");

  // Extract items safely
  const items = Array.from(cartItemsContainer.querySelectorAll(".cart-item"))
    .map(p => {
      const container = p.querySelector('.Ctems');
      if (!container) return null;

      const nameEl = container.querySelector('.name');
      const priceEl = container.querySelector('.price');
      const qtyEl = container.querySelector('.quantity'); // get quantity
      if (!nameEl || !priceEl) return null;

      const name = nameEl.textContent.trim();
      const price = parseInt(priceEl.textContent.replace('₱','').trim()) || 0;
      const quantity = parseInt(qtyEl?.textContent) || 1;

      return { name, price, quantity };
    })
    .filter(item => item !== null);

  if (!items.length) {
    return alert("Your cart is empty!");
  }

  // Calculate total dynamically
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    id: Date.now(),
    orderlist: items,
    total: totalPrice,
    date: new Date().toLocaleString(),
    status: "Pending"
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // Reset cart
  cartItemsContainer.innerHTML = "";
  cartTotal.textContent = 0;
  cartCount.textContent = 0;
  total = 0;
  count = 0;

  alert("Order submitted successfully!");
  window.location.href = "Main.html#orders";
}
