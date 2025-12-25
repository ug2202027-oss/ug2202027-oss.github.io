# Brick Store

A PHP-based e-commerce platform for buying and selling construction bricks.

## Features

- **Search Functionality**: Search bricks by name, description, seller name/ID, or district
- **Seller Status Filtering**: Automatically filters to show only approved sellers (when seller_status column exists)
- **Image Gallery**: Lightbox viewer for multiple product images with keyboard navigation
- **User Roles**: Support for customers, sellers, and administrators
- **Responsive Design**: Mobile-friendly grid layout

## Database Schema

The application expects the following database tables:

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    type ENUM('customer', 'seller', 'admin') NOT NULL,
    seller_status ENUM('pending', 'approved', 'rejected') DEFAULT NULL,
    district VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bricks Table
```sql
CREATE TABLE bricks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    image VARCHAR(255) DEFAULT NULL,
    photo_detail TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
```

### Brick Images Table
```sql
CREATE TABLE brick_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brick_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    caption TEXT DEFAULT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brick_id) REFERENCES bricks(id)
);
```

## Configuration

Create a `.env` file or set environment variables:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=brick_store
```

## Installation

1. Clone the repository
2. Set up your database and create the required tables
3. Configure database credentials (environment variables or modify `helpers.php`)
4. Ensure PHP 7.4+ with mysqli extension is installed
5. Point your web server to the repository directory

## Security Features

- Prepared statements for SQL queries
- HTML output escaping to prevent XSS
- Input validation for database operations
- Session-based authentication
- Password hashing (to be implemented)

## File Structure

```
.
├── index.php              # Homepage with brick listing and search
├── helpers.php            # Database connection and utility functions
├── login.php              # Login page (placeholder)
├── register.php           # Registration page (placeholder)
├── logout.php             # Logout handler
├── seller_dashboard.php   # Seller dashboard (placeholder)
├── customer_dashboard.php # Customer dashboard (placeholder)
├── admin_dashboard.php    # Admin dashboard (placeholder)
├── cart.php              # Shopping cart (placeholder)
├── add_to_cart.php       # Add to cart handler (placeholder)
├── assets/
│   ├── css/
│   │   ├── styles.css    # Main stylesheet
│   │   └── lightbox.css  # Lightbox styles
│   └── js/
│       └── lightbox.js   # Image gallery functionality
└── uploads/              # Directory for uploaded images
```

## Development Status

This is a work in progress. The following features are implemented as placeholders:
- User authentication
- User registration
- Shopping cart
- Checkout process
- Admin/seller/customer dashboards

## License

This project is part of an open-source portfolio.