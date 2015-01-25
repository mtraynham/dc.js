/// <reference path="../references.ts"/>

import ChartView = require('./ChartView');
import ChartModel = require('../chartModel/ChartModel');
import Accessor = require('../util/Accessor');

class Chart {
    public chartView: ChartView;
    public chartModel: ChartModel;

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
        this.doRender();
        this.listeners['postRender'](this);
        return this;
    }

    public redraw(): Chart {
        this.listeners['preRedraw'](this);
        this.listeners['renderlet'](this);
        this.doRedraw();
        this.listeners['postRedraw'](this);
        return this;
    }

    protected doRender(): Chart {
        return this;
    }

    protected doRedraw(): Chart {
        return this;
    }
}

export = Chart;
