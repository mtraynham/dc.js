/// <reference path="../references.ts"/>

import ValueFilter = require('./ValueFilter');
import ArrayFilter = require('./ArrayFilter');

class ValueArrayFilter extends ArrayFilter<ValueFilter> {
    constructor(values: Array<any>) {
        super(values.map((value: any) => new ValueFilter(value)));
    }
}
export = ValueArrayFilter;
