<?php
require_once 'config.php';
requireUserLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $booking_id = intval($_POST['booking_id']);
    $user_id = $_SESSION['user_id'];
    
    // Verify booking belongs to user
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id FROM bookings WHERE id = ? AND user_id = ? AND payment_status = 'pending'");
    $stmt->bind_param("ii", $booking_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        $_SESSION['error'] = 'Invalid booking.';
        header('Location: ../user-bookings.php');
        exit();
    }
    
    // Generate transaction ID
    $transaction_id = 'TRX' . time() . rand(1000, 9999);
    
    // Update booking with payment info
    $stmt = $conn->prepare("UPDATE bookings SET payment_status = 'completed', transaction_id = ? WHERE id = ?");
    $stmt->bind_param("si", $transaction_id, $booking_id);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = 'Payment completed successfully! Your booking is now pending admin approval. Transaction ID: ' . $transaction_id;
    } else {
        $_SESSION['error'] = 'Payment processing failed. Please try again.';
    }
    
    $stmt->close();
    $conn->close();
    header('Location: ../user-bookings.php');
} else {
    header('Location: ../user-bookings.php');
}
?>
