<?php
require_once 'helpers.php';
require_user_type('customer');

$_SESSION['msg'] = 'Customer dashboard not yet implemented';
header('Location: index.php');
exit;
