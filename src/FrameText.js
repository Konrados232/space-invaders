import { Graphics, Container } from '../node_modules/pixi.js/dist/browser/pixi.mjs';


export class FrameText {
    constructor(text, width, height, position) {
        this.text = text;
        this.frame = new Graphics();
        this.mask = new Graphics();
        this.maskContainer = new Container();
        this.width = width;
        this.height = height;
        this.position = position;
    }

    updateText(elapsed) {
        this.text.y = -450 + Math.cos(elapsed / 100.0) * 450.0;
    } 

    setDefaultProperties() {
        this.frame.beginFill(0x666666);
        this.frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
        this.frame.drawRect(0, 0, 208, 208);
        this.frame.position.set(400 - 100, 300 - 100);

        this.mask.beginFill(0xffffff);
        this.mask.drawRect(0,0,200,200);
        this.mask.endFill();

        this.maskContainer.mask = this.mask;
        this.maskContainer.addChild(this.mask);
        this.maskContainer.position.set(4,4);    
    }

    set frame(fr) {
        this._frame = fr;
    }

    get frame() {
        return this._frame
    }

    set mask(msk) {
        this._mask = msk;
    }

    get mask() {
        return this._mask;
    }

    set maskContainer(mskCtr) {
        this._maskContainer = mskCtr;
    }

    get maskContainer() {
        return this._maskContainer;
    }

    set text(txt) {
        this._text = txt;
    }

    get text() {
        return this._text;
    }

    set width(wid) {
        this._width = wid;
    }

    get width() {
        return this._width;
    }

    set height(hgt) {
        this._height = hgt;
    }

    get height() {
        return this._height;
    }

    set position(pos) {
        this._position = pos;
    }

    get position() {
        return this._position;
    }
}
