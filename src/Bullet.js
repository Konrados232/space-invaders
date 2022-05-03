import { Sprite, Point } from '../node_modules/pixi.js/dist/browser/pixi.mjs';

export class Bullet {
    constructor(x, y) {
        this.sprite = Sprite.from('../assets/bullet.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 30;
        this.sprite.height = 10;
        
        this.offsetFromCenter = this.sprite.width / 2;
        this.topLeft = new Point(this.sprite.x - this.offsetFromCenter, this.sprite.y);
        this.topRight = new Point(this.sprite.x + this.offsetFromCenter, this.sprite.y);
        this.speed = 0;
        this.maxSpeed = 5;
    }

    changePos(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    moveUp() {
        this.speed = -this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    update(delta) {
        this.sprite.y += this.speed * delta;
        this.updateCollision();
    }

    updateCollision() {
        this.topLeft.set(this.sprite.x - this.offsetFromCenter, this.sprite.y);
        this.topRight.set(this.sprite.x + this.offsetFromCenter, this.sprite.y);
    }

    get sprite() {
        return this._sprite;
    }

    set sprite(spr) {
        this._sprite = spr;
    }

    get collision() {
        return this._collision;
    }

    set collision(col) {
        this._collision = col;
    }
}