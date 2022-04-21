//PIXI.utils.sayHello();

 let app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

const player = new Player();

app.stage.addChild(player.getSprite());


document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        player.moveRight();
    }
    if (e.key === 'ArrowLeft') {
        player.moveLeft();
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

app.ticker.add((delta) => {
    player.update(delta);
});


const enemy = new Enemy(50, 50);

app.stage.addChild(enemy.getSprite());

let seconds = 0;

app.ticker.add((delta) => {
    seconds += (1/60) * delta;
    if (seconds >= 2) {
        enemy.moveStepRight();
        seconds = 0;
    }
});

let appWidth = app.screen.width;
console.log(appWidth);

const enemyGroup = new EnemyGroup(0, 0, 800);

app.stage.addChild(enemyGroup.getContainer());

let seconds1 = 0;

app.ticker.add((delta) => {
    //enemyGroup.getContainer().rotation -= 0.01 * delta;
    seconds1 += (1/60) * delta;
    if (seconds1 >= 2) {
        enemyGroup.moveStepRight();
        seconds1 = 0;
    }
});
