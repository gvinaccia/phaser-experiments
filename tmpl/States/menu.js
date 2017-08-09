class MenuState {
    preload() {

    }

    create() {
        this.startText = this.game.add.text(W/2, 400, 'Press "W" to start', { font: '90px Arial', fill: '#faf'});
        this.startText.anchor.setTo(0.5);

        const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(() => this.game.state.start('play'), this);
    }

    update() {
        
    }
}