import Accessor = require('../util/Accessor');
import ChartView = require('ChartView');
import ChartModel = require('../chartModel/ChartModel');
import SelectionLifeCycle = require('./SelectionLifeCycle');

class Chart extends SelectionLifeCycle {

    public title: Accessor<any, string> = (d: any) => d.x;
    public label: Accessor<any, string>;

    private _chartView: ChartView;
    private _chartModel: ChartModel;

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView, chartModel);
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
        if (this._chartModel) {
            this._chartModel.destroy();
        }
        this._chartModel = chartModel;
        chartModel.listeners.on(ChartModel.FILTER, () => {
            if (this.chartView) {
                this.redraw();
            }
        });
    }
}

export = Chart;
