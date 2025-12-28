<?php
require_once 'config.php';
requireAdminLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $hotel_id = intval($_POST['hotel_id']);
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
        header('Location: ../admin-edit-hotel.php?id=' . $hotel_id);
        exit();
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE hotels SET name = ?, location = ?, address = ?, description = ?, image_url = ?, price_per_night = ?, available_rooms = ?, featured = ? WHERE id = ?");
    $stmt->bind_param("sssssdiis", $name, $location, $address, $description, $image_url, $price_per_night, $available_rooms, $featured, $hotel_id);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = 'Hotel updated successfully!';
        header('Location: ../admin-hotels.php');
    } else {
        $_SESSION['error'] = 'Failed to update hotel.';
        header('Location: ../admin-edit-hotel.php?id=' . $hotel_id);
    }
    
    $stmt->close();
    $conn->close();
} else {
    header('Location: ../admin-hotels.php');
}
?>
