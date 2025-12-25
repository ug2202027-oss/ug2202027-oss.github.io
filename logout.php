<?php
require_once 'helpers.php';

unset($_SESSION['user_id']);
$_SESSION['msg'] = 'You have been logged out';
header('Location: index.php');
exit;
