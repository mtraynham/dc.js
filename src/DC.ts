/// <reference path="./references.ts"/>

export var VERSION: string = '%VERSION%';

import ChartRegistry = require('./ChartRegistry');
export var chartRegistry = new ChartRegistry();

export import Chart = require('./chart/Chart');
export import ChartView = require('./chart/ChartView');
export import Focusable = require('./chart/Focusable');

export import GeoChoropleth = require('./chart/charts/GeoChoropleth');

export import ChartModel = require('./chartModel/ChartModel');
export import CrossFilterChartModel = require('./chartModel/CrossFilterChartModel');

export import Exception = require('./error/Exception');
export import InvalidStateException = require('./error/InvalidStateException');

export import ArrayFilter = require('./filters/ArrayFilter');
export import Filter = require('./filters/Filter');
export import Range = require('./filters/Range');
export import RangeArrayFilter = require('./filters/RangeArrayFilter');
export import RangeFilter = require('./filters/RangeFilter');
export import ValueArrayFilter = require('./filters/ValueArrayFilter');
export import ValueFilter = require('./filters/ValueFilter');

export import Accessor = require('./util/Accessor');
export import DateUtils = require('./util/DateUtils');
export import Logger = require('./util/Logger');
export import NumberUtils = require('./util/NumberUtils');
export import ObjectUtils = require('./util/ObjectUtils');
export import StringUtils = require('./util/StringUtils');
export import Units = require('./util/Units');

export var filterAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: Chart) => chart.chartModel.filter(null));

export var refocusAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group);
        // fix
        // .filter((chart: Chart) => chart instanceof Focusable)
        // .forEach((chart: Chart) => (<Focusable>chart).focus());

export var renderAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: Chart) => chart.render());

export var redrawAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: Chart) => chart.redraw());
