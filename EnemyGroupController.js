import { EnemyGroup } from "./EnemyGroup.js";

export class EnemyGroupController {
    constructor(initialX, initialY, groupOffset, enemyGroupCount) {
        this.enemyGroupList = [];
        this.enemyGroupWholeCount = 0;
        for (let i = 0; i < enemyGroupCount; i++) {
            const enemyGroup = new EnemyGroup(initialX, initialY + i * groupOffset, 0, 800);
            this.enemyGroupList.push(enemyGroup);
            this.enemyGroupWholeCount += enemyGroup.maxEnemyCount;
        }
    }

    update() {
        this.enemyGroupList.forEach(enemyGroup => {
            enemyGroup.moveOneStep();

            if (enemyGroup.bottomRight.x >= enemyGroup.rightBorder || enemyGroup.bottomLeft.x <= enemyGroup.leftBorder) {
                enemyGroup.changeDirection();
                enemyGroup.moveOneStepDown();
            }

        });
    }

    decreaseEnemyCount() {
        this.enemyGroupWholeCount -= 1;
    }

    isEmpty() {
        return this.enemyGroupWholeCount === 0;
    }

    get enemyGroupWholeCount() {
        return this._enemyGroupWholeCount;
    }

    set enemyGroupWholeCount(x) {
        this._enemyGroupWholeCount = x;
    }

}