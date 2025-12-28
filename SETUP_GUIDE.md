# Bdhotels Website - Setup and Usage Guide

## Quick Start Guide

### Step 1: Database Setup

1. Open phpMyAdmin or MySQL console
2. Create database:
   ```sql
   CREATE DATABASE bdhotels;
   ```
3. Import the schema:
   - Navigate to `database/schema.sql`
   - Run the SQL file in your MySQL database
   - This will create all tables and insert sample hotels

### Step 2: Configure Database Connection

Edit `php/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');           // Your MySQL username
define('DB_PASS', '');               // Your MySQL password
define('DB_NAME', 'bdhotels');
```

### Step 3: Deploy to Web Server

1. Copy all files to your web server directory:
   - XAMPP: `C:/xampp/htdocs/bdhotels/`
   - WAMP: `C:/wamp64/www/bdhotels/`
   - Linux: `/var/www/html/bdhotels/`

2. Start Apache and MySQL services

3. Access the website:
   - Homepage: `http://localhost/bdhotels/`
   - Admin Login: `http://localhost/bdhotels/admin-login.php`

### Step 4: Test the Website

#### Test Admin Features:
1. Go to `http://localhost/bdhotels/admin-login.php`
2. Login with:
   - Email: `admin@bdhotels.com`
   - Password: `password`
3. Try:
   - View dashboard statistics
   - Add a new hotel
   - Manage bookings (after users create some)
   - Reply to reviews

#### Test User Features:
1. Go to `http://localhost/bdhotels/user-register.php`
2. Create a new user account
3. Login and try:
   - Search for hotels (e.g., "Cox's Bazar")
   - View hotel details
   - Book a hotel
   - Complete payment (demo bKash)
   - View your bookings
   - Add a review after booking is approved

## Website Flow

### User Journey:
```
1. User visits homepage
   ↓
2. Searches for hotels by location
   ↓
3. Views hotel details and reviews
   ↓
4. Registers/Logs in
   ↓
5. Books a hotel (selects dates and rooms)
   ↓
6. Completes payment via bKash (demo)
   ↓
7. Waits for admin approval
   ↓
8. Receives approval notification
   ↓
9. Can add review after stay
```

### Admin Journey:
```
1. Admin logs in to dashboard
   ↓
2. Views statistics and recent bookings
   ↓
3. Manages hotels:
   - Add new hotels
   - Edit existing hotels
   - Delete hotels
   - Feature hotels on homepage
   ↓
4. Manages bookings:
   - View all bookings
   - Approve paid bookings
   - Reject bookings if needed
   ↓
5. Manages reviews:
   - Read user reviews
   - Reply to reviews
```

## Key Features Explained

### 1. Homepage (index.html)
- **Hero Section**: Search form with location, dates, and rooms
- **Featured Hotels**: Displays hotels marked as "featured" in database
- **Popular Destinations**: Static showcase of Bangladesh tourist spots
- **Responsive Design**: Works on desktop and mobile

### 2. User Authentication
- **Registration**: Email validation, password confirmation, phone number
- **Login**: Secure session-based authentication
- **Password Security**: Passwords are hashed using PHP's bcrypt

### 3. Hotel Search (search-hotels.php)
- Search by location (partial match)
- Filter by check-in/out dates
- Show available rooms
- Sort by rating
- Direct booking links

### 4. Hotel Details (hotel-details.php)
- Full hotel information
- Image gallery (placeholder)
- Pricing per night
- User reviews with admin replies
- Booking form (only for logged-in users)

### 5. Booking System
- **Date Selection**: JavaScript validation for valid date ranges
- **Room Selection**: Based on availability
- **Price Calculation**: Automatic calculation of total cost
- **Status Tracking**: Pending → Approved/Rejected

### 6. bKash Payment (payment.php)
- **Demo Gateway**: Simulates bKash interface
- **One-Tap Payment**: Simplified payment process
- **Transaction ID**: Auto-generated for tracking
- **Status Update**: Payment status saved to database

### 7. Review System
- **Rating**: 1-5 stars
- **Comments**: Text feedback
- **Admin Reply**: Admins can respond to reviews
- **Display**: Shows on hotel details page

### 8. Admin Dashboard
- **Statistics Cards**: 
  - Total Hotels
  - Total Bookings
  - Pending Approvals
  - Total Users
