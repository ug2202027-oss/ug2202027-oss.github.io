<?php
require_once 'config.php';
requireAdminLogin();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $booking_id = intval($data['booking_id']);
    $status = sanitize($data['status']);
    
    if (!in_array($status, ['approved', 'rejected'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
        exit();
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE bookings SET booking_status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $booking_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Booking status updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update booking status']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
