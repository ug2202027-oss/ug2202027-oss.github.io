// Mock Data for E-Commerce System
// This file contains sample data for products, users, orders, vendors, etc.

// Products Database
const productsDB = [
    // Electronics
    {
        id: 1,
        name: "Samsung Galaxy A54 5G",
        category: "electronics",
        price: 42999,
        originalPrice: 47999,
        discount: 10,
        image: "https://via.placeholder.com/250x250/3498db/ffffff?text=Galaxy+A54",
        description: "6.4\" Super AMOLED display, 50MP camera, 128GB storage",
        rating: 4.5,
        reviews: 128,
        stock: 45,
        vendor: "Tech Galaxy BD",
        vendorType: "local",
        featured: true,
        hotDeal: true
    },
    {
        id: 2,
        name: "Apple MacBook Air M2",
        category: "electronics",
        price: 135000,
        originalPrice: 145000,
        discount: 7,
        image: "https://via.placeholder.com/250x250/95a5a6/ffffff?text=MacBook+Air",
        description: "13.6\" Liquid Retina, M2 chip, 8GB RAM, 256GB SSD",
        rating: 4.8,
        reviews: 89,
        stock: 12,
        vendor: "Apple Store BD",
        vendorType: "authorized",
        featured: true,
        hotDeal: false
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        category: "electronics",
        price: 28500,
        originalPrice: 32000,
        discount: 11,
        image: "https://via.placeholder.com/250x250/34495e/ffffff?text=Sony+WH1000XM5",
        description: "Premium noise cancelling, 30hr battery, Bluetooth 5.2",
        rating: 4.7,
        reviews: 234,
        stock: 28,
        vendor: "Sound World",
        vendorType: "local",
        featured: true,
        hotDeal: true
    },
    {
        id: 4,
        name: "Dell XPS 15 Laptop",
        category: "electronics",
        price: 165000,
        originalPrice: 175000,
        discount: 6,
        image: "https://via.placeholder.com/250x250/2c3e50/ffffff?text=Dell+XPS+15",
        description: "15.6\" 4K OLED, Intel i7, 16GB RAM, 512GB SSD",
        rating: 4.6,
        reviews: 67,
        stock: 8,
        vendor: "Computer Valley",
        vendorType: "authorized",
        featured: false,
        hotDeal: false
    },
    
    // Fashion
    {
        id: 5,
        name: "Premium Cotton T-Shirt",
        category: "fashion",
        price: 599,
        originalPrice: 899,
        discount: 33,
        image: "https://via.placeholder.com/250x250/e74c3c/ffffff?text=T-Shirt",
        description: "100% premium cotton, comfortable fit, multiple colors",
        rating: 4.3,
        reviews: 456,
        stock: 150,
        vendor: "Fashion Hub BD",
        vendorType: "local",
        featured: true,
        hotDeal: true
    },
    {
        id: 6,
        name: "Denim Jacket",
        category: "fashion",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        image: "https://via.placeholder.com/250x250/3498db/ffffff?text=Denim+Jacket",
        description: "Classic denim jacket, perfect for casual wear",
        rating: 4.4,
        reviews: 189,
        stock: 45,
        vendor: "Style Station",
        vendorType: "local",
        featured: true,
        hotDeal: true
    },
    {
        id: 7,
        name: "Formal Shirt",
        category: "fashion",
        price: 1299,
        originalPrice: 1799,
        discount: 28,
        image: "https://via.placeholder.com/250x250/9b59b6/ffffff?text=Formal+Shirt",
        description: "Professional formal shirt, wrinkle-free fabric",
        rating: 4.2,
        reviews: 312,
        stock: 89,
        vendor: "Gentleman's Choice",
        vendorType: "local",
        featured: false,
        hotDeal: false
    },
    {
        id: 8,
        name: "Sneakers",
        category: "fashion",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        image: "https://via.placeholder.com/250x250/e67e22/ffffff?text=Sneakers",
        description: "Comfortable sports sneakers, breathable material",
        rating: 4.5,
        reviews: 278,
        stock: 67,
        vendor: "Shoe Palace",
        vendorType: "local",
        featured: true,
        hotDeal: false
    },

    // Home & Living
    {
        id: 9,
        name: "LED Table Lamp",
        category: "home",
        price: 1899,
        originalPrice: 2499,
        discount: 24,
        image: "https://via.placeholder.com/250x250/16a085/ffffff?text=Table+Lamp",
        description: "Adjustable LED lamp, USB charging, eye-friendly",
        rating: 4.4,
        reviews: 145,
        stock: 78,
        vendor: "Home Decor BD",
        vendorType: "local",
        featured: false,
        hotDeal: true
    },
    {
        id: 10,
        name: "Coffee Maker",
        category: "home",
        price: 4599,
        originalPrice: 5999,
        discount: 23,
        image: "https://via.placeholder.com/250x250/27ae60/ffffff?text=Coffee+Maker",
        description: "Automatic drip coffee maker, 12 cup capacity",
        rating: 4.6,
        reviews: 98,
        stock: 34,
        vendor: "Kitchen World",
        vendorType: "local",
        featured: true,
        hotDeal: false
    },
    {
        id: 11,
        name: "Bed Sheet Set",
        category: "home",
        price: 2299,
        originalPrice: 2999,
        discount: 23,
        image: "https://via.placeholder.com/250x250/f39c12/ffffff?text=Bed+Sheet",
        description: "Premium cotton bed sheet set, king size",
        rating: 4.5,
        reviews: 234,
        stock: 56,
        vendor: "Comfort Home",
        vendorType: "local",
        featured: false,
        hotDeal: true
    },

    // Books
    {
        id: 12,
        name: "The Psychology of Money",
        category: "books",
        price: 399,
        originalPrice: 550,
        discount: 27,
        image: "https://via.placeholder.com/250x250/2980b9/ffffff?text=Psychology+Money",
        description: "By Morgan Housel - Financial wisdom",
        rating: 4.8,
        reviews: 567,
        stock: 123,
        vendor: "Book Corner",
        vendorType: "local",
        featured: true,
        hotDeal: false
    },
    {
        id: 13,
        name: "Atomic Habits",
        category: "books",
        price: 425,
        originalPrice: 599,
        discount: 29,
        image: "https://via.placeholder.com/250x250/8e44ad/ffffff?text=Atomic+Habits",
        description: "By James Clear - Transform your habits",
        rating: 4.9,
        reviews: 789,
        stock: 145,
        vendor: "Book Corner",
        vendorType: "local",
        featured: true,
        hotDeal: true
    },

    // Sports
    {
        id: 14,
        name: "Yoga Mat",
        category: "sports",
        price: 1299,
        originalPrice: 1799,
        discount: 28,
        image: "https://via.placeholder.com/250x250/1abc9c/ffffff?text=Yoga+Mat",
        description: "Non-slip yoga mat, eco-friendly material",
        rating: 4.3,
        reviews: 167,
        stock: 89,
        vendor: "Fitness Pro",
        vendorType: "local",
        featured: false,
        hotDeal: true
    },
    {
        id: 15,
        name: "Dumbbell Set",
        category: "sports",
        price: 3999,
        originalPrice: 4999,
        discount: 20,
        image: "https://via.placeholder.com/250x250/e74c3c/ffffff?text=Dumbbell+Set",
        description: "Adjustable dumbbell set, 20kg total weight",
        rating: 4.5,
        reviews: 134,
        stock: 45,
        vendor: "Fitness Pro",
        vendorType: "local",
        featured: true,
        hotDeal: false
    },

    // Toys
    {
        id: 16,
        name: "LEGO City Set",
        category: "toys",
        price: 4599,
        originalPrice: 5999,
        discount: 23,
        image: "https://via.placeholder.com/250x250/f39c12/ffffff?text=LEGO+City",
        description: "Building blocks set, 500+ pieces",
        rating: 4.7,
        reviews: 234,
        stock: 67,
        vendor: "Toy Kingdom",
        vendorType: "local",
        featured: true,
        hotDeal: false
    }
];

