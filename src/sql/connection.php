<?php
  // $host = 'sql111.epizy.com'; 
  $host = 'localhost'; 
  $user = 'epiz_33362837';
  $password = 'Lalisa1997';
  $dbname = 'epiz_33362837_db_navoserve';

  // Create connection
  $conn = new mysqli($host, 'root', '', $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 
    
?>