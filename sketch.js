/*
This is the code for the graph rendering functions, leveraging p5.js
*/


new p5(); //Create p5 global reference so that math functions like random() are accessible outside of setup()
function setup() {
    var canvas = createCanvas(400,400); //Canvas instantiation - dimensions of 400x400 pixels used for the sake of testing on Khan
    canvas.parent('graph'); //Moves graph from end-of-body to an in-page node for inline display
}

//This is the draw loop, it's called recurrently at ~30fps
var circleX = 200;
var circleXMovement = -1;
var circleY = 190;
var circleYMovement = -1;
function draw() {
  circleX += circleXMovement;
  circleY += circleYMovement+0.3;
  if(circleX > 400 || circleX < 0) {
    circleXMovement = -circleXMovement;
  }
  if(circleY > 400 || circleY < 0) {
    circleYMovement = -circleYMovement;
  }
  ellipse(circleX,circleY,20,20); //adding a bouncing ellipse to test rendering effect on page load
}
