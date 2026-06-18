// Application State Lifecycle
let cart = [];
const GST_RATE = 0.18; // 18% Flat GST Rate

// DOM Elements Retrieval
const itemForm = document.getElementById('itemForm');
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const itemQuantityInput = document.getElementById('itemQuantity');
const errorMsg = document.getElementById('errorMsg');

const emptyCartView = document.getElementById('emptyCartView');
const cartContentArea = document.getElementById('cartContentArea');
const cartTableBody = document.getElementById('cartTableBody');
const cartCountBadge = document.getElementById('cartCountBadge');

const invoicePanel = document.getElementById('invoicePanel');
const invoiceSubtotal = document.getElementById('invoiceSubtotal');
const invoiceDiscountRow = document.getElementById('invoiceDiscountRow');
const invoiceDiscount = document.getElementById('invoiceDiscount');
const invoiceTax = document.getElementById('invoiceTax');
const invoiceTotal = document.getElementById('invoiceTotal');
const timestampLabel = document.getElementById('timestamp');
const resetBtn = document.getElementById('resetBtn');

// Trigger Calculation & Render Pipeline Dynamically
function updateBillingSystem() {
    renderCart();
    calculateInvoice();
}

// Validation Error Management Handler
function showError(message) {
    if (message) {
        errorMsg.textContent = `⚠️ ${message}`;
        errorMsg.classList.remove('hidden');
    } else {
        errorMsg.classList.add('hidden');
    }
}

// Add Item Event listener Logic
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showError(''); // Clean existing states

    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const quantity = parseInt(itemQuantityInput.value);

    // Defensive Form Validation
    if (!name) {
        showError('Item name cannot be left blank.');
        return;
    }
    if (isNaN(price) || price <= 0) {
        showError('Please enter a valid price higher than ₹0.');
        return;
    }
    if (isNaN(quantity) || quantity <= 0) {
        showError('Quantity must be a whole integer greater than 0.');
        return;
    }

    // Merge logic if item matches existing entries
    const existingIndex = cart.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: quantity
        });
    }

    // Clean up input contexts
    itemNameInput.value = '';
    itemPriceInput.value = '';
    itemQuantityInput.value = '1';
    itemNameInput.focus();

    updateBillingSystem();
});

// Remove Target Item Logic
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateBillingSystem();
}

// Render Engine for Shopping Cart Array
function renderCart() {
    const totalQuantityCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = `${totalQuantityCount} Item${totalQuantityCount !== 1 ? 's' : ''}`;

    if (cart.length === 0) {
        emptyCartView.classList.remove('hidden');
        cartContentArea.classList.add('hidden');
        invoicePanel.classList.add('hidden');
        return;
    }

    emptyCartView.classList.add('hidden');
    cartContentArea.classList.remove('hidden');
    cartTableBody.innerHTML = '';

    cart.forEach(item => {
        const rowTotal = item.price * item.quantity;
        const row = document.createElement('tr');
        row.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-slate-700';
        row.innerHTML = `
            <td class="py-3 font-semibold text-slate-900">${item.name}</td>
            <td class="py-3 text-right font-mono">₹${item.price.toFixed(2)}</td>
            <td class="py-3 text-center">${item.quantity}</td>
            <td class="py-3 text-right font-mono font-bold text-slate-800">₹${rowTotal.toFixed(2)}</td>
            <td class="py-3 text-center">
                <button onclick="removeItem(${item.id})" class="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition cursor-pointer">
                    Delete
                </button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Compute Totals and Render Detailed Invoice Panel
function calculateInvoice() {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;

    // Apply special criteria: 10% discount on order subtotals > ₹5000
    if (subtotal > 5000) {
        discount = subtotal * 0.10;
        invoiceDiscountRow.classList.remove('hidden');
    } else {
        invoiceDiscountRow.classList.add('hidden');
    }

    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * GST_RATE;
    const totalDue = taxableAmount + tax;

    // Populate calculations inside template fields
    invoiceSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    invoiceDiscount.textContent = `-₹${discount.toFixed(2)}`;
    invoiceTax.textContent = `₹${tax.toFixed(2)}`;
    invoiceTotal.textContent = `₹${totalDue.toFixed(2)}`;

    // Set Live Timestamp configuration
    const now = new Date();
    timestampLabel.textContent = now.toLocaleString('en-IN');
    
    invoicePanel.classList.remove('hidden');
}

// Global System Resets Action Handler
resetBtn.addEventListener('click', () => {
    cart = [];
    showError('');
    updateBillingSystem();
});