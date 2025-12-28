<?php
require_once 'config.php';
requireAdminLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = sanitize($_POST['name']);
    $location = sanitize($_POST['location']);
    $address = sanitize($_POST['address']);
    $description = sanitize($_POST['description']);
    $image_url = sanitize($_POST['image_url']);
    $price_per_night = floatval($_POST['price_per_night']);
    $available_rooms = intval($_POST['available_rooms']);
    $featured = isset($_POST['featured']) ? 1 : 0;
    
    if (empty($name) || empty($location) || empty($address) || $price_per_night <= 0) {
        $_SESSION['error'] = 'Please fill all required fields.';
        header('Location: ../admin-add-hotel.php');
        exit();
    }
    
    // Default image if not provided
    if (empty($image_url)) {
        $image_url = 'https://via.placeholder.com/400x300?text=' . urlencode($name);
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO hotels (name, location, address, description, image_url, price_per_night, available_rooms, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssdii", $name, $location, $address, $description, $image_url, $price_per_night, $available_rooms, $featured);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = 'Hotel added successfully!';
        header('Location: ../admin-hotels.php');
    } else {
        $_SESSION['error'] = 'Failed to add hotel.';
        header('Location: ../admin-add-hotel.php');
    }
    
    $stmt->close();
    $conn->close();
} else {
    header('Location: ../admin-add-hotel.php');
}
?>
