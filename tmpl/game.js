var W = 1500;
var H = 800;

var game = new Phaser.Game(W, H, Phaser.CANVAS, 'container');

game.state.add('menu', new MenuState());
game.state.add('play', new PlayngState());
game.state.add('gameover', new GameoverState());
game.state.start('menu');