// Vendors Database
const vendorsDB = [
    {
        id: 1,
        name: "Tech Galaxy BD",
        logo: "TG",
        description: "Premium electronics and gadgets from trusted brands",
        rating: 4.6,
        products: 234,
        orders: 1240,
        followers: 5670,
        type: "local",
        verified: true
    },
    {
        id: 2,
        name: "Fashion Hub BD",
        logo: "FH",
        description: "Latest fashion trends and comfortable clothing",
        rating: 4.4,
        products: 456,
        orders: 2340,
        followers: 8920,
        type: "local",
        verified: true
    },
    {
        id: 3,
        name: "Book Corner",
        logo: "BC",
        description: "Wide collection of books from various genres",
        rating: 4.7,
        products: 1234,
        orders: 3450,
        followers: 12340,
        type: "local",
        verified: true
    },
    {
        id: 4,
        name: "Home Decor BD",
        logo: "HD",
        description: "Transform your home with beautiful decor items",
        rating: 4.5,
        products: 345,
        orders: 1560,
        followers: 6780,
        type: "local",
        verified: true
    },
    {
        id: 5,
        name: "Fitness Pro",
        logo: "FP",
        description: "Sports equipment and fitness accessories",
        rating: 4.3,
        products: 167,
        orders: 890,
        followers: 4320,
        type: "local",
        verified: true
    }
];

