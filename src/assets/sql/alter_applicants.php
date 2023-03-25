<?php

@include 'connection.php';

  $id = $_POST['applicant_id'];

    $sql = "UPDATE `applicants` SET `email_verified` = 'true' WHERE `applicant_id` = '$id'";
    $result = $conn->query($sql);
    if ($result === TRUE) {
        echo "SUCCESS";
    } else {
        echo "Error updating record: " . $conn->error;
    }


  $conn->close();
?>