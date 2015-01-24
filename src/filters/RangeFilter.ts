/// <reference path="../references.ts"/>

import Filter = require('./Filter');
import Range = require('./Range');
import ObjectUtils = require('../util/ObjectUtils');

class RangeFilter implements Filter {
    private range: Range;

    constructor(range: Range) {
        this.range = range;
    }

    public isFiltered(value: any): boolean {
        return this.range.low <= value && this.range.high >= value;
    }

    public toString(): string {
        return '[' + ObjectUtils.toString(this.range.low) + '->' + ObjectUtils.toString(this.range.high) + ']';
    }
}
export = RangeFilter;
