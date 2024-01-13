<?php
$name = $_REQUEST['name'];
// echo $name;
  $servername = "localhost";
  $dbUsername = "root";
  $dbPassword = "";
  $dbname = "vaidya";
  // Create connection
  $conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);
  
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  // echo "Connected successfully";
  
  $sql = "select * from diseases where status='Y' AND name like '%".$name."%'";
  $result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    // echo mysql_fetch_array($result, MYSQL_NUM); 
    $i=0;
    while($row = $result->fetch_assoc()) {
        $resultArray[$i]['id'] = $row["id"];
        $resultArray[$i]['name'] = $row["name"];
        $resultArray[$i]['symptoms'] = $row["symptoms"];
        $resultArray[$i]['prevention'] = $row["prevention"];
        
    //   echo "id: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
      $i++;
    }
    print_r(json_encode($resultArray))   ;  
  } else {
    echo "0";
  }
  
  $conn->close();
?>