var W = 1500;
var H = 800;
var size = 50;

/*
 * lista di riferimenti alle sprite nella
 * coda del serpente
 */
var tail = [];

/*
 * rappresenta la "vita" del serpente, la funzione update
 * avrà la responsabilità di garantire che il valore di
 * life corrisponda alla lunghezza di tail
 */
var life = 0;

var fpsScale = 8;
var fc = 0;

var cols = W / size;
var rows = H / size;

var game = new Phaser.Game(W, H, Phaser.CANVAS, 'container', {
    preload: preload,
    create: create,
    update: update
});

var sprite;
var cursors;
var food;


function preload() {

    game.stage.backgroundColor = '#003300';

    game.load.image('snake', 'corpo.png');
    game.load.image('food', 'cibo.png');

}

function create() {
    cursors = game.input.keyboard.createCursorKeys();

    snake = game.add.sprite(W/2, H/2, 'snake');
    food = game.add.sprite(0, 0, 'food');

    moveFood(randomPos());
}

var nextMove = new Phaser.Point(0, 0);
var score = 0;

function update() {
    fc++;
    deathByTail();
    highScore();
    //restart();

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
        var pos = snake.position;

        /*
         * aggiungiamo un nuovo elemento nella coda nella
         * stessa posizione della testa prima di spostarla
         */
        tail.push(game.add.sprite(pos.x, pos.y, 'snake'));

        /*
         * se la lunghezza della coda è maggiora di "life"
         * è necessario rimuovere gli elementi non più
         * necessari
         */
        if (tail.length > life) {
            /*
             * il metodo splice rimuove x elementi da una lista
             * in questo caso rimuoviamo la differenza tra
             * lunghezza e "life", nella maggior parte dei
             * casi corrisponderà ad 1
             */
            var elementsToRemove = tail.splice(0, tail.length - life);

            for (var i = 0; i < elementsToRemove.length; i++) {
                elementsToRemove[i].destroy();
            }

        }


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
function highScore(){
  var highScore = score;
  if(score > highScore){

  }

}
/*
function restart(){
  if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
  game.paused = false;
  tail.length = 0;
  score -= score;
  snake.position.add(2000,2000);
  food.position.add(4000,4000);
  create();
  console.log("Restart");
  }
}
*/

function dead() {
    console.log('morto');

    snake.position.add(-nextMove.x, -nextMove.y);

    game.paused = true;

    console.log("Your Score is = " + score)
    document.getElementById("GameOver").innerHTML =  "Game Over press R to restart";


}

function eat() {
    moveFood(randomPos());

    score += 4;
    document.getElementById("insert").innerHTML = "Score: " + score;

    life++;
}

function moveFood(point) {
    food.position = point;
}

function randomPos() {
    var randomCol = Math.floor(Math.random() * cols);
    var randomRow = Math.floor(Math.random() * rows);

    return new Phaser.Point(randomCol * size, randomRow * size);
}
function deathByTail(){
  for( var i = 0; i < tail.length; i++){
  var pos  = tail[i];
  if(snake.position.x  == pos.x && snake.position.y  == pos.y){
    dead();
  }
}

}
