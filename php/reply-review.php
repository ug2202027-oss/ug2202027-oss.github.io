<?php
require_once 'config.php';
requireAdminLogin();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $review_id = intval($data['review_id']);
    $reply = sanitize($data['reply']);
    
    if (empty($reply)) {
        echo json_encode(['success' => false, 'message' => 'Reply cannot be empty']);
        exit();
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE reviews SET admin_reply = ? WHERE id = ?");
    $stmt->bind_param("si", $reply, $review_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Reply posted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to post reply']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
