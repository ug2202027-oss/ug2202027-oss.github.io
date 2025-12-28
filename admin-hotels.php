<?php
require_once 'php/config.php';
requireAdminLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Hotels - Admin - Bdhotels</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <ul class="sidebar-menu">
                <li><a href="admin-dashboard.php">Dashboard</a></li>
                <li><a href="admin-hotels.php" class="active">Manage Hotels</a></li>
                <li><a href="admin-bookings.php">Manage Bookings</a></li>
                <li><a href="admin-reviews.php">Reviews & Feedback</a></li>
                <li><a href="php/logout.php">Logout</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="dashboard-header">
                <h1>Manage Hotels</h1>
                <a href="admin-add-hotel.php" class="btn btn-primary">Add New Hotel</a>
            </div>

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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Price/Night</th>
                            <th>Available Rooms</th>
                            <th>Rating</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $conn = getDBConnection();
                        $result = $conn->query("SELECT * FROM hotels ORDER BY created_at DESC");
                        
                        while ($hotel = $result->fetch_assoc()) {
                            ?>
                            <tr>
                                <td><?php echo $hotel['id']; ?></td>
                                <td><strong><?php echo htmlspecialchars($hotel['name']); ?></strong></td>
                                <td><?php echo htmlspecialchars($hotel['location']); ?></td>
                                <td>৳<?php echo number_format($hotel['price_per_night'], 2); ?></td>
                                <td><?php echo $hotel['available_rooms']; ?></td>
                                <td><?php echo $hotel['rating']; ?></td>
                                <td><?php echo $hotel['featured'] ? 'Yes' : 'No'; ?></td>
                                <td>
                                    <a href="admin-edit-hotel.php?id=<?php echo $hotel['id']; ?>" class="btn btn-secondary" style="font-size: 12px; padding: 5px 10px; margin-right: 5px;">Edit</a>
                                    <button onclick="deleteHotel(<?php echo $hotel['id']; ?>)" class="btn btn-danger" style="font-size: 12px; padding: 5px 10px;">Delete</button>
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
