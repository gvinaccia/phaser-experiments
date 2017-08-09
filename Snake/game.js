var W = 1500;
var H = 800;
var size = 50;

var fpsScale = 8;
var fc = 0;

var cols = W / size;
var rows = H / size;

var inputReceived = false;
var cursors;
var food;

var snake;
var nextMove;
var score;
var matches = [];


if (localStorage.getItem('high-score')) {
    var highScore = localStorage.getItem('high-score');

} else {
    var highScore = 0;
}



var game = new Phaser.Game(W, H, Phaser.CANVAS, 'container');

game.state.add('menu', menuState);
game.state.add('play', playngState);
game.state.add('gameover', gameoverState);
game.state.start('menu');



