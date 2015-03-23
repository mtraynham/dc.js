import Range = require('./Range');
import RangeFilter = require('./RangeFilter');
import ArrayFilter = require('./ArrayFilter');

class RangeArrayFilter extends ArrayFilter<RangeFilter> {
    constructor(values: Array<Range>) {
        super(values.map((value: Range) => new RangeFilter(value)));
    }
}
export = RangeArrayFilter;
