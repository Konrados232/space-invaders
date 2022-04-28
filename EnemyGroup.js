import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';
import { CollisionBox } from './CollisionBox.js';
import { Container } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class EnemyGroup {
    constructor(x, y, appWidth, defaultSprite) {
        this.container = new Container();
        this.container.x = x;
        this.container.y = y;
        this.container.pivot.x = 0;
        this.container.pivot.y = 0;
        this.groupHeight = 50;
        this.appWidth = appWidth;
        this.collision = new CollisionBox(x, x + (appWidth - 200), y, y + this.groupHeight);
        this.maxEnemyCount = 5;
        this.currentEnemyCount = 5;
        this.enemyList = [];
        this.moveStep = 10;

        for (let i = 0; i < this.maxEnemyCount; i++) {
            const enemy = new Enemy(i * 125, 0, defaultSprite);
            enemy.getSprite().anchor.set(0);
            this.enemyList.push(enemy);
            this.container.addChild(enemy.getSprite());
        }
    }

    moveStepLeft() {
        this.container.x -= this.moveStep;
        this.updateCollision();
    }

    moveStepRight() {
        this.container.x += this.moveStep;
        this.updateCollision();
    }

    updateCollision() {
        this.collision.updateCollision(this.container.x, this.container.x + (this.appWidth - 200),
                                        this.container.y, this.container.y + this.groupHeight);
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