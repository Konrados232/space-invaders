class Enemy {
    constructor(x, y) {
        this.enemy = PIXI.Sprite.from('assets/a.png');
        this.enemy.anchor.set(0.5);
        this.enemy.x = x;
        this.enemy.y = y;
        this.enemy.width = 100;
        this.enemy.height = 50;
        this.moveStep = 10;
        this.descendStep = 40;
        this.currentDirection = 1;
    }

    moveStepLeft() {
        this.enemy.x -= this.moveStep;
    }

    moveStepRight() {
        this.enemy.x += this.moveStep;
    }

    descend() {
        this.enemy.y += this.descendStep;
    }

    stop() {
        
    }

    update() {
        this.moveStepRight();
    }

    getSprite() {
        return this.enemy;
    }
    
}
