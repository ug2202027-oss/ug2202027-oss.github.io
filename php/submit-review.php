<?php
require_once 'config.php';
requireUserLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $booking_id = intval($_POST['booking_id']);
    $hotel_id = intval($_POST['hotel_id']);
    $rating = intval($_POST['rating']);
    $comment = sanitize($_POST['comment']);
    $user_id = $_SESSION['user_id'];
    
    // Validate
    if ($rating < 1 || $rating > 5) {
        $_SESSION['error'] = 'Invalid rating.';
        header('Location: ../add-review.php?booking_id=' . $booking_id);
        exit();
    }
    
    // Check if already reviewed
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id FROM reviews WHERE booking_id = ?");
    $stmt->bind_param("i", $booking_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $_SESSION['error'] = 'You have already reviewed this booking.';
        header('Location: ../user-bookings.php');
        exit();
    }
    
    // Insert review
    $stmt = $conn->prepare("INSERT INTO reviews (user_id, hotel_id, booking_id, rating, comment) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iiiis", $user_id, $hotel_id, $booking_id, $rating, $comment);
    
    if ($stmt->execute()) {
        // Update hotel rating
        $stmt = $conn->prepare("UPDATE hotels SET rating = (SELECT AVG(rating) FROM reviews WHERE hotel_id = ?) WHERE id = ?");
        $stmt->bind_param("ii", $hotel_id, $hotel_id);
        $stmt->execute();
        
        $_SESSION['success'] = 'Thank you for your review!';
        header('Location: ../user-bookings.php');
    } else {
        $_SESSION['error'] = 'Failed to submit review.';
        header('Location: ../add-review.php?booking_id=' . $booking_id);
    }
    
    $stmt->close();
    $conn->close();
} else {
    header('Location: ../user-bookings.php');
}
?>
