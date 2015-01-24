/// <reference path="./references.ts"/>

export var VERSION: string = '%VERSION%';

import ChartRegistry = require('./ChartRegistry');
export var chartRegistry = new ChartRegistry();

export import BaseChart = require('./chart/BaseChart');
export import Chart = require('./chart/Chart');
export import Focusable = require('./chart/Focusable');

export import ChartModel = require('./chartModel/ChartModel');
export import CrossFilterChartModel = require('./chartModel/CrossFilterChartModel');

export import Exception = require('./error/Exception');
export import InvalidStateException = require('./error/InvalidStateException');

export import Filter = require('./filters/Filter');
export import FilterPrinter = require('./filters/FilterPrinter');
export import NDimensionalFilter = require('./filters/NDimensionalFilter');
export import NDimensionalRangeFilter = require('./filters/NDimensionalRangeFilter');
export import NDimensionalValueFilter = require('./filters/NDimensionalValueFilter');
export import Range = require('./filters/Range');
export import RangeFilter = require('./filters/RangeFilter');
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
