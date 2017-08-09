class SnakeClass {
    constructor(headSprite) {
        this.head = headSprite;
        this.tail = [];
        this.life = 0;
        this.prevDir = undefined;
        this.onDieCb = () => {};
    }

    move(vect) {
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
            this.onDieCb();
        }

        this.deathByTail();

        if (this.life == 1 && this.prevDir != undefined) {
            var sum = this.prevDir.add(vect.x, vect.y);

            if (sum.getMagnitude() == 0) {
                this.onDieCb();
            }
        }

        this.prevDir = vect.clone();
    }

    getPos() {
        return this.head.position;
    }

    collidedWithBorders() {
        return this.getPos().x > W - size
            || this.getPos().x < 0
            || this.getPos().y > H - size
            || this.getPos().y < 0
    }

    deathByTail() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            if (this.head.position.x == pos.x && this.head.position.y == pos.y) {
                this.onDieCb();
            }
        }
    }

    eats(food) {
        if (this.getPos().x == food.position.x && this.getPos().y == food.position.y) {
            this.life++;
            return true;
        }
        return false;
    }

    overLaps(point) {
        //prendiamo in considerazione tutto il serpente
        if (this.getPos().x == point.x && this.getPos().y == point.y) {
            return true;
        }
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            if (point.x == pos.x && point.y == pos.y) {
                return true
            }
        }
        return false;

    }

    onDie(cb) {
        this.onDieCb = cb;
    }
}
