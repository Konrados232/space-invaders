import { CollisionBox } from './CollisionBox.js';
import { Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class Player {
    constructor(x, y) {
        this.sprite = Sprite.from('assets/sample.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.interactive = true;
        
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
        this.sprite.x += this.speed * delta;
    }
    
    getCords() {
        return [this.sprite.x, this.sprite.y];
    }

    get sprite() {
        return this._sprite;
    }

    set sprite(spr) {
        this._sprite = spr;
    }
    
}
