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
  ellipse(50, 50, 80, 80);
  ellipse(50, 100, 80, 80);
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
