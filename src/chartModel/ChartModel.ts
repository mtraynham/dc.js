///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import Filter = require('../filters/Filter');

interface ChartModel {
    filter(filters: Array<Filter>): Array<Filter>;
    data(): Array<any>;
}
export = ChartModel;
