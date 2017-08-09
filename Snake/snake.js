function SnakeClass(headSprite){
 this.head = headSprite;
    this.tail = [];
    this.life = 0;
    this.prevDir = undefined;

}

SnakeClass.prototype.move = function (vect) {

    /*
     * aggiungiamo un nuovo elemento nella coda nella
     * stessa posizione della testa prima di spostarla
     */
    this.tail.push(game.add.sprite(this.getPos().x, this.getPos().y, 'snake'));

    /*
     * se la lunghezza della coda è maggiora di "life"
     * è necessario rimuovere gli elementi non più
     * necessari
     */
    if (this.tail.length > this.life) {
        /*
         * il metodo splice rimuove x elementi da una lista
         * in questo caso rimuoviamo la differenza tra
         * lunghezza e "life", nella maggior parte dei
         * casi corrisponderà ad 1
         */
        var elementsToRemove = this.tail.splice(0, this.tail.length - this.life);

        for (var i = 0; i < elementsToRemove.length; i++) {
            elementsToRemove[i].destroy();
        }

    }

    this.getPos().add(vect.x, vect.y);

    // collisione con i bordi
    if (this.collidedWithBorders()) {
        dead();
    }

    this.deathByTail();
    if (this.life == 1 && this.prevDir != undefined) {
        var sum = this.prevDir.add(vect.x, vect.y);
       
        if (sum.getMagnitude() == 0) {
            dead();
        }
    }
    this.prevDir = vect.clone();
}

SnakeClass.prototype.getPos = function () {
    return this.head.position;
};

SnakeClass.prototype.collidedWithBorders = function () {
    return this.getPos().x > W - size
        || this.getPos().x < 0
        || this.getPos().y > H - size
        || this.getPos().y < 0
}

SnakeClass.prototype.deathByTail = function () {
    for (var i = 0; i < snake.tail.length; i++) {
        var pos = snake.tail[i];
        if (snake.head.position.x == pos.x && snake.head.position.y == pos.y) {
            dead();
        }
    }
}

SnakeClass.prototype.eats = function (food) {
    if (this.getPos().x == food.position.x && this.getPos().y == food.position.y) {
        this.life++;
        return true;
    }
    return false;
}
SnakeClass.prototype.overLaps = function(point){
    //prendiamo in considerazione tutto il serpente
    if(this.getPos().x == point.x && this.getPos().y == point.y){
       return true;
    }
    for (var i = 0; i < snake.tail.length; i++) {
        var pos = snake.tail[i];
        if (point.x == pos.x && point.y == pos.y){
            return true
        }
    }
    return false;
    
}