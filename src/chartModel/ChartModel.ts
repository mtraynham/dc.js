/// <reference path="../references.ts"/>

import Filter = require('../filters/Filter');
import Sort = require('./Sort');

class ChartModel {
    public filters: Array<Filter> = [];
    public sort: Sort;

    public hasFilter(filter: Filter): boolean {
        return this.filters.indexOf(filter) > -1;
    }

    public addFilter(filter: Filter): number {
        return this.filters.push(filter);
    }

    public removeFilter(filter: Filter): Filter {
        var index: number = this.filters.indexOf(filter);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        return filter;
    }

    public clearFilters(): Array<Filter> {
        var tmp: Array<Filter> = this.filters;
        this.filters = [];
        return tmp;
    }

    public filter(filter?: Filter): ChartModel {
        if (arguments.length) {
            if (!filter) {
                this.clearFilters();
            } else if (this.hasFilter(filter)) {
                this.removeFilter(filter);
            } else {
                this.addFilter(filter);
            }
            this.apply();
        }
        return this;
    }

    // abstract
    public apply(): ChartModel {
        return this;
    }

    // abstract
    public data(): Array<any> {
        return [];
    }
}
export = ChartModel;
