const spd = 3;
const canvasHeight = 500;
const canvasWidth = 500;
const characterSize = 50;
let xPos = canvasWidth / 2 - characterSize / 2;
let yPos = canvasHeight / 2 - characterSize / 2;

function setup(){
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("gameCanvas");
    frameRate(60);
}

function draw(){
    background(220);
    fill(color(0, 120, 30));
    rect(xPos, yPos, characterSize, characterSize);

    let xSpd = (keyIsDown(68) - keyIsDown(65)) * spd;
    let ySpd = (keyIsDown(83) - keyIsDown(87)) * spd;

    xPos += xSpd;
    yPos += ySpd;
}