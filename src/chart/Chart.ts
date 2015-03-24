import Accessor = require('../util/Accessor');
import ChartView = require('ChartView');
import ChartModel = require('../chartModel/ChartModel');
import SelectionLifeCycle = require('./SelectionLifeCycle');

class Chart extends SelectionLifeCycle {

    private _chartView: ChartView;
    private _chartModel: ChartModel;

    public title: Accessor<any, string>;
    public label: Accessor<any, string>;

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView);
        this.chartView = chartView;
        this.chartModel = chartModel;
    }

    public get chartView(): ChartView {
        return this._chartView;
    }

    public set chartView(chartView: ChartView) {
        if (this._chartView) {
            this._chartView.selection(true);
        }
        this._chartView = chartView;
    }

    public get chartModel(): ChartModel {
        return this._chartModel;
    }

    public set chartModel(chartModel: ChartModel) {
        this._chartModel = chartModel;
    }

    private requireUpdate() {
        if (this.chartModel && this.chartView) {
            this.render(this.chartModel.data());
        }
    }
}

export = Chart;
