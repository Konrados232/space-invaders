//PIXI.utils.sayHello();

let app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

// load objects

const player = new Player();

const bulletController = new Batch(20, app.ticker);

const enemyGroup = new EnemyGroup(0, 0, 800);

const enemy = new Enemy(400, 550);


// load sprites on stage

app.stage.addChild(player.getSprite());

app.stage.addChild(enemy.getSprite());

app.stage.addChild(enemyGroup.getContainer());


// update logic

app.ticker.add((delta) => {
    player.update(delta);
});


let seconds = 0;

app.ticker.add((delta) => {
    seconds += (1/60) * delta;
    if (seconds >= 2) {
        enemy.moveStepRight();
        seconds = 0;
    }
});

let seconds1 = 0;

app.ticker.add((delta) => {
    //enemyGroup.getContainer().rotation -= 0.01 * delta;
    seconds1 += (1/60) * delta;
    if (seconds1 >= 2) {
        enemyGroup.moveStepRight();
        seconds1 = 0;
    }

    if (isObjectWithinCollision(player.collision, enemy.collision)) {
        console.log("amongus");
    }

});

// functions

function isObjectWithinCollision(objectCollision, boxCollision) {
    if (objectCollision.top > boxCollision.top && objectCollision.bottom < boxCollision.bottom) {
        // object doesn't need to be fully within box, it needs to partially stick on one of the sides
        if (objectCollision.right > boxCollision.left && objectCollision.left < boxCollision.right) {
            return true;
        }
    }

    return false;
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