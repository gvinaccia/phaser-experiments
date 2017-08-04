
var playngState = {
    preload: preload,
    create: create,
    update: update
}
function preload() {

    game.stage.backgroundColor = '#000';

    game.load.image('snake', 'corpo.png');
    game.load.image('food', 'cibo.png');

}
function create() {
    cursors = game.input.keyboard.createCursorKeys();

    bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
    bKey.onDown.addOnce(function(){ 
        game.state.start('menu');
    }, this);
   


   
    nextMove = new Phaser.Point(0, 0);

    score = new Score();

    snake = new SnakeClass(game.add.sprite(Math.floor(cols / 2) * size, Math.floor(rows / 2) * size, 'snake'));

    food = game.add.sprite(0, 0, 'food');

    moveFood();
   

}

function update() {
    fc++;

    var velocity = size;

    if (!inputReceived) {
        if (cursors.up.isDown) {
            // freccia su
            nextMove = new Phaser.Point(0, - velocity);
            inputReceived = true;
        }

        if (cursors.down.isDown) {
            // freccia giu
            nextMove = new Phaser.Point(0, velocity);
            inputReceived = true;
        }

        if (cursors.right.isDown) {
            // freccia dx
            nextMove = new Phaser.Point(velocity, 0);
            inputReceived = true;
        }


        if (cursors.left.isDown) {
            // freccia sx
            nextMove = new Phaser.Point(-velocity, 0);
            inputReceived = true;
        }

    }
    
   
    if (fc % fpsScale == 0) {
        snake.move(nextMove);

        if (snake.eats(food)) {
            moveFood();

            score.incrementBy(4);
            fpsScale --;
            if(fpsScale == 0){
                fpsScale = 1;
            }
        }

        inputReceived = false;
    }
}
function dead() {
    console.log('morto');

    snake.head.position.add(-nextMove.x, -nextMove.y);

    fpsScale = 8

    game.state.start('gameover');


}
function moveFood() {

    do {
        var point = randomPos();
        food.position = point;
    } while(snake.overLaps(point))

}
function randomPos() {
    var randomCol = Math.floor(Math.random() * cols);
    var randomRow = Math.floor(Math.random() * rows);

    return new Phaser.Point(randomCol * size, randomRow * size);
}
function highScoreParty (){
    if(score.score > highScore){
       var update = game.add.text(0, H/2,"New HighScore!!")
       update.anchor.setTo(0.5);

    }
}
