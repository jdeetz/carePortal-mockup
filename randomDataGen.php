<?php


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
	require "creden.php";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    echo("Connection failed: " . $conn->connect_error);
	}

	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql = "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '37.433595', '-79.158150');";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData);";


	for($i = 0; $i < $numTimes;$i++) {
		$minLat = $forLat - ($forLat / 1000);
		$maxLat = $forLat + ($forLat / 1000);
		$inputLat = randFloat($minLat,$maxLat);
		$minLon = $forLon - ($forLon / 1000);
		$maxLon = $forLon + ($forLon / 1000);
		$inputLon = randFloat($maxLon,$minLon);
		$timeData = generateRandTimestamp();
		$inputSteps = random_int(0,100);
		$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '$inputLat', '$inputLon');";
		$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputSteps);";
		echo "have run " . $i . " times";
		$roundNum = 2 + $i;
	}

	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '37.433595', '-79.158150');";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";

	$totalRounds = ($numTimes * 2) + 4;

	$result = $conn->multi_query($sql);
	$conn->close();
}


function createAndSubData() {
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

	generateRandData(721,$homeLat,$homeLon);
	generateRandData(1283,$workLat,$workLon);
	generateRandData(79,$sevenLat,$sevenLon);
	generateRandData(11,$krogLat,$krogLon);
	generateRandData(59,$kelleyLat,$kelleyLon);
}


createAndSubData();

?>
