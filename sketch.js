/*
This is the code for the graph rendering functions, leveraging p5.js
*/


new p5(); //Create p5 global reference so that math functions like random() are accessible outside of setup()
function setup() {
	var canvas = createCanvas(400,400); //Canvas instantiation - dimensions of 400x400 pixels used for the sake of testing on Khan
	canvas.parent('content'); //Moves graph from end-of-body to an in-page node for inline display
}

var findMin = function(inputArray) {
	var min = inputArray[0];
	for(var i = 0;i < inputArray.length;i++) {
		if(inputArray[i] < min) {
			min = inputArray[i];
		}
	}
	return min;
};

var findMax = function(inputArray) {
	var max = inputArray[0];
	for(var i = 0;i < inputArray.length;i++) {
		if(inputArray[i] > max) {
			max = inputArray[i];
		}
	}
	return max;
};

var mapArray = function(inputArray,min,max) {
	var inputMin = findMin(inputArray);
	var inputMax = findMax(inputArray);
	var mappedValues = [];
	for(var i = 0;i<inputArray.length;i++) {
		mappedValues[i] = (inputArray[i] - inputMin) * (max - min) / (inputMax - inputMin) + min;
	}
	return mappedValues;
};

var map2dArray = function(inputArray,minX,maxX,minY,maxY) {
	var xArray = [];
	var yArray = [];
	for(var i = 0;i<inputArray.length;i++) {
		xArray[i] = inputArray[i][0];
		yArray[i] = inputArray[i][1];
	}
	var mappedX = mapArray(xArray,minX,maxX);
	var mappedY = mapArray(yArray,minY,maxY);
	var outputArray = [];
	for(var i = 0;i<inputArray.length;i++) {
		outputArray[i] = [];
		outputArray[i][0] = mappedX[i];
		outputArray[i][1] = mappedY[i];
	}
	return outputArray;
};

var gpsCoords = [

];
for(var i = 0;i < 2000;i++) {
	gpsCoords[i] = [];
	gpsCoords[i][0] = random(37.1,37.9);
	gpsCoords[i][1] = random(70.1,71.9);
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
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
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}



//These are data structure helper functions for the different types of data;

//This is the helper function for step data, and will give the data as an array or array of arrays in a custom object type that
//allows for easier iteration through the data
var StepData = function() {

};

//Same deal for activity data
var ActivityData = function() {

};

//And for lifeSpace(tm) data
var LifeSpaceData = function() {

};



var Heatmap = function(data) {

}

Heatmap.prototype.render = function(range) {

}

var Stepgraph = function(data) {

}

Stepgraph.prototype.render = function(range) {

}

var LifespaceDelta = function(data) {
	this.data = data;
}

LifespaceDelta.prototype.render = function(range) {
	for(var i = 0;i<this.data.length;i++) {
		for(var j = 0;j<this.data[i].length;j++) {
			fill(255,0,0,10);
			noStroke();
			ellipse(this.data[i][0],this.data[i][1],10,10);
		}
	}
}


//This is the draw loop, it's called recurrently at ~30fps
function draw() {

}
