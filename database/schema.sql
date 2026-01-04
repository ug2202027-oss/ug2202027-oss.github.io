-- E-Commerce Database Schema for SQL Server
-- Create Database
USE master;
GO

-- Drop database if exists (for clean install)
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'EcommerceDB')
BEGIN
    ALTER DATABASE EcommerceDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE EcommerceDB;
END
GO

-- Create new database
CREATE DATABASE EcommerceDB;
GO

USE EcommerceDB;
GO

-- Table: Users
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    Phone NVARCHAR(20),
    Address NVARCHAR(500),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2
);
GO

-- Table: Products
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(2000),
    Price DECIMAL(18, 2) NOT NULL CHECK (Price > 0),
    Category NVARCHAR(100) NOT NULL,
    ImageUrl NVARCHAR(500),
    StockQuantity INT NOT NULL DEFAULT 0,
    Rating DECIMAL(3, 2) DEFAULT 0 CHECK (Rating >= 0 AND Rating <= 5),
    ReviewCount INT DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2
);
GO

-- Table: Orders
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(18, 2) NOT NULL CHECK (TotalAmount > 0),
    ShippingAddress NVARCHAR(500) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);
GO

-- Table: OrderItems
CREATE TABLE OrderItems (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    Price DECIMAL(18, 2) NOT NULL CHECK (Price > 0),
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
);
GO

-- Indexes for better query performance
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Products_Category ON Products(Category);
CREATE INDEX IX_Products_Price ON Products(Price);
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_Orders_Status ON Orders(Status);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId);
GO

-- Insert sample products
INSERT INTO Products (Name, Description, Price, Category, ImageUrl, StockQuantity, Rating, ReviewCount, CreatedAt) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation and long battery life', 79.99, 'electronics', '🎧', 50, 4.5, 120, GETUTCDATE()),
('Smart Watch', 'Feature-rich smart watch with fitness tracking and notifications', 199.99, 'electronics', '⌚', 30, 4.7, 85, GETUTCDATE()),
('Laptop Backpack', 'Durable laptop backpack with multiple compartments', 49.99, 'fashion', '🎒', 75, 4.3, 64, GETUTCDATE()),
('Gaming Mouse', 'Precision gaming mouse with customizable buttons and RGB lighting', 39.99, 'electronics', '🖱️', 100, 4.6, 200, GETUTCDATE()),
('Coffee Maker', 'Automatic coffee maker with programmable settings', 89.99, 'home', '☕', 40, 4.4, 95, GETUTCDATE()),
('Running Shoes', 'Comfortable running shoes with excellent cushioning', 129.99, 'sports', '👟', 60, 4.8, 150, GETUTCDATE()),
('Desk Lamp', 'Modern LED desk lamp with adjustable brightness', 34.99, 'home', '💡', 80, 4.2, 55, GETUTCDATE()),
('Bluetooth Speaker', 'Portable Bluetooth speaker with powerful sound', 59.99, 'electronics', '🔊', 90, 4.5, 110, GETUTCDATE()),
('Yoga Mat', 'Non-slip yoga mat for comfortable practice', 29.99, 'sports', '🧘', 120, 4.6, 88, GETUTCDATE()),
('Programming Book', 'Comprehensive guide to programming fundamentals', 44.99, 'books', '📚', 45, 4.9, 175, GETUTCDATE()),
('Board Game', 'Exciting family board game for all ages', 34.99, 'toys', '🎲', 70, 4.7, 92, GETUTCDATE()),
('Winter Jacket', 'Warm and stylish winter jacket', 159.99, 'fashion', '🧥', 35, 4.5, 68, GETUTCDATE());
GO

-- Insert sample user (password: Password123)
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Phone, Address, CreatedAt) VALUES
('John', 'Doe', 'john.doe@example.com', '$2a$11$k1q.vOh3EZ2Vq5ztBX.8Xu8N9BXm8L5cYvJkP4xh5KzZOQX6LsD0O', '+1234567890', '123 Main St, City, State 12345', GETUTCDATE()),
('Jane', 'Smith', 'jane.smith@example.com', '$2a$11$k1q.vOh3EZ2Vq5ztBX.8Xu8N9BXm8L5cYvJkP4xh5KzZOQX6LsD0O', '+1987654321', '456 Elm St, Town, State 67890', GETUTCDATE());
GO

-- Insert sample orders
DECLARE @UserId INT = (SELECT Id FROM Users WHERE Email = 'john.doe@example.com');

INSERT INTO Orders (UserId, Status, TotalAmount, ShippingAddress, CreatedAt) VALUES
(@UserId, 'Delivered', 129.98, '123 Main St, City, State 12345', DATEADD(DAY, -15, GETUTCDATE())),
(@UserId, 'Processing', 249.98, '123 Main St, City, State 12345', DATEADD(DAY, -2, GETUTCDATE()));
GO

-- Insert order items
DECLARE @Order1Id INT = (SELECT TOP 1 Id FROM Orders WHERE Status = 'Delivered');
DECLARE @Order2Id INT = (SELECT TOP 1 Id FROM Orders WHERE Status = 'Processing');

INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price) VALUES
(@Order1Id, 1, 1, 79.99),
(@Order1Id, 3, 1, 49.99),
(@Order2Id, 2, 1, 199.99),
(@Order2Id, 4, 1, 39.99);
GO

PRINT 'Database created and seeded successfully!';
GO
