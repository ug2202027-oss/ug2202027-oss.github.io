<?php
require_once 'helpers.php';
require_user_type('customer');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$_SESSION['msg'] = 'Add to cart functionality not yet implemented';
header('Location: index.php');
exit;
