# E-Commerce Database

This directory contains SQL Server database scripts for the e-commerce website.

## Database Structure

The database consists of the following tables:

### Tables

1. **Users**
   - Stores customer information
   - Fields: Id, FirstName, LastName, Email, PasswordHash, Phone, Address, CreatedAt, UpdatedAt

2. **Products**
   - Stores product catalog
   - Fields: Id, Name, Description, Price, Category, ImageUrl, StockQuantity, Rating, ReviewCount, CreatedAt, UpdatedAt

3. **Orders**
   - Stores customer orders
   - Fields: Id, UserId, Status, TotalAmount, ShippingAddress, CreatedAt, UpdatedAt

4. **OrderItems**
   - Stores individual items in each order
   - Fields: Id, OrderId, ProductId, Quantity, Price

## Setup Instructions

### Prerequisites
- SQL Server 2019 or higher
- SQL Server Management Studio (SSMS) or Azure Data Studio

### Installation

1. **Using SQL Server Management Studio:**
   - Open SSMS and connect to your SQL Server instance
   - Open `schema.sql` file
   - Execute the script (F5)

2. **Using Command Line:**
   ```bash
   sqlcmd -S localhost -i schema.sql
   ```

3. **Using Azure Data Studio:**
   - Open Azure Data Studio
   - Connect to your SQL Server instance
   - Open `schema.sql` file
   - Click "Run" button

### Connection String

Update the connection string in the backend `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EcommerceDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

For SQL Server Authentication:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EcommerceDB;User Id=your_username;Password=your_password;TrustServerCertificate=True;"
}
```

## Sample Data

The schema includes sample data:
- 12 products across various categories
- 2 sample users (password: `Password123`)
- 2 sample orders

## Security Notes

- Passwords are hashed using BCrypt
- The sample users have the password: `Password123` (for demo only)
- In production, ensure strong password policies
- Use parameterized queries to prevent SQL injection
- Enable SSL/TLS for database connections

## Stored Procedures (Optional)

You can create stored procedures for common operations:

```sql
-- Get user orders
CREATE PROCEDURE GetUserOrders
    @UserId INT
AS
BEGIN
    SELECT o.*, oi.ProductId, oi.Quantity, oi.Price, p.Name as ProductName
    FROM Orders o
    INNER JOIN OrderItems oi ON o.Id = oi.OrderId
    INNER JOIN Products p ON oi.ProductId = p.Id
    WHERE o.UserId = @UserId
    ORDER BY o.CreatedAt DESC;
END
GO

-- Search products
CREATE PROCEDURE SearchProducts
    @SearchTerm NVARCHAR(200),
    @Category NVARCHAR(100) = NULL,
    @MinPrice DECIMAL(18,2) = NULL,
    @MaxPrice DECIMAL(18,2) = NULL
AS
BEGIN
    SELECT * FROM Products
    WHERE (@SearchTerm IS NULL OR Name LIKE '%' + @SearchTerm + '%' OR Description LIKE '%' + @SearchTerm + '%')
        AND (@Category IS NULL OR Category = @Category)
        AND (@MinPrice IS NULL OR Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR Price <= @MaxPrice)
    ORDER BY Rating DESC, ReviewCount DESC;
END
GO
```

## Backup and Restore

### Backup
```sql
BACKUP DATABASE EcommerceDB
TO DISK = 'C:\Backup\EcommerceDB.bak'
WITH FORMAT;
```

### Restore
```sql
RESTORE DATABASE EcommerceDB
FROM DISK = 'C:\Backup\EcommerceDB.bak'
WITH REPLACE;
```

## Maintenance

Regular maintenance tasks:
- Update statistics weekly
- Rebuild indexes monthly
- Review query performance
- Monitor database size
- Regular backups

## Troubleshooting

### Connection Issues
- Verify SQL Server is running
- Check firewall settings
- Ensure TCP/IP is enabled in SQL Server Configuration Manager
- Verify connection string credentials

### Performance Issues
- Check index fragmentation
- Review query execution plans
- Update statistics
- Consider adding additional indexes based on query patterns
