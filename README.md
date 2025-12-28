# BrickBD E-Commerce System

An intermediate e-commerce website developed as an academic project for **CIT-222: Information System Analysis and Design Sessional** at Patuakhali Science and Technology University.

![BrickBD Homepage](https://github.com/user-attachments/assets/64b03abd-4e02-4bfe-9e57-c59f57751824)

## 📋 Project Overview

BrickBD is a comprehensive e-commerce platform that bridges the gap between global platforms like Daraz and locally focused sites like AjkerDeal. The system supports both customers and local vendors, providing a modern, responsive interface for online shopping with features like persistent cart, guest checkout, order tracking, and product reviews.

### Team Members
- **Md. Mehedi Hasan** (ID: 2202020) - Team Leader
- **Md. Ashikur Rahman** (ID: 2202027)
- **Md. Saifullah** (ID: 2202039)

### Submitted To
- Prof. Golam Md. Muradul Bashir (Department of Computer and Communication Engineering)
- Muhtasim (Department of Computer Science and Information Technology)

## 🎯 Key Features

### Customer Features
- **User Account Management** - Registration, login, and role-based access (Admin/Customer)
- **Product Catalog** - Browse products with structured categories and advanced filters
- **Search & Filters** - Search by name, filter by category, price range, and ratings
- **Shopping Cart** - Persistent cart functionality with guest checkout support
- **Wishlist** - Save products for later purchase
- **Checkout Process** - Multiple payment options (Cash on Delivery, Card, bKash, Nagad)
- **Order Tracking** - Real-time order status updates (Pending, Confirmed, Shipped, Delivered)
- **Product Reviews** - Rate and review purchased products with verified purchase badges
- **Discount System** - Apply coupon codes for discounts
- **Responsive Design** - Mobile-friendly interface

### Vendor Features
- **Local Vendor Support** - Platform supports small and local sellers
- **Vendor Profiles** - Display vendor ratings, products, orders, and followers
- **Verified Badges** - Trust indicators for verified vendors

### Admin Features
- **Admin Dashboard** - Overview with statistics (products, orders, users, revenue)
- **Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Order Management** - Update order status and view order details
- **User Management** - View all registered users and their statistics
- **Inventory Alerts** - Low stock product notifications
- **Reports** - Basic reporting on sales and inventory

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Custom responsive CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.4.0
- **Data Storage**: Browser LocalStorage (client-side persistence)
- **Design Pattern**: Component-based architecture

## 📁 Project Structure

```
ug2202027-oss.github.io/
├── index.html                 # Landing page
├── css/
│   ├── styles.css            # Main stylesheet
│   ├── auth.css              # Login/Register styles
│   ├── products.css          # Product listing styles
│   ├── cart.css              # Shopping cart styles
│   ├── checkout.css          # Checkout page styles
│   ├── product-detail.css    # Product detail styles
│   └── admin.css             # Admin panel styles
├── js/
│   ├── data.js               # Mock database (products, vendors, users)
│   ├── utils.js              # Utility functions (storage, formatting)
│   └── main.js               # Homepage functionality
├── pages/
│   ├── login.html            # Authentication page
│   ├── products.html         # Product catalog
│   ├── product-detail.html   # Single product view
│   ├── cart.html             # Shopping cart
│   ├── checkout.html         # Checkout process
│   ├── order-confirmation.html # Order success page
│   ├── track-order.html      # Order tracking
│   ├── profile.html          # User profile
│   ├── wishlist.html         # Saved products
│   ├── vendors.html          # Local vendors listing
│   ├── deals.html            # Hot deals page
│   └── admin/
│       ├── dashboard.html    # Admin dashboard
│       ├── products.html     # Product management
│       ├── orders.html       # Order management
│       └── users.html        # User management
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required (static HTML/CSS/JS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ug2202027-oss/ug2202027-oss.github.io.git
   cd ug2202027-oss.github.io
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python3 -m http.server 8080
     
     # Using Node.js
     npx http-server -p 8080
     ```
   - Navigate to `http://localhost:8080`

3. **Test Accounts**
   - **Admin**: 
     - Email: `admin@brickbd.me`
     - Password: `admin123`
   - **Customer**: 
     - Email: `ashikur@example.com`
     - Password: `user123`

## 📱 Features Walkthrough

### For Customers

1. **Browse Products**
   - Visit the homepage to see featured products and hot deals
   - Navigate to "All Products" for complete catalog
   - Use filters to narrow down by category, price, and rating

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Cart persists across sessions using LocalStorage
   - View cart summary with item count in header

3. **Checkout**
   - Login or continue as guest
   - Fill in shipping information
   - Choose payment method (COD, Card, Mobile Wallets)
   - Apply discount coupons (e.g., WELCOME10, FLASH50)
   - Place order and receive confirmation

4. **Track Orders**
   - Use "Track Order" page with your Order ID
   - View order status timeline
   - Check expected delivery date

5. **Manage Profile**
   - View order history
   - Manage wishlist
   - Update account information

### For Administrators

1. **Access Admin Panel**
   - Login with admin credentials
   - Redirects to admin dashboard

2. **Manage Products**
   - Add new products with details
   - Edit existing products
   - Delete products
   - Monitor low stock alerts

3. **Manage Orders**
   - View all orders
   - Update order status
   - View customer details

4. **View Statistics**
   - Total products, orders, users
   - Revenue tracking
   - Recent orders overview

## 🔧 Configuration

### Coupon Codes
Available discount coupons (defined in `js/data.js`):
- `WELCOME10` - 10% off on orders above ৳1000
- `FLASH50` - Flat ৳50 off on orders above ৳500
- `MEGA100` - Flat ৳100 off on orders above ৳2000

### Shipping
- Free shipping on orders above ৳500
- Flat ৳60 shipping fee for orders below ৳500

### Payment Methods
- Cash on Delivery (COD)
- Credit/Debit Card
- bKash Mobile Wallet
- Nagad Mobile Wallet

## 📊 Benchmark Analysis

Comparison with existing e-commerce platforms:

| Feature | Daraz | AjkerDeal | BrickBD |
|---------|-------|-----------|---------|
| Product Catalog | Large, diverse | Variety, less structured | Structured categories + filters |
| Shopping Cart | Yes | Yes | Persistent cart, guest checkout |
| Order Tracking | Real-time updates | Basic status | Basic, expandable |
| Payment Options | Multiple | Limited (Mostly COD) | Multiple + Wallet Integration |
| Discounts | Flash sales, vouchers | Discounts, deals | Customized coupon system |
| Reviews | Yes | Yes | With verified purchase option |
| Wishlist | Yes | No | Yes |
| Vendor Support | No | Limited | Supports local/small sellers |
| User Interface | Advanced & modern | Average | Clean, modern, responsive |

## 🎨 Design Principles

- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 992px
- **Color Scheme**: 
  - Primary: #e74c3c (Red)
  - Secondary: #3498db (Blue)
  - Success: #27ae60 (Green)
  - Dark: #2c3e50
- **Typography**: Segoe UI font family
- **Accessibility**: Clear contrast ratios, semantic HTML
- **Performance**: Optimized CSS, minimal dependencies

## 🔐 Security Considerations

**Note**: This is an academic project with simplified security:
- Passwords stored in plain text (for demonstration only)
- No server-side validation
- LocalStorage used for data persistence

**For production use, implement**:
- Backend authentication system
- Password hashing (bcrypt)
- HTTPS encryption
- Server-side validation
- Database storage
- CSRF protection
- Rate limiting

## 📈 Future Enhancements

- Backend integration with Node.js/Express or .NET
- SQL Server database integration
- Real-time notifications
- Email confirmations
- Payment gateway integration
- Advanced search with filters
- Product recommendations
- Live chat support
- Multi-language support
- Social media integration

## 🐛 Known Limitations

- Client-side only (no backend)
- Data persists only in browser LocalStorage
- No real payment processing
- Limited to single browser/device
- No email notifications
- Placeholder images (via placeholder.com)

## 📄 License

This is an academic project developed for educational purposes at Patuakhali Science and Technology University.

## 📞 Contact

For questions or feedback about this project:
- **Email**: support@brickbd.me
- **Institution**: Patuakhali Science and Technology University
- **Course**: CIT-222 Information System Analysis and Design Sessional

## 🙏 Acknowledgments

- Faculty members of Computer Science and Engineering department
- Prof. Golam Md. Muradul Bashir
- Lecturer Muhtasim
- Patuakhali Science and Technology University

---

**Submission Date**: October 21, 2025  
**Academic Year**: Level-II, Semester-II  
**Course Code**: CIT-222