import BiTuple = require('./BiTuple');

class TriTuple extends BiTuple {
    public z: any;

    constructor(x: any, y: any, z: any, data: any) {
        super(x, y, data);
        this.z = z;
    }
}

export = BiTuple;
