<?php

@include 'connection.php';

$lname = $_POST['lName'];
$fname = $_POST['fName'];
$email = $_POST['email'];
$password = $_POST['password'];
$date_created = $_POST['date_created'];

$sql = "INSERT INTO applicants (first_name, last_name, email, email_verified, user_type, date_created) VALUES ('$fname',' $lname', '$email', 'false', 'APPLICANT', $date_created)";

$send_status = '';
$send_index = '';
$send_id = '';

if ($conn->query($sql) === TRUE) {
  $index = mysqli_insert_id($conn);
  $year = date('Y');
  $app_id = "C" . $year ."-".(str_pad($index, 4, '0', STR_PAD_LEFT));

  $set_code = " UPDATE applicants SET applicant_id = '$app_id' WHERE applicant_index = $index ";
  if ($conn->query($set_code) === TRUE) {

    $send_index = $index;
    $send_id = $app_id;
    $send_status = 'SUCCESS';

  } else {
    $send_status = "Error: " . $sql . "<br>" . $conn->error;
  }
} else {
  $send_status = "Error: " . $sql . "<br>" . $conn->error;
}


$data = array(
  "status" => $send_status,
  "index" => $send_index,
  "id" => $send_id
);

$json = json_encode($data);
echo $json;

// echo $send_status;
$conn->close();
?>