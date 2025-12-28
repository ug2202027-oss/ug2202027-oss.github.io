<?php
require_once 'config.php';
requireUserLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $hotel_id = intval($_POST['hotel_id']);
    $check_in = sanitize($_POST['check_in']);
    $check_out = sanitize($_POST['check_out']);
    $rooms = intval($_POST['rooms']);
    $user_id = $_SESSION['user_id'];
    
    // Validate dates
    $check_in_date = new DateTime($check_in);
    $check_out_date = new DateTime($check_out);
    $today = new DateTime();
    $today->setTime(0, 0, 0);
    
    if ($check_in_date < $today) {
        $_SESSION['error'] = 'Check-in date cannot be in the past.';
        header('Location: ../hotel-details.php?id=' . $hotel_id);
        exit();
    }
    
    if ($check_out_date <= $check_in_date) {
        $_SESSION['error'] = 'Check-out date must be after check-in date.';
        header('Location: ../hotel-details.php?id=' . $hotel_id);
        exit();
    }
    
    // Get hotel details
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT price_per_night, available_rooms FROM hotels WHERE id = ?");
    $stmt->bind_param("i", $hotel_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        $_SESSION['error'] = 'Hotel not found.';
        header('Location: ../search-hotels.php');
        exit();
    }
    
    $hotel = $result->fetch_assoc();
    
    if ($hotel['available_rooms'] < $rooms) {
        $_SESSION['error'] = 'Not enough rooms available.';
        header('Location: ../hotel-details.php?id=' . $hotel_id);
        exit();
    }
    
    // Calculate total amount
    $interval = $check_in_date->diff($check_out_date);
    $nights = $interval->days;
    $total_amount = $hotel['price_per_night'] * $nights * $rooms;
    
    // Create booking
    $stmt = $conn->prepare("INSERT INTO bookings (user_id, hotel_id, check_in, check_out, rooms, total_amount) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iissid", $user_id, $hotel_id, $check_in, $check_out, $rooms, $total_amount);
    
    if ($stmt->execute()) {
        $booking_id = $conn->insert_id;
        $_SESSION['success'] = 'Booking created! Please complete payment.';
        header('Location: ../payment.php?booking_id=' . $booking_id);
    } else {
        $_SESSION['error'] = 'Booking failed. Please try again.';
        header('Location: ../hotel-details.php?id=' . $hotel_id);
    }
    
    $stmt->close();
    $conn->close();
} else {
    header('Location: ../search-hotels.php');
}
?>
