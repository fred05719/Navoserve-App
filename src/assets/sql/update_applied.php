<?php

@include 'connection.php';

$socser_id = $_POST['socser_id'];
$count = $_POST['count'];

$sql = "UPDATE `soc_services` SET `num_appl` = $count WHERE `socser_id` = '$socser_id'";
$result = $conn->query($sql);
if ($result === TRUE) {
  echo "SUCCESS";
} 
else {
  echo "Error updating record: " . $conn->error;
}


$conn->close();
?>