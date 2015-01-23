///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import ValueFilter = require('./ValueFilter');
import NDimensionalFilter = require('./NDimensionalFilter');

class NDimensionalValueFilter extends NDimensionalFilter<ValueFilter> {
    constructor(values: Array<any>) {
        super(values.map((value: any) => new ValueFilter(value)));
    }
}
export = NDimensionalValueFilter;
