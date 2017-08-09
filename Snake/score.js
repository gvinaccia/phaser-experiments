function Score() {
    var style = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    this.score = 0;
    this.text = game.add.text(0, 0,"" , style);
    this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.incrementBy = function (points) {
        this.score += points;
        this.display();
    }

    this.display = function () {
       this.text.setText("Score: " + this.score)
    }

    this.display();
}