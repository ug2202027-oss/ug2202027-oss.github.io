<?php
require_once 'php/config.php';
requireAdminLogin();

$conn = getDBConnection();

// Get statistics
$total_hotels_result = $conn->query("SELECT COUNT(*) as count FROM hotels");
$total_hotels = $total_hotels_result->fetch_assoc()['count'];

$total_bookings_result = $conn->query("SELECT COUNT(*) as count FROM bookings");
$total_bookings = $total_bookings_result->fetch_assoc()['count'];

$pending_bookings_result = $conn->query("SELECT COUNT(*) as count FROM bookings WHERE booking_status = 'pending' AND payment_status = 'completed'");
$pending_bookings = $pending_bookings_result->fetch_assoc()['count'];

$total_users_result = $conn->query("SELECT COUNT(*) as count FROM users");
$total_users = $total_users_result->fetch_assoc()['count'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Bdhotels</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <ul class="sidebar-menu">
                <li><a href="admin-dashboard.php" class="active">Dashboard</a></li>
                <li><a href="admin-hotels.php">Manage Hotels</a></li>
                <li><a href="admin-bookings.php">Manage Bookings</a></li>
                <li><a href="admin-reviews.php">Reviews & Feedback</a></li>
                <li><a href="php/logout.php">Logout</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="dashboard-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome, <?php echo htmlspecialchars($_SESSION['admin_name']); ?>!</p>
            </div>

            <?php
            if (isset($_SESSION['success'])) {
                echo '<div class="alert alert-success">' . $_SESSION['success'] . '</div>';
                unset($_SESSION['success']);
            }
            ?>

            <!-- Statistics Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="color: #003580; margin-bottom: 10px;">Total Hotels</h3>
                    <p style="font-size: 36px; font-weight: bold; color: #0071c2;"><?php echo $total_hotels; ?></p>
                </div>
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="color: #003580; margin-bottom: 10px;">Total Bookings</h3>
                    <p style="font-size: 36px; font-weight: bold; color: #0071c2;"><?php echo $total_bookings; ?></p>
                </div>
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="color: #003580; margin-bottom: 10px;">Pending Approvals</h3>
                    <p style="font-size: 36px; font-weight: bold; color: #ffc107;"><?php echo $pending_bookings; ?></p>
                </div>
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="color: #003580; margin-bottom: 10px;">Total Users</h3>
                    <p style="font-size: 36px; font-weight: bold; color: #0071c2;"><?php echo $total_users; ?></p>
                </div>
            </div>

            <!-- Recent Bookings -->
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #003580; margin-bottom: 20px;">Recent Bookings</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #003580;">
                            <th style="padding: 12px; text-align: left;">Booking ID</th>
                            <th style="padding: 12px; text-align: left;">User</th>
                            <th style="padding: 12px; text-align: left;">Hotel</th>
                            <th style="padding: 12px; text-align: left;">Check-in</th>
                            <th style="padding: 12px; text-align: left;">Amount</th>
                            <th style="padding: 12px; text-align: left;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $stmt = $conn->prepare("SELECT b.*, u.name as user_name, h.name as hotel_name FROM bookings b JOIN users u ON b.user_id = u.id JOIN hotels h ON b.hotel_id = h.id ORDER BY b.created_at DESC LIMIT 10");
                        $stmt->execute();
                        $result = $stmt->get_result();
                        
                        while ($booking = $result->fetch_assoc()) {
                            $status_badge = $booking['booking_status'] == 'approved' ? 'badge-approved' : ($booking['booking_status'] == 'rejected' ? 'badge-rejected' : 'badge-pending');
                            ?>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 12px;">#<?php echo $booking['id']; ?></td>
                                <td style="padding: 12px;"><?php echo htmlspecialchars($booking['user_name']); ?></td>
                                <td style="padding: 12px;"><?php echo htmlspecialchars($booking['hotel_name']); ?></td>
                                <td style="padding: 12px;"><?php echo date('M j, Y', strtotime($booking['check_in'])); ?></td>
                                <td style="padding: 12px;">৳<?php echo number_format($booking['total_amount'], 2); ?></td>
                                <td style="padding: 12px;"><span class="badge <?php echo $status_badge; ?>"><?php echo ucfirst($booking['booking_status']); ?></span></td>
                            </tr>
                            <?php
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>
<?php
$conn->close();
?>
