# Bdhotels - Complete Feature Documentation

## Overview
Bdhotels is a full-featured hotel booking website for Bangladesh, inspired by Booking.com. It includes separate user and admin modules with complete booking workflow, payment processing, and review system.

---

## 🏠 HOMEPAGE FEATURES

### 1. Navigation Bar
- **Logo**: "Bdhotels" branding
- **Menu Items**:
  - Home
  - Hotels (search page)
  - User Login
  - Admin Login

### 2. Hero Section
- **Search Form**:
  - Location input (city/district)
  - Check-in date picker
  - Check-out date picker
  - Room selection (1-5+)
  - Search button
- **Background**: Gradient overlay with Bangladesh imagery
- **Headline**: "Find your next stay in Bangladesh"

### 3. Featured Hotels Section
- Dynamically loaded from database
- Shows 6 featured hotels
- Each card displays:
  - Hotel image
  - Hotel name
  - Location with pin icon
  - Rating badge (e.g., 4.5)
  - Rating text (Excellent/Very Good/Good)
  - Price per night in BDT (৳)
  - Hover effects
  - Click to view details

### 4. Popular Destinations
- Static grid of 6 tourist spots:
  1. Cox's Bazar - World's longest natural sea beach
  2. Sundarbans - Largest mangrove forest
  3. Sylhet - Land of tea gardens
  4. Dhaka - Capital city
  5. Saint Martin - Only coral island
  6. Chittagong Hill Tracts - Beautiful hills
- Each with image and description

### 5. Footer
- Company info
- Quick links (Home, Search, Register, Login)
- Support links
- Copyright notice

---

## 👤 USER MODULE FEATURES

### User Registration (user-register.php)
**Fields**:
- Full Name
- Email Address
- Phone Number
- Password
- Confirm Password

**Validation**:
- Email format check
- Password minimum 6 characters
- Password confirmation match
- Duplicate email check
- Phone number required

**After Registration**:
- Password hashed with bcrypt
- Success message
- Redirect to login page

### User Login (user-login.php)
**Fields**:
- Email Address
- Password

**Features**:
- Secure authentication
- Session creation
- Password verification
- Error messages for invalid credentials
- Remember user session
- Redirect to hotel search page

### Hotel Search (search-hotels.php)
**Search Criteria**:
- Location (partial match search)
- Check-in date
- Check-out date
- Number of rooms

**Results Display**:
- Hotel cards with:
  - Image
  - Name
  - Location and address
  - Rating
  - Price per night
  - Available rooms count
  - "View Details & Book" button
- Shows count of results
- "No results" message if none found

**Features**:
- Real-time database search
- Sort by rating (highest first)
- Only show hotels with available rooms
- Pass search criteria to detail page

### Hotel Details (hotel-details.php)
**Left Column**:
- Large hotel image
- Hotel name and address
- Rating badge with text
- About section (description)
- Guest reviews section:
  - User name
  - Rating (1-5)
  - Comment
  - Admin reply (if any)
  - Date posted

**Right Column (Booking Box)**:
- Price per night
- Available rooms
- Booking form:
  - Check-in date
  - Check-out date
  - Room selection
  - "Book Now" button
- Login prompt if not logged in

**Features**:
- Sticky booking box
- Date validation
- Real-time price calculation
- User authentication check

### Booking Process (php/create-booking.php)
**Workflow**:
1. Validate user is logged in
2. Check dates are valid
3. Verify room availability
4. Calculate total amount:
   - Number of nights × price per night × rooms
5. Create booking record
6. Set status to "pending"
7. Redirect to payment page

**Database Entry**:
- User ID
- Hotel ID
- Check-in/out dates
- Number of rooms
- Total amount
- Payment status: "pending"
- Booking status: "pending"

### Payment (payment.php)
**bKash Gateway Mockup**:
- bKash logo (pink theme)
- Booking details summary:
  - Hotel name
  - Location
  - Check-in/out dates
  - Number of rooms and nights
- Large amount display
- Payment form:
  - bKash account number (11 digits)
  - bKash PIN
  - Pay button with amount

**After Payment**:
- Generate transaction ID (TRX + timestamp)
- Update payment_status to "completed"
- Save transaction ID
- Show success message
- Inform user about admin approval
- Redirect to bookings page

### My Bookings (user-bookings.php)
**Table Columns**:
1. Booking ID
2. Hotel name and location
3. Check-in date
4. Check-out date
5. Number of rooms
6. Total amount
7. Payment status badge
8. Booking status badge
9. Actions:
   - "Pay Now" (if payment pending)
   - "Review" (if booking approved)

**Status Badges**:
- **Payment**: Pending (yellow), Completed (blue)
- **Booking**: Pending (yellow), Approved (green), Rejected (red)

**Features**:
- View all bookings
- Sort by latest first
- Quick access to payment
- Quick access to review form
- Empty state message

