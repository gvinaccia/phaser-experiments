class Ball {
    constructor(direction) {

        this.sprite = game.add.sprite(W / 2, H / 2, 'ballimg');
        this.sprite.anchor.setTo(.5);
        this.sprite.scale.setTo(0.5, 0.5);
        this.direction = direction;
    }

    onPoint(callback) {
        this.onPointCallback = callback;
    }

    notifyP1Point() {
        // se è definita la proprietà onpointcallback (che ci aspettiamo sia una funzione, chiamiamola con un identificativo del giocatore)
        if (this.onPointCallback) {
            this.onPointCallback('p1');
        }
    }

    notifyP2Point() {
        if (this.onPointCallback) {
            this.onPointCallback('p2');
        }
    }


    update() {
        const ballH = this.sprite.height / 2;

        // controlla rimbalzo su muro
        const newY = this.sprite.position.y + this.direction.y;

        if (newY < ballH || newY > H - ballH) {
            this.direction.y *= -1;
        }


        // controlla morto
        const newX = this.sprite.position.x + this.direction.x;


        //serve un flag giusto? si, e serve reinizializzare la palla al centro


        if (newX > W && newX < 1110) {

            this.notifyP1Point();
            
            this.pointStop = true;




        }
        if (newX < 0 && newX > -10) {
            this.notifyP2Point();
            

        }





        // verifica collisione con i paddles ed eventuale rimbalzo

        const rightCollision = this.collidesWith(this.paddle2, newY, newX);
        const leftCollision = this.collidesWith(this.paddle1, newY, newX);


        if (rightCollision || leftCollision) {
            
             let invert = 1;
            this.direction.x *= -1;
            let segment;
            if (rightCollision) {
                segment = this.getCollisionSegment(this.paddle2, newY);
            } else {
                invert = -1
                segment = this.getCollisionSegment(this.paddle1, newY);
            }

            

            if (segment == 1) {
                this.direction.rotate(0, 0, 30 * invert, true);
            }

            else if (segment == 2) {
                this.direction.rotate(0, 0, 10 * invert, true);
            }

            else if (segment == 3) {
                this.direction.rotate(0, 0, -10  * invert, true);
            }

            else if (segment == 4) {
                this.direction.rotate(0, 0, -30 * invert, true);
            }
            
        }





        this.sprite.position.add(this.direction.x, this.direction.y);

    }

    collidesWith(paddle, y, x) {
        const paddleHeight = paddle.getHeight() / 2;
        const paddleWidth = paddle.getWidth() / 2;

        const yStart = paddle.getY() - paddleHeight;
        const yEnd = paddle.getY() + paddleHeight;

        // la palla è nella fascia x del paddle?
        if (!(x <= paddle.getX() + paddleWidth && x >= paddle.getX() - paddleWidth)) {
            return false;
        }

        // la palla è nella fascia Y del paddle?
        if (!(y > yStart && y < yEnd)) {
            return false;
        }

        // collisione
        return true;
    }

    getCollisionSegment(paddle, yBall) {
        const segs = 4;

        const height = paddle.getHeight();
        const p = yBall - (paddle.getY() - (height / 2));

        return Math.ceil((p * segs) / height);
    }


    setPaddles(frist, second) {

        this.paddle1 = frist;
        this.paddle2 = second;

    }

}