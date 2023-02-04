<?php

$name = $_POST['name'];
$email = $_POST['eame'];
$password = $_POST['password'];
$enroll = $_POST['enroll'];

//Database connection
$conn = mysqli_connect('localhost,'root','',signup');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}else{
    $dat = $conn->prepare("insert into register(name, email, enroll, password) 
    values(?,?,?,?)");
    $dat->bind_param("ssss",$name,$email,$enroll,$password);
    $dat->execute();
    echo "Registered Successfully...";
    $dat->close();
    $conn->close();
?>
