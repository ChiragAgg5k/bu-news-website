<?php

$name = $_POST['name'];
$email = $_POST['eame'];
$password = $_POST['password'];
$enroll = $_POST['enroll'];

//Database connection
$conn = new mysqli('localhost','root','','signup');

if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error());
}else{
    $dat = $conn->prepare("insert into register(name, email, enroll, password) values(?,?,?,?)");
    $dat->bind_param("ssss",$name,$email,$enroll,$password);
    $dat->execute();
    echo "Registered Successfully...";
    $dat->close();
    $conn->close();
?>