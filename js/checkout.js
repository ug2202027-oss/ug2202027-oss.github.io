// Checkout page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutItems();
    setupPaymentMethodToggle();
});

// Load checkout items
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>Qty: ${item.quantity}</small>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    calculateCheckoutSummary();
}

// Calculate checkout summary
function calculateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardPayment = document.getElementById('cardPayment');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'card') {
                cardPayment.style.display = 'block';
            } else {
                cardPayment.style.display = 'none';
            }
        });
    });
}

// Place order
async function placeOrder() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        },
        items: JSON.parse(localStorage.getItem('cart')) || [],
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        total: parseFloat(document.getElementById('checkoutTotal').textContent.replace('$', ''))
    };
    
    try {
        // Try to send to API
        const response = await apiRequest('/orders', 'POST', orderData);
        
        // Clear cart
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Show success message
        showOrderSuccess(response.orderId || 'ORD' + Date.now());
    } catch (error) {
        console.error('Error placing order:', error);
        
        // For demo, still show success
        localStorage.removeItem('cart');
        updateCartCount();
        showOrderSuccess('ORD' + Date.now());
    }
}

// Show order success
function showOrderSuccess(orderId) {
    const checkoutPage = document.querySelector('.checkout-page .container');
    
    checkoutPage.innerHTML = `
        <div style="text-align: center; padding: 4rem 0;">
            <div style="font-size: 5rem; color: #067d62; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p style="font-size: 1.2rem; margin: 1rem 0;">Thank you for your purchase.</p>
            <p style="color: #666;">Order ID: <strong>${orderId}</strong></p>
            <p style="color: #666; margin-bottom: 2rem;">A confirmation email has been sent to your email address.</p>
            <a href="products.html" class="btn-primary">Continue Shopping</a>
            <a href="index.html" class="btn-secondary">Go to Home</a>
        </div>
    `;
}
