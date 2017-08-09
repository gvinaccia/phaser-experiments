class GameoverState {
    create() {
        game.stage.backgroundColor = '#000';
        var style = { font: "bold 72px Arial", fill: "#faf", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = game.add.text(200, 200, "Game Over press 'R' to restart", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        var finalScore = game.add.text(400, 400, "Final Score = " + score.score, style);
        var highScoreDisplay = game.add.text(0, 0, "", style);
        if (score.score > highScore) {
            highScore = score.score;

            localStorage.setItem("high-score", highScore);
            highScoreDisplay.alpha = 0.1;
            game.add.tween(highScoreDisplay).to({ alpha: 1 }, 2000, "Linear", true)
        }

        highScoreDisplay.setText("High Score = " + highScore);
    }

    update() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            game.state.start('play');
        }
    }
}
