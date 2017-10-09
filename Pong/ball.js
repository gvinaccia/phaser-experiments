class Ball {
    constructor(direction) {

        this.sprite = game.add.sprite(W / 2, H / 2, 'ballimg');
        this.sprite.anchor.setTo(.5);
        this.sprite.scale.setTo(0.5, 0.5);
        this.direction = direction;
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
        this.score1 = 0;
        this.score2 = 0;
        if(newX > W){
            score1 ++;
            console.log("PlayerOne Scores!")
            console.log(score1)
        }
        if(newX < 0){
            score2++;
            console.log("PlayerTwo Scores!")
            console.log(score2)
        }





        // verifica collisione con i paddles ed eventuale rimbalzo

        const rightCollision = this.collidesWith(this.paddle2, newY, newX);
        const leftCollision = this.collidesWith(this.paddle1, newY, newX);


        if (rightCollision) {

            const segment = this.getCollisionSegment(this.paddle2, newY);

            
            if (segment == 1) {
                this.direction.x *= -1;
                this.direction.y *= -4;
                
            }

            else if (segment == 2) {
                this.direction.x *= -1;
                this.direction.y *= 2;
                
            }

            else if (segment == 3) {
                this.direction.x *= -1;
                this.direction.y *= 4;
                
            }

            else if (segment == 4) {
                this.direction.x *= -1;
                this.direction.y *= 2;
                
            }
        }

        if (leftCollision) {
            const segment = this.getCollisionSegment(this.paddle1, newY);


            console.log(segment);
            if (segment == 1) {
                this.direction.x *= -1;
                this.direction.y *= -4;
                
            }

            else if (segment == 2) {
                this.direction.x *= -1;
                this.direction.y *= 2;
                
            }

            else if (segment == 3) {
                this.direction.x *= -1;
                this.direction.y *= 4;
                
            }

            else if (segment == 4) {
                this.direction.x *= -1;
                this.direction.y *= 2;
                
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
        if (!(x == paddle.getX() + paddleWidth || x == paddle.getX() - paddleWidth)) {
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