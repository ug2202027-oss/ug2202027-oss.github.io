// Main JavaScript for homepage

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadHotDeals();
    loadLocalVendors();
});

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const products = Storage.getProducts();
    const featuredProducts = products.filter(p => p.featured).slice(0, 8);
    
    if (featuredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No featured products available</p>';
        return;
    }
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load hot deals
function loadHotDeals() {
    const container = document.getElementById('hotDeals');
    if (!container) return;
    
    const products = Storage.getProducts();
    const hotDeals = products.filter(p => p.hotDeal).slice(0, 8);
    
    if (hotDeals.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No hot deals available</p>';
        return;
    }
    
    container.innerHTML = hotDeals.map(product => createProductCard(product)).join('');
}

// Load local vendors
function loadLocalVendors() {
    const container = document.getElementById('localVendors');
    if (!container) return;
    
    const vendors = vendorsDB.filter(v => v.type === 'local').slice(0, 4);
    
    if (vendors.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No vendors available</p>';
        return;
    }
    
    container.innerHTML = vendors.map(vendor => createVendorCard(vendor)).join('');
}
