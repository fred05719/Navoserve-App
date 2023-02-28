<?php

@include 'connection.php';

$socser_id = $_POST['socser_id'];
$customer_id = $_POST['customer_id'];
$queue_num = $_POST['queue_num'];
$schedule = $_POST['schedule'];
$app_status = $_POST['app_status'];

$lname = $_POST['last_name'];
$fname = $_POST['first_name'];
$mname = $_POST['middle_name'];
$xname = $_POST['ext_name'];
$gender = $_POST['gender'];
$address = $_POST['street'] . ', ' . $_POST['barangay'] . ', ' . $_POST['city'] . ', ' . $_POST['district'] . ', ' . $_POST['region'];
$bday = $_POST['bday'];
$age = $_POST['age'];
$civil_status = $_POST['civil_status'];


$sql = "INSERT INTO applications (socser_index, customer_index, app_status) VALUES ($socser_id, $customer_id, '$app_status')";

$send_status = '';
$send_index = '';
$send_id = '';

if ($conn->query($sql) === TRUE) {
  $index = mysqli_insert_id($conn);
  $year = date('Y');
  $app_id = "AF" . $year . (str_pad($index, 6, '0', STR_PAD_LEFT));

  $set_code = " UPDATE applications SET app_id = '$app_id', details_index = $index WHERE app_index = $index ";
  if ($conn->query($set_code) === TRUE) {

    $set_details = "INSERT INTO details (details_index, last_name, first_name, middle_name, extension_name, gender, address, bday, age, civil_status) VALUES ($index, '$lname', '$fname', '$mname', '$xname', '$gender', '$address', '$bday', '$age', '$civil_status')";

    if ($conn->query($set_details) === TRUE) {
      $send_index = $index;
      $send_id = $app_id;
      $send_status = 'SUCCESS';
    } else {
      $send_status = "Error: " . $sql . "<br>" . $conn->error;
    }

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

$conn->close();
// echo $civil_status;
?>