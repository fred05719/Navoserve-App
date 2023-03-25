<?php
  $SQL_HOST = 'db4free.net'; 
  $SQL_USERNAME = 'navoserve';
  $SQL_PASSWORD = 'navoserve';
  $DATABASE_NAME = 'db_navoserve';

  // Create connection
  $conn = new mysqli($SQL_HOST, $SQL_USERNAME,  $SQL_PASSWORD, $DATABASE_NAME);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 
    
?>