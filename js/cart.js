// Cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
});

// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="products.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        return;
    }
    
    // Clear container first
    cartItemsContainer.innerHTML = '';
    
    // Create cart items using DOM methods to avoid XSS
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Image
        const imageDiv = document.createElement('div');
        imageDiv.className = 'cart-item-image';
        imageDiv.textContent = item.image || '📦';
        
        // Details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart-item-details';
        
        const title = document.createElement('h3');
        title.className = 'cart-item-title';
        title.textContent = item.name;
        
        const price = document.createElement('div');
        price.className = 'cart-item-price';
        price.textContent = `$${item.price.toFixed(2)}`;
        
        const actions = document.createElement('div');
        actions.className = 'cart-item-actions';
        
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.onclick = () => updateCartQuantity(item.id, -1);
        
        const qtySpan = document.createElement('span');
        qtySpan.textContent = item.quantity;
        
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.onclick = () => updateCartQuantity(item.id, 1);
        
        const removeSpan = document.createElement('span');
        removeSpan.className = 'remove-item';
        removeSpan.innerHTML = '<i class="fas fa-trash"></i> Remove';
        removeSpan.onclick = () => removeFromCart(item.id);
        
        actions.appendChild(minusBtn);
        actions.appendChild(qtySpan);
        actions.appendChild(plusBtn);
        actions.appendChild(removeSpan);
        
        detailsDiv.appendChild(title);
        detailsDiv.appendChild(price);
        detailsDiv.appendChild(actions);
        
        // Total
        const totalDiv = document.createElement('div');
        totalDiv.className = 'cart-item-total';
        const totalStrong = document.createElement('strong');
        totalStrong.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        totalDiv.appendChild(totalStrong);
        
        // Append all
        cartItem.appendChild(imageDiv);
        cartItem.appendChild(detailsDiv);
        cartItem.appendChild(totalDiv);
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    calculateCartSummary();
}

// Calculate cart summary
function calculateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    updateCartSummary(subtotal, shipping, tax);
}

// Update cart summary display
function updateCartSummary(subtotal, shipping, tax) {
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 && subtotal > 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    window.location.href = 'checkout.html';
}
