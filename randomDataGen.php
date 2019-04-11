<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$inputData = random_int(0,6000);
$randmon = "0" . rand(3,4);
$timeData = random_int(2018,2019) . "-" . $randmon . "-" . random_int(10,30) . " " . random_int(10,23) . ":" . random_int(10,59) . ":" . random_int(10,59);

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, $timeData, $inputData)";
$result = $conn->query($sql);
//
echo $result;
echo "It seems to have worked I guess";
$conn->close();
?>
