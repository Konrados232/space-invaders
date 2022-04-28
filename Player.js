import { CollisionBox } from './CollisionBox.js';
import { Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class Player {
    constructor(x, y) {
        this.player = Sprite.from('assets/sample.png');
        this.player.anchor.set(0.5);
        this.player.x = x;
        this.player.y = y;
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
        this.collision.updateCollision(this.player.x - (this.player.width / 2),
                                        this.player.x + (this.player.width / 2),
                                        this.player.y - (this.player.height / 2),
                                        this.player.y + (this.player.height / 2));
    }
    
    getSprite() {
        return this.player;
    }

    getCords() {
        return [this.player.x, this.player.y];
    }
    
    get collision() {
        return this._collision;
    }
    
    set collision(col) {
        this._collision = col;
    }
    
}
