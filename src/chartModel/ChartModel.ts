/// <reference path="../references.ts"/>

import Filter = require('../filters/Filter');

class ChartModel {
    public filters: Array<Filter> = new Array<Filter>();

    public hasFilter(filter: Filter): boolean {
        return this.filters.indexOf(filter) > -1;
    }

    public addFilter(filter: Filter): Array<Filter> {
        this.filters.push(filter);
        return this.filters;
    }

    public removeFilter(filter: Filter): Array<Filter> {
        var index: number = this.filters.indexOf(filter);
        return index > -1 ? this.filters.splice(index, 1) : this.filters;
    }

    public clearFilters(): void {
        this.filters = new Array<Filter>();
    }

    public filter(filter?: Filter): Array<Filter> {
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
        return this.filters;
    }

    // abstract
    public apply(): boolean {
        return false;
    }

    // abstract
    public data(): Array<any> {
        return new Array<any>();
    }
}
export = ChartModel;
