class CollisionBox {
    constructor(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }

    get left() {
        return this._left;
    }
    
    get right() {
        return this._right;
    }
    
    get top() {
        return this._top;
    }
    
    get bottom() {
        return this._bottom;
    }


    set left(x) {
        this._left = x;
    }
    
    set right(x) {
        this._right = x;
    }
    
    set top(y) {
        this._top = y;
    }
    
    set bottom(y) {
        this._bottom = y;
    }

    updateCollision(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }

}
