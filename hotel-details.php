<?php
require_once 'php/config.php';

if (!isset($_GET['id'])) {
    header('Location: search-hotels.php');
    exit();
}

$hotel_id = intval($_GET['id']);
$conn = getDBConnection();
$stmt = $conn->prepare("SELECT * FROM hotels WHERE id = ?");
$stmt->bind_param("i", $hotel_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    header('Location: search-hotels.php');
    exit();
}

$hotel = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($hotel['name']); ?> - Bdhotels</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <h1><a href="index.html" style="color: white; text-decoration: none;">Bdhotels</a></h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="search-hotels.php">Search</a></li>
                    <?php if (isUserLoggedIn()): ?>
                        <li><a href="user-bookings.php">My Bookings</a></li>
                        <li><a href="php/logout.php">Logout</a></li>
                    <?php else: ?>
                        <li><a href="user-login.php">Login</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hotel Details -->
    <section style="padding: 40px 0;">
        <div class="container">
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <!-- Left Column - Hotel Info -->
                <div>
                    <img src="<?php echo htmlspecialchars($hotel['image_url']); ?>" alt="<?php echo htmlspecialchars($hotel['name']); ?>" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    
                    <h1 style="color: #003580; margin-bottom: 10px;"><?php echo htmlspecialchars($hotel['name']); ?></h1>
                    <p style="font-size: 16px; color: #666; margin-bottom: 15px;">📍 <?php echo htmlspecialchars($hotel['address']); ?>, <?php echo htmlspecialchars($hotel['location']); ?></p>
                    
                    <div class="hotel-rating" style="margin-bottom: 20px;">
                        <span class="rating-badge"><?php echo $hotel['rating']; ?></span>
                        <span style="font-size: 18px; font-weight: 600;"><?php echo $hotel['rating'] >= 4.5 ? 'Excellent' : ($hotel['rating'] >= 4.0 ? 'Very Good' : 'Good'); ?></span>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                        <h3 style="color: #003580; margin-bottom: 15px;">About This Property</h3>
                        <p style="line-height: 1.8; color: #333;"><?php echo nl2br(htmlspecialchars($hotel['description'])); ?></p>
                    </div>
                    
                    <!-- Reviews Section -->
                    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="color: #003580; margin-bottom: 15px;">Guest Reviews</h3>
                        <?php
                        $review_stmt = $conn->prepare("SELECT r.*, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.hotel_id = ? ORDER BY r.created_at DESC LIMIT 10");
                        $review_stmt->bind_param("i", $hotel_id);
                        $review_stmt->execute();
                        $reviews = $review_stmt->get_result();
                        
                        if ($reviews->num_rows > 0) {
                            while ($review = $reviews->fetch_assoc()) {
                                ?>
                                <div style="border-bottom: 1px solid #ddd; padding: 15px 0;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                        <strong><?php echo htmlspecialchars($review['user_name']); ?></strong>
                                        <span class="rating-badge"><?php echo $review['rating']; ?>/5</span>
                                    </div>
                                    <p style="color: #666; margin-bottom: 10px;"><?php echo nl2br(htmlspecialchars($review['comment'])); ?></p>
                                    <?php if ($review['admin_reply']): ?>
                                        <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 10px;">
                                            <strong style="color: #003580;">Management Reply:</strong>
                                            <p style="margin-top: 5px;"><?php echo nl2br(htmlspecialchars($review['admin_reply'])); ?></p>
                                        </div>
                                    <?php endif; ?>
                                    <small style="color: #999;"><?php echo date('F j, Y', strtotime($review['created_at'])); ?></small>
                                </div>
                                <?php
                            }
                        } else {
                            echo '<p style="color: #666;">No reviews yet. Be the first to review!</p>';
                        }
                        $review_stmt->close();
                        ?>
                    </div>
                </div>
                
                <!-- Right Column - Booking Form -->
                <div>
                    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: sticky; top: 100px;">
                        <h2 style="color: #003580; margin-bottom: 20px;">Book This Hotel</h2>
                        <p class="hotel-price" style="margin-bottom: 20px;">৳<?php echo number_format($hotel['price_per_night'], 2); ?> <span style="font-size: 14px; color: #666;">/ night</span></p>
                        <p style="margin-bottom: 20px; color: #666;">Available Rooms: <?php echo $hotel['available_rooms']; ?></p>
                        
                        <?php if (!isUserLoggedIn()): ?>
                            <div class="alert alert-error">
                                Please <a href="user-login.php">login</a> to book this hotel.
                            </div>
                        <?php else: ?>
                            <form action="php/create-booking.php" method="POST" onsubmit="return validateBookingForm()">
                                <input type="hidden" name="hotel_id" value="<?php echo $hotel['id']; ?>">
                                
                                <div class="form-group">
                                    <label>Check-in Date</label>
                                    <input type="date" id="check_in" name="check_in" value="<?php echo isset($_GET['check_in']) ? htmlspecialchars($_GET['check_in']) : ''; ?>" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Check-out Date</label>
                                    <input type="date" id="check_out" name="check_out" value="<?php echo isset($_GET['check_out']) ? htmlspecialchars($_GET['check_out']) : ''; ?>" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Number of Rooms</label>
                                    <select name="rooms" required>
                                        <?php
                                        $rooms = isset($_GET['rooms']) ? intval($_GET['rooms']) : 1;
                                        for ($i = 1; $i <= min($hotel['available_rooms'], 5); $i++) {
                                            $selected = ($i == $rooms) ? 'selected' : '';
                                            echo "<option value='$i' $selected>$i Room(s)</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                
                                <button type="submit" class="btn btn-primary" style="width: 100%;">Book Now</button>
                            </form>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2024 Bdhotels. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
<?php
$stmt->close();
$conn->close();
?>
