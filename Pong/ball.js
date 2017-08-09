class Ball {
    constructor(direction) {
        this.sprite = game.add.sprite(W/2,H/2, 'ballimg');
        this.sprite.anchor.setTo(.5);
        this.sprite.scale.setTo(0.5,0.5);
        this.direction = direction;        
    }

    update(){
        const ballH = this.sprite.height / 2;

        // controlla rimbalzo su muro
        const newY = this.sprite.position.y + this.direction.y;

        if (newY  < ballH || newY > H - ballH){
            this.direction.y *= -1;
        }


        // controlla morto
        const newX = this.sprite.position.x + this.direction.x;

        if (newX  < ballH || newX > W - ballH){
            console.log('morto')
            
        }
        

        // controlla rimbalzo su paddle
        
        
        
        
        
        this.sprite.position.add(this.direction.x, this.direction.y);

    }
}