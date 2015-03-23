import Tuple = require('./Tuple');

class BiTuple implements Tuple{
    public x: any;
    public y: any;
    public data: any;

    constructor(x: any, y: any, data) {
        this.x = x;
        this.y = y;
        this.data = data;
    }
}

export = BiTuple;
