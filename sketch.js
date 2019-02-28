/*
This is the code for the graph rendering functions, leveraging p5.js
*/


new p5(); //Create p5 global reference so that math functions like random() are accessible outside of setup()
function setup() {
    var canvas = createCanvas(400,400); //Canvas instantiation - dimensions of 400x400 pixels used for the sake of testing on Khan
    canvas.parent('graph'); //Moves graph from end-of-body to an in-page node for inline display
}

var highActivityThreshold = 142;


var activityData = [];
var createRandomDay = function() {
    var dayArray = [];
    for (var i = 0;i<24;i++) {
        dayArray[i] = random(0,255);
    }
    return dayArray;
};
for(var i = 0;i<30;i++) {
    activityData[i] = createRandomDay();
}


function draw() {
  background(250,250,250);
  for(var i = 0;i<activityData.length;i++) {
      for(var j = 0;j<activityData[i].length;j++) {
          fill(activityData[i][j], 0, 0);
          if(activityData[i][j] > highActivityThreshold && j > activityData.length/3.1) {
              fill(0, activityData[i][j], 0);
          }
          if(j < activityData.length/3 && random(0,10) > 0.4) {
              fill(138, 138, 138);
          }
          rect(j*(400/activityData[i].length),i*(400/activityData.length),j*(400/activityData[i].length),i*(400/activityData.length));
      }
  }
}

var steps = [];
var displayRange = 30;
for(var i = 0;i<180;i++) {
    steps[i] = random(0,6000);
}
var stepMean = function() {
    var total = 0;
    for(var i = 0;i<steps.length;i++) {
        total+=steps[i];
    }
    total = total / steps.length;
    return total;
};

var mapped = function(val) {
    return map(val,0,6000,0,400);
};
var incrementer = 1;
var curCol = 0;
var draw = function() {
    background(curCol);
    curCol+=incrementer;
    if(curCol > 255 || curCol < 1) {
        incrementer = -incrementer;
    }
    stroke(0, 13, 255);
    strokeWeight(6);
    line(0,mapped(stepMean()),400,mapped(stepMean()));
    strokeWeight(1);
    for(var i = 0;i<steps.length;i++) {
        if(steps[i] < stepMean()) {
            stroke(0, 255, 0);
        } else {
            stroke(255, 0, 0);
        }
        line(i*(400/steps.length),map(steps[i],0,6000,0,400),i*(400/steps.length),400);
    }
    textSize(39);
    fill(0, 204, 255);
    text("Average steps: " + floor(stepMean()),10,mapped(stepMean())-10);
};
