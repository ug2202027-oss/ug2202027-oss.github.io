<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = sanitize($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        $_SESSION['error'] = 'All fields are required.';
        header('Location: ../user-login.php');
        exit();
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            
            header('Location: ../search-hotels.php');
            exit();
        }
    }
    
    $_SESSION['error'] = 'Invalid email or password.';
    $stmt->close();
    $conn->close();
    header('Location: ../user-login.php');
} else {
    header('Location: ../user-login.php');
}
?>
