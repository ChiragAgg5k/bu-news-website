<?php
if (isset($_POST['title']) && isset($_POST['description']) && isset($_FILES['image'])) {
  $title = $_POST['title'];
  $description = $_POST['description'];
  $image = $_FILES['image']['name'];
  
  // Connect to the database.
 
  $servername = "amanboora.in";
  $dbusername = "amanboor_root";
  $dbpassword = "Am@100704";
  $dbname = "amanboor_project";
  
  $conn = mysqli_connect($servername, $username, $password, $dbname);
  
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  
  // Store the data in the database.
  $sql = "INSERT INTO news (title, description, image) VALUES ('$title', '$description', '$image')";
  
  if (mysqli_query($conn, $sql)) {
    echo "<h1>Data stored successfully!</h1>";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
  
  mysqli_close($conn);
}
?>
