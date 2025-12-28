<?php
require_once 'config.php';

header('Content-Type: application/json');

$conn = getDBConnection();
$stmt = $conn->prepare("SELECT * FROM hotels WHERE featured = 1 ORDER BY rating DESC LIMIT 6");
$stmt->execute();
$result = $stmt->get_result();

$hotels = array();
while ($row = $result->fetch_assoc()) {
    $hotels[] = $row;
}

echo json_encode(array(
    'success' => true,
    'hotels' => $hotels
));

$stmt->close();
$conn->close();
?>
