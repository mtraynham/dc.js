/// <reference path="../references.ts"/>

import Filter = require('../filters/Filter');

class ChartModel {

    public hasFilter(filter?: Filter): boolean {
        return arguments.length ?
            this.filters.indexOf(filter) > -1 :
            this.filters.length > 0;
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

    public apply(): ChartModel {
        throw new Error('This method is abstract.');
    }

    public compute(): Array<any> {
        throw new Error('This method is abstract.');
    }
}
export = ChartModel;
