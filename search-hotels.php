<?php
require_once 'php/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Hotels - Bdhotels</title>
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

    <!-- Search Section -->
    <section style="padding: 40px 0; background-color: #f5f5f5;">
        <div class="container">
            <h2 style="color: #003580; margin-bottom: 25px;">Search Hotels</h2>
            <form class="search-form" method="GET">
                <div class="search-box">
                    <div class="search-field">
                        <label>Location</label>
                        <input type="text" name="location" value="<?php echo isset($_GET['location']) ? htmlspecialchars($_GET['location']) : ''; ?>" placeholder="City or district" required>
                    </div>
                    <div class="search-field">
                        <label>Check-in</label>
                        <input type="date" name="check_in" id="check_in" value="<?php echo isset($_GET['check_in']) ? htmlspecialchars($_GET['check_in']) : ''; ?>" required>
                    </div>
                    <div class="search-field">
                        <label>Check-out</label>
                        <input type="date" name="check_out" id="check_out" value="<?php echo isset($_GET['check_out']) ? htmlspecialchars($_GET['check_out']) : ''; ?>" required>
                    </div>
                    <div class="search-field">
                        <label>Rooms</label>
                        <select name="rooms">
                            <option value="1" <?php echo (isset($_GET['rooms']) && $_GET['rooms'] == 1) ? 'selected' : ''; ?>>1 Room</option>
                            <option value="2" <?php echo (isset($_GET['rooms']) && $_GET['rooms'] == 2) ? 'selected' : ''; ?>>2 Rooms</option>
                            <option value="3" <?php echo (isset($_GET['rooms']) && $_GET['rooms'] == 3) ? 'selected' : ''; ?>>3 Rooms</option>
                            <option value="4" <?php echo (isset($_GET['rooms']) && $_GET['rooms'] == 4) ? 'selected' : ''; ?>>4 Rooms</option>
                            <option value="5" <?php echo (isset($_GET['rooms']) && $_GET['rooms'] == 5) ? 'selected' : ''; ?>>5+ Rooms</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Search</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Results Section -->
    <section style="padding: 40px 0;">
        <div class="container">
            <?php
            if (isset($_GET['location'])) {
                $location = sanitize($_GET['location']);
                $conn = getDBConnection();
                
                $stmt = $conn->prepare("SELECT * FROM hotels WHERE location LIKE ? AND available_rooms > 0 ORDER BY rating DESC");
                $search_term = "%$location%";
                $stmt->bind_param("s", $search_term);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows > 0) {
                    echo '<h3 style="margin-bottom: 20px; color: #003580;">Found ' . $result->num_rows . ' hotel(s) in ' . htmlspecialchars($location) . '</h3>';
                    echo '<div class="hotels-grid">';
                    
                    while ($hotel = $result->fetch_assoc()) {
                        ?>
                        <div class="hotel-card">
                            <img src="<?php echo htmlspecialchars($hotel['image_url']); ?>" alt="<?php echo htmlspecialchars($hotel['name']); ?>">
                            <div class="hotel-info">
                                <h3><?php echo htmlspecialchars($hotel['name']); ?></h3>
                                <p class="hotel-location">📍 <?php echo htmlspecialchars($hotel['location']); ?></p>
                                <p style="font-size: 14px; color: #666; margin-bottom: 10px;"><?php echo htmlspecialchars($hotel['address']); ?></p>
                                <div class="hotel-rating">
                                    <span class="rating-badge"><?php echo $hotel['rating']; ?></span>
                                    <span><?php echo $hotel['rating'] >= 4.5 ? 'Excellent' : ($hotel['rating'] >= 4.0 ? 'Very Good' : 'Good'); ?></span>
                                </div>
                                <p class="hotel-price">৳<?php echo number_format($hotel['price_per_night'], 2); ?> <span>/ night</span></p>
                                <p style="font-size: 14px; color: #666;">Available rooms: <?php echo $hotel['available_rooms']; ?></p>
                                <a href="hotel-details.php?id=<?php echo $hotel['id']; ?>&check_in=<?php echo urlencode($_GET['check_in']); ?>&check_out=<?php echo urlencode($_GET['check_out']); ?>&rooms=<?php echo urlencode($_GET['rooms']); ?>" class="btn btn-primary" style="margin-top: 10px; display: inline-block; text-decoration: none;">View Details & Book</a>
                            </div>
                        </div>
                        <?php
                    }
                    
                    echo '</div>';
                } else {
                    echo '<div class="alert alert-error">No hotels found in ' . htmlspecialchars($location) . '. Please try a different location.</div>';
                }
                
                $stmt->close();
                $conn->close();
            } else {
                echo '<p>Please use the search form to find hotels.</p>';
            }
            ?>
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
