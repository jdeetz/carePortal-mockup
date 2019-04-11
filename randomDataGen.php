<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$inputData = rand(0,6000);
$randmon = "0" . rand(3,4);
$timeData = rand(2018,2019) . "-" . $randmon . "-" . rand(10,30) . " " . rand(10,23) . ":" . rand(10,59) . ":" . rand(10,59);

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, $timeData, $inputData)";
$result = $conn->query($sql);
//
echo $result;
echo "It seems to have worked I guess";
$conn->close();
?>
