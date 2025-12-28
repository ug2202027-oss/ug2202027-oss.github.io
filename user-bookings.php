<?php
require_once 'php/config.php';
requireUserLogin();

$user_id = $_SESSION['user_id'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bookings - Bdhotels</title>
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
                    <li><a href="search-hotels.php">Search Hotels</a></li>
                    <li><a href="user-bookings.php">My Bookings</a></li>
                    <li><a href="php/logout.php">Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section style="padding: 40px 0; min-height: calc(100vh - 200px); background-color: #f5f5f5;">
        <div class="container">
            <h1 style="color: #003580; margin-bottom: 30px;">My Bookings</h1>
            
            <?php
            if (isset($_SESSION['success'])) {
                echo '<div class="alert alert-success">' . $_SESSION['success'] . '</div>';
                unset($_SESSION['success']);
            }
            if (isset($_SESSION['error'])) {
                echo '<div class="alert alert-error">' . $_SESSION['error'] . '</div>';
                unset($_SESSION['error']);
            }
            ?>
            
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Hotel</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Rooms</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $conn = getDBConnection();
                        $stmt = $conn->prepare("SELECT b.*, h.name as hotel_name, h.location FROM bookings b JOIN hotels h ON b.hotel_id = h.id WHERE b.user_id = ? ORDER BY b.created_at DESC");
                        $stmt->bind_param("i", $user_id);
                        $stmt->execute();
                        $result = $stmt->get_result();
                        
                        if ($result->num_rows > 0) {
                            while ($booking = $result->fetch_assoc()) {
                                $payment_badge = $booking['payment_status'] == 'completed' ? 'badge-completed' : 'badge-pending';
                                $status_badge = $booking['booking_status'] == 'approved' ? 'badge-approved' : ($booking['booking_status'] == 'rejected' ? 'badge-rejected' : 'badge-pending');
                                ?>
                                <tr>
                                    <td>#<?php echo $booking['id']; ?></td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($booking['hotel_name']); ?></strong><br>
                                        <small><?php echo htmlspecialchars($booking['location']); ?></small>
                                    </td>
                                    <td><?php echo date('M j, Y', strtotime($booking['check_in'])); ?></td>
                                    <td><?php echo date('M j, Y', strtotime($booking['check_out'])); ?></td>
                                    <td><?php echo $booking['rooms']; ?></td>
                                    <td>৳<?php echo number_format($booking['total_amount'], 2); ?></td>
                                    <td><span class="badge <?php echo $payment_badge; ?>"><?php echo ucfirst($booking['payment_status']); ?></span></td>
                                    <td><span class="badge <?php echo $status_badge; ?>"><?php echo ucfirst($booking['booking_status']); ?></span></td>
                                    <td>
                                        <?php if ($booking['payment_status'] == 'pending'): ?>
                                            <a href="payment.php?booking_id=<?php echo $booking['id']; ?>" class="btn btn-primary" style="font-size: 12px; padding: 5px 10px;">Pay Now</a>
                                        <?php elseif ($booking['booking_status'] == 'approved'): ?>
                                            <a href="add-review.php?booking_id=<?php echo $booking['id']; ?>" class="btn btn-secondary" style="font-size: 12px; padding: 5px 10px;">Review</a>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php
                            }
                        } else {
                            echo '<tr><td colspan="9" style="text-align: center;">No bookings found. <a href="search-hotels.php">Search hotels</a> to make your first booking!</td></tr>';
                        }
                        
                        $stmt->close();
                        $conn->close();
                        ?>
                    </tbody>
                </table>
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
</body>
</html>
