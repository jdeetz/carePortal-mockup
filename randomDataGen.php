<?php

#This function generates a random float within a range, since all of PHP's random number functions give you an int for some reason
function randFloat($min,$max) {
	#multiply both numbers by a million so that you can pass in floats for your range - in this case, GPS coordinates
	$min = $min * 1000000;
	$max = $max * 1000000;
	#We divide the result by a million because that's how math works
	return mt_rand($min,$max)/1000000;
}


function generateRandTimestamp() {
	#I split this into individual functions because PHP hates inline execution. PHP is not a good language.
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
	#Moved the database connection code and stuff into this function because scoping
	#is apparently not PHP's strong suit. Global variables are not global, which is great because ...
	require "creden.php";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    echo("Connection failed: " . $conn->connect_error);
	}

	#This part is pretty much necessary because when we instantiate the SQL variable, even with an empty string, and then
	#later use it AS a complex string, PHP gets confused and hurts itself in its confusion
	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql = "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '37.433595', '-79.158150');";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData);";

	#This is the part that actually generates a bunch of random data, equivalent to how much we asked it to up above
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
	}

	#And since PHP also has trouble with conditionals (see the note about inline execution above) we also have to
	#do the last concatenation separately
	$inputData = random_int(0,6000);
	$timeData = generateRandTimestamp();
	$sql .= "INSERT INTO DEMO_GPS (`id`, `times`, `lat`, `lon`) VALUES (NULL, '$timeData', '37.433595', '-79.158150');";
	$sql .= "INSERT INTO DEMO_STEP (`id`, `times`, `steps`) VALUES (NULL, '$timeData', $inputData)";

	#at long last, we execute our SQL query
	$result = $conn->multi_query($sql);
	$conn->close();
}


#This function calls the other function. Our function chain is exactly 2 long, because
#PHP's motto is "More than 2 long is too long". At least I assume that's the motto, based on the behavior observed
function createAndSubData() {
	#These variables are used for seeding the data with a variety of normal places, like a house, grocery store, gas station etc.
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

	#This is "where the magic happens" and by magic, I mean PHP working in a predictable manner
	generateRandData(721,$homeLat,$homeLon);
	generateRandData(1283,$workLat,$workLon);
	generateRandData(79,$sevenLat,$sevenLon);
	generateRandData(11,$krogLat,$krogLon);
	generateRandData(59,$kelleyLat,$kelleyLon);
}


createAndSubData();

?>
