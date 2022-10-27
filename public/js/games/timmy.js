let cameraX = 0;
let cameraY = 0;
let spd = 2;
let timmy;

let flowers = [];
let bushes = [];

const mapSize = 800;
const numFlowers = 40;
const numBushes = 40;

class Timmy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.distanceToGround = this.y;
        this.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        let increase = 1;
        let jump = -10;
        const jumpHeight = 10;

        this.jump = function () {
            if (jump >= jumpHeight) {
                jump = -jumpHeight;
                this.y = this.distanceToGround;
            }
            jump += increase
            this.y += jump;
        };

        this.draw_shadow = function () {
            fill(60);
            ellipse(this.x, this.distanceToGround + 27, 25 - (this.distanceToGround - this.y) / 2, 5 - (this.distanceToGround - this.y) / 7);
        };

        this.draw = function () {
            fill(this.color);
            ellipse(this.x, this.y, 30, 30);
            fill(0);
            ellipse(this.x - 5, this.y - 2, 5, 5);
            ellipse(this.x + 5, this.y - 2, 5, 5);
        };
    }
}

class Bush {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = color(Math.random() * 40, Math.random() * 20 + 150, Math.random() * 30);
        this.color2 = color(Math.random() * 40, Math.random() * 20 + 150, Math.random() * 30);
        let extra = Math.floor(random(2)) === 1

        this.draw = function () {
            fill(this.color);
            arc(this.x - cameraX, this.y - cameraY, 30, 30, PI, 0, OPEN);
            if (extra) {
                arc(this.x - cameraX + 40, this.y - cameraY, 30, 30, PI, 0, OPEN);
            }
            fill(this.color2)
            arc(this.x - cameraX + 20, this.y - cameraY, 50, 50, PI, 0, OPEN);
        };
    };
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.floor(Math.random() * 3);

        this.color = color(Math.random() * 140 + 100, Math.random() * 60 + 100, Math.random() * 130 + 100);

        this.mousedOver = function(){
            const radius = 10;
            return (this.x < mouseX + radius + cameraX & this.x > mouseX - radius + cameraX && this.y < mouseY + radius + cameraY && this.y > mouseY - radius + cameraY);
        }

        this.draw = function () {
            fill(this.color);
            ellipse(this.x - cameraX - 6 + this.size, this.y - cameraY, 11 - this.size, 11 - this.size);
            ellipse(this.x - cameraX + 6 - this.size, this.y - cameraY, 11 - this.size, 11 - this.size);
            ellipse(this.x - cameraX, this.y - cameraY - 6 + this.size, 11 - this.size, 11 - this.size);
            ellipse(this.x - cameraX, this.y - cameraY + 6 - this.size, 11 - this.size, 11 - this.size);
            noStroke();
            ellipse(this.x - cameraX, this.y - cameraY, 12 - this.size, 12 - this.size);

            fill('yellow');
            ellipse(this.x - cameraX, this.y - cameraY, 5, 5);
        };
    }
}

function setup() {
    const canvas = createCanvas(mapSize / 2, mapSize / 2);
    canvas.parent("gameCanvas");

    for (let i = 0; i < numFlowers; i++) {
        const n = new Flower(Math.floor(Math.random() * mapSize) - mapSize / 4, Math.floor(Math.random() * mapSize) - mapSize / 4);
        flowers.push(n);
    }

    for (let i = 0; i < numBushes; i++) {
        const n = new Bush(Math.floor(Math.random() * mapSize) - mapSize / 4, Math.floor(Math.random() * mapSize) - mapSize / 4);
        bushes.push(n);
    }
    timmy = new Timmy(200, 200);
    background(220);
    frameRate(44);
}

function draw() {
    background(220);
    fill(color(45, 120, 30));
    rect(-mapSize / 3 - cameraX, -mapSize / 3 - cameraY, mapSize * 4 / 3, mapSize * 4 / 3);
    noStroke();

    const xSpd = (keyIsDown(68) - keyIsDown(65)) * spd;
    const ySpd = (keyIsDown(83) - keyIsDown(87)) * spd;

    cameraX += xSpd;
    cameraY += ySpd;

    flowers.forEach(flower =>{
        noStroke();
        if (flower.mousedOver()){
            stroke(255)
            if (keyIsDown(16)) stroke(color(0, 255, 0));
        }
        flower.draw();
    })

    noStroke();
    bushes.forEach(bush => bush.draw());
    timmy.jump()
    timmy.draw_shadow();
    timmy.draw();
}

function mousePressed() {
    if (mouseButton === 'left' && keyIsDown(16)) {
        flowers.forEach((flower, index) =>{
            if (flower.mousedOver()){
                timmy.color = flower.color;
                flowers.splice(index, 1);
            }
        })
    } else if (mouseButton === 'left') {
        flowers.push(new Flower(mouseX + cameraX, mouseY + cameraY));
    }

}
