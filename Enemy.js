import { Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class Enemy {
    constructor(x, y, sprite) {
        this.sprite = Sprite.from('assets/a.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 100;
        this.sprite.height = 50;

        this.moveStep = 10;
        this.descendStep = 40;
        this.currentDirection = 1;
    }

    moveStepLeft() {
        this.sprite.x -= this.moveStep;
    }

    moveStepRight() {
        this.sprite.x += this.moveStep;
    }

    descend() {
        this.sprite.y += this.descendStep;
    }

    update() {
        this.moveStepRight();
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
