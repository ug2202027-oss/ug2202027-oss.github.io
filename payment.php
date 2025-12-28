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
$stmt = $conn->prepare("SELECT b.*, h.name as hotel_name, h.location FROM bookings b JOIN hotels h ON b.hotel_id = h.id WHERE b.id = ? AND b.user_id = ?");
$stmt->bind_param("ii", $booking_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    header('Location: user-bookings.php');
    exit();
}

$booking = $result->fetch_assoc();

if ($booking['payment_status'] == 'completed') {
    $_SESSION['info'] = 'Payment already completed for this booking.';
    header('Location: user-bookings.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment - Bdhotels</title>
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

    <!-- Payment Section -->
    <div class="auth-container">
        <div class="auth-box" style="max-width: 600px;">
            <div class="payment-container">
                <h2 style="margin-bottom: 25px;">Complete Your Payment</h2>
                
                <!-- Booking Details -->
                <div class="payment-details">
                    <h3 style="color: #003580; margin-bottom: 15px;">Booking Details</h3>
                    <p><strong>Hotel:</strong> <?php echo htmlspecialchars($booking['hotel_name']); ?></p>
                    <p><strong>Location:</strong> <?php echo htmlspecialchars($booking['location']); ?></p>
                    <p><strong>Check-in:</strong> <?php echo date('F j, Y', strtotime($booking['check_in'])); ?></p>
                    <p><strong>Check-out:</strong> <?php echo date('F j, Y', strtotime($booking['check_out'])); ?></p>
                    <p><strong>Rooms:</strong> <?php echo $booking['rooms']; ?></p>
                    <?php
                    $check_in_date = new DateTime($booking['check_in']);
                    $check_out_date = new DateTime($booking['check_out']);
                    $nights = $check_in_date->diff($check_out_date)->days;
                    ?>
                    <p><strong>Nights:</strong> <?php echo $nights; ?></p>
                </div>
                
                <!-- bKash Payment -->
                <div style="text-align: center; margin: 30px 0;">
                    <img src="https://via.placeholder.com/200x80/e2136e/ffffff?text=bKash" alt="bKash" style="margin-bottom: 20px;">
                    <p class="payment-amount">৳<?php echo number_format($booking['total_amount'], 2); ?></p>
                    <p style="color: #666; margin-bottom: 30px;">Pay securely with bKash</p>
                    
                    <form id="paymentForm" method="POST" action="php/complete-payment.php">
                        <input type="hidden" name="booking_id" value="<?php echo $booking_id; ?>">
                        
                        <div class="form-group" style="text-align: left;">
                            <label>bKash Account Number</label>
                            <input type="text" name="phone" placeholder="01XXXXXXXXX" pattern="[0-9]{11}" required>
                        </div>
                        
                        <div class="form-group" style="text-align: left;">
                            <label>bKash PIN</label>
                            <input type="password" name="pin" placeholder="Enter your PIN" maxlength="5" required>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; background-color: #e2136e; font-size: 18px; padding: 15px;">
                            Pay ৳<?php echo number_format($booking['total_amount'], 2); ?>
                        </button>
                    </form>
                    
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">
                        This is a demo payment gateway. Click Pay to complete the booking.
                    </p>
                </div>
            </div>
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
