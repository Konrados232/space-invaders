import { EnemyGroup } from "./EnemyGroup.js";

export class EnemyGroupController {
    constructor(initialX, initialY, groupOffset, enemyGroupCount) {
        this.enemyGroupList = [];
        for (let i = 0; i < enemyGroupCount; i++) {
            const enemyGroup = new EnemyGroup(initialX, initialY + i * groupOffset, 800);
            this.enemyGroupList.push(enemyGroup);
        }
        this.enemyGroupWholeCount = 15;
    }

    update() {
        this.enemyGroupList.forEach(enemyGroup => {
            enemyGroup.moveOneStep();
            
            if (enemyGroup.direction === 1) {
                console.log("XDD");
                console.log(enemyGroup.bottomRight.x);
                console.log(enemyGroup.appWidth);

                if (enemyGroup.bottomRight.x >= enemyGroup.appWidth) {
                    enemyGroup.changeDirection();
                    enemyGroup.moveOneStepDown();
                }
            } else if (enemyGroup.direction === -1){
                if (enemyGroup.bottomLeft.x <= 0) {
                    enemyGroup.changeDirection();
                    enemyGroup.moveOneStepDown();
                }
            }

        });
    }

    decreaseEnemyCount() {
        this.enemyGroupWholeCount -= 1;
    }


    isEmpty() {
        return this.enemyGroupWholeCount === 0;
    }




    

}