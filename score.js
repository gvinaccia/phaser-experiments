function Score() {
    this.score = 0;
   
    
    this.incrementBy = function(points) {
        this.score += points;
        this.display();
    }

    this.display = function() {
        document.getElementById("insert").innerHTML = "Score: " + this.score;
    }

    this.display();
}