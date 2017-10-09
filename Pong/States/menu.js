class MenuState {
    preload() {

    }

    create() {
        this.gameName = this.game.add.text(W / 2, 200, 'Pong!', { font: '90px Arial', fill: '#faf' });
        this.startText = this.game.add.text(W / 2, 400, 'Press "W" to start', { font: '90px Arial', fill: '#faf' });
        this.info1 = this.game.add.text(100, 700, 'Player 1 : \n W = up \n S = down', { font: '40px Arial', fill: '#faf' });
        this.info2 = this.game.add.text(W - 200 , 700, 'Player 2 : \n UpArrow = up \n DownArrow = down', { font: '40px Arial', fill: '#faf' });
        this.startText.anchor.setTo(0.5);
        this.gameName.anchor.setTo(0.5);
        this.info1.anchor.setTo(0.5);
        this.info2.anchor.setTo(0.5);

        const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(() => this.game.state.start('play'), this);
    }

    update() {
        
    }
}