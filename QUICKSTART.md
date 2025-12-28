# 🚀 Quick Start Guide - Bdhotels

## Fastest Way to Get Started (5 Minutes)

### Step 1: Setup Database (2 minutes)
```bash
# Open MySQL console or phpMyAdmin
mysql -u root -p

# Run these commands:
CREATE DATABASE bdhotels;
USE bdhotels;
SOURCE database/schema.sql;
exit;
```

### Step 2: Configure (30 seconds)
Edit `php/config.php`:
```php
define('DB_USER', 'root');      // Your MySQL username
define('DB_PASS', '');          // Your MySQL password
```

### Step 3: Deploy (1 minute)
```bash
# Copy files to web server
# XAMPP: C:/xampp/htdocs/bdhotels/
# WAMP: C:/wamp64/www/bdhotels/
# Linux: /var/www/html/bdhotels/

# Start Apache and MySQL
```

### Step 4: Access (30 seconds)
Open browser:
- **Homepage**: http://localhost/bdhotels/
- **Admin**: http://localhost/bdhotels/admin-login.php
  - Email: `admin@bdhotels.com`
  - Password: `password`

---

## Test the Complete System (10 Minutes)

### Test 1: Admin Functions (3 minutes)
1. Login: http://localhost/bdhotels/admin-login.php
2. View dashboard (see 6 sample hotels)
3. Add a new hotel:
   - Name: "Dhaka Test Hotel"
   - Location: "Dhaka"
   - Address: "123 Test Street"
   - Price: 3000
   - Rooms: 10
4. View in hotel list
5. Edit the hotel (change price to 3500)
6. Don't delete yet (we'll use it for booking)

### Test 2: User Registration & Booking (5 minutes)
1. Go to: http://localhost/bdhotels/user-register.php
2. Register new user:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "01712345678"
   - Password: "test123"
3. Search for hotels:
   - Location: "Dhaka"
   - Check-in: Tomorrow's date
   - Check-out: Day after tomorrow
4. Click "View Details & Book" on any hotel
5. Fill booking form and submit
6. Complete payment:
   - Phone: 01712345678
   - PIN: 12345
   - Click "Pay"
7. View "My Bookings" - see "Pending" status

### Test 3: Admin Approval & Review (2 minutes)
1. Switch back to admin panel
2. Go to "Manage Bookings"
3. See the new booking (pending + completed payment)
4. Click "Approve"
5. Switch back to user
6. Refresh "My Bookings" - see "Approved" status
7. Click "Review" button
8. Add 5-star review with comment
9. Submit review

### Test 4: Admin Review Reply (1 minute)
1. Switch to admin panel
2. Go to "Reviews & Feedback"
3. See the new review
4. Click "Reply to Review"
5. Enter: "Thank you for your feedback!"
6. View on hotel details page (user side)

---

## 🎯 What You Should See

### Homepage
- ✅ Blue header with "Bdhotels" logo
- ✅ Search form with date pickers
- ✅ 6 featured hotels in grid
- ✅ 6 popular destinations
- ✅ Professional footer

### Admin Dashboard
- ✅ Sidebar with navigation
- ✅ 4 statistics cards
- ✅ Recent bookings table
- ✅ Clean, professional layout

### Booking Flow
- ✅ Hotel search results
- ✅ Detailed hotel page
- ✅ Booking form with validation
- ✅ bKash payment page (pink theme)
- ✅ Success confirmation

### Review System
- ✅ Star rating display
- ✅ User comments
- ✅ Admin replies (blue box)
- ✅ Dates and user names

---

## 🐛 Troubleshooting Quick Fixes

### "Cannot connect to database"
```bash
# Check MySQL is running
# In XAMPP Control Panel: Start MySQL
# Or command line:
sudo service mysql start
```

### "Featured hotels not showing"
```bash
# Run SQL:
UPDATE hotels SET featured = 1 LIMIT 6;
```

### "Login not working"
```php
// Check php/config.php has correct DB credentials
// Clear browser cookies
// Try: admin@bdhotels.com / password
```

