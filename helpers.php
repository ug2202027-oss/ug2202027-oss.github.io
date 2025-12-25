<?php
session_start();

// Database configuration
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbName = getenv('DB_NAME') ?: 'brick_store';

$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($mysqli->connect_error) {
    die('Database connection failed: ' . $mysqli->connect_error);
}
$GLOBALS['mysqli'] = $mysqli;

/**
 * Escape HTML output
 */
function esc($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Check if a column exists in a table
 */
function db_has_column($table, $column) {
    global $mysqli;
    $result = $mysqli->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
    return $result && $result->num_rows > 0;
}

/**
 * Bind parameters to a prepared statement
 */
function stmt_bind_params($stmt, $types, $params) {
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
}

/**
 * Fetch all results from a prepared statement as associative array
 */
function stmt_fetch_all_assoc($stmt) {
    $result = $stmt->get_result();
    if (!$result) {
        return [];
    }
    return $result->fetch_all(MYSQLI_ASSOC);
}

/**
 * Check if user is logged in
 */
function is_logged_in() {
    return !empty($_SESSION['user_id']);
}

/**
 * Get current logged in user
 */
function current_user() {
    if (!is_logged_in()) {
        return null;
    }
    global $mysqli;
    $userId = (int)$_SESSION['user_id'];
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result ? $result->fetch_assoc() : null;
}

/**
 * Get brick images
 */
function get_brick_images($brickId) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM brick_images WHERE brick_id = ? ORDER BY display_order ASC");
    $stmt->bind_param('i', $brickId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
}

/**
 * Require login
 */
function require_login() {
    if (!is_logged_in()) {
        $_SESSION['msg'] = 'Please login to continue';
        header('Location: login.php');
        exit;
    }
}

/**
 * Require specific user type
 */
function require_user_type($type) {
    require_login();
    $user = current_user();
    if ($user['type'] !== $type) {
        $_SESSION['msg'] = 'Access denied';
        header('Location: index.php');
        exit;
    }
}
