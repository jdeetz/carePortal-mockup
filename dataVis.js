/*
This is the code for the graph rendering functions, leveraging p5.js
*/


new p5(); //Create p5 global reference so that math functions like random() are accessible outside of setup()
var img;
function setup() {
	var canvas = createCanvas(400,400); //Canvas instantiation - dimensions of 400x400 pixels used for the sake of testing
	canvas.parent('content'); //Moves graph from end-of-body to an in-page node for inline display
	img = loadImage('backgroundMap.png');
}

//Finds lowest value in a 1-d numerical array
var findMin = function(inputArray) {
	var min = inputArray[0]; //set to value inside the array to prevent default value from being incorrectly flagged as min
	for(var i = 0;i < inputArray.length;i++) {
		if(inputArray[i] < min) {
			min = inputArray[i]; //iterates through array, setting minimum to lowest value found
		}
	}
	return min;
};

//Finds highest value in a 1-d numerical array
var findMax = function(inputArray) {
	var max = inputArray[0]; //set to value inside the array to prevent default value from being incorrectly flagged as max
	for(var i = 0;i < inputArray.length;i++) {
		if(inputArray[i] > max) {
			max = inputArray[i]; //iterates through array, setting maximum to highest value found
		}
	}
	return max;
};

//Maps values in a 1-d array, based on internal minimum and maximum, to new range given as arguments
var mapArray = function(inputArray,min,max) {
	var inputMin = findMin(inputArray); //Finds lowest value in array
	var inputMax = findMax(inputArray); //Finds highest value in array
	var mappedValues = []; //Empty output array
	for(var i = 0;i<inputArray.length;i++) {
		mappedValues[i] = (inputArray[i] - inputMin) * (max - min) / (inputMax - inputMin) + min; //this is the function that maps the values
	}
	return mappedValues;
};

/*
Leverages above 1-d array mapping function to map a 2-dimensional array, respecting original array indices
*/
var map2dArray = function(inputArray,minX,maxX,minY,maxY) {
	var xArray = []; //Empty array for x positions
	var yArray = []; //Empty array for y positions
	for(var i = 0;i<inputArray.length;i++) {
		xArray[i] = inputArray[i][0]; //Splits all 0 indexed elements into one array...
		yArray[i] = inputArray[i][1]; //And all 1 indexed elements into the other
	}
	var mappedX = mapArray(xArray,minX,maxX); //Calls 1d mapping function on first array...
	var mappedY = mapArray(yArray,minY,maxY); //And on the second
	var outputArray = []; //Creates empty output array
	for(var i = 0;i<inputArray.length;i++) {
		outputArray[i] = []; //Creates empty sub-array that will contain the two (X and Y) values
		outputArray[i][0] = mappedX[i];
		outputArray[i][1] = mappedY[i];
	}
	return outputArray;
};

//Calculates distance between two GPS coordinates, with respect to differences in conversion for minutes at different latitudes
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0; //If distance between coordinates is identical, skips processing to save render time
	}
	else {
		var radlat1 = Math.PI * lat1/180; //accounting for signed coordinates
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		//Above defaults to showing distance in miles, below converts to other units
		if (unit=="K") { dist = dist * 1.609344 } //Conversion factor for converting distance to kilometers
		if (unit=="N") { dist = dist * 0.8684 } //And nautical miles
		return dist;
	}
}



//These are data structure helper functions for the different types of data;

//This is the helper function for step data, and will give the data as an array or array of arrays in a custom object type that
//allows for easier iteration through the data
var StepData = function(data) {
	this.data = [];
	for(var i = 0;i<data.length;i++) {
		this.data[i] = data[i].steps;
	}
};

StepData.prototype.getRow = function(rowNumber) {
	return this.data[rowNumber - 1];
};

//Same deal for activity data
var ActivityData = function(data) {
	this.data = data;
};

//And for lifeSpace(tm) data
var LifeSpaceData = function(data) {
	this.data = [];
	for(var i = 0;i<data.length;i++) {
		this.data[i] = [];
		this.data[i][0] = data[i].lat;
		this.data[i][1] = data[i].lon;
	}
	this.lsDelta = new LifeSpaceDelta(this.data);
};

//DELETE THIS FUNCTION
LifeSpaceData.prototype.render = function() {
	this.lsDelta.render();
};



var Heatmap = function(activityData) {
	this.data = data;
}

Heatmap.prototype.render = function(range) {

}

var Stepgraph = function(stepData) {
	this.data = data;
}

Stepgraph.prototype.render = function(range) {

}

var LifeSpaceDelta = function(lsdata) {
	this.data = lsdata;
}

LifeSpaceDelta.prototype.render = function(range) {
	image(img,0,0,400,400);
	this.data = map2dArray(this.data,0,400,0,400);
	for(var i = 0;i<this.data.length;i++) {
		for(var j = 0;j<this.data[i].length;j++) {
			fill(0,255,0,20);
			noStroke();
			ellipse(this.data[i][0],this.data[i][1],10,10);
		}
	}
}

var wakeTimes = [11,12,11,13,12,11,12,13,12.5];
var bedTimes = [4.1,3.8,2,5,2,2.6,3.4,5.1,4.4];


//This is the draw loop, it's called recurrently at ~30fps
function draw() {
	if(window.currentTab == 2) {
		background(255,255,255);
		noStroke();
		fill(255,0,0,70);
		rect(30,12,55,400);
		rect(183,12,38,400);
		for(var i = 0;i<23;i++) {
			stroke(0);
			strokeWeight(1);
			line((width/24) * i,15,(width/24) * i,400);
			textSize(9);
			text(i + ":00",(width/24) * i,(i%2)*10);
		}
		for(var i = 0;i<wakeTimes.length;i++) {
			stroke(0,0,255);
			strokeWeight(5);
			line((width/24) * bedTimes[i],((height/wakeTimes.length) * i)+15,(width/24) * wakeTimes[i],((height/wakeTimes.length) * i)+15);
		}
	}
}
