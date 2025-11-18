const sections = document.querySelectorAll(".content-section");

function showSection(id) {
  sections.forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

// Sidebar nav and View All buttons
document.querySelectorAll(".nav-item, .viewAll").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.id === "inventoryBtn") return;
    showSection(btn.dataset.section);
  });
});


// ==================== CANCEL BUTTONS ====================
document.querySelectorAll(".cancelBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const form = e.target.closest("form");
    if (form) {
      form.classList.add("hidden");
      form.reset();
    }
  });
});

// ==================== PRODUCT CRUD ====================
const productForm = document.getElementById("productForm");
const productTableBody = document.querySelector("#productTable tbody");
let products = JSON.parse(localStorage.getItem("products")) || [];
let editProductIndex = null;

document.getElementById("addProductBtn").onclick = () => {
  productForm.classList.toggle("hidden");
  productForm.reset();
  editProductIndex = null;
};

productForm.onsubmit = (e) => {
  e.preventDefault();

  const product = {
    id: productId.value.trim(),
    name: productName.value.trim(),
    category: productCategory.value.trim(),
    supplier: productSupplier.value.trim(),
    price: parseFloat(productPrice.value) || 0,
  };

  if (!product.id || !product.name) return alert("Please fill all required fields.");

  if (editProductIndex === null) products.push(product);
  else products[editProductIndex] = product;

  localStorage.setItem("products", JSON.stringify(products));
  productForm.classList.add("hidden");
  productForm.reset();
  renderProducts();
};

function renderProducts() {
  productTableBody.innerHTML = products
    .map(
      (p, i) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.supplier}</td>
      <td>${p.price.toFixed(2)}</td>
      <td class="action-buttons">
        <button class="editBtn" onclick="editProduct(${i})">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="deleteBtn" onclick="deleteProduct(${i})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>`
    )
    .join("");
}

window.editProduct = (i) => {
  const p = products[i];
  productId.value = p.id;
  productName.value = p.name;
  productCategory.value = p.category;
  productSupplier.value = p.supplier;
  productPrice.value = p.price;
  productForm.classList.remove("hidden");
  editProductIndex = i;
};

window.deleteProduct = (i) => {
  if (confirm("Delete this product?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
};

// ==================== CATEGORY CRUD ====================
const categoryForm = document.getElementById("categoryForm");
const categoryTable = document.querySelector("#categoryTable tbody");
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let editCategoryIndex = null;

document.getElementById("addCategoryBtn").onclick = () => {
  categoryForm.classList.toggle("hidden");
  categoryForm.reset();
  editCategoryIndex = null;
};

categoryForm.onsubmit = (e) => {
  e.preventDefault();
  const c = {
    id: categoryId.value.trim(),
    name: categoryName.value.trim(),
    supplier: categorySupplier.value.trim(),
    date: dateAdded.value.trim(),
  };
  if (!c.name) return alert("Enter category name.");

  if (editCategoryIndex === null) categories.push(c);
  else categories[editCategoryIndex] = c;

  localStorage.setItem("categories", JSON.stringify(categories));
  categoryForm.classList.add("hidden");
  categoryForm.reset();
  renderCategories();
};

function renderCategories() {
  categoryTable.innerHTML = categories
    .map(
      (c, i) => `
    <tr>
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.supplier}</td>
      <td>${c.date}</td>
      <td class="action-buttons">
        <button class="editBtn" onclick="editCategory(${i})">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="deleteBtn" onclick="deleteCategory(${i})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>`
    )
    .join("");
}

window.editCategory = (i) => {
  const c = categories[i];
  categoryId.value = c.id;
  categoryName.value = c.name;
  categorySupplier.value = c.supplier;
  dateAdded.value = c.date;
  categoryForm.classList.remove("hidden");
  editCategoryIndex = i;
};

window.deleteCategory = (i) => {
  if (confirm("Delete this category?")) {
    categories.splice(i, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
  }
};

// ==================== SUPPLIER CRUD ====================
const supplierForm = document.getElementById("supplierForm");
const supplierTableBody = document.querySelector("#supplierTable tbody");
let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
let editSupplierIndex = null;

document.getElementById("addSupplierBtn").onclick = () => {
  supplierForm.classList.toggle("hidden");
  supplierForm.reset();
  editSupplierIndex = null;
};

supplierForm.onsubmit = (e) => {
  e.preventDefault();
  const s = {
    name: supplierName.value.trim(),
    address: supplierAddress.value.trim(),
    contact: supplierContact.value.trim(),
    email: supplierEmail.value.trim(),
  };
  if (!s.name) return alert("Enter supplier name.");

  if (editSupplierIndex === null) suppliers.push(s);
  else suppliers[editSupplierIndex] = s;

  localStorage.setItem("suppliers", JSON.stringify(suppliers));
  supplierForm.classList.add("hidden");
  supplierForm.reset();
  renderSuppliers();
};

function renderSuppliers() {
  supplierTableBody.innerHTML = suppliers
    .map(
      (s, i) => `
    <tr>
      <td>${s.name}</td>
      <td>${s.address}</td>
      <td>${s.contact}</td>
      <td>${s.email}</td>
      <td class="action-buttons">
        <button class="editBtn" onclick="editSupplier(${i})">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="deleteBtn" onclick="deleteSupplier(${i})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>`
    )
    .join("");
}

window.editSupplier = (i) => {
  const s = suppliers[i];
  supplierName.value = s.name;
  supplierAddress.value = s.address;
  supplierContact.value = s.contact;
  supplierEmail.value = s.email;
  supplierForm.classList.remove("hidden");
  editSupplierIndex = i;
};

window.deleteSupplier = (i) => {
  if (confirm("Delete this supplier?")) {
    suppliers.splice(i, 1);
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    renderSuppliers();
  }
};

// ==================== INVENTORY DROPDOWN ====================
const inventoryBtn = document.getElementById("inventoryBtn");
const inventoryMenu = document.getElementById("inventoryMenu");

inventoryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  inventoryMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!inventoryMenu.contains(e.target) && !inventoryBtn.contains(e.target)) {
    inventoryMenu.classList.remove("show");
  }
});

