<?php
require_once 'config.php';
requireAdminLogin();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $hotel_id = intval($data['hotel_id']);
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("DELETE FROM hotels WHERE id = ?");
    $stmt->bind_param("i", $hotel_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Hotel deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete hotel']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
