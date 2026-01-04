// Configuration
const API_BASE_URL = 'https://localhost:5001/api'; // .NET API endpoint

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
}

// Update cart item quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Refresh cart page if on cart page
            if (window.location.pathname.includes('cart.html')) {
                loadCartItems();
            }
        }
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #067d62;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Filter by category
function filterByCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

// API Helper Functions
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        // Return mock data for demo purposes
        return getMockData(endpoint);
    }
}

// Mock data for demo (when backend is not available)
function getMockData(endpoint) {
    if (endpoint.includes('/products')) {
        return getMockProducts();
    }
    return null;
}

function getMockProducts() {
    return [
        { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'electronics', rating: 4.5, image: '🎧' },
        { id: 2, name: 'Smart Watch', price: 199.99, category: 'electronics', rating: 4.7, image: '⌚' },
        { id: 3, name: 'Laptop Backpack', price: 49.99, category: 'fashion', rating: 4.3, image: '🎒' },
        { id: 4, name: 'Gaming Mouse', price: 39.99, category: 'electronics', rating: 4.6, image: '🖱️' },
        { id: 5, name: 'Coffee Maker', price: 89.99, category: 'home', rating: 4.4, image: '☕' },
        { id: 6, name: 'Running Shoes', price: 129.99, category: 'sports', rating: 4.8, image: '👟' },
        { id: 7, name: 'Desk Lamp', price: 34.99, category: 'home', rating: 4.2, image: '💡' },
        { id: 8, name: 'Bluetooth Speaker', price: 59.99, category: 'electronics', rating: 4.5, image: '🔊' },
        { id: 9, name: 'Yoga Mat', price: 29.99, category: 'sports', rating: 4.6, image: '🧘' },
        { id: 10, name: 'Book - Programming', price: 44.99, category: 'books', rating: 4.9, image: '📚' },
        { id: 11, name: 'Board Game', price: 34.99, category: 'toys', rating: 4.7, image: '🎲' },
        { id: 12, name: 'Winter Jacket', price: 159.99, category: 'fashion', rating: 4.5, image: '🧥' }
    ];
}

// Get rating stars HTML
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars + ` <span>(${rating})</span>`;
}

// User authentication helpers
function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Add Enter key support for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
