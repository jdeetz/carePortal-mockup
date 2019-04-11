<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$inputData = $_GET['input'];

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, current_timestamp(), $inputData)";
$result = $conn->query($sql);
//
echo $result;
$conn->close();
?>
