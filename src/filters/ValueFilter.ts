///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import Filter = require('./Filter');
import ObjectUtils = require('../util/ObjectUtils');

class ValueFilter implements Filter {
    private value: any;

    constructor(value: any) {
        this.value = value;
    }

    public isFiltered(value: any): boolean {
        return this.value <= value && this.value >= value;
    }

    public toString(): string {
        return ObjectUtils.toString(this.value);
    }
}
export = ValueFilter;
