/// <reference path="../references.ts"/>

import Chart = require('./Chart');
import ChartModel = require('../chartModel/ChartModel');
import ColorScale = require('./ColorScale');
import Filter = require('./../filters/ValueFilter');
import Accessor = require('../util/Accessor');

class BaseChart extends Chart {

    private anchor: string;
    private root: D3.Selection;
    private svg: SVGElement;

    private minWidth: number = 200;
    private minHeight: number = 200;
    private height: (minHeight: number, element: Element) => number = BaseChart.DEFAULT_HEIGHT;
    private width: (minHeight: number, element: Element) => number = BaseChart.DEFAULT_WIDTH;

    private static DEFAULT_WIDTH(minWidth: number, element: Element): number {
        var width = element && element.getBoundingClientRect && <number> element.getBoundingClientRect().width;
        return (width && width > minWidth) ? width : minWidth;
    }

    private static DEFAULT_HEIGHT(minHeight: number, element: Element): number {
        var width = element && element.getBoundingClientRect && <number> element.getBoundingClientRect().height;
        return (width && width > minHeight) ? width : minHeight;
    }

    constructor(chartModel: ChartModel) {
        super(chartModel);
    }
}
export = BaseChart;
