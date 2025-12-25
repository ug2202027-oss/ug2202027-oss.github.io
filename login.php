<?php
require_once 'helpers.php';
require_login();

$_SESSION['msg'] = 'Login functionality not yet implemented';
header('Location: index.php');
exit;
