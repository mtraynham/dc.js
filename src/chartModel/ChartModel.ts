/// <reference path="../references.ts"/>

import Filter = require('../filters/Filter');

class ChartModel {
    public filters: Array<Filter> = new Array<Filter>();

    public hasFilter(filter: Filter): boolean {
        return this.filters.indexOf(filter) > -1;
    }

    public addFilter(filter: Filter): ChartModel {
        this.filters.push(filter);
        return this;
    }

    public removeFilter(filter: Filter): ChartModel {
        var index: number = this.filters.indexOf(filter);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        return this;
    }

    public clearFilters(): ChartModel {
        this.filters = new Array<Filter>();
        return this;
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
        return new Array<any>();
    }
}
export = ChartModel;
