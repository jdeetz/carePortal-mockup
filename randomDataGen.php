<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$inputData = random_int(0,6000);
$randYear = random_int(2018,2019);
$randDay = random_int(10,30);
$randMon = "0" . random_int(3,4);
$randHour = random_int(10,23);
$randMin = random_int(10,59);
$randSec = random_int(10,59);
$timeData = $randYear . "-" . $randMon . "-" . $randDay . " " . $randHour . ":" . $randMin . ":" . $randSec;

$sql = "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";
$result = $conn->query($sql);
//
echo $result;
echo "It seems to have worked I guess";
$conn->close();
?>
