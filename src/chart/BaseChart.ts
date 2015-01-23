///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

interface Accessor {
    (obj: any): any;
}

import ChartModel = require('../chartModel/ChartModel');
import Filter = require('./../filters/ValueFilter');

class BaseChart {
    private model: ChartModel;

    private anchor: string;
    private root: D3.Selection;
    private svg: SVGElement;

    private minWidth: number = 200;
    private minHeight: number = 200;
    private height: (minHeight: number, element: Element) => number = BaseChart.DEFAULT_HEIGHT;
    private width: (minHeight: number, element: Element) => number = BaseChart.DEFAULT_WIDTH;

    private listeners: D3.Dispatch = d3.dispatch(
        'preRender',
        'postRender',
        'preRedraw',
        'postRedraw',
        'filtered',
        'zoomed',
        'renderlet'
    );
    private filters: Array<Filter>;

    private static DEFAULT_WIDTH(minWidth: number, element: Element): number {
        var width = element && element.getBoundingClientRect && <number> element.getBoundingClientRect().width;
        return (width && width > minWidth) ? width : minWidth;
    }

    private static DEFAULT_HEIGHT(minHeight: number, element: Element): number {
        var width = element && element.getBoundingClientRect && <number> element.getBoundingClientRect().height;
        return (width && width > minHeight) ? width : minHeight;
    }

    constructor(model: ChartModel) {
        this.model = model;
    }

    public filterAll(): void {
        var x: number = 5;
    }

    public focus(): void {
        var x: number = 5;
    }

    public render(): void {
        var x: number = 5;
    }

    public redraw(): void {
        var x: number = 5;
    }
}
export = BaseChart;
