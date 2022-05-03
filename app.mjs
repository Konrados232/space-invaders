import { Application, Sprite, Graphics, Container, Text } from './node_modules/pixi.js/dist/browser/pixi.mjs';

import { Player } from './Player.js';
import { Batch } from './Batch.js';
import { EnemyGroupController } from './EnemyGroupController.js';
import { Background } from './Background.js';
import { TextController } from './TextController.js';
import { FrameText } from './FrameText.js';

const app = new Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

// load data
const playerSprite = Sprite.from('assets/sample.png');
const defaultSprite = Sprite.from('assets/a.png');
const response = await fetch('gameEndText.txt');
const data = await response.text();

// load objects
const player = new Player(app.screen.width / 2, app.screen.height - 45, playerSprite);
const bulletController = new Batch(20, defaultSprite);
const enemyGroupController = new EnemyGroupController(0, 0, 75, 3);
const background = new Background();
const scoreText = new TextController(10, 575);
let endScreenText = new Text(data,{fontSize: 40,fill: 0x1010ff,wordWrap: true,wordWrapWidth: 180});
endScreenText.x = 10;

const endCredits = new FrameText(endScreenText, 10, 10, 10);
endCredits.setDefaultProperties();

// load sprites on stage
app.stage.addChild(background.sprite);
app.stage.addChild(player.sprite);
enemyGroupController.enemyGroupList.forEach(element => {
    app.stage.addChild(element.container);
});
app.stage.addChild(scoreText.text);


// game logic
let elapsed = 0.0;

// update logic
app.ticker.add((delta) => {
    // update background
    background.rotate(delta, elapsed);

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
        app.stage.addChild(endCredits.frame);
        endCredits.frame.addChild(endCredits.maskContainer);
        endCredits.maskContainer.addChild(endScreenText);

        elapsed += delta;
        endCredits.updateText(elapsed);
    }

    // check out of the box objects
    checkEveryBullet();

});

// functions

let seconds = 0;

function updateEnemyGroups(delta) {
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
            resetBullet(bullet);
            enemyGroupController.decreaseEnemyCount();
            scoreText.update(enemyGroupController.enemyGroupWholeCount);
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
    return (bulletTopLeft.y <= containerBottomLeft.y) &&
            (bulletTopLeft.x >= containerBottomLeft.x || bulletTopRight.x <= containerBottomRight);
}


// out of the box functions
function checkEveryBullet() {
    bulletController.array.forEach(element => {
        if (element.sprite.y <= -200) {
            resetBullet(element);
        }
    });
}

function resetBullet(element) {
    app.stage.removeChild(element.sprite);
    element.stop();
    element.changePos(-100,-100);
}

function shoot(coords) {
    let x = coords[0];
    let y = coords[1];

    let currentBullet = bulletController.getNextObject();

    currentBullet.changePos(x,y);
    currentBullet.stop();
    app.stage.addChild(currentBullet.sprite);
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
