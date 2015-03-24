import Filter = require('../filters/Filter');
import Transform = require('./data/Transform');
import Sort = require('./Sort');

class ChartModel {

    protected _filters: Array<Filter> = [];

    public get filters(): Array<Filter> {
        return this._filters;
    }

    public hasFilter(filter?: Filter): boolean {
        return arguments.length ?
            this._filters.indexOf(filter) > -1 :
            this._filters.length > 0;
    }

    public isFiltered(key: any): boolean {
        return this.filters.some((filter: Filter) =>
            filter.isFiltered(key));
    }

    public addFilter(filter: Filter): number {
        return this._filters.push(filter);
    }

    public removeFilter(filter: Filter): Filter {
        var index: number = this._filters.indexOf(filter);
        if (index > -1) {
            this._filters.splice(index, 1);
        }
        return filter;
    }

    public clearFilters(): Array<Filter> {
        var tmp: Array<Filter> = this._filters;
        this._filters = [];
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

    public data(): Array<any> {
        throw new Error('This method is abstract.');
    }
}
export = ChartModel;
