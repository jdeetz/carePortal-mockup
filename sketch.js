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

var map = function(inputArray,min,max) {

};

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

}

LifespaceDelta.prototype.render = function(range) {

}

//This is the draw loop, it's called recurrently at ~30fps
function draw() {

}
