/// <reference path="../references.ts"/>

import ChartModel = require('./ChartModel');
import Filter = require('../filters/Filter');

class CrossFilterChartModel<T, TDimension, R> extends ChartModel {

    private dimension: CrossFilter.Dimension<T, TDimension>;
    private group: CrossFilter.Group<TDimension, T, R>;

    constructor(dimension: CrossFilter.Dimension<T, TDimension>, group: CrossFilter.Group<TDimension, T, R>) {
        super();
        this.dimension = dimension;
        this.group = group;
    }

    public apply(): ChartModel {
        this.dimension.filter(null);
        if (this.filters.length > 0) {
            this.dimension.filterFunction((value: TDimension) =>
                this.filters.some((filter: Filter) => filter.isFiltered(value)));
        }
        return this;
    }

    public data(): Array<CrossFilter.Grouping<T, R>> {
        return this.group.all();
    }
}
export = CrossFilterChartModel;
