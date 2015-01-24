/// <reference path="../references.ts"/>

import ChartModel = require('./ChartModel');
import Filter = require('../filters/Filter');

class CrossFilterChartModel<T, TDimension> extends ChartModel {

    private dimension: CrossFilter.Dimension<T, TDimension>;
    private group: CrossFilter.Group<T, TDimension, TDimension>;

    constructor(dimension: CrossFilter.Dimension<T, TDimension>, group: CrossFilter.Group<T, TDimension, TDimension>) {
        super();
        this.dimension = dimension;
        this.group = group;
    }

    public apply(): boolean {
        this.dimension.filter(null);
        if (this.filters.length > 0) {
            this.dimension.filterFunction((value: TDimension) =>
                this.filters.some((filter: Filter) => filter.isFiltered(value)));
        }
        return true;
    }

    public data(): Array<CrossFilter.Grouping<TDimension, TDimension>> {
        return this.group.all();
    }
}
export = CrossFilterChartModel;
