<?php

require_once 'config.php';

// Get the data from the form
$fullname = $_POST['fullname'];
$enrollid = $_POST['enrollid'];
$contact = $_POST['contact'];
$email = $_POST['email'];
$password = $_POST['password'];

// Check if the user already exists
$sql = "SELECT * FROM users WHERE enrollid = :enrollid";
$stmt = $conn->prepare($sql);
$stmt->execute(['enrollid' => $enrollid]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo "User already exists";
} else {
    // Insert the user into the database
    $sql = "INSERT INTO users (fullname, enrollid, contact, email, password) VALUES (:fullname, :enrollid, :contact, :email, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['fullname' => $fullname, 'enrollid' => $enrollid, 'contact' => $contact, 'email' => $email, 'password' => $password]);
    echo "User created successfully";
}
