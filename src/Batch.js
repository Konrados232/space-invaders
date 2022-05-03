import { Bullet } from './Bullet.js';

export class Batch {
    constructor(size) {
        this.size = size
        this.array = []
        for (let i = 0; i < size; i++) {
            this.array.push(new Bullet(0,0));
        }
        this.currentIterator = 0;
    }
    
    getNextObject() {
        this.currentIterator++;
        if (this.currentIterator >= this.size) {
            this.currentIterator = 0;
        }

        return this.array[this.currentIterator];
    }

}