### Add Review (add-review.php)
**Requirements**:
- User must be logged in
- Booking must be approved
- Can review each booking once

**Form Fields**:
- Rating (1-5 stars dropdown)
- Review comment (textarea)

**After Submission**:
- Save review to database
- Update hotel average rating
- Show success message
- Redirect to bookings page

**Display**:
- Shows on hotel details page
- User can see admin replies

---

## 👨‍💼 ADMIN MODULE FEATURES

### Admin Login (admin-login.php)
**Default Credentials**:
- Email: admin@bdhotels.com
- Password: password

**Features**:
- Separate authentication from users
- Secure session
- Different access level
- Redirect to dashboard

### Admin Dashboard (admin-dashboard.php)
**Sidebar Navigation**:
- Dashboard (active)
- Manage Hotels
- Manage Bookings
- Reviews & Feedback
- Logout

**Statistics Cards** (4 cards):
1. Total Hotels
2. Total Bookings
3. Pending Approvals (highlighted)
4. Total Users

**Recent Bookings Table**:
- Last 10 bookings
- Quick overview:
  - Booking ID
  - User name
  - Hotel name
  - Check-in date
  - Amount
  - Status badge

### Manage Hotels (admin-hotels.php)
**Hotel List Table**:
- ID
- Name
- Location
- Price per night
- Available rooms
- Rating
- Featured (Yes/No)
- Actions:
  - Edit button
  - Delete button

**Features**:
- "Add New Hotel" button (top right)
- Sort by newest first
- Delete confirmation dialog
- Real-time updates

