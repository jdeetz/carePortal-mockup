<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

$sql = "SELECT * FROM DEMO_STEP where times >= '$startDate' and times < '$endDate' order by id";
$result = $conn->query($sql);
//
$first = true;
if ($result->num_rows > 0) {
	echo "[";
    // output data of each row
	while($row = $result->fetch_assoc()) {
		if($first) {
		  $first = false;
		} else {
		  echo ',';
		}
		echo json_encode($row);
	}
	echo "]";
} else {
    echo "0 results";
}
$conn->close();
?>
