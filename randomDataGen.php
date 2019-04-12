<?php
require "creden.php";
echo "got this far<br />";

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
$sql = '';

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
	echo "made a random timestamp - " . $timeData;
}


function generateRandData($numTimes,$forLat,$forLon) {
	global $sql;
	echo "we made it inside the generateRandData function<br />";
	for($i = 0; $i < $numTimes;$i++) {
		echo "<br />We generating random data...<br />";
		$minLat = $forLat - ($forLat / 1000);
		$maxLat = $forLat + ($forLat / 1000);
		$inputLat = randFloat($minLat,$maxLat);
		$minLon = $forLon - ($forLon / 1000);
		$maxLon = $forLon + ($forLon / 1000);
		$inputLon = randFloat($maxLon,$minLon);
		$timeData = generateRandTimestamp();
		$inputSteps = random_int(0,100);
		$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `long`) VALUES (NULL, '$timeData', '$inputLat', '$inputLon');";
		$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputSteps)";
	}
}


function generateLast() {
	echo "made it to top of generateLast<br />";
	global $sql, $conn;
	$result = '';
	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `long`) VALUES (NULL, '$timeData', '37.433595', '-79.158150')";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";
	echo "made it right to where we execute the SQL...";
	$result = $conn->multi_query($sql);
	echo "executed the SQL apparently?";
}


function createAndSubData() {
	echo "it even ran the createAndSubData function";
	global $homeLat, $homeLon, $workLat, $workLon, $sevenLat, $sevenLon, $krogLat, $krogLon, $kelleyLat, $kelleyLon;
	generateRandData(5,$homeLat,$homeLon);
	generateRandData(5,$workLat,$workLon);
	generateRandData(5,$sevenLat,$sevenLon);
	generateRandData(5,$krogLat,$krogLon);
	generateRandData(5,$kelleyLat,$kelleyLon);
	echo "<br />it got all the way to where it was supposed to generateLast...<br />";
	generateLast();
}

echo "even the createAndSubData function...<br />";

createAndSubData();

//
echo "Okay cool so it submitted probably";
$conn->close();
?>
