# E-Commerce Backend API (.NET)

This directory contains the .NET Web API backend for the e-commerce website.

## Project Structure

```
backend/
├── EcommerceAPI/
│   ├── Controllers/
│   │   ├── ProductsController.cs
│   │   ├── UsersController.cs
│   │   ├── OrdersController.cs
│   │   └── AuthController.cs
│   ├── Models/
│   │   ├── Product.cs
│   │   ├── User.cs
│   │   ├── Order.cs
│   │   └── CartItem.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Services/
│   │   ├── AuthService.cs
│   │   └── EmailService.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── EcommerceAPI.csproj
└── README.md
```

## Prerequisites

- .NET 6.0 SDK or higher
- SQL Server 2019 or higher
- Visual Studio 2022 or VS Code

## Setup Instructions

### 1. Create the .NET Web API Project

```bash
cd backend
dotnet new webapi -n EcommerceAPI
cd EcommerceAPI
```

### 2. Install Required NuGet Packages

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package BCrypt.Net-Next
dotnet add package Swashbuckle.AspNetCore
```

### 3. Configure Connection String

Update `appsettings.json` with your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EcommerceDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyHere_MustBe32CharactersOrMore!",
    "Issuer": "EcommerceAPI",
    "Audience": "EcommerceClient"
  }
}
```

### 4. Create Database

Run the SQL scripts in the `database/` folder to create the database schema.

### 5. Run Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 6. Run the API

```bash
dotnet run
```

The API will be available at `https://localhost:5001`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove cart item

## Testing

Use the Swagger UI at `https://localhost:5001/swagger` to test the API endpoints.

## Security

- JWT authentication is implemented
- Passwords are hashed using BCrypt
- HTTPS is enforced
- CORS is configured for the frontend

## Notes

- The frontend is configured to call the API at `https://localhost:5001/api`
- Update the API_BASE_URL in the frontend `js/app.js` if the API runs on a different port
- For production, update the connection string and JWT settings
