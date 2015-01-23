///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import Range = require('./Range');
import RangeFilter = require('./RangeFilter');
import NDimensionalFilter = require('./NDimensionalFilter');

class NDimensionalRangeFilter extends NDimensionalFilter<RangeFilter> {
    constructor(values: Array<Range>) {
        super(values.map((value: Range) => new RangeFilter(value)));
    }
}
export = NDimensionalRangeFilter;
