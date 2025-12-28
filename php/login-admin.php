<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = sanitize($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        $_SESSION['error'] = 'All fields are required.';
        header('Location: ../admin-login.php');
        exit();
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id, name, email, password FROM admins WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_name'] = $admin['name'];
            $_SESSION['admin_email'] = $admin['email'];
            
            header('Location: ../admin-dashboard.php');
            exit();
        }
    }
    
    $_SESSION['error'] = 'Invalid email or password.';
    $stmt->close();
    $conn->close();
    header('Location: ../admin-login.php');
} else {
    header('Location: ../admin-login.php');
}
?>
