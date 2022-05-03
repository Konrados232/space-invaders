import { Sprite } from '../node_modules/pixi.js/dist/browser/pixi.mjs';

export class Background {
    constructor(sprite) {
        this.sprite = sprite;
        this.sprite.x = 400;
        this.sprite.y = 300;
        this.sprite.anchor.set(0.5);
    }
    
    rotate(delta, elapsed) {
        this.sprite.rotation += 0.005 * Math.cos(elapsed / 100.0) * delta;
    }

    get sprite() {
        return this._sprite;
    }

    set sprite(spr) {
        this._sprite = spr;
    }
}