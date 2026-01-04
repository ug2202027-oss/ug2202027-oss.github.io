# ShopHub - E-Commerce Website

An intermediate-level e-commerce website built with HTML, CSS, JavaScript frontend and .NET backend with SQL Server database.

## 🚀 Features

### Frontend (HTML, CSS, JavaScript)
- **Home Page** - Hero section, featured products, categories, deals
- **Products Page** - Product listing with filters and sorting
- **Product Detail Page** - Detailed product information
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout** - Complete order with shipping and payment info
- **User Authentication** - Login and registration pages
- **Responsive Design** - Mobile-friendly layout

### Backend (.NET Web API)
- **RESTful API** - Product, User, Order, and Auth endpoints
- **JWT Authentication** - Secure user authentication
- **Entity Framework Core** - ORM for database operations
- **CORS Support** - Cross-origin requests enabled

### Database (SQL Server)
- **Products Table** - Store product catalog
- **Users Table** - Customer information
- **Orders Table** - Order management
- **OrderItems Table** - Order line items
- **Sample Data** - Pre-populated with demo products

## 📁 Project Structure

```
├── index.html              # Home page
├── products.html           # Products listing
├── product-detail.html     # Product detail page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── login.html             # Login page
├── register.html          # Registration page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── app.js             # Core functionality
│   ├── products.js        # Product management
│   ├── product-detail.js  # Product detail logic
│   ├── cart.js            # Cart management
│   ├── checkout.js        # Checkout logic
│   └── auth.js            # Authentication
├── backend/
│   ├── README.md          # Backend documentation
│   ├── ProductsController.cs
│   ├── AuthController.cs
│   ├── OrdersController.cs
│   ├── Models.cs
│   └── ApplicationDbContext.cs
└── database/
    ├── README.md          # Database documentation
    └── schema.sql         # Database schema and seed data
```

## 🛠️ Setup Instructions

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ug2202027-oss/ug2202027-oss.github.io.git
   cd ug2202027-oss.github.io
   ```

2. Open `index.html` in a web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

### Backend Setup

See [backend/README.md](backend/README.md) for detailed instructions.

Quick start:
```bash
cd backend
# Install .NET SDK 6.0 or higher
dotnet restore
dotnet run
```

### Database Setup

See [database/README.md](database/README.md) for detailed instructions.

Quick start:
```bash
# Using SQL Server Management Studio or sqlcmd
sqlcmd -S localhost -i database/schema.sql
```

## 🎯 Usage

### Shopping Flow

1. **Browse Products** - View products on home page or products page
2. **Filter & Search** - Use category filters and search functionality
3. **View Details** - Click on products to see detailed information
4. **Add to Cart** - Add items to shopping cart
5. **Checkout** - Complete purchase with shipping and payment info
6. **Order Confirmation** - Receive order confirmation

### User Flow

1. **Register** - Create a new account
2. **Login** - Sign in to your account
3. **Browse & Shop** - Add items to cart
4. **Checkout** - Complete your order

## 🔑 Demo Credentials

**Test User:**
- Email: `john.doe@example.com`
- Password: `Password123`

## 🌐 Live Demo

Visit: [https://brickbd.me](https://brickbd.me)

## 🛡️ Security Features

- Password hashing with BCrypt
- JWT token-based authentication
- HTTPS support
- SQL injection prevention
- XSS protection
- CORS configuration

## 🎨 Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- Font Awesome Icons

### Backend
- .NET 6.0 Web API
- Entity Framework Core
- JWT Authentication
- BCrypt.Net

### Database
- SQL Server 2019+

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Configuration

### API Endpoint

Update the API endpoint in `js/app.js`:
```javascript
const API_BASE_URL = 'https://localhost:5001/api';
```

### Database Connection

Update connection string in backend `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EcommerceDB;..."
}
```

## 📝 API Documentation

Once the backend is running, visit:
- Swagger UI: `https://localhost:5001/swagger`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**ug2202027-oss**
- GitHub: [@ug2202027-oss](https://github.com/ug2202027-oss)

## 🙏 Acknowledgments

- Font Awesome for icons
- Inspiration from Amazon and other e-commerce platforms