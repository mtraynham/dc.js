/// <reference path="../references.ts"/>

import ChartView = require('../chartView/ChartView');
import ChartModel = require('../chartModel/ChartModel');
import Accessor = require('../util/Accessor');

class Chart {
    public chartView: ChartView;
    public chartModel: ChartModel;

    public renderTitle: boolean = true;
    public titleFn: Accessor<any, string>;
    public renderLabel: boolean = true;
    public labelFn: Accessor<any, string>

    public listeners: D3.Dispatch = d3.dispatch(
        'preRender',
        'postRender',
        'preRedraw',
        'postRedraw',
        'renderlet'
    );

    constructor(chartView: ChartView, chartModel: ChartModel) {
        this.chartView = chartView;
        this.chartModel = chartModel;
    }

    public render(): Chart {
        this.listeners['preRender'](this);
        this.listeners['renderlet'](this);
        this.doRedraw(this.chartView.svg(true), this.chartModel.data());
        this.listeners['postRender'](this);
        return this;
    }

    public redraw(): Chart {
        this.listeners['preRedraw'](this);
        this.listeners['renderlet'](this);
        this.doRedraw(this.chartView.svg(), this.chartModel.data());
        this.listeners['postRedraw'](this);
        return this;
    }

    // abstract
    protected doRender(svg: D3.Selection, data: Array<any>): Chart {
        return this.doRedraw(svg, data);
    }

    // abstract
    protected doRedraw(svg: D3.Selection, data: Array<any>): Chart {
        return this;
    }
}

export = Chart;
