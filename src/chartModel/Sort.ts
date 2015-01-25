/// <reference path="../references.ts"/>

import SortDirection = require('./SortDirection');
import Accessor = require('../util/Accessor');

class Sort {
    public sort: CrossFilter.Sort<any>;
    public sortDirection: SortDirection;

    constructor(sortAccessor: CrossFilter.Selector<any>, sortDirection?: SortDirection = SortDirection.ASC) {
        this.sort = crossfilter.quicksort.by(sortAccessor);
        this.sortDirection = sortDirection;
    }

    public sort(data: Array<any>): Array<any> {
        data = this.sort(data, 0, data.length);
        return this.sortDirection == SortDirection.DESC ? data.reverse() : data;
    }
}

export = Sort;
