// Product detail page functionality

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        await loadProductDetail(productId);
        await loadRelatedProducts(productId);
    } else {
        window.location.href = 'products.html';
    }
});

// Load product details
async function loadProductDetail(productId) {
    try {
        const products = await apiRequest('/products');
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            window.location.href = 'products.html';
            return;
        }
        
        displayProductDetail(product);
    } catch (error) {
        console.error('Error loading product:', error);
    }
}

// Display product details
function displayProductDetail(product) {
    const breadcrumbName = document.getElementById('productName');
    const detailContent = document.getElementById('productDetailContent');
    
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }
    
    if (detailContent) {
        detailContent.innerHTML = `
            <div class="product-detail-image">${product.image || '📦'}</div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="product-rating">${getRatingStars(product.rating)}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                
                <div class="product-description">
                    <h3>Product Description</h3>
                    <p>This is a high-quality ${product.name.toLowerCase()} that offers exceptional value and performance. 
                    Perfect for daily use, it combines style, functionality, and durability.</p>
                    <ul>
                        <li>Premium quality materials</li>
                        <li>Modern design</li>
                        <li>Long-lasting durability</li>
                        <li>Easy to use</li>
                        <li>Excellent customer reviews</li>
                    </ul>
                </div>
                
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <button onclick="changeQuantity(-1)">-</button>
                    <input type="number" id="quantity" value="1" min="1" max="10" readonly>
                    <button onclick="changeQuantity(1)">+</button>
                </div>
                
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCartFromDetail()">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn-secondary" onclick="buyNow()">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
                
                <div class="product-meta">
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>SKU:</strong> ${product.id.toString().padStart(6, '0')}</p>
                    <p><strong>Availability:</strong> <span style="color: #067d62">In Stock</span></p>
                </div>
            </div>
        `;
        
        // Store current product for later use
        window.currentProduct = product;
    }
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;
    
    if (newValue >= 1 && newValue <= 10) {
        quantityInput.value = newValue;
    }
}

// Add to cart from detail page
function addToCartFromDetail() {
    if (!window.currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = window.currentProduct;
    
    // Add product with specified quantity
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
}

// Buy now
function buyNow() {
    if (!window.currentProduct) return;
    
    addToCartFromDetail();
    window.location.href = 'checkout.html';
}

// Load related products
async function loadRelatedProducts(currentProductId) {
    try {
        const products = await apiRequest('/products');
        const currentProduct = products.find(p => p.id === currentProductId);
        
        if (!currentProduct) return;
        
        // Get products from same category, excluding current product
        const related = products
            .filter(p => p.category === currentProduct.category && p.id !== currentProductId)
            .slice(0, 4);
        
        displayRelatedProducts(related);
    } catch (error) {
        console.error('Error loading related products:', error);
    }
}

// Display related products
function displayRelatedProducts(products) {
    const relatedGrid = document.getElementById('relatedProducts');
    if (!relatedGrid) return;
    
    if (products.length === 0) {
        relatedGrid.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    relatedGrid.innerHTML = products.map(product => `
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
