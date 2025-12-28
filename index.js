// Shopping Cart System
let cart = [];
let total = 0;

// Product data
const products = [
    { id: 1, name: "Produit 1", price: 50000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.17_59d88a1a.jpg" },
    { id: 2, name: "Produit 2", price: 1330000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.17_c87c7ad2.jpg" },
    { id: 3, name: "Produit 3", price: 90000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.18_28c4f9ad.jpg" },
    { id: 4, name: "Produit 4", price: 100000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.18_40da96f4.jpg" },
    { id: 5, name: "Produit 5", price: 100080, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.19_157ad2c4.jpg" },
    { id: 6, name: "Produit 6", price: 1022000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.19_c2962238.jpg" },
    { id: 7, name: "Produit 7", price: 190000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.20_196a4a0c.jpg" },
    { id: 8, name: "Produit 8", price: 1000990, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.20_9cfa26c8.jpg" },
    { id: 9, name: "Produit 9", price: 60000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.27.21_08ddfc8f.jpg" },
    { id: 10, name: "Produit 10", price: 550000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.33.52_91b2b19d.jpg" },
    { id: 11, name: "Produit 11", price: 1000000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.33.55_2bf13b9d.jpg" },
    { id: 12, name: "Produit 12", price: 340000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.33.56_ea0c8785.jpg" },
    { id: 13, name: "Produit 13", price: 9880000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.33.57_52237184.jpg" },
    { id: 14, name: "Produit 14", price: 120000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.34.02_e44ab7bd.jpg" },
    { id: 15, name: "Produit 15", price: 1990000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.34.02_f2493c0a.jpg" },
    { id: 16, name: "Produit 16", price: 1056000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.34.03_21bc3ecd.jpg" },
    { id: 17, name: "Produit 17", price: 1009900, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.34.03_7f024c02.jpg" },
    { id: 18, name: "Produit 18", price: 1077000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.38.49_b4891be3.jpg" },
    { id: 19, name: "Produit 19", price: 330000, image: "ASSETS/WhatsApp Image 2025-03-08 at 00.38.50_f8c61f03.jpg" }
];

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        updateCartDisplay();
        showNotification(`${product.name} ajouté au panier!`);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Calculate total
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartItems || !cartTotal || !cartCount) return;
    
    cartItems.innerHTML = '';
    let total = calculateTotal();
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()} FCFA x ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">×</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toLocaleString() + ' FCFA';
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Create cart modal
function createCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Votre Panier</h2>
            <div id="cart-items"></div>
            <div class="cart-summary">
                <h3>Total: <span id="cart-total">0 FCFA</span></h3>
                <button onclick="checkout()" class="checkout-btn">Commander</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    
    alert(`Commande passée! Total: ${calculateTotal().toLocaleString()} FCFA`);
    cart = [];
    saveCart();
    updateCartDisplay();
    document.getElementById('cart-modal').style.display = 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    createCartModal();
    
    // Add cart icon to header
    const header = document.querySelector('header');
    if (header) {
        const cartIcon = document.createElement('div');
        cartIcon.innerHTML = `
            <div class="cart-icon" onclick="document.getElementById('cart-modal').style.display='block'">
                🛒 <span id="cart-count">0</span>
            </div>
        `;
        header.appendChild(cartIcon);
    }
    
    // Add click handlers to product buttons
    const productButtons = document.querySelectorAll('.panier');
    productButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(index + 1);
        });
    });
});

// CSS for cart
const style = document.createElement('style');
style.textContent = `
    .cart-icon {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 10px 15px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
        background-color: #fefefe;
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 600px;
        border-radius: 10px;
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover {
        color: #000;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        margin: 10px 0;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item img {
        margin-right: 15px;
        border-radius: 5px;
    }
    
    .item-info {
        flex: 1;
    }
    
    .item-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .item-actions button {
        padding: 5px 10px;
        border: none;
        background: #f0f0f0;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .remove-btn {
        background: #ff4444 !important;
        color: white;
    }
    
    .checkout-btn {
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
