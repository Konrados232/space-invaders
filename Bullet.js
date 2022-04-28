import { CollisionBox } from './CollisionBox.js';
import { Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class Bullet {
    constructor(x, y, sprite) {
        this.bullet = Sprite.from('assets/a.png');
        this.bullet.anchor.set(0.5);
        this.bullet.x = x;
        this.bullet.y = y;
        this.bullet.width = 30;
        this.bullet.height = 10;
        this.collision = new CollisionBox(this.bullet.x - (this.bullet.width / 2),
                                          this.bullet.x + (this.bullet.width / 2),
                                          this.bullet.y - (this.bullet.height / 2),
                                          this.bullet.y + (this.bullet.height / 2));
        this.speed = 0;
        this.maxSpeed = 5;
    }

    changePos(x, y) {
        this.bullet.x = x;
        this.bullet.y = y;
    }

    moveUp() {
        this.speed = -this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    update(delta) {
        this.bullet.y += this.speed * delta;
        this.collision.updateCollision(this.bullet.x - (this.bullet.width / 2),
                                        this.bullet.x + (this.bullet.width / 2),
                                        this.bullet.y - (this.bullet.height / 2),
                                        this.bullet.y + (this.bullet.height / 2));

    }

    getSprite() {
        return this.bullet;
    }

    get collision() {
        return this._collision;
    }

    set collision(col) {
        this._collision = col;
    }
}