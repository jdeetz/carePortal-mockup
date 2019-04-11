<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$inputData = $_POST['input'];
$timeData1 = $_POST['time1'];
$timeData2 = $_POST['time2'];

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, $timeData1 . " " . $timeData2, $inputData)";
$result = $conn->query($sql);
//
echo $result;
$conn->close();
?>