- **Recent Bookings Table**: Quick overview
- **Navigation Menu**: Easy access to all admin features

### 9. Admin Hotel Management
- **Add Hotels**: Form with all hotel details
- **Edit Hotels**: Update existing hotels
- **Delete Hotels**: Remove hotels from system
- **Feature Hotels**: Mark hotels to appear on homepage
- **Image URLs**: Support for external images

### 10. Admin Booking Management
- **View All Bookings**: Complete booking history
- **Filter by Status**: Pending, Approved, Rejected
- **Approve Bookings**: One-click approval
- **User Information**: See who made the booking
- **Payment Verification**: Check transaction IDs

## Database Structure

### Tables Overview:

**users**
- id, name, email, password, phone, created_at
- Stores customer accounts

**admins**
- id, name, email, password, created_at
- Stores admin accounts (default: admin@bdhotels.com)

**hotels**
- id, name, location, address, description, image_url
- price_per_night, available_rooms, rating, featured, created_at
- Stores hotel listings

**bookings**
- id, user_id, hotel_id, check_in, check_out, rooms
- total_amount, payment_status, booking_status, transaction_id
- Stores booking records

**reviews**
- id, user_id, hotel_id, booking_id, rating, comment
- admin_reply, created_at
- Stores reviews and feedback

## Sample Data

The database comes with 6 pre-loaded hotels:
1. Cox's Bazar Sea Beach Resort (₹5000/night) ⭐4.5
2. Sundarbans Eco Resort (₹4500/night) ⭐4.3
3. Sylhet Tea Garden Hotel (₹3500/night) ⭐4.4
4. Dhaka Luxury Hotel (₹6000/night) ⭐4.6
5. Chittagong Hill Resort (₹4000/night) ⭐4.2
6. Saint Martin Island Hotel (₹5500/night) ⭐4.7

## Customization Guide

### Change Colors:
Edit `css/style.css`:
- Primary: `#003580` (Booking.com blue)
- Secondary: `#0071c2`
- Success: `#28a745`
- Danger: `#dc3545`

### Add More Hotels:
1. Login as admin
2. Go to "Manage Hotels"
3. Click "Add New Hotel"
4. Fill in details and submit

### Change bKash Logo:
Edit `payment.php`:
```html
<img src="your-bkash-logo.png" alt="bKash">
```

### Modify Email Messages:
Future enhancement - currently uses session messages

## Troubleshooting

### Problem: Cannot connect to database
**Solution**: 
- Check MySQL is running
- Verify credentials in `php/config.php`
- Ensure database `bdhotels` exists

### Problem: Featured hotels not showing
**Solution**:
- Run `php/get-featured-hotels.php` directly to check
- Ensure hotels have `featured = 1` in database
- Check browser console for JavaScript errors

### Problem: Login not working
**Solution**:
- Check session support is enabled in PHP
- Verify password hash in database matches
- Clear browser cookies and cache

### Problem: Payment not completing
**Solution**:
- Check `bookings` table for payment_status
- Verify user_id matches session
- Check JavaScript console for errors

## Security Considerations

1. **SQL Injection**: All queries use prepared statements
2. **XSS**: All output is sanitized with `htmlspecialchars()`
3. **CSRF**: Session-based validation (can be enhanced)
4. **Passwords**: Hashed using bcrypt algorithm
5. **Authentication**: Session-based with server-side validation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (responsive design)

## Performance Tips

1. Add indexes to frequently queried columns
2. Enable MySQL query caching
3. Compress CSS/JS files for production
4. Use CDN for images
5. Enable browser caching

## Next Steps

After setup, you can:
1. Add real hotel images
2. Integrate real payment gateway
3. Add email notifications
4. Implement search filters
5. Add booking cancellation
6. Create user profiles
7. Add hotel amenities
8. Implement availability calendar

## Support

For help with setup or usage:
1. Check the main README.md
2. Review the database schema
3. Check PHP error logs
4. Enable error reporting in PHP for debugging

## Credits

Built with:
- PHP 7.4+
- MySQL 5.7+
- Bootstrap-inspired CSS
- Vanilla JavaScript
- Font Awesome icons (optional)

---

**Note**: This is a demo/educational project. For production use, implement additional security measures, proper error handling, and professional hosting setup.
