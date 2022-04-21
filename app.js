//PIXI.utils.sayHello();


var renderer = PIXI.autoDetectRenderer(512, 512, { 
    transparent: true,
    resolution: 1
});

document.getElementById('display').appendChild(renderer.view);


 let app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x5c5c5c
});

document.body.appendChild(app.view);

let keys = {}


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
        player.st();
    }
});

app.ticker.add((delta) => {
    player.update(delta);
});



const enemy = PIXI.Sprite.from('assets/a.png');
enemy.anchor.set(0.5);
enemy.x = 50;
enemy.y = 50;
enemy.width = 100;
enemy.height = 50;

app.stage.addChild(enemy);