// Users Database (Mock - in real app would be in backend)
const usersDB = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@brickbd.me",
        password: "admin123", // In production, this would be hashed
        role: "admin",
        phone: "+880 1234-567890",
        address: "Patuakhali, Bangladesh"
    },
    {
        id: 2,
        name: "Md. Ashikur Rahman",
        email: "ashikur@example.com",
        password: "user123",
        role: "customer",
        phone: "+880 1712-345678",
        address: "Dhaka, Bangladesh"
    }
];

// Orders Database (Mock)
const ordersDB = [
    {
        id: 1001,
        userId: 2,
        items: [
            { productId: 1, quantity: 1, price: 42999 },
            { productId: 3, quantity: 1, price: 28500 }
        ],
        total: 71499,
        discount: 0,
        shippingAddress: "Dhaka, Bangladesh",
        paymentMethod: "Cash on Delivery",
        status: "shipped",
        orderDate: "2025-10-15",
        expectedDelivery: "2025-10-25"
    }
];

// Reviews Database
const reviewsDB = [
    {
        id: 1,
        productId: 1,
        userId: 2,
        userName: "Md. Ashikur Rahman",
        rating: 5,
        comment: "Excellent phone! Great value for money.",
        date: "2025-10-10",
        verified: true
    },
    {
        id: 2,
        productId: 3,
        userId: 2,
        userName: "Md. Ashikur Rahman",
        rating: 5,
        comment: "Amazing sound quality and noise cancellation!",
        date: "2025-10-12",
        verified: true
    }
];

// Coupons Database
const couponsDB = [
    {
        code: "WELCOME10",
        discount: 10,
        type: "percentage",
        minAmount: 1000,
        maxDiscount: 500,
        description: "10% off on orders above ৳1000"
    },
    {
        code: "FLASH50",
        discount: 50,
        type: "flat",
        minAmount: 500,
        maxDiscount: 50,
        description: "Flat ৳50 off on orders above ৳500"
    },
    {
        code: "MEGA100",
        discount: 100,
        type: "flat",
        minAmount: 2000,
        maxDiscount: 100,
        description: "Flat ৳100 off on orders above ৳2000"
    }
];

// Category Data
const categoriesDB = [
    { id: "electronics", name: "Electronics", icon: "fa-laptop", count: 234 },
    { id: "fashion", name: "Fashion", icon: "fa-tshirt", count: 456 },
    { id: "home", name: "Home & Living", icon: "fa-couch", count: 345 },
    { id: "books", name: "Books", icon: "fa-book", count: 789 },
    { id: "sports", name: "Sports", icon: "fa-football-ball", count: 167 },
    { id: "toys", name: "Toys & Games", icon: "fa-gamepad", count: 234 }
];

// Export data (for use in other files)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productsDB,
        vendorsDB,
        usersDB,
        ordersDB,
        reviewsDB,
        couponsDB,
        categoriesDB
    };
}
