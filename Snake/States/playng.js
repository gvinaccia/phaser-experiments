
class PlayngState {

    preload() {

        game.stage.backgroundColor = '#000';

        game.load.image('snake', 'corpo.png');
        game.load.image('food', 'cibo.png');

    }

    create() {
        this.inputReceived = false;

        this.cursors = game.input.keyboard.createCursorKeys();

        const bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
        
        bKey.onDown.addOnce(function () {
            game.state.start('menu');
        }, this);


        this.nextMove = new Phaser.Point(0, 0);

        score = new Score();

        this.snake = new SnakeClass(game.add.sprite(Math.floor(cols / 2) * size, Math.floor(rows / 2) * size, 'snake'));
       
        this.snake.onDie(this.dead.bind(this))

        this.food = game.add.sprite(0, 0, 'food');

        this.moveFood();
    }

    update() {
        fc++;

        var velocity = size;

        if (! this.inputReceived) {

            if (this.cursors.up.isDown) {
                // freccia su
                this.nextMove = new Phaser.Point(0, - velocity);
                this.inputReceived = true;
            }

            if (this.cursors.down.isDown) {
                // freccia giu
                this.nextMove = new Phaser.Point(0, velocity);
                this.inputReceived = true;
            }

            if (this.cursors.right.isDown) {
                // freccia dx
                this.nextMove = new Phaser.Point(velocity, 0);
                this.inputReceived = true;
            }

            if (this.cursors.left.isDown) {
                // freccia sx
                this.nextMove = new Phaser.Point(-velocity, 0);
                this.inputReceived = true;
            }

        }


        if (fc % fpsScale == 0) {
            this.snake.move(this.nextMove);

            if (this.snake.eats(this.food)) {
                this.moveFood();

                score.incrementBy(4);

                if (this.snake.life % 4 === 0) {
                    console.log("Speeding things up!");
                    //fpsScale --;
                }
                if (fpsScale == 0) {
                    fpsScale = 1;
                }
            }

            this.inputReceived = false;
        }
    }

    dead() {
        console.log('morto');

        this.snake.head.position.add(-this.nextMove.x, -this.nextMove.y);

        fpsScale = 8

        game.state.start('gameover');

    }

    moveFood() {
        let point;
        do {
            point = randomPos();
            this.food.position = point;
        } while (this.snake.overLaps(point))

    }
}


function randomPos() {
    var randomCol = Math.floor(Math.random() * cols);
    var randomRow = Math.floor(Math.random() * rows);

    return new Phaser.Point(randomCol * size, randomRow * size);
}
