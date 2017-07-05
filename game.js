var W = 1500;
var H = 800;
var size = 50;

var fpsScale = 8;
var fc = 0;

var cols = W / size;
var rows = H / size;

var cursors;
var food;

var nextMove;
var score;


var snake;

var game = new Phaser.Game(W, H, Phaser.CANVAS, 'container');

var playngState = {
    preload: preload,
    create: create,
    update: update
}

var gameoverState = {
    create: function() {
        game.stage.backgroundColor = '#faf';
    },
    update: function() {
        restart();
    }
}

game.state.add('play', playngState);
game.state.add('gameover', gameoverState);
game.state.start('play');


function preload() {

    game.stage.backgroundColor = '#000';

    game.load.image('snake', 'corpo.png');
    game.load.image('food', 'cibo.png');

}

function create() {
    console.log('creating');
    cursors = game.input.keyboard.createCursorKeys();

    nextMove = new Phaser.Point(0, 0);

    score = new Score();

    snake = new SnakeClass(game.add.sprite(W / 2, H / 2, 'snake'));

    food = game.add.sprite(0, 0, 'food');

    moveFood(randomPos());

}

function update() {
    fc++;

    var velocity = size;

    if (cursors.up.isDown) {
        // freccia su
        nextMove = new Phaser.Point(0, - velocity);
    }

    if (cursors.down.isDown) {
        // freccia giu
        nextMove = new Phaser.Point(0, velocity);
    }

    if (cursors.right.isDown) {
        // freccia dx
        nextMove = new Phaser.Point(velocity, 0);
    }

    if (cursors.left.isDown) {
        // freccia sx
        nextMove = new Phaser.Point(-velocity, 0);
    }

    if (fc % fpsScale == 0) {

        snake.move(nextMove);

        if (snake.eats(food)) {
            moveFood(randomPos());

            score.incrementBy(4);
        }
    }
}

function restart() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        game.state.start('play');
    }
}


function dead() {
    console.log('morto');

    snake.head.position.add(-nextMove.x, -nextMove.y);

    console.log("Your Score is = " + score)
    document.getElementById("GameOver").innerHTML = "Game Over press R to restart";
    game.state.start('gameover');
}

function moveFood(point) {
    food.position = point;
}

function randomPos() {
    var randomCol = Math.floor(Math.random() * cols);
    var randomRow = Math.floor(Math.random() * rows);

    return new Phaser.Point(randomCol * size, randomRow * size);
}

