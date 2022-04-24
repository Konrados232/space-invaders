class Player {
    constructor() {
        this.player = PIXI.Sprite.from('assets/sample.png');
        this.player.anchor.set(0.5);
        this.player.x = app.screen.width / 2;
        this.player.y = app.screen.height - 40;
        this.player.width = 100;
        this.player.height = 100;
        this.player.interactive = true;
        this.collision = new CollisionBox(this.player.x - (this.player.width / 2),
                                          this.player.x + (this.player.width / 2),
                                          this.player.y - (this.player.height / 2),
                                          this.player.y + (this.player.height / 2));
        this.speed = 0;
        this.maxSpeed = 4;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    update(delta) {
        this.player.x += this.speed * delta; 
    }

    getSprite() {
        return this.player;
    }

    get collision() {
        return this._collision;
    }
    
}
