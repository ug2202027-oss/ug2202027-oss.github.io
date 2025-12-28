// Utility Functions for E-Commerce System

// LocalStorage Management
const Storage = {
    // User Authentication
    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    
    setCurrentUser: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    },
    
    // Shopping Cart
    getCart: () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },
    
    setCart: (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    },
    
    addToCart: (product, quantity = 1) => {
        const cart = Storage.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                vendor: product.vendor
            });
        }
        
        Storage.setCart(cart);
        return true;
    },
    
    removeFromCart: (productId) => {
        let cart = Storage.getCart();
        cart = cart.filter(item => item.id !== productId);
        Storage.setCart(cart);
    },
    
    updateCartQuantity: (productId, quantity) => {
        const cart = Storage.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            Storage.setCart(cart);
        }
    },
    
    clearCart: () => {
        localStorage.setItem('cart', JSON.stringify([]));
        updateCartCount();
    },
    
    // Wishlist
    getWishlist: () => {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    },
    
    setWishlist: (wishlist) => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
    },
    
    addToWishlist: (productId) => {
        const wishlist = Storage.getWishlist();
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            Storage.setWishlist(wishlist);
            return true;
        }
        return false;
    },
    
    removeFromWishlist: (productId) => {
        let wishlist = Storage.getWishlist();
        wishlist = wishlist.filter(id => id !== productId);
        Storage.setWishlist(wishlist);
    },
    
    isInWishlist: (productId) => {
        const wishlist = Storage.getWishlist();
        return wishlist.includes(productId);
    },
    
    // Orders
    getOrders: () => {
        const orders = localStorage.getItem('orders');
        return orders ? JSON.parse(orders) : [];
    },
    
    addOrder: (order) => {
        const orders = Storage.getOrders();
        orders.unshift(order); // Add to beginning
        localStorage.setItem('orders', JSON.stringify(orders));
    },
    
    // Products (for admin)
    getProducts: () => {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : productsDB;
    },
    
    setProducts: (products) => {
        localStorage.setItem('products', JSON.stringify(products));
    }
};

// Format currency
function formatPrice(price) {
    return `৳${price.toLocaleString('en-BD')}`;
}

// Calculate discount percentage
function calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Create product card HTML
function createProductCard(product) {
    const discount = product.discount || 0;
    const isInWishlist = Storage.isInWishlist(product.id);
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ''}
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                    <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCartHandler(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="quick-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create vendor card HTML
function createVendorCard(vendor) {
    return `
        <div class="vendor-card">
            <div class="vendor-header">
                <div class="vendor-logo">${vendor.logo}</div>
                <div class="vendor-info">
                    <h3>${vendor.name} ${vendor.verified ? '<i class="fas fa-check-circle" style="color: #27ae60;"></i>' : ''}</h3>
                    <div class="vendor-rating">
                        ${generateStars(vendor.rating)} <span>${vendor.rating}</span>
                    </div>
                </div>
            </div>
            <p class="vendor-description">${vendor.description}</p>
            <div class="vendor-stats">
                <div class="vendor-stat">
                    <div class="number">${vendor.products}</div>
                    <div class="label">Products</div>
                </div>
                <div class="vendor-stat">
                    <div class="number">${vendor.orders}</div>
                    <div class="label">Orders</div>
                </div>
                <div class="vendor-stat">
                    <div class="number">${vendor.followers}</div>
                    <div class="label">Followers</div>
                </div>
            </div>
        </div>
    `;
}

// Update cart count badge
function updateCartCount() {
    const cart = Storage.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// Update wishlist count badge
function updateWishlistCount() {
    const wishlist = Storage.getWishlist();
    const badge = document.getElementById('wishlistCount');
    if (badge) {
        badge.textContent = wishlist.length;
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.animation = 'slideIn 0.3s ease-out';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add to cart handler
function addToCartHandler(productId) {
    const products = Storage.getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        if (product.stock > 0) {
            Storage.addToCart(product);
            showAlert('Product added to cart!', 'success');
        } else {
            showAlert('Product is out of stock!', 'danger');
        }
    }
}

// Toggle wishlist
function toggleWishlist(productId) {
    const isInWishlist = Storage.isInWishlist(productId);
    
    if (isInWishlist) {
        Storage.removeFromWishlist(productId);
        showAlert('Removed from wishlist', 'info');
    } else {
        Storage.addToWishlist(productId);
        showAlert('Added to wishlist!', 'success');
    }
    
    // Update UI
    const wishlistBtn = document.querySelector(`[data-id="${productId}"] .wishlist-btn`);
    if (wishlistBtn) {
        const icon = wishlistBtn.querySelector('i');
        if (isInWishlist) {
            wishlistBtn.classList.remove('active');
            icon.classList.remove('fas');
            icon.classList.add('far');
        } else {
            wishlistBtn.classList.add('active');
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
    }
}

// View product details
function viewProduct(productId) {
    window.location.href = `pages/product-detail.html?id=${productId}`;
}

// Search functionality
function performSearch(query) {
    window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
}

// Check authentication
function requireAuth() {
    const user = Storage.getCurrentUser();
    if (!user) {
        window.location.href = '../pages/login.html';
        return false;
    }
    return true;
}

// Check admin role
function requireAdmin() {
    const user = Storage.getCurrentUser();
    if (!user || user.role !== 'admin') {
        showAlert('Access denied! Admin only.', 'danger');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Update user greeting
function updateUserGreeting() {
    const user = Storage.getCurrentUser();
    const authLink = document.getElementById('authLink');
    const userGreeting = document.getElementById('userGreeting');
    const userName = document.getElementById('userName');
    
    if (user && authLink && userGreeting) {
        authLink.style.display = 'none';
        userGreeting.style.display = 'inline';
        if (userName) {
            userName.textContent = user.name;
        }
    }
}

// Logout handler
function logoutHandler() {
    if (confirm('Are you sure you want to logout?')) {
        Storage.logout();
    }
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Filter products
function filterProducts(products, filters) {
    let filtered = [...products];
    
    // Filter by category
    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }
    
    // Filter by search query
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
    }
    
    // Filter by price range
    if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    // Filter by rating
    if (filters.minRating) {
        filtered = filtered.filter(p => p.rating >= filters.minRating);
    }
    
    // Sort
    if (filters.sort) {
        switch(filters.sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                // newest first
                filtered.sort((a, b) => b.id - a.id);
        }
    }
    
    return filtered;
}

// Calculate cart total
function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Apply coupon
function applyCoupon(couponCode, cartTotal) {
    const coupon = couponsDB.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (!coupon) {
        return { success: false, message: 'Invalid coupon code' };
    }
    
    if (cartTotal < coupon.minAmount) {
        return { 
            success: false, 
            message: `Minimum order amount ৳${coupon.minAmount} required` 
        };
    }
    
    let discount = 0;
    if (coupon.type === 'percentage') {
        discount = Math.min((cartTotal * coupon.discount / 100), coupon.maxDiscount);
    } else {
        discount = coupon.discount;
    }
    
    return {
        success: true,
        discount: discount,
        message: `Coupon applied! You saved ৳${discount}`
    };
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD${timestamp}${random}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update counts
    updateCartCount();
    updateWishlistCount();
    updateUserGreeting();
    
    // Logout handler
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logoutHandler();
        });
    }
    
    // Search handler
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
