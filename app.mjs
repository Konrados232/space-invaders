//PIXI.utils.sayHello();

import { Player } from './Player.js';
import { Batch } from './Batch.js';
import { EnemyGroup } from './EnemyGroup.js';
import { Enemy } from './Enemy.js';
//import { EnemyGroupController } from './EnemyGroupController';

import { Application, Sprite, Container } from './node_modules/pixi.js/dist/browser/pixi.mjs';

import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';
import { EnemyGroupController } from './EnemyGroupController.js';



const app = new Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

// load sprites
const playerSprite = Sprite.from('assets/sample.png');
const defaultSprite = Sprite.from('assets/a.png');

// load objects

const player = new Player(app.screen.width / 2, app.screen.height - 40, playerSprite);

const bulletController = new Batch(20, defaultSprite);

const enemyGroupController = new EnemyGroupController(0, 0, 75, 3);

//const enemyGroup = new EnemyGroup(0, 0, 800);

//const enemy = new Enemy(400, 550, defaultSprite);


// load sprites on stage

app.stage.addChild(player.getSprite());

//app.stage.addChild(enemy.getSprite());

//app.stage.addChild(enemyGroup.getContainer());

enemyGroupController.enemyGroupList.forEach(element => {
    app.stage.addChild(element.getContainer());
});


// update logic

app.ticker.add((delta) => {
    // update positions
    player.update(delta);
    updateEnemy(delta);
    updateBullets(delta);
    updateEnemyGroups(delta);

    // check collisions
    enemyGroupController.enemyGroupList.forEach(enemyGroup => {
        checkEveryBulletCollision(enemyGroup);
    })
    //checkEveryBulletCollision();

    // check game logic

    if (enemyGroupController.isEmpty()) {
        console.log("XD");
    }

    // check out of the box objects
    checkEveryBullet();

});

// functions

let seconds = 0;

function updateEnemy(delta) {
    seconds += (1/60) * delta;
    
    if (seconds >= 2) {
            //enemy.moveStepRight();
            seconds = 0;
    }
}

let seconds1 = 0;

function updateEnemyGroups(delta) {
    //enemyGroup.getContainer().rotation -= 0.01 * delta;
    seconds1 += (1/60) * delta;
    if (seconds1 >= 1) {
        enemyGroupController.update();
        seconds1 = 0;
    }
}

function updateBullets(delta) {
    bulletController.array.forEach(element => {
        element.update(delta);
    });
}


// collision functions

function checkEveryEnemyCollision(bullet, enemyGroup) {
    enemyGroup.container.children.forEach(enemy => {
        if (enemy.containsPoint(bullet.topLeft) || enemy.containsPoint(bullet.topRight)) {
            enemyGroup.container.removeChild(enemy);
            enemyGroupController.decreaseEnemyCount();
            resetBullet(bullet);
        }
    });
}


function checkEveryBulletCollision(enemyGroup) {
    bulletController.array.forEach(bullet => {
        if (isObjectInsideContainer(bullet.topLeft, bullet.topRight, enemyGroup.bottomLeft, enemyGroup.bottomRight)) {
            checkEveryEnemyCollision(bullet, enemyGroup);
        }
    });
}


function isObjectInsideContainer(bulletTopLeft, bulletTopRight, containerBottomLeft, containerBottomRight) {
    if (bulletTopLeft.y <= containerBottomLeft.y) {
        if (bulletTopLeft.x >= containerBottomLeft.x || bulletTopRight.x <= containerBottomRight) {
            return true;
        }
    }
    return false;
}


// out of the box functions
function checkEveryBullet() {
    bulletController.array.forEach(element => {
        if (element.bullet.y <= -200) {
            resetBullet(element);
        }
    });
}

function resetBullet(element) {
    console.log("lmao");
    app.stage.removeChild(element.getSprite());
    element.stop();
    element.changePos(-100,-100);
}



function shoot(coords) {
    let x = coords[0];
    let y = coords[1];
    console.log("x " + x);
    console.log("y " + y);

    let currentBullet = bulletController.getNextObject();

    currentBullet.changePos(x,y);
    currentBullet.stop();
    app.stage.addChild(currentBullet.getSprite());
    currentBullet.moveUp();
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        player.moveRight();
    }
    if (e.key === 'ArrowLeft') {
        player.moveLeft();
    }
    if (e.key === 'ArrowUp') {
        shoot(player.getCords());
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight') {
        player.stop();
    }
    if (e.key === 'ArrowLeft') {
        player.stop();
    }
});

