<?php
require_once 'helpers.php';
require_user_type('seller');

$_SESSION['msg'] = 'Seller report not yet implemented';
header('Location: index.php');
exit;
