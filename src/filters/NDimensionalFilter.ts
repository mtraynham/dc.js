/// <reference path="../references.ts"/>

import Filter = require('./Filter');

class NDimensionalFilter<T extends Filter> implements Filter {
    public filters: Array<T>;

    constructor(filters: Array<T>) {
        this.filters = filters;
    }

    public isFiltered(value: Array<any>): boolean {
        return this.filters.length === value.length &&
            this.filters.every((filter: T, index: number) => filter.isFiltered(value[index]));
    }

    public toString(): string {
        return this.filters.map((filter: T) => filter.toString()).join(', ');
    }
}
export = NDimensionalFilter;
