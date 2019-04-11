<?php
require "creden.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
}

$homeLat = 37.433595;
$homeLon = -79.158150;
$workLat = 37.436131;
$workLon = -79.170871;
$sevenLat = 37.434644;
$sevenLon = -79.168029;
$krogLat = 37.442378;
$krogLon = -79.204132;
$kelleyLat = 37.428052;
$kelleyLon = -79.172024;

function randFloat($min,$max) {
	$min = $min * 1000000;
	$max = $max * 1000000;
	return mt_rand($min,$max)/1000000;
}

function generateRandTimestamp() {
	$randYear = random_int(2018,2019);
	$randDay = random_int(10,30);
	$randMon = "0" . random_int(2,4);
	$randHour = random_int(10,23);
	$randMin = random_int(10,59);
	$randSec = random_int(10,59);
	$timeData = $randYear . "-" . $randMon . "-" . $randDay . " " . $randHour . ":" . $randMin . ":" . $randSec;
	return $timeData;
}

function generateRandData($numTimes,$forLat,$forLon) {
	for($i = 0; $i < $numTimes;$i++) {
		$minLat = $forLat - ($forLat / 1000);
		$maxLat = $forLat + ($forLat / 1000);
		$inputLat = randFloat($minLat,$maxLat);
		$minLon = $forLon - ($forLon / 1000);
		$maxLon = $forLon + ($forLon / 1000);
		$inputLon = randFloat($minLon,$maxLon);
		$timeData = generateRandTimestamp();
		$inputSteps = random_int(0,100);
		$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `long`) VALUES (NULL, '$timeData', '$inputLat', '$inputLon');";
		$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputSteps)";
	}
}

function generateLast() {
	$inputData = random_int(0,6000);
	$randYear = random_int(2018,2019);
	$randDay = random_int(10,30);
	$randMon = "0" . random_int(3,4);
	$randHour = random_int(10,23);
	$randMin = random_int(10,59);
	$randSec = random_int(10,59);
	$timeData = $randYear . "-" . $randMon . "-" . $randDay . " " . $randHour . ":" . $randMin . ":" . $randSec;
	$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `long`) VALUES (NULL, '$timeData', '37.433595', '-79.158150')";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";
	$result = $conn->multi_query($sql);
}

function createAndSubData() {
	global $homeLat, $homeLon, $workLat, $workLon, $sevenLat, $sevenLon, $krogLat, $krogLon, $kelleyLat, $kelleyLon;
	generateRandData(500,$homeLat,$homeLon);
	generateRandData(500,$workLat,$workLon);
	generateRandData(500,$sevenLat,$sevenLon);
	generateRandData(500,$krogLat,$krogLon);
	generateRandData(500,$kelleyLat,$kelleyLon);
	generateLast();
}

createAndSubData();

//
echo $result;
echo "Okay cool so it submitted probably";
$conn->close();
?>
