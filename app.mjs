//PIXI.utils.sayHello();

import { Player } from './Player.js';
import { Batch } from './Batch.js';
import { EnemyGroupController } from './EnemyGroupController.js';

import { Application, Sprite, Text } from './node_modules/pixi.js/dist/browser/pixi.mjs';

import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';


const app = new Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

// load sprites
const playerSprite = Sprite.from('assets/sample.png');
const defaultSprite = Sprite.from('assets/a.png');
const backgroundSprite = Sprite.from('assets/background.png')

// load objects

backgroundSprite.height = 1920;
backgroundSprite.width = 1058;
backgroundSprite.x = 400;
backgroundSprite.y = 300;
backgroundSprite.anchor.set(0.5);

const player = new Player(app.screen.width / 2, app.screen.height - 45, playerSprite);

const bulletController = new Batch(20, defaultSprite);

const enemyGroupController = new EnemyGroupController(0, 0, 75, 3);

const scoreText = new Text('E L: 15/15',{fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'center'});
scoreText.x = 10;
scoreText.y = 575;



// load sprites on stage
app.stage.addChild(backgroundSprite);

app.stage.addChild(player.getSprite());

enemyGroupController.enemyGroupList.forEach(element => {
    app.stage.addChild(element.getContainer());
});

app.stage.addChild(scoreText);


// end credits
let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(400 - 100, 300 - 100);


let mask = new PIXI.Graphics();
mask.beginFill(0xffffff);
mask.drawRect(0,0,200,200);
mask.endFill();


let maskContainer = new PIXI.Container();
maskContainer.mask = mask;
maskContainer.addChild(mask);
maskContainer.position.set(4,4);


const response = await fetch('gameEndText.txt');
const data = await response.text();
console.log(data);

let endScreenText = new PIXI.Text(
    data,
    {
      fontSize: 40,
      fill: 0x1010ff,
      wordWrap: true,
      wordWrapWidth: 180
    }
);
endScreenText.x = 10;

let elapsed = 0.0;

// update logic
app.ticker.add((delta) => {
    // update background
    backgroundSprite.rotation += 0.005 * Math.cos(elapsed / 100.0) * delta;

    // update positions
    player.update(delta);
    updateBullets(delta);
    updateEnemyGroups(delta);

    // check collisions
    enemyGroupController.enemyGroupList.forEach(enemyGroup => {
        checkEveryBulletCollision(enemyGroup);
    })

    // check game logic
    if (enemyGroupController.isEmpty()) {
        app.stage.addChild(frame);
        frame.addChild(maskContainer);
        maskContainer.addChild(endScreenText);

        elapsed += delta;
        endScreenText.y = -450 + Math.cos(elapsed / 100.0) * 450.0;

    }

    // check out of the box objects
    checkEveryBullet();

});

// functions

let seconds = 0;

function updateEnemyGroups(delta) {
    //enemyGroup.getContainer().rotation -= 0.01 * delta;
    seconds += (1/60) * delta;
    if (seconds >= 1) {
        enemyGroupController.update();
        seconds = 0;
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
            updateScore();
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
    app.stage.removeChild(element.getSprite());
    element.stop();
    element.changePos(-100,-100);
}


// text functions

function updateScore() {
    let currentCount = enemyGroupController.enemyGroupWholeCount;
    scoreText.text = "E L: " + currentCount + " / 15";

    if (currentCount === 0) {
        scoreText.text = "yay";
    }
}



function shoot(coords) {
    let x = coords[0];
    let y = coords[1];

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

