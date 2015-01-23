///ts:ref=references
/// <reference path="./references.ts"/> ///ts:ref:generated

export var VERSION: string = '%VERSION%';

import ChartRegistry = require('./ChartRegistry');
export var chartRegistry = new ChartRegistry();

///ts:export=chart
export import BaseChart = require('./chart/BaseChart'); ///ts:export:generated
export import Focusable = require('./chart/Focusable'); ///ts:export:generated
///ts:export=chartModel
export import ChartModel = require('./chartModel/ChartModel'); ///ts:export:generated
export import CrossfilterChartModel = require('./chartModel/CrossfilterChartModel'); ///ts:export:generated
///ts:export=error
export import Exception = require('./error/Exception'); ///ts:export:generated
export import InvalidStateException = require('./error/InvalidStateException'); ///ts:export:generated
///ts:export=filters
export import Filter = require('./filters/Filter'); ///ts:export:generated
export import FilterPrinter = require('./filters/FilterPrinter'); ///ts:export:generated
export import NDimensionalFilter = require('./filters/NDimensionalFilter'); ///ts:export:generated
export import NDimensionalRangeFilter = require('./filters/NDimensionalRangeFilter'); ///ts:export:generated
export import NDimensionalValueFilter = require('./filters/NDimensionalValueFilter'); ///ts:export:generated
export import Range = require('./filters/Range'); ///ts:export:generated
export import RangeFilter = require('./filters/RangeFilter'); ///ts:export:generated
export import ValueFilter = require('./filters/ValueFilter'); ///ts:export:generated
///ts:export=util
export import DateUtils = require('./util/DateUtils'); ///ts:export:generated
export import Logger = require('./util/Logger'); ///ts:export:generated
export import NumberUtils = require('./util/NumberUtils'); ///ts:export:generated
export import ObjectUtils = require('./util/ObjectUtils'); ///ts:export:generated
export import StringUtils = require('./util/StringUtils'); ///ts:export:generated
export import Units = require('./util/Units'); ///ts:export:generated

export var filterAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: BaseChart) => chart.filterAll());

export var refocusAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group)
        .filter((chart: BaseChart) => chart.focus != null)
        .forEach((chart: BaseChart) => chart.focus());

export var renderAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: BaseChart) => chart.render());

export var redrawAll: (group: string) => void = (group: string) =>
    chartRegistry.list(group).forEach((chart: BaseChart) => chart.redraw());
