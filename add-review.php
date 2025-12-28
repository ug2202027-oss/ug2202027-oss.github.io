<?php
require_once 'php/config.php';
requireUserLogin();

if (!isset($_GET['booking_id'])) {
    header('Location: user-bookings.php');
    exit();
}

$booking_id = intval($_GET['booking_id']);
$user_id = $_SESSION['user_id'];

$conn = getDBConnection();
$stmt = $conn->prepare("SELECT b.*, h.name as hotel_name, h.id as hotel_id FROM bookings b JOIN hotels h ON b.hotel_id = h.id WHERE b.id = ? AND b.user_id = ? AND b.booking_status = 'approved'");
$stmt->bind_param("ii", $booking_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $_SESSION['error'] = 'Booking not found or not eligible for review.';
    header('Location: user-bookings.php');
    exit();
}

$booking = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Review - Bdhotels</title>
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
                    <li><a href="user-bookings.php">My Bookings</a></li>
                    <li><a href="php/logout.php">Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Review Form -->
    <div class="auth-container">
        <div class="auth-box">
            <h2>Rate Your Stay</h2>
            <p style="color: #666; margin-bottom: 20px;">Hotel: <strong><?php echo htmlspecialchars($booking['hotel_name']); ?></strong></p>
            
            <?php
            if (isset($_SESSION['error'])) {
                echo '<div class="alert alert-error">' . $_SESSION['error'] . '</div>';
                unset($_SESSION['error']);
            }
            ?>
            
            <form action="php/submit-review.php" method="POST">
                <input type="hidden" name="booking_id" value="<?php echo $booking_id; ?>">
                <input type="hidden" name="hotel_id" value="<?php echo $booking['hotel_id']; ?>">
                
                <div class="form-group">
                    <label>Rating (1-5 stars)</label>
                    <select name="rating" required>
                        <option value="">Select rating</option>
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Very Good</option>
                        <option value="3">⭐⭐⭐ Good</option>
                        <option value="2">⭐⭐ Fair</option>
                        <option value="1">⭐ Poor</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Your Review</label>
                    <textarea name="comment" rows="6" placeholder="Share your experience about your stay..." required></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2024 Bdhotels. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
<?php
$stmt->close();
$conn->close();
?>
