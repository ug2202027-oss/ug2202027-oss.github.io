// Products page functionality
let allProducts = [];
let filteredProducts = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', async function() {
    await loadProducts();
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        document.getElementById('categoryFilter').value = category;
        filterProducts();
    }
    
    if (search) {
        document.getElementById('searchInput').value = search;
        searchProductsOnPage();
    }
});

// Load products from API or mock data
async function loadProducts() {
    try {
        allProducts = await apiRequest('/products');
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
        
        // Load featured products on home page
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            displayFeaturedProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        allProducts = getMockProducts();
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
    }
}

// Display products in grid
function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image || '📦'}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">${getRatingStars(product.rating)}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image || '📦'}'})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="view-details" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display featured products on home page
function displayFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProducts');
    if (!featuredGrid) return;
    
    // Get top 6 rated products
    const featured = [...allProducts]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    
    featuredGrid.innerHTML = featured.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image || '📦'}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">${getRatingStars(product.rating)}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image || '📦'}'})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="view-details" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === 'all') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(p => p.category === selectedCategory);
    }
    
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortFilter = document.getElementById('sortFilter');
    const sortBy = sortFilter.value;
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = [...allProducts];
    }
    
    displayProducts(filteredProducts);
}

// Apply price filter
function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    filteredProducts = allProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    displayProducts(filteredProducts);
}

// Filter by rating
function filterByRating() {
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        filteredProducts = [...allProducts];
    } else {
        const minRating = Math.min(...Array.from(checkboxes).map(cb => parseFloat(cb.value)));
        filteredProducts = allProducts.filter(p => p.rating >= minRating);
    }
    displayProducts(filteredProducts);
}

// Search products on page
function searchProductsOnPage() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }
    
    displayProducts(filteredProducts);
}

// View product detail
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}
