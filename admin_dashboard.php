<?php
require_once 'helpers.php';
require_user_type('admin');

$_SESSION['msg'] = 'Admin dashboard not yet implemented';
header('Location: index.php');
exit;