// ==================== UTILITY ====================
function getOrderNames(order) {
  if (!Array.isArray(order.orderlist) || order.orderlist.length === 0) return "—";

  return order.orderlist
    .map(item => {
      // If quantity exists, display it
      const quantity = item.quantity || 1;
      return `${item.name} x${quantity}`;
    })
    .join(", ");
}

// ==================== ORDERS ====================
function loadOrders() {
  const tableBody = document.querySelector("#orderlist tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#777;">No active orders</td></tr>`;
    return;
  }

  orders.forEach(order => {
    const names = getOrderNames(order);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${names}</td>
      <td>₱${order.total || 0}</td>
      <td>${order.date || "—"}</td>
      <td>${order.status || "Pending"}</td>
      <td class="action-buttons">
        <button class="completeBtn" onclick="completeOrder(${order.id})">
          <i class="fa-solid fa-circle-check"></i> Complete
        </button>
        <button class="deleteBtn" onclick="deleteOrder(${order.id})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function completeOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let history = JSON.parse(localStorage.getItem("history")) || [];

  const orderIndex = orders.findIndex(o => o.id == orderId);
  if (orderIndex === -1) return;

  const completedOrder = { ...orders[orderIndex], status: "Completed" };
  history.push(completedOrder);
  orders.splice(orderIndex, 1);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("history", JSON.stringify(history));

  loadOrders();
  loadHistory();
  loadRecentOrders();
}

function deleteOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderIndex = orders.findIndex(o => o.id == orderId);
  if (orderIndex === -1) return;
  if (!confirm("Delete this order?")) return;

  orders.splice(orderIndex, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

// ==================== HISTORY ====================
function loadHistory() {
  const historyTableBody = document.querySelector("#historyTable tbody");
  if (!historyTableBody) return;
  historyTableBody.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length === 0) {
    historyTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#777;">No completed orders</td></tr>`;
    return;
  }

  history.forEach((order, index) => {
    const names = getOrderNames(order);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${names}</td>
      <td>₱${order.total || 0}</td>
      <td>${order.date || "—"}</td>
      <td class="action-buttons">
        <button class="printBtn" onclick="printHistory(${index})">
          <i class="fa-solid fa-print"></i> Print
        </button>
        <button class="deleteBtn" onclick="deleteHistory(${index})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;
    historyTableBody.appendChild(row);
  });
}

function loadRecentOrders() {
  const recentOrdersBody = document.querySelector("#recentOrdersTable tbody");
  if (!recentOrdersBody) return;
  recentOrdersBody.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("history")) || [];
  const recent = history.slice(-5).reverse();

  if (recent.length === 0) {
    recentOrdersBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#777;">No recent orders</td></tr>`;
    return;
  }

  recent.forEach(order => {
    const names = getOrderNames(order);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${names}</td>
      <td>₱${order.total || 0}</td>
      <td>${order.date || "—"}</td>
      <td>${order.status || "—"}</td>
    `;
    recentOrdersBody.appendChild(row);
  });
}

// ==================== HISTORY ACTIONS ====================
function deleteHistory(index) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  loadHistory();
  loadRecentOrders();
}

function printHistory(index) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const order = history[index];
  if (!order) return;

  const names = getOrderNames(order);
  const printContent = `
    <h2>Order Receipt</h2>
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Items:</strong> ${names}</p>
    <p><strong>Total:</strong> ₱${order.total || 0}</p>
    <p><strong>Date:</strong> ${order.date || "—"}</p>
    <p><strong>Status:</strong> ${order.status || "—"}</p>
  `;

  const newWindow = window.open("", "_blank");
  newWindow.document.write(printContent);
  newWindow.print();
  newWindow.close();
}

// ==================== INITIAL LOAD ====================
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCategories();
  renderSuppliers();
  loadOrders();
  loadHistory();
  loadRecentOrders();
});
