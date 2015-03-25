import Accessor = require('../util/Accessor');
import ChartComponent = require('./ChartComponent');
import ChartModel = require('../chartModel/ChartModel');
import ChartView = require('ChartView');

class Chart extends ChartComponent {

    public title: Accessor<any, string> = (d: any) => d.x;
    public label: Accessor<any, string>;

    private _selectionProvider: ChartView;
    private _dataProvider: ChartModel;

    public get selectionProvider(): ChartView {
        return this._selectionProvider;
    }

    public set selectionProvider(selectionProvider: ChartView) {
        if (this._selectionProvider) {
            this._selectionProvider.selection(true);
        }
        this._selectionProvider = selectionProvider;
        if (selectionProvider && this.dataProvider) {
            this.render();
        }
    }

    public get dataProvider(): ChartModel {
        return this._dataProvider;
    }

    public set dataProvider(dataProvider: ChartModel) {
        if (this._dataProvider) {
            this._dataProvider.destroy();
        }
        this._dataProvider = dataProvider;
        if (dataProvider) {
            dataProvider.listeners.on(ChartModel.FILTER, () => {
                if (this.selectionProvider) {
                    this.redraw();
                }
            });
        }
    }
}

export = Chart;
