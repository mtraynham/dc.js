import Tuple = require('./Tuple');

interface Transform {
    (data: Array<Tuple>): Array<Tuple>;
}

export = Transform;
