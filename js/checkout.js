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
    
    // Clear items first
    checkoutItems.innerHTML = '';
    
    // Create checkout items using DOM methods to avoid XSS
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        
        const detailsDiv = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = item.name;
        detailsDiv.appendChild(strong);
        detailsDiv.appendChild(document.createElement('br'));
        
        const small = document.createElement('small');
        small.textContent = `Qty: ${item.quantity}`;
        detailsDiv.appendChild(small);
        
        const priceDiv = document.createElement('div');
        priceDiv.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(priceDiv);
        
        checkoutItems.appendChild(itemDiv);
    });
    
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
    
    // Clear page content
    checkoutPage.innerHTML = '';
    
    // Create success div
    const successDiv = document.createElement('div');
    successDiv.style.cssText = 'text-align: center; padding: 4rem 0;';
    
    // Icon div
    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = 'font-size: 5rem; color: #067d62; margin-bottom: 1rem;';
    iconDiv.innerHTML = '<i class="fas fa-check-circle"></i>';
    
    // Title
    const title = document.createElement('h2');
    title.textContent = 'Order Placed Successfully!';
    
    // Thank you message
    const thankYou = document.createElement('p');
    thankYou.style.cssText = 'font-size: 1.2rem; margin: 1rem 0;';
    thankYou.textContent = 'Thank you for your purchase.';
    
    // Order ID
    const orderIdP = document.createElement('p');
    orderIdP.style.color = '#666';
    orderIdP.textContent = 'Order ID: ';
    const orderIdStrong = document.createElement('strong');
    orderIdStrong.textContent = orderId;
    orderIdP.appendChild(orderIdStrong);
    
    // Email confirmation
    const emailP = document.createElement('p');
    emailP.style.cssText = 'color: #666; margin-bottom: 2rem;';
    emailP.textContent = 'A confirmation email has been sent to your email address.';
    
    // Buttons
    const continueBtn = document.createElement('a');
    continueBtn.href = 'products.html';
    continueBtn.className = 'btn-primary';
    continueBtn.textContent = 'Continue Shopping';
    
    const homeBtn = document.createElement('a');
    homeBtn.href = 'index.html';
    homeBtn.className = 'btn-secondary';
    homeBtn.textContent = 'Go to Home';
    
    // Append all elements
    successDiv.appendChild(iconDiv);
    successDiv.appendChild(title);
    successDiv.appendChild(thankYou);
    successDiv.appendChild(orderIdP);
    successDiv.appendChild(emailP);
    successDiv.appendChild(continueBtn);
    successDiv.appendChild(document.createTextNode(' '));
    successDiv.appendChild(homeBtn);
    
    checkoutPage.appendChild(successDiv);
}
