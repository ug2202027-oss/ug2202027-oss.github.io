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
        // Clear content
        detailContent.innerHTML = '';
        
        // Create image div
        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-detail-image';
        imageDiv.textContent = product.image || '📦';
        
        // Create info div
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-detail-info';
        
        // Title
        const title = document.createElement('h1');
        title.textContent = product.name;
        
        // Rating
        const rating = document.createElement('div');
        rating.className = 'product-rating';
        rating.innerHTML = getRatingStars(product.rating);
        
        // Price
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `$${product.price.toFixed(2)}`;
        
        // Description
        const descDiv = document.createElement('div');
        descDiv.className = 'product-description';
        descDiv.innerHTML = `
            <h3>Product Description</h3>
            <p>This is a high-quality product that offers exceptional value and performance. 
            Perfect for daily use, it combines style, functionality, and durability.</p>
            <ul>
                <li>Premium quality materials</li>
                <li>Modern design</li>
                <li>Long-lasting durability</li>
                <li>Easy to use</li>
                <li>Excellent customer reviews</li>
            </ul>
        `;
        
        // Quantity selector
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity-selector';
        quantityDiv.innerHTML = `
            <label>Quantity:</label>
            <button onclick="changeQuantity(-1)">-</button>
            <input type="number" id="quantity" value="1" min="1" max="10" readonly>
            <button onclick="changeQuantity(1)">+</button>
        `;
        
        // Actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'product-actions';
        actionsDiv.innerHTML = `
            <button class="btn-primary" onclick="addToCartFromDetail()">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn-secondary" onclick="buyNow()">
                <i class="fas fa-bolt"></i> Buy Now
            </button>
        `;
        
        // Meta
        const metaDiv = document.createElement('div');
        metaDiv.className = 'product-meta';
        const categoryP = document.createElement('p');
        const categoryStrong = document.createElement('strong');
        categoryStrong.textContent = 'Category: ';
        categoryP.appendChild(categoryStrong);
        categoryP.appendChild(document.createTextNode(product.category));
        
        const skuP = document.createElement('p');
        const skuStrong = document.createElement('strong');
        skuStrong.textContent = 'SKU: ';
        skuP.appendChild(skuStrong);
        skuP.appendChild(document.createTextNode(product.id.toString().padStart(6, '0')));
        
        const availP = document.createElement('p');
        const availStrong = document.createElement('strong');
        availStrong.textContent = 'Availability: ';
        const availSpan = document.createElement('span');
        availSpan.style.color = '#067d62';
        availSpan.textContent = 'In Stock';
        availP.appendChild(availStrong);
        availP.appendChild(availSpan);
        
        metaDiv.appendChild(categoryP);
        metaDiv.appendChild(skuP);
        metaDiv.appendChild(availP);
        
        // Append all to info div
        infoDiv.appendChild(title);
        infoDiv.appendChild(rating);
        infoDiv.appendChild(price);
        infoDiv.appendChild(descDiv);
        infoDiv.appendChild(quantityDiv);
        infoDiv.appendChild(actionsDiv);
        infoDiv.appendChild(metaDiv);
        
        // Append to detail content
        detailContent.appendChild(imageDiv);
        detailContent.appendChild(infoDiv);
        
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
    
    // Clear grid first
    relatedGrid.innerHTML = '';
    
    // Create product cards using DOM methods to avoid XSS
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-image';
        imageDiv.textContent = product.image || '📦';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';
        
        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.name;
        
        const rating = document.createElement('div');
        rating.className = 'product-rating';
        rating.innerHTML = getRatingStars(product.rating);
        
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `$${product.price.toFixed(2)}`;
        
        const actions = document.createElement('div');
        actions.className = 'product-actions';
        
        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart';
        addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        addBtn.onclick = () => addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || '📦'
        });
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'view-details';
        viewBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        viewBtn.onclick = () => viewProduct(product.id);
        
        actions.appendChild(addBtn);
        actions.appendChild(viewBtn);
        
        infoDiv.appendChild(title);
        infoDiv.appendChild(rating);
        infoDiv.appendChild(price);
        infoDiv.appendChild(actions);
        
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        
        relatedGrid.appendChild(card);
    });
}
