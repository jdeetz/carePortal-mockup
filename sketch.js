/*
This is the code for the graph rendering functions, leveraging p5.js
*/


new p5(); //Create p5 global reference so that math functions like random() are accessible outside of setup()
function setup() {
	var canvas = createCanvas(400,400); //Canvas instantiation - dimensions of 400x400 pixels used for the sake of testing on Khan
	canvas.parent('content'); //Moves graph from end-of-body to an in-page node for inline display
}

var stepData = [];
var activityData = [];
var lifeSpaceData = [];

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
