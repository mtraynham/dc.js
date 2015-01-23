///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import ChartModel = require('./ChartModel');
import Filter = require('../filters/Filter');

class CrossfilterChartModel<T, TDimension> implements ChartModel {

    private dimension: CrossFilter.Dimension<T, TDimension>;
    private group: CrossFilter.Group<T, TDimension, TDimension>;

    constructor(dimension: CrossFilter.Dimension<T, TDimension>, group: CrossFilter.Group<T, TDimension, TDimension>) {
        this.dimension = dimension;
        this.group = group;
    }

    public filter(filters: Array<Filter>): Array<Filter> {
        this.dimension.filter(null);
        if (filters.length > 0) {
            this.dimension.filterFunction((value: TDimension) =>
                filters.some((filter: Filter) => filter.isFiltered(value)));
        }
        return filters;
    }

    public data(): Array<CrossFilter.Grouping<TDimension, TDimension>> {
        return this.group.all();
    }
}
export = CrossfilterChartModel;
