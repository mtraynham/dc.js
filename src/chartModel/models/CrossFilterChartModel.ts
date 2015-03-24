import ChartModel = require('../ChartModel');
import Filter = require('../../filters/Filter');

class CrossFilterChartModel<T, TDimension, R> extends ChartModel {

    private dimension: CrossFilter.Dimension<T, TDimension>;
    private group: CrossFilter.Group<TDimension, T, R>;

    constructor(dimension: CrossFilter.Dimension<T, TDimension>,
                group: CrossFilter.Group<TDimension, T, R>) {
        super();
        this.dimension = dimension;
        this.group = group;
    }

    public apply(): ChartModel {
        if (this._filters && this._filters.length > 0) {
            this.dimension.filterFunction((value: TDimension) =>
                this._filters.some((filter: Filter) => filter.isFiltered(value)));
        } else {
            this.dimension.filterAll();
        }
        return this;
    }

    public data(): Array<CrossFilter.Grouping<T, R>> {
        return this.group.all();
    }

    public destroy(): void {
        this.dimension.filterAll();
    }
}
export = CrossFilterChartModel;
