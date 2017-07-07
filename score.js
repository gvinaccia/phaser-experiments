function Score() {
    this.score = 0;


    this.incrementBy = function (points) {
        this.score += points;
        this.display();
    }

    this.display = function () {
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "Score: " + this.score, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    }

    this.display();
}