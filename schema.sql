-- Brick Store Database Schema
-- This file contains the database structure for the Brick Store application

-- Create database
CREATE DATABASE IF NOT EXISTS brick_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE brick_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    type ENUM('customer', 'seller', 'admin') NOT NULL DEFAULT 'customer',
    seller_status ENUM('pending', 'approved', 'rejected') DEFAULT NULL,
    district VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_seller_status (seller_status),
    INDEX idx_district (district)
) ENGINE=InnoDB;

-- Bricks table
CREATE TABLE IF NOT EXISTS bricks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    image VARCHAR(255) DEFAULT NULL,
    photo_detail TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_seller_id (seller_id),
    INDEX idx_quantity (quantity),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_name_description (name, description)
) ENGINE=InnoDB;

-- Brick images table (for multiple images per brick)
CREATE TABLE IF NOT EXISTS brick_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brick_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    caption TEXT DEFAULT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brick_id) REFERENCES bricks(id) ON DELETE CASCADE,
    INDEX idx_brick_id (brick_id),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB;

-- Shopping cart table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    brick_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (brick_id) REFERENCES bricks(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (customer_id, brick_id),
    INDEX idx_customer_id (customer_id)
) ENGINE=InnoDB;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    brick_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (brick_id) REFERENCES bricks(id),
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB;

-- Sample data (optional)
-- Uncomment to insert sample data

-- Insert sample admin user (password: admin123)
-- INSERT INTO users (username, email, password, type) VALUES 
-- ('admin', 'admin@brickstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample seller (password: seller123)
-- INSERT INTO users (username, email, password, type, seller_status, district) VALUES 
-- ('john_seller', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'seller', 'approved', 'Dhaka');

-- Insert sample customer (password: customer123)
-- INSERT INTO users (username, email, password, type) VALUES 
-- ('jane_customer', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer');

-- Insert sample bricks
-- INSERT INTO bricks (seller_id, name, description, price, quantity) VALUES
-- (2, 'Red Clay Brick', 'High-quality red clay bricks suitable for construction', 0.50, 10000),
-- (2, 'Concrete Block', 'Durable concrete blocks for heavy-duty construction', 1.50, 5000),
-- (2, 'Lightweight Brick', 'Eco-friendly lightweight bricks with excellent insulation', 0.75, 7500);
