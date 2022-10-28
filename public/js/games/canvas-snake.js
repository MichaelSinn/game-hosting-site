let modal = document.getElementById("modal")
let scoreEl = document.getElementById("score")
let submit = document.getElementById("submitScore")
let score;
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
        modal.classList.add("is-active")
        scoreEl.innerHTML = (snake.body.length)
        score = snake.body.length
        noLoop();
    }

    noStroke();
    fill(255, 255, 0);
    rect(food.x, food.y, 1, 1);
}

const postScore = async function () {
    const response = await fetch(`${window.location.href}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({score})
    });
    if (response.ok) {
        console.log("Score added");
    }
}


submit.addEventListener("click", (event) => {
    event.preventDefault()

    postScore()
        .then((data) => console.log('score added'))
        .catch((err) => console.log(err))
})