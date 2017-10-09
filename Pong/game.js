var W = 1100;
var H = 800;

var game = new Phaser.Game(W, H, Phaser.CANVAS, 'container');

game.state.add('menu', new MenuState());
game.state.add('play', new PlayngState());
game.state.add('gameover', new GameoverState());

// avvia il gioco
game.state.start('menu');






