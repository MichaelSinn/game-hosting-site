const spd = 3;
const canvasHeight = 500;
const canvasWidth = 500;
const paddleSize = 100;
let xPos = canvasWidth / 2 - paddleSize / 2;
let xSpd = 0;

Ball = {
	xPos: 250,
	yPos: 250,
	spd: 1,
	xDir: 1,
	yDir: 1,
	size: 8,
	move: function () {
		for (let i = 0; i < spd; i++) {
			if (this.yPos + this.yDir > 40 && this.yPos + this.yDir < 460
			  && this.xPos + this.xDir) {
				this.xPos += this.dir;
			}
		}
	}
};

function setup() {
	const canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('gameCanvas');
	frameRate(60);
}

function draw() {
	background(220);
	fill(color(0, 120, 120));
	rect(xPos, 460, paddleSize, 20);
	fill(color(255, 120, 30));
	rect(Ball.xPos, Ball.yPos, Ball.size, Ball.size);

	xSpd = (keyIsDown(68) - keyIsDown(65)) * spd;
	if (xPos + xSpd < (500 - paddleSize) && xPos + xSpd > 0) {
		xPos += xSpd;
	}
}