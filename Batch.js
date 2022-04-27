class Batch {
    constructor(size, ticker) {
        this.size = size
        this.array = []
        for (let i = 0; i < size; i++) {
            this.array.push(new Bullet(0,0));
            ticker.add((delta) => {
                this.array[i].update(delta);
            });
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
