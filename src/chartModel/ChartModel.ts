/// <reference path="../references.ts"/>

import Filter = require('../filters/Filter');
import Sort = require('./Sort');
import DataTransform = require('./DataTransform');
import Accessor = require('../util/Accessor');

class ChartModel {
    public keyAccessor: Accessor<any, any>;
    public valueAccessor: Accessor<any, any>;
    public dataTransform: DataTransform;
    public filters: Array<Filter> = [];
    public sort: Sort;

    constructor(keyAccessor: Accessor<any, any> = (data: any) => data['key'],
                valueAccessor: Accessor<any, any> = (data: any) => data['value'],
                dataTransform?: DataTransform) {
        this.keyAccessor = keyAccessor;
        this.valueAccessor = valueAccessor;
        this.dataTransform = dataTransform;
    }

    public hasFilter(filter?: Filter): boolean {
        return arguments.length ? this.filters.indexOf(filter) > -1 : this.filters.length > 0;
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
    protected compute(): Array<any> {
        return [];
    }

    public data(): Array<any> {
        var data: Array<any> = this.compute();
        return this.dataTransform ? this.dataTransform.transform(data, this.keyAccessor, this.valueAccessor) : data;
    }
}
export = ChartModel;
