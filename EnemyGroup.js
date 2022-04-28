import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';
import { CollisionBox } from './CollisionBox.js';
import { Container, Point, Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class EnemyGroup {
    constructor(x, y, appWidth) {
        this.container = new Container();
        this.container.x = x;
        this.container.y = y;
        this.container.pivot.x = 0;
        this.container.pivot.y = 0;
        this.groupHeight = 50;
        this.appWidth = appWidth;
        this.bottomLeft = new Point(this.container.x, this.container.y + this.groupHeight);
        this.bottomRight = new Point(this.container.x + (this.appWidth - 200), this.container.y + this.groupHeight);
        this.maxEnemyCount = 5;
        this.moveStep = 10;
        this.moveStepDown = 30;
        this.direction = 1;

        for (let i = 0; i < this.maxEnemyCount; i++) {
            const enemy = Sprite.from('assets/a.png');
            enemy.anchor.set(0);
            enemy.x = i * 125;
            enemy.y = 0;
            enemy.width = 100;
            enemy.height = 50;
            this.container.addChild(enemy);
        }
    }

    moveOneStep() {
        this.container.x += this.moveStep * this.direction;
        this.updateCollision();
    }

    changeDirection() {
        this.direction = -this.direction;
    }

    moveOneStepDown() {
        this.container.y += this.moveStepDown;
        this.updateCollision();
    }

    updateCollision() {
        this.bottomLeft.set(this.container.x, this.container.y + this.groupHeight);
        this.bottomRight.set(this.container.x + (this.appWidth - 200), this.container.y + this.groupHeight);
        console.log(this.bottomLeft);
        console.log(this.bottomRight);
    }

    deleteEnemy(enemy) {
        this.currentEnemyCount--;
        this.enemyList.pop(enemy);
        this.container.removeChild(enemy.getSprite());
    }

    getContainer() {
        return this.container;
    }

    get collision() {
        return this._collision;
    }

    set collision(col) {
        this._collision = col;
    }
}