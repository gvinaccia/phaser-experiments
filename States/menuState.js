var menuState = {
    create: function () {
        var text1 = game.add.text(W/2, 200, 'Snake!', { font: '90px Arial', fill: '#faf' });
        var startText = game.add.text(W/2, 400, 'Press "W" to start', { font: '90px Arial', fill: '#faf'});
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
        text1.anchor.setTo(0.5);
        startText.anchor.setTo(0.5);
    }
    ,start: function (){
        
        game.state.start('play');
    }
}