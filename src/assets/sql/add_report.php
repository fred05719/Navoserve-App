<?php

@include 'connection.php';

$time_stamp = $_POST['time_stamp'];
$remark = $_POST['remark'];


$sql = "INSERT INTO `reports` (time_stamp, remarks) VALUES ('$time_stamp',' $remark')";

if ($conn->query($sql) === TRUE) {
  echo 'SUCCESS';
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>