class Paddle {
    constructor(position, name) {
        this.name = name;
        this.sprite = game.add.sprite(position.x, position.y, 'paddleimg');
        this.sprite.anchor.setTo(.5);
        this.sprite.scale.setTo(1, 3);

    }
    move(direction) {
        const newPos = this.sprite.position.y + direction;

        const paddleH = this.sprite.height / 2;

        if (newPos < paddleH || newPos > H - paddleH) {
            return;
        }

        this.sprite.position.y = newPos;
    }

    getX() {
        return this.sprite.position.x;
    }

    getY() {
        return this.sprite.position.y;
    }

    getHeight() {
        return this.sprite.height;
    }

    getWidth() {
        return this.sprite.width;
    }


}