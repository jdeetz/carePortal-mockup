<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

#$inputData = $_POST['input'];
$timeData = $_POST['timee'];

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, $timeData, `33333`)";
$result = $conn->query($sql);
//
echo $result;
$conn->close();
?>
