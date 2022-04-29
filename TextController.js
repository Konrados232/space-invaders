import { Text } from './node_modules/pixi.js/dist/browser/pixi.mjs';

export class TextController {
    constructor(x, y) {
        this.text = new Text('E L: 15/15', {
            fontFamily : 'Arial',
            fontSize: 20,
            fill : 0xffffff,
            align : 'center'});
        this.text.x = x;
        this.text.y = y;
    }
    
    update(number) {
        this.text.text = "E L: " + number + " / 15";

        if (number === 0) {
            this.text.text = "yay";
        }
    }

    get text() {
        return this._text;
    }

    set text(txt) {
        this._text = txt;
    }
}