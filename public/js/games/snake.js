let score;
let snake;
let res = 20;
let food;
let w;
let h;

class Snake {
	constructor() {
		this.body = [];
		this.body[0] = createVector(floor(w / 2), floor(h / 2));
		this.xdir = 0;
		this.ydir = 0;
		this.len = 0;
	}

	setDir(x, y) {
		this.xdir = x;
		this.ydir = y;
	}

	update() {
		let head = this.body[this.body.length - 1].copy();
		this.body.shift();
		head.x += this.xdir;
		head.y += this.ydir;
		this.body.push(head);
	}

	grow() {
		let head = this.body[this.body.length - 1].copy();
		this.len++;
		this.body.push(head);
	}

	death() {
		let x = this.body[this.body.length - 1].x;
		let y = this.body[this.body.length - 1].y;
		if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
			return true;
		}
		for (let i = 0; i < this.body.length - 1; i++) {
			let part = this.body[i];
			if (part.x === x && part.y === y) {
				return true;
			}
		}
		return false;
	}

	show() {
		for (let i = 0; i < this.body.length; i++) {
			fill(100, 255, 218);
			noStroke();
			rect(this.body[i].x, this.body[i].y, 1, 1);
		}
	}

	eat(pos) {
		let x = this.body[this.body.length - 1].x;
		let y = this.body[this.body.length - 1].y;
		if (x === pos.x && y === pos.y) {
			this.grow();
			return true;
		}
		return false;
	}
}

function setup() {
	let canvas = createCanvas(400, 400);
	canvas.parent('gameCanvas');
	w = floor(width / res);
	h = floor(height / res);
	frameRate(12);
	snake = new Snake();
	foodLocation();
}

function foodLocation() {
	let x = floor(random(w));
	let y = floor(random(h));
	food = createVector(x, y);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		snake.setDir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		snake.setDir(0, 1);
	} else if (keyCode === RIGHT_ARROW) {
		snake.setDir(1, 0);
	} else if (keyCode === LEFT_ARROW) {
		snake.setDir(-1, 0);
	}
}

function draw() {
	scale(res);
	background(0, 0, 0);
	if (snake.eat(food)) {
		foodLocation();
	}
	snake.update();
	snake.show();
	if (snake.death()) {
		score = snake.body.length;
		submitScore();
		noLoop();
	}

	noStroke();
	fill(255, 255, 0);
	rect(food.x, food.y, 1, 1);
}
