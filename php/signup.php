<?php
  // Connect to the database
  $servername = "amanboora.in";
  $username = "amanboor_root";
  $password = "Am@100704";
  $dbname = "amanboor_project";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Get the user input
  $username = $_POST['username'];
  $enroll = $_POST['enroll'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $password = $_POST['password'];

  // Prepare and execute the SQL statement
  $stmt = $conn->prepare("INSERT INTO users (username, enroll, email, phone, password) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sssis", $username, $enroll, $email, $phone, $password);
  $stmt->execute();

  // Show a success message
  echo "Signup successful";

  // Close the connection
  $conn->close();
?>
