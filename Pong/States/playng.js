class PlayngState {
    preload() {
        game.load.image('paddleimg', 'paddle.png');
        game.load.image('ballimg','ball.png');
    }

    create() {
        this.leftPaddle = new Paddle(new Phaser.Point(0, H / 2),"sinistra");
        this.rightPaddle = new Paddle(new Phaser.Point(W, H / 2),"destra");
        this.rightCursors = this.game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN});
        this.leftCursors = this.game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S});

        this.ball = new Ball(new Phaser.Point(5,1));
        this.ball.setPaddles(this.leftPaddle,this.rightPaddle);

        this.score1 = 0;
        this.score2 = 0;

        this.ball.onPoint((player) => {
            if (player == 'p1') {
                this.score1++;
            }
            if (player == 'p2') {
                this.score2++;
            }
        })
        
        this.score1Info = this.game.add.text(0 , 0, this.score1 , { font: '40px Arial', fill: '#faf' });
        this.score2Info = this.game.add.text(W - 50 , 0, this.score2  , { font: '40px Arial', fill: '#faf' });
    }

    update() {
       if(this.leftCursors.up.isDown){
           this.leftPaddle.move(-5);
       }
       if(this.leftCursors.down.isDown){
           this.leftPaddle.move(5);
       }
       if(this.rightCursors.up.isDown){
           this.rightPaddle.move(-5);
       }
       if(this.rightCursors.down.isDown){
           this.rightPaddle.move(5);
       }
       this.ball.update()

       // aggiorniamo i display dei punti
       this.score1Info.text = this.score1.toString();
       this.score2Info.text = this.score2.toString();
    }
}