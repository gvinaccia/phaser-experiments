var W = 800;
var H = 800;
var size = 50;
class Snake {};
var tail = [];



var fpsScale = 10;
var fc = 0;

var cols = W / size;
var rows = H / size;

var game = new Phaser.Game(W, H, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
 });

var sprite;
var cursors;
var food;


function preload() {

    game.stage.backgroundColor = '#000';
    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('snake', 'corpo.png');
    game.load.image('food', 'cibo.png');

}

function create() {
    cursors = game.input.keyboard.createCursorKeys();

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    sprite = game.add.sprite(500, 300, 'snake');
    food = game.add.sprite(0,0,'food');

    moveFood( randomPos() );

    console.log(cursors);
}

var nextMove =  new Phaser.Point(0, 0);
var score = 0;

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
        var pos = sprite.position;

        pos.add(nextMove.x, nextMove.y);

        // collisione con i bordi
        if (pos.x > W - size
            || pos.x < 0
            || pos.y > H - size
            || pos.y < 0
        ) {
            dead();
        }

        // collisione con il cibo
        if (pos.x == food.position.x && pos.y == food.position.y) {
            eat();


           }



    }

}

function dead() {
    console.log('morto');

    sprite.position.add(-nextMove.x, -nextMove.y);

    game.paused = true;
    console.log("Your Score is = " + score);

}

function eat() {
    moveFood( randomPos());
    score += 4;
  document.getElementById("insert").innerHTML ="Score: " + score;

}

function moveFood(point) {
    food.position= point;
}

function randomPos() {
    var randomCol = Math.floor(Math.random() * cols);
    var randomRow = Math.floor(Math.random() * rows);

    return new Phaser.Point(randomCol * size, randomRow * size);
}
