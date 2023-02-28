<?php

@include 'connection.php';

$name = $_POST['lName'] .', '. $_POST['fName'];
$email = $_POST['email'];
$password = $_POST['password'];


$sql = "INSERT INTO customers (acc_name, email ,email_verified, user_type) VALUES ('$name', '$email', 'false', 'CUSTOMER')";

$send_status = '';
$send_index = '';
$send_id = '';

if ($conn->query($sql) === TRUE) {
  $index = mysqli_insert_id($conn);
  $year = date('Y');
  $app_id = "C" . (str_pad($index, 6, '0', STR_PAD_LEFT));

  $set_code = " UPDATE customers SET customer_id = '$app_id' WHERE customer_index = $index ";
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