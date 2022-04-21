class EnemyGroup {
    constructor(x, y, appWidth) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.height = 50;
        this.container.pivot.x = 0;
        this.container.pivot.y = 0;
        this.maxEnemyCount = 5;
        this.currentEnemyCount = 5;
        this.enemyList = [];
        this.rightFurthestPoint = this.container.x + (appWidth - 200);
        this.leftFurthestPoint = this.container.x;
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
}