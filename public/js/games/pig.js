let gunshot, pigs, sky, score;
let gameOver = false;
let lives = 3;

class Pig {
	constructor() {
		this.x = Math.floor(random(300)) + 50;
		this.y = 450;
		this.pig = loadImage('../images/pig.png');
		this.balloon = loadImage('../images/balloon.png');
		this.pig.resize(10, 1);
		this.balloon.resize(10, 1);
		this.hit = false;
		let down = 0;

		this.draw = function () {
			image(this.pig, this.x, this.y, 64, 200);
			if (!this.hit) {
				image(this.balloon, this.x, this.y, 64, 200);
			}
		};

		this.move = function () {
			if (this.hit) {
				this.y += down;
				if (down < 10) {
					down++;
				}
			} else {
				this.y -= 2;
			}
		};

		this.offScreen = function () {
			return this.y < -250 || this.y > 500;
		};

		this.escaped = function () {
			return this.y < -250;
		};
	}
}

function setup() {
	const canvasSize = 400;
	const canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent('gameCanvas');
	gunshot = new Audio('../sounds/shot.mp3');
	sky = loadImage('../images/sky.png');
	pigs = [];
	for (let i = 0; i < 3; i++) {
		pigs.push(new Pig());
	}
	score = 0;
}

function draw() {
	noCursor();
	image(sky, 0, 0);
	if (lives <= 0) {
		gameOver = true;
	}
	if (!gameOver) {
		pigs.forEach((pig, index) => {
			pig.draw();
			pig.move();
			if (pig.offScreen()) {
				if (pig.escaped()) {
					lives--;
				}
				pigs.splice(index, 1);
				pigs.push(new Pig());
			}
		});
	} else {
		submitScore();
		cursor(ARROW, mouseX, mouseY);
		noLoop();
	}
	fill(color(255, 255, 255));
	textSize(30);
	textAlign(CENTER);
	text(score, 200, 50);
	text(lives, 20, 50);
	drawCursor();
}

function drawCursor() {
	rect(mouseX - 15, mouseY, 10, 2);
	rect(mouseX + 7, mouseY, 10, 2);
	rect(mouseX, mouseY - 15, 2, 10);
	rect(mouseX, mouseY + 7, 2, 10);
}

function shoot() {
	pigs.forEach(pig => {
		if (mouseX < pig.x + 64 && mouseX > pig.x && mouseY < pig.y + 90 && mouseY > pig.y) {
			pig.hit = true;
			score++;
		}
	});
}

function mousePressed() {
	if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 400) {
		const playSound = gunshot.cloneNode();
		playSound.play();

		shoot();
	}
}