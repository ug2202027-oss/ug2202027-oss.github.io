# Bdhotels System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BDHOTELS SYSTEM                          │
│                    Hotel Booking Website                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │   USER INTERFACE     │      │   ADMIN INTERFACE    │        │
│  ├──────────────────────┤      ├──────────────────────┤        │
│  │ • index.html         │      │ • admin-login.php    │        │
│  │ • user-login.php     │      │ • admin-dashboard.php│        │
│  │ • user-register.php  │      │ • admin-hotels.php   │        │
│  │ • search-hotels.php  │      │ • admin-bookings.php │        │
│  │ • hotel-details.php  │      │ • admin-reviews.php  │        │
│  │ • payment.php        │      │ • admin-add-hotel.php│        │
│  │ • user-bookings.php  │      │ • admin-edit-hotel.php│       │
│  │ • add-review.php     │      └──────────────────────┘        │
│  └──────────────────────┘                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                         STYLING LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  • css/style.css (600+ lines)                                   │
│    - Booking.com-inspired design                                │
│    - Responsive layouts                                         │
│    - Component styles                                           │
│    - Color scheme (Blue: #003580, Pink: #e2136e)               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      JAVASCRIPT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  • js/main.js (300+ lines)                                      │
│    - Date validation                                            │
│    - Dynamic content loading                                    │
│    - AJAX requests                                              │
│    - Form validation                                            │
│    - Modal handling                                             │
│    - Admin actions (approve, delete, reply)                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                       BUSINESS LOGIC LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│                      PHP Backend (php/)                          │
│                                                                  │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │ AUTHENTICATION       │      │  HOTEL MANAGEMENT    │        │
│  ├──────────────────────┤      ├──────────────────────┤        │
│  │ • config.php         │      │ • save-hotel.php     │        │
│  │ • register-user.php  │      │ • update-hotel.php   │        │
│  │ • login-user.php     │      │ • delete-hotel.php   │        │
│  │ • login-admin.php    │      │ • get-featured-hotels│        │
│  │ • logout.php         │      └──────────────────────┘        │
│  └──────────────────────┘                                       │
│                                                                  │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │ BOOKING & PAYMENT    │      │  REVIEW SYSTEM       │        │
│  ├──────────────────────┤      ├──────────────────────┤        │
│  │ • create-booking.php │      │ • submit-review.php  │        │
│  │ • complete-payment.php│      │ • reply-review.php   │        │
│  │ • update-booking-     │      └──────────────────────┘        │
│  │   status.php         │                                       │
│  └──────────────────────┘                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                    MySQL Database (bdhotels)                     │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  users   │  │  admins  │  │  hotels  │  │ bookings │       │
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤       │
│  │ id       │  │ id       │  │ id       │  │ id       │       │
│  │ name     │  │ name     │  │ name     │  │ user_id  │       │
│  │ email    │  │ email    │  │ location │  │ hotel_id │       │
│  │ password │  │ password │  │ address  │  │ check_in │       │
│  │ phone    │  │ created  │  │ price    │  │ check_out│       │
│  │ created  │  └──────────┘  │ rooms    │  │ rooms    │       │
│  └──────────┘                │ rating   │  │ amount   │       │
│                               │ featured │  │ payment  │       │
│  ┌──────────┐                │ created  │  │ status   │       │
│  │ reviews  │                └──────────┘  │ trans_id │       │
│  ├──────────┤                               │ created  │       │
│  │ id       │                               └──────────┘       │
│  │ user_id  │                                                  │
│  │ hotel_id │                                                  │
│  │ booking  │    Relationships:                               │
│  │ rating   │    • users → bookings (1:N)                     │
│  │ comment  │    • hotels → bookings (1:N)                    │
│  │ admin_   │    • users → reviews (1:N)                      │
│  │  reply   │    • hotels → reviews (1:N)                     │
│  │ created  │    • bookings → reviews (1:1)                   │
│  └──────────┘                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

════════════════════════════════════════════════════════════════════

                        DATA FLOW DIAGRAM

USER BOOKING FLOW:
──────────────────

  User            →    Search Hotels    →    View Details
    ↓                                             ↓
  Register/Login  ←                         Select Dates
    ↓                                             ↓
  Create Booking  →    Calculate Cost    →    Proceed to Pay
    ↓                                             ↓
  bKash Payment   →    Generate TRX ID   →    Update DB
    ↓                                             ↓
  Pending Status  →    Admin Notified    →    Approval Wait
    ↓                                             ↓
  Approved        →    Add Review        →    Update Rating


ADMIN WORKFLOW:
───────────────

  Admin Login     →    View Dashboard   →    See Statistics
    ↓                                             ↓
  Manage Hotels   →    Add/Edit/Delete  →    Update DB
    ↓                                             ↓
  View Bookings   →    Filter Pending   →    Review Details
    ↓                                             ↓
  Approve/Reject  →    Update Status    →    Notify User
    ↓                                             ↓
  View Reviews    →    Read Feedback    →    Reply to User


SECURITY FLOW:
──────────────

  Input Data      →    Sanitize         →    Validate
    ↓                                             ↓
  SQL Query       →    Prepared Stmt    →    Bind Params
    ↓                                             ↓
  Password        →    Hash (bcrypt)    →    Store Secure
    ↓                                             ↓
  Session         →    Server-side      →    Timeout
    ↓                                             ↓
  Output          →    htmlspecialchars →    Safe Display


════════════════════════════════════════════════════════════════════

                    TECHNOLOGY STACK

┌──────────────────────────────────────────────────────────────┐
│ Frontend:                                                     │
│   • HTML5 - Semantic markup, forms, structure               │
│   • CSS3 - Flexbox, Grid, animations, responsive            │
│   • JavaScript - ES6, DOM manipulation, AJAX, validation     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Backend:                                                      │
│   • PHP 7.4+ - Server-side logic, session management        │
│   • MySQLi - Database connection, prepared statements        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Database:                                                     │
│   • MySQL 5.7+ - Relational database, transactions          │
│   • InnoDB - Foreign keys, ACID compliance                  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Security:                                                     │
│   • Password Hashing - bcrypt algorithm                      │
│   • SQL Injection - Prepared statements                      │
│   • XSS Prevention - Input sanitization                      │
│   • Session Security - Server-side validation                │
│   • CSRF Protection - Session tokens (ready for enhancement) │
└──────────────────────────────────────────────────────────────┘


════════════════════════════════════════════════════════════════════

                    FILE ORGANIZATION

bdhotels/
│
├── index.html                 # Homepage - Entry point
│
├── User Pages (8 files)
│   ├── user-login.php        # User authentication
│   ├── user-register.php     # User signup
│   ├── search-hotels.php     # Search interface
│   ├── hotel-details.php     # Hotel info + booking
│   ├── payment.php           # bKash payment
│   ├── user-bookings.php     # Booking history
│   └── add-review.php        # Review submission
│
├── Admin Pages (6 files)
│   ├── admin-login.php       # Admin authentication
│   ├── admin-dashboard.php   # Overview + stats
│   ├── admin-hotels.php      # Hotel list
│   ├── admin-add-hotel.php   # Add new hotel
│   ├── admin-edit-hotel.php  # Edit hotel
│   ├── admin-bookings.php    # Booking approval
│   └── admin-reviews.php     # Review management
│
├── php/ (14 files)
│   ├── config.php            # DB config + helpers
│   ├── Authentication (4)
│   ├── Hotel Management (3)
│   ├── Booking System (3)
│   ├── Review System (2)
│   └── API Endpoints (1)
│
├── css/
│   └── style.css             # 600+ lines of styling
│
├── js/
│   └── main.js               # 300+ lines of JS
│
├── database/
│   └── schema.sql            # DB schema + sample data
│
├── images/                   # Hotel images (placeholder)
│
└── Documentation (3 files)
    ├── README.md             # Overview + installation
    ├── SETUP_GUIDE.md        # Step-by-step setup
    └── FEATURES.md           # Complete feature list


════════════════════════════════════════════════════════════════════

                    KEY FEATURES MATRIX

┌────────────────┬──────────┬──────────┬───────────────────┐
│    Feature     │   User   │  Admin   │    Status         │
├────────────────┼──────────┼──────────┼───────────────────┤
│ Registration   │    ✓     │    -     │ ✅ Complete       │
│ Login          │    ✓     │    ✓     │ ✅ Complete       │
│ Search Hotels  │    ✓     │    -     │ ✅ Complete       │
│ View Details   │    ✓     │    -     │ ✅ Complete       │
│ Book Hotel     │    ✓     │    -     │ ✅ Complete       │
│ Payment        │    ✓     │    -     │ ✅ bKash Mockup   │
│ View Bookings  │    ✓     │    ✓     │ ✅ Complete       │
│ Add Review     │    ✓     │    -     │ ✅ Complete       │
│ Add Hotel      │    -     │    ✓     │ ✅ Complete       │
│ Edit Hotel     │    -     │    ✓     │ ✅ Complete       │
│ Delete Hotel   │    -     │    ✓     │ ✅ Complete       │
│ Approve Booking│    -     │    ✓     │ ✅ Complete       │
│ Reply Review   │    -     │    ✓     │ ✅ Complete       │
│ Dashboard      │    -     │    ✓     │ ✅ Complete       │
└────────────────┴──────────┴──────────┴───────────────────┘


════════════════════════════════════════════════════════════════════

                    DEPLOYMENT DIAGRAM

┌────────────────────────────────────────────────────────────────┐
│                      WEB SERVER                                 │
│                   (Apache / Nginx)                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  PHP Runtime (7.4+)                                       │ │
│  │  ├── Session Handler                                      │ │
│  │  ├── MySQLi Extension                                     │ │
│  │  └── File System Access                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Document Root                                            │ │
│  │  /var/www/html/bdhotels/  or  C:/xampp/htdocs/bdhotels/ │ │
│  │  ├── index.html                                           │ │
│  │  ├── *.php files                                          │ │
│  │  ├── css/, js/, php/                                      │ │
│  │  └── database/                                            │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌────────────────────────────────────────────────────────────────┐
│                   DATABASE SERVER                               │
│                   MySQL 5.7+ / MariaDB                         │
│                                                                  │
│  Database: bdhotels                                            │
│  Port: 3306                                                    │
│  Tables: users, admins, hotels, bookings, reviews             │
└────────────────────────────────────────────────────────────────┘
                            ↓ ↑
┌────────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                             │
│              (Chrome, Firefox, Safari, Edge)                    │
│                                                                  │
│  • Renders HTML/CSS                                            │
│  • Executes JavaScript                                         │
│  • Manages cookies/sessions                                    │
│  • AJAX requests                                               │
└────────────────────────────────────────────────────────────────┘


════════════════════════════════════════════════════════════════════

This architecture provides:
✓ Separation of concerns
✓ Scalable structure
✓ Secure data handling
✓ Easy maintenance
✓ Clear user flows
✓ Professional organization
```
