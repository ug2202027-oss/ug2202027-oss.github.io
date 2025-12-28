<?php
require_once 'php/config.php';
requireAdminLogin();

if (!isset($_GET['id'])) {
    header('Location: admin-hotels.php');
    exit();
}

$hotel_id = intval($_GET['id']);
$conn = getDBConnection();
$stmt = $conn->prepare("SELECT * FROM hotels WHERE id = ?");
$stmt->bind_param("i", $hotel_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    header('Location: admin-hotels.php');
    exit();
}

$hotel = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Hotel - Admin - Bdhotels</title>
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
                <h1>Edit Hotel</h1>
                <a href="admin-hotels.php" class="btn btn-secondary">Back to Hotels</a>
            </div>

            <?php
            if (isset($_SESSION['error'])) {
                echo '<div class="alert alert-error">' . $_SESSION['error'] . '</div>';
                unset($_SESSION['error']);
            }
            ?>

            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px;">
                <form action="php/update-hotel.php" method="POST">
                    <input type="hidden" name="hotel_id" value="<?php echo $hotel['id']; ?>">
                    
                    <div class="form-group">
                        <label>Hotel Name *</label>
                        <input type="text" name="name" value="<?php echo htmlspecialchars($hotel['name']); ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Location *</label>
                        <input type="text" name="location" value="<?php echo htmlspecialchars($hotel['location']); ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Full Address *</label>
                        <textarea name="address" rows="2" required><?php echo htmlspecialchars($hotel['address']); ?></textarea>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="4"><?php echo htmlspecialchars($hotel['description']); ?></textarea>
                    </div>

                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" name="image_url" value="<?php echo htmlspecialchars($hotel['image_url']); ?>">
                    </div>

                    <div class="form-group">
                        <label>Price per Night (৳) *</label>
                        <input type="number" name="price_per_night" step="0.01" min="0" value="<?php echo $hotel['price_per_night']; ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Available Rooms *</label>
                        <input type="number" name="available_rooms" min="0" value="<?php echo $hotel['available_rooms']; ?>" required>
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="featured" value="1" <?php echo $hotel['featured'] ? 'checked' : ''; ?>>
                            Feature this hotel on homepage
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary">Update Hotel</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
<?php
$stmt->close();
$conn->close();
?>
