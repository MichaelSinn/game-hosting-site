let snake;
let res = 25;
let food;
let w;
let h;

function setup(){
    let canvas = createCanvas(500, 500);
    canvas.parent('gameCanvas')
    w = floor(width / res);
    h = floor(height / res);
    frameRate(12)
    snake = new Snake();
    foodLocation()
}

function foodLocation() {
    let x = floor(random(w))
    let y = floor(random(h))
    food = createVector(x,y)
}

function keyPressed() {
    if (keyCode === UP_ARROW){
        snake.setDir(0, -1)
    } else if (keyCode === DOWN_ARROW){
        snake.setDir(0, 1)
    } else if (keyCode === RIGHT_ARROW){
        snake.setDir(1, 0)
    } else if (keyCode === LEFT_ARROW){
        snake.setDir(-1, 0)
    }
}

function draw(){
    scale(res)
    background(0, 0, 0);
    if (snake.eat(food)) {
        foodLocation()
    }
    snake.update();
    snake.show();
    if (snake.death()) {
        print("END GAME")
        print(snake.body.length) // score! need to pass to a form/modal
        noLoop();
    }

    noStroke();
    fill(255, 255, 0);
    rect(food.x, food.y, 1, 1);
}