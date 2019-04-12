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
	echo "SQL round 1: " . $sql . "<br /><br />";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData);";

	echo "SQL round 2: " . $sql . "<br /><br />";

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
		$roundNum = 2 + $i;
		echo "SQL round " . $roundNum . ": " . $sql . "<br /><br />";
	}

	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '37.433595', '-79.158150');";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";

	$totalRounds = ($numTimes * 2) + 4;
	echo "<br /><br />Final SQL, round " . $numTimes . ": " . $sql . "<br /><br />";

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

	generateRandData(5,$homeLat,$homeLon);
	generateRandData(5,$workLat,$workLon);
	generateRandData(5,$sevenLat,$sevenLon);
	generateRandData(5,$krogLat,$krogLon);
	generateRandData(5,$kelleyLat,$kelleyLon);
}


createAndSubData();

?>
