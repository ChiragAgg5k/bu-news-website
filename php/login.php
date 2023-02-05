<?php
// if(!defined('amanboora')){
//     die("Access Denied");
// }
$email = $_POST["email"];
$password = $_POST["password"];

$servername = "amanboora.in";
$dbusername = "amanboor_root";
$dbpassword = "Am@100704";
$dbname = "amanboor_project";

// // Connect to the localhost database
// $servername = "localhost";
// $dbusername = "root";
// $dbpassword = "";
// $dbname = "bu-news-db";

$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "Login Successful";
} else {
    echo "Login Failed";
}

mysqli_close($conn);
