<?php

$HOST = 'localhost';
$USER = 'root';
$PASSWORD = '';
$DB = 'bu-news-db';

$conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>