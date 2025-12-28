<?php
require_once 'php/config.php';
requireAdminLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reviews & Feedback - Admin - Bdhotels</title>
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
                <li><a href="admin-bookings.php">Manage Bookings</a></li>
                <li><a href="admin-reviews.php" class="active">Reviews & Feedback</a></li>
                <li><a href="php/logout.php">Logout</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="dashboard-header">
                <h1>Reviews & Feedback</h1>
            </div>

            <?php
            if (isset($_SESSION['success'])) {
                echo '<div class="alert alert-success">' . $_SESSION['success'] . '</div>';
                unset($_SESSION['success']);
            }
            ?>

            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <?php
                $conn = getDBConnection();
                $result = $conn->query("SELECT r.*, u.name as user_name, h.name as hotel_name FROM reviews r JOIN users u ON r.user_id = u.id JOIN hotels h ON r.hotel_id = h.id ORDER BY r.created_at DESC");
                
                if ($result->num_rows > 0) {
                    while ($review = $result->fetch_assoc()) {
                        ?>
                        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <h3 style="color: #003580; margin-bottom: 5px;"><?php echo htmlspecialchars($review['hotel_name']); ?></h3>
                                    <p style="color: #666; margin-bottom: 5px;">By: <strong><?php echo htmlspecialchars($review['user_name']); ?></strong></p>
                                    <p style="color: #999; font-size: 14px;"><?php echo date('F j, Y \a\t g:i A', strtotime($review['created_at'])); ?></p>
                                </div>
                                <span class="rating-badge"><?php echo $review['rating']; ?>/5</span>
                            </div>
                            
                            <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                                <strong>Review:</strong>
                                <p style="margin-top: 5px; line-height: 1.6;"><?php echo nl2br(htmlspecialchars($review['comment'])); ?></p>
                            </div>
                            
                            <?php if ($review['admin_reply']): ?>
                                <div style="background: #e3f2fd; padding: 15px; border-radius: 4px; border-left: 4px solid #003580;">
                                    <strong style="color: #003580;">Your Reply:</strong>
                                    <p style="margin-top: 5px; line-height: 1.6;"><?php echo nl2br(htmlspecialchars($review['admin_reply'])); ?></p>
                                </div>
                            <?php else: ?>
                                <button onclick="replyToReview(<?php echo $review['id']; ?>)" class="btn btn-primary" style="font-size: 14px; padding: 8px 16px;">Reply to Review</button>
                            <?php endif; ?>
                        </div>
                        <?php
                    }
                } else {
                    echo '<p style="text-align: center; color: #666; padding: 40px;">No reviews yet.</p>';
                }
                
                $conn->close();
                ?>
            </div>
        </main>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