### "Payment not completing"
```sql
-- Check database:
SELECT * FROM bookings ORDER BY id DESC LIMIT 1;
-- Should show payment_status = 'completed'
```

---

## 📱 Mobile Testing

1. Open Chrome DevTools (F12)
2. Click mobile icon (top left)
3. Select "iPhone 12 Pro" or "iPad"
4. Test all pages
5. Everything should be responsive!

---

## 🎨 Customization Quick Tips

### Change Colors
```css
/* In css/style.css, find and replace: */
#003580  →  Your primary color
#0071c2  →  Your secondary color
#e2136e  →  Your accent color
```

### Change Logo
```html
<!-- In all .php files, replace: -->
<h1>Bdhotels</h1>
<!-- With: -->
<img src="logo.png" alt="Logo">
```

### Add More Hotels
1. Login as admin
2. "Manage Hotels" → "Add New Hotel"
3. Fill form with real data
4. Set "Featured" for homepage display

---

## 📊 Default Data

### Admin Account
- Email: admin@bdhotels.com
- Password: password

### Sample Hotels (6)
1. Cox's Bazar Sea Beach Resort - ৳5000/night ⭐4.5
2. Sundarbans Eco Resort - ৳4500/night ⭐4.3
3. Sylhet Tea Garden Hotel - ৳3500/night ⭐4.4
4. Dhaka Luxury Hotel - ৳6000/night ⭐4.6
5. Chittagong Hill Resort - ৳4000/night ⭐4.2
6. Saint Martin Island Hotel - ৳5500/night ⭐4.7

---

## 🎓 Learning Path

### Day 1: Setup
- Install XAMPP/WAMP
- Setup database
- Access homepage

### Day 2: User Flow
- Register account
- Search hotels
- Make booking
- Complete payment

### Day 3: Admin Flow
- Login as admin
- Add hotel
- Approve booking
- Reply to review

### Day 4: Customization
- Change colors
- Add real images
- Modify text
- Add more hotels

### Day 5: Deploy
- Choose hosting
- Upload files
- Configure domain
- Test live site

---

## 🔗 Important URLs

```
Homepage:           http://localhost/bdhotels/
User Login:         http://localhost/bdhotels/user-login.php
User Register:      http://localhost/bdhotels/user-register.php
Search Hotels:      http://localhost/bdhotels/search-hotels.php
Admin Login:        http://localhost/bdhotels/admin-login.php
Admin Dashboard:    http://localhost/bdhotels/admin-dashboard.php
```

---

## 📞 Need Help?

1. **Check documentation**:
   - README.md - Overview
   - SETUP_GUIDE.md - Detailed setup
   - FEATURES.md - All features
   - ARCHITECTURE.md - System design

2. **Enable PHP errors**:
   ```php
   // Add to top of any .php file:
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```

3. **Check browser console**:
   - F12 → Console tab
   - Look for JavaScript errors

4. **Check database**:
   ```sql
   SHOW TABLES;
   SELECT COUNT(*) FROM hotels;
   SELECT * FROM users;
   ```

---

## ✅ Success Checklist

After setup, you should be able to:
- [ ] View homepage with 6 featured hotels
- [ ] Search hotels by location
- [ ] Register new user account
- [ ] Login as user
- [ ] Book a hotel
- [ ] Complete bKash payment
- [ ] Login as admin
- [ ] View dashboard statistics
- [ ] Add new hotel
- [ ] Approve booking
- [ ] Reply to review

If all checked, you're ready to go! 🎉

---

## 🚀 Next Steps

1. **Add Real Content**:
   - Upload actual hotel images
   - Add real hotel descriptions
   - Update locations

2. **Enhance Features**:
   - Add email notifications
   - Integrate real payment
   - Add booking calendar
   - Create mobile app

3. **Deploy to Production**:
   - Choose hosting provider
   - Setup SSL certificate
   - Configure domain
   - Test thoroughly

---

**Ready to build amazing hotel booking experiences! 🏨**
