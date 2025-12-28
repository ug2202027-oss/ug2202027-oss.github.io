<?php
require_once 'php/config.php';
requireAdminLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Bookings - Admin - Bdhotels</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <ul class="sidebar-menu">
                <li><a href="admin-dashboard.php">Dashboard</a></li>
                <li><a href="admin-hotels.php">Manage Hotels</a></li>
                <li><a href="admin-bookings.php" class="active">Manage Bookings</a></li>
                <li><a href="admin-reviews.php">Reviews & Feedback</a></li>
                <li><a href="php/logout.php">Logout</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="dashboard-header">
                <h1>Manage Bookings</h1>
            </div>

            <?php
            if (isset($_SESSION['success'])) {
                echo '<div class="alert alert-success">' . $_SESSION['success'] . '</div>';
                unset($_SESSION['success']);
            }
            ?>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Hotel</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Rooms</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $conn = getDBConnection();
                        $result = $conn->query("SELECT b.*, u.name as user_name, u.email as user_email, h.name as hotel_name FROM bookings b JOIN users u ON b.user_id = u.id JOIN hotels h ON b.hotel_id = h.id ORDER BY b.created_at DESC");
                        
                        while ($booking = $result->fetch_assoc()) {
                            $payment_badge = $booking['payment_status'] == 'completed' ? 'badge-completed' : 'badge-pending';
                            $status_badge = $booking['booking_status'] == 'approved' ? 'badge-approved' : ($booking['booking_status'] == 'rejected' ? 'badge-rejected' : 'badge-pending');
                            ?>
                            <tr>
                                <td>#<?php echo $booking['id']; ?></td>
                                <td>
                                    <strong><?php echo htmlspecialchars($booking['user_name']); ?></strong><br>
                                    <small><?php echo htmlspecialchars($booking['user_email']); ?></small>
                                </td>
                                <td><?php echo htmlspecialchars($booking['hotel_name']); ?></td>
                                <td><?php echo date('M j, Y', strtotime($booking['check_in'])); ?></td>
                                <td><?php echo date('M j, Y', strtotime($booking['check_out'])); ?></td>
                                <td><?php echo $booking['rooms']; ?></td>
                                <td>৳<?php echo number_format($booking['total_amount'], 2); ?></td>
                                <td><span class="badge <?php echo $payment_badge; ?>"><?php echo ucfirst($booking['payment_status']); ?></span></td>
                                <td><?php echo $booking['transaction_id'] ? htmlspecialchars($booking['transaction_id']) : '-'; ?></td>
                                <td><span class="badge <?php echo $status_badge; ?>"><?php echo ucfirst($booking['booking_status']); ?></span></td>
                                <td>
                                    <?php if ($booking['booking_status'] == 'pending' && $booking['payment_status'] == 'completed'): ?>
                                        <button onclick="approveBooking(<?php echo $booking['id']; ?>)" class="btn btn-success" style="font-size: 12px; padding: 5px 10px; margin-right: 5px;">Approve</button>
                                        <button onclick="rejectBooking(<?php echo $booking['id']; ?>)" class="btn btn-danger" style="font-size: 12px; padding: 5px 10px;">Reject</button>
                                    <?php else: ?>
                                        <span style="color: #999;">-</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php
                        }
                        
                        $conn->close();
                        ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
