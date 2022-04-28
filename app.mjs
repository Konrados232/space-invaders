//PIXI.utils.sayHello();

import { Player } from './Player.js';
import { Batch } from './Batch.js';
import { EnemyGroup } from './EnemyGroup.js';
import { Enemy } from './Enemy.js';


import { Application, Sprite } from './node_modules/pixi.js/dist/browser/pixi.mjs';

import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';

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

const enemyGroup = new EnemyGroup(0, 0, 800, defaultSprite);

const enemy = new Enemy(400, 550, defaultSprite);


// load sprites on stage

app.stage.addChild(player.getSprite());

app.stage.addChild(enemy.getSprite());

app.stage.addChild(enemyGroup.getContainer());




// update logic

app.ticker.add((delta) => {
    // update positions
    player.update(delta);
    updateEnemy(delta);
    updateBullets(delta);
    updateEnemyGroup(delta);

    console.log(enemyGroup.getContainer().x);
    console.log(enemyGroup.getContainer().y);

    // check collisions
    checkEveryBulletCollision();

    // check out of the box objects
    checkEveryBullet();

});

// functions

let seconds = 0;

function updateEnemy(delta) {
    seconds += (1/60) * delta;
    
    if (seconds >= 2) {
            enemy.moveStepRight();
            seconds = 0;
    }
}

let seconds1 = 0;

function updateEnemyGroup(delta) {
    //enemyGroup.getContainer().rotation -= 0.01 * delta;
    seconds1 += (1/60) * delta;
    if (seconds1 >= 2) {
        enemyGroup.moveStepRight();
        seconds1 = 0;
    }
}

function updateBullets(delta) {
    bulletController.array.forEach(element => {
        element.update(delta);
    });
}


// collision functions

function checkEveryEnemyCollision(bullet) {
    console.log("susus");
    console.log(bullet.bullet.x + "X");
    console.log(bullet.bullet.y + "Y");
    let bulletPoint = new PIXI.Point(bullet.bullet.x, bullet.bullet.y);
    enemyGroup.enemyList.forEach(enemy => {
        if (enemy.getSprite().containsPoint(bulletPoint)) {
            console.log("XDD");
            enemyGroup.deleteEnemy(enemy);
            resetBullet(bullet);
        }
    });
}


function checkEveryBulletCollision() {
    bulletController.array.forEach(element => {
        if(isObjectWithinCollision(element.collision, enemyGroup.collision)) {
            checkEveryEnemyCollision(element);
        }
    });
}

function isObjectWithinCollision(objectCollision, boxCollision) {
    if (objectCollision.top > boxCollision.top && objectCollision.bottom < boxCollision.bottom) {
        // object doesn't need to be fully within box, it needs to partially stick on one of the sides
        if (objectCollision.right > boxCollision.left && objectCollision.left < boxCollision.right) {
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

