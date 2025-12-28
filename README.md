# Bdhotels - Hotel Booking Website

A complete hotel booking website for Bangladesh, inspired by Booking.com. Built with HTML, CSS, JavaScript, PHP, and MySQL.

## Features

### User Module
- User registration and login
- Search hotels by location
- View hotel details and reviews
- Book hotels with date selection
- bKash payment gateway (demo)
- View booking history
- Add reviews and ratings for hotels

### Admin Module
- Separate admin login
- Admin dashboard with statistics
- Add, edit, and delete hotels
- Manage hotel listings
- Approve/reject bookings after payment
- View and reply to user reviews
- Manage featured hotels on homepage

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** PHP
- **Database:** MySQL
- **Payment:** bKash Gateway (Demo/Mockup)

## Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Web browser

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE bdhotels;
```

2. Import the database schema:
```bash
mysql -u root -p bdhotels < database/schema.sql
```

Or manually run the SQL file located at `database/schema.sql`

### Configuration

1. Update database credentials in `php/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'bdhotels');
```

2. Ensure PHP session support is enabled in your PHP configuration.

### Running the Application

1. Place the project files in your web server's document root (e.g., `htdocs` for XAMPP, `www` for WAMP)

2. Start your web server and MySQL service

3. Access the application:
   - Homepage: `http://localhost/`
   - User Login: `http://localhost/user-login.php`
   - Admin Login: `http://localhost/admin-login.php`

### Default Admin Credentials
- **Email:** admin@bdhotels.com
- **Password:** password

## Project Structure

```
├── index.html              # Homepage
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functions
├── php/
│   ├── config.php         # Database configuration
│   ├── register-user.php  # User registration handler
│   ├── login-user.php     # User login handler
│   ├── login-admin.php    # Admin login handler
│   ├── create-booking.php # Create booking handler
│   ├── complete-payment.php # Payment completion
│   └── ... (other PHP files)
├── database/
│   └── schema.sql         # Database schema
├── user-login.php         # User login page
├── user-register.php      # User registration page
├── admin-login.php        # Admin login page
├── search-hotels.php      # Hotel search page
├── hotel-details.php      # Hotel details page
├── payment.php            # Payment page
├── user-bookings.php      # User bookings page
├── add-review.php         # Add review page
├── admin-dashboard.php    # Admin dashboard
├── admin-hotels.php       # Manage hotels
├── admin-bookings.php     # Manage bookings
└── admin-reviews.php      # Manage reviews
```

## Features in Detail

### Homepage
- Featured hotels from Bangladesh
- Popular tourist destinations
- Search form for quick hotel search
- Responsive design

### User Features
1. **Registration & Login:** Secure user authentication
2. **Hotel Search:** Search by location, check-in/out dates, and room count
3. **Hotel Booking:** Select rooms and dates, view pricing
4. **Payment:** Demo bKash payment gateway (one-tap payment simulation)
5. **Booking Management:** View all bookings and their status
6. **Reviews:** Add ratings and reviews for stayed hotels

### Admin Features
1. **Dashboard:** Overview of hotels, bookings, and users
2. **Hotel Management:** Add, edit, delete, and feature hotels
3. **Booking Management:** View all bookings, approve/reject after payment
4. **Review Management:** View all reviews and reply to them
5. **Real-time Notifications:** Pending bookings counter

## Security Features

- Password hashing using PHP's `password_hash()`
- SQL injection prevention using prepared statements
- XSS prevention using input sanitization
- Session-based authentication
- Role-based access control (User vs Admin)

## Database Schema

### Tables
- **users:** User accounts
- **admins:** Admin accounts
- **hotels:** Hotel listings
- **bookings:** Booking records
- **reviews:** User reviews and ratings

See `database/schema.sql` for complete schema details.

## Future Enhancements

- Email notifications
- Real payment gateway integration
- Advanced search filters
- Hotel image gallery
- User profile management
- Admin analytics dashboard
- Multi-language support
- Mobile app

## Support

For issues or questions, please contact the development team.

## License

This project is created for educational purposes.