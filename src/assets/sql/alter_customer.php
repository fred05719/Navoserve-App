<?php

@include 'connection.php';

  $id = $_POST['customer_id'];

    $sql = "UPDATE `customers` SET `email_verified` = 'true' WHERE `customer_id` = '$id'";
    $result = $conn->query($sql);
    if ($result === TRUE) {
        echo "SUCCESS";
    } else {
        echo "Error updating record: " . $conn->error;
    }


  $conn->close();
?>