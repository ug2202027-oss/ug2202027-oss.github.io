-- Database Schema for Bdhotels
CREATE DATABASE IF NOT EXISTS bdhotels;
USE bdhotels;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    price_per_night DECIMAL(10, 2) NOT NULL,
    available_rooms INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hotel_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    rooms INT DEFAULT 1,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    booking_status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hotel_id INT NOT NULL,
    booking_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    admin_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- Insert default admin (password: password)
INSERT INTO admins (name, email, password) VALUES 
('Admin', 'admin@bdhotels.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample hotels
INSERT INTO hotels (name, location, address, description, image_url, price_per_night, available_rooms, rating, featured) VALUES
('Cox\'s Bazar Sea Beach Resort', 'Cox\'s Bazar', 'Beach Road, Cox\'s Bazar 4700', 'Luxury resort with stunning sea views and world-class amenities', 'https://via.placeholder.com/400x300?text=Cox+Bazar+Resort', 5000.00, 20, 4.5, TRUE),
('Sundarbans Eco Resort', 'Sundarbans', 'Mongla Port, Bagerhat', 'Experience the beauty of the world\'s largest mangrove forest', 'https://via.placeholder.com/400x300?text=Sundarbans+Resort', 4500.00, 15, 4.3, TRUE),
('Sylhet Tea Garden Hotel', 'Sylhet', 'Sreemangal, Sylhet Division', 'Stay amidst lush tea gardens and natural beauty', 'https://via.placeholder.com/400x300?text=Sylhet+Tea+Garden', 3500.00, 25, 4.4, TRUE),
('Dhaka Luxury Hotel', 'Dhaka', 'Gulshan-1, Dhaka 1212', 'Premium business hotel in the heart of Dhaka', 'https://via.placeholder.com/400x300?text=Dhaka+Luxury', 6000.00, 30, 4.6, TRUE),
('Chittagong Hill Resort', 'Chittagong', 'Kaptai, Rangamati', 'Beautiful hillside resort with lake views', 'https://via.placeholder.com/400x300?text=Chittagong+Hills', 4000.00, 18, 4.2, FALSE),
('Saint Martin Island Hotel', 'Saint Martin', 'Saint Martin Island', 'Beach hotel on Bangladesh\'s only coral island', 'https://via.placeholder.com/400x300?text=Saint+Martin', 5500.00, 12, 4.7, TRUE);
