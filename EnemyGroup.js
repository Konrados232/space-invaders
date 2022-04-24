class EnemyGroup {
    constructor(x, y, appWidth) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.pivot.x = 0;
        this.container.pivot.y = 0;
        this.groupHeight = 50;
        this.collision = new CollisionBox(x, x + (appWidth - 200), y, y + this.groupHeight);
        this.maxEnemyCount = 5;
        this.currentEnemyCount = 5;
        this.enemyList = [];
        this.moveStep = 10;

        for (let i = 0; i < this.maxEnemyCount; i++) {
            const enemy = new Enemy(i * 125, 0);
            enemy.getSprite().anchor.set(0);
            this.enemyList.push(enemy);
            this.container.addChild(enemy.getSprite());
        }
    }

    moveStepLeft() {
        this.container.x -= this.moveStep;
    }

    moveStepRight() {
        this.container.x += this.moveStep;
    }

    getContainer() {
        return this.container;
    }

    get collision() {
        return this._collision;
    }
}