### Add Hotel (admin-add-hotel.php)
**Form Fields**:
- Hotel Name * (required)
- Location * (e.g., Cox's Bazar)
- Full Address * (textarea)
- Description (textarea)
- Image URL (external link)
- Price per Night * (number, BDT)
- Available Rooms * (number)
- Featured checkbox (for homepage)

**Features**:
- Form validation
- Default placeholder image if URL empty
- Success message
- Redirect to hotel list

### Edit Hotel (admin-edit-hotel.php)
**Same form as Add Hotel but**:
- Pre-filled with existing data
- Hotel ID passed as parameter
- "Update Hotel" button
- Can modify all fields
- Rating is auto-calculated from reviews

### Manage Bookings (admin-bookings.php)
**Comprehensive Table**:
- Booking ID
- User info (name + email)
- Hotel name
- Check-in/out dates
- Rooms
- Total amount
- Payment status
- Transaction ID
- Booking status
- Actions:
  - Approve button (green)
  - Reject button (red)

**Approval Workflow**:
1. User completes payment
2. Booking shows in pending list
3. Admin reviews booking
4. Admin clicks Approve/Reject
5. Status updates immediately
6. User sees updated status

**Features**:
- Only show actions for pending + paid bookings
- Confirmation dialogs
- Real-time status updates
- Filter by payment status

### Reviews & Feedback (admin-reviews.php)
**Review Cards**:
Each review shows:
- Hotel name
- User name
- Rating (1-5 badge)
- Review date
- Review text (highlighted box)
- Admin reply (if exists, blue box)
- "Reply to Review" button

**Reply Feature**:
- Click reply button
- Enter reply in prompt
- Submit reply
- Reply appears on hotel page
- User can see admin response

**Features**:
- All reviews in one place
- Latest first
- Easy reply system
- Professional appearance

---

## 🔐 SECURITY FEATURES

### Password Security
- Bcrypt hashing (PHP password_hash)
- Salt automatically generated
- One-way encryption
- Secure verification

### SQL Injection Prevention
- All queries use prepared statements
- Parameter binding
- No direct SQL concatenation
- Input sanitization

### XSS Prevention
- htmlspecialchars() on all output
- Strip tags on input
- Sanitize function in config.php
- Safe HTML rendering

### Session Management
- Session-based authentication
- Server-side validation
- Session timeout
- Secure session handling
- Different sessions for user/admin

### Access Control
- requireUserLogin() function
- requireAdminLogin() function
- Redirect to login if not authenticated
- Route protection on all pages

---

## 💾 DATABASE SCHEMA

### Tables Summary

**users** (5 columns):
- id (PK, auto increment)
- name, email (unique), password, phone
- created_at (timestamp)

**admins** (4 columns):
- id (PK, auto increment)
- name, email (unique), password
- created_at (timestamp)

**hotels** (10 columns):
- id (PK, auto increment)
- name, location, address, description, image_url
- price_per_night (decimal), available_rooms (int)
- rating (decimal), featured (boolean)
- created_at (timestamp)

**bookings** (11 columns):
- id (PK, auto increment)
- user_id (FK), hotel_id (FK)
- check_in, check_out (dates)
- rooms (int), total_amount (decimal)
- payment_status (enum), booking_status (enum)
- transaction_id (varchar)
- created_at (timestamp)

**reviews** (8 columns):
- id (PK, auto increment)
- user_id (FK), hotel_id (FK), booking_id (FK)
- rating (int 1-5), comment (text)
- admin_reply (text, nullable)
- created_at (timestamp)

### Relationships
- users → bookings (one-to-many)
- hotels → bookings (one-to-many)
- users → reviews (one-to-many)
- hotels → reviews (one-to-many)
- bookings → reviews (one-to-one)

---

## 📱 RESPONSIVE DESIGN

### Desktop (1200px+)
- Full navigation menu
- Multi-column layouts
- Large images
- Sidebar + main content

### Tablet (768px - 1199px)
- Stacked columns
- Readable content
- Touch-friendly buttons
- Optimized grids

### Mobile (< 768px)
- Single column layout
- Full-width elements
- Hamburger menu (ready)
- Touch-optimized

---

## 🎨 DESIGN SYSTEM

### Colors
- **Primary Blue**: #003580 (headers, buttons)
- **Light Blue**: #0071c2 (hover, links)
- **Success Green**: #28a745 (approved status)
- **Warning Yellow**: #ffc107 (pending status)
- **Danger Red**: #dc3545 (rejected, delete)
- **bKash Pink**: #e2136e (payment gateway)
- **Gray Backgrounds**: #f5f5f5
- **White**: #ffffff (cards, forms)

### Typography
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Headings: Bold, color #003580
- Body: 16px, line-height 1.6
- Small text: 14px
- Large display: 42px (hero)

### Spacing
- Container: max-width 1200px
- Padding: 20px, 30px, 40px
- Gaps: 15px, 20px, 25px, 30px
- Border radius: 4px, 8px

### Components
- Cards with shadow: 0 2px 8px rgba(0,0,0,0.1)
- Hover effects: transform, opacity
- Transitions: 0.3s ease
- Buttons: 12px padding, rounded

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Deployment:
- [ ] Update database credentials in config.php
- [ ] Change admin password
- [ ] Add real hotel images
- [ ] Test all user flows
- [ ] Test all admin functions
- [ ] Check responsive design
- [ ] Enable error logging
- [ ] Disable debug mode
- [ ] Set up SSL certificate
- [ ] Configure session security
- [ ] Add .htaccess rules
- [ ] Test payment flow
- [ ] Review security settings

### Production Settings:
```php
// In php/config.php (for production)
error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/error.log');
```

---

## 📊 FEATURE STATISTICS

- **Total Pages**: 13 user pages + 5 admin pages = 18 pages
- **PHP Backend Files**: 14 files
- **Database Tables**: 5 tables
- **CSS Lines**: 600+ lines
- **JavaScript Functions**: 20+ functions
- **Sample Hotels**: 6 pre-loaded
- **User Flows**: 3 main flows
- **Admin Functions**: 10+ admin features

---

## 🎯 USER JOURNEY EXAMPLES

### Journey 1: First-time User Books Hotel
1. Visit homepage → See featured hotels
2. Click search → Enter "Cox's Bazar"
3. See results → Click hotel
4. View details → Click "Book Now"
5. Redirect to register → Create account
6. Fill booking form → Submit
7. Redirect to payment → Enter bKash details
8. Complete payment → View confirmation
9. Check bookings → See "Pending" status
10. Wait for admin approval

### Journey 2: Admin Manages Booking
1. Login to admin dashboard
2. See pending approval notification
3. Go to Manage Bookings
4. Review user booking details
5. Verify payment transaction ID
6. Click "Approve"
7. User booking status changes to "Approved"
8. User can now add review

### Journey 3: User Adds Review
1. Login to user account
2. Go to My Bookings
3. Find approved booking
4. Click "Review" button
5. Select rating (5 stars)
6. Write comment
7. Submit review
8. Review appears on hotel page
9. Admin sees review
10. Admin replies to review

---

## 🔧 CUSTOMIZATION OPTIONS

### Easy Customizations:
1. **Colors**: Edit CSS variables
2. **Logo**: Replace text with image
3. **Images**: Update hotel images in database
4. **Text**: Edit page headings and descriptions
5. **Email**: Add notification emails (future)

### Advanced Customizations:
1. Add room types
2. Add hotel amenities
3. Implement actual payment gateway
4. Add email notifications
5. Create mobile app
6. Add booking calendar
7. Implement availability system
8. Add discount codes

---

## 📞 SUPPORT & DOCUMENTATION

- **README.md**: Overview and installation
- **SETUP_GUIDE.md**: Detailed setup instructions
- **FEATURES.md**: This comprehensive guide
- **database/schema.sql**: Database structure

For technical support, review the code comments and documentation files.

---

**Built with ❤️ for Bangladesh tourism and hospitality industry**
