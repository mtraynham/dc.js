import Chart = require('../Chart');
import ChartView = require('../ChartView');
import ChartModel = require('../../chartModel/ChartModel');
import Axis = require('../Axis');

class Row extends Chart {
    public labelOffsetX: number = 10;
    public labelOffsetY: number = 0;
    public gap: number = 0.05;
    public verticalGridLines: boolean = true;

    private _x: D3.Scale.LinearScale = d3.scale.linear();
    private _y: D3.Scale.OrdinalScale = d3.scale.ordinal();
    private _xAxis: Axis;

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView, chartModel);
        this._xAxis = new Axis('xAxis', this.chartView, this._x);
    }

    protected doRender(svg: D3.Selection): Row {
        // axis
        this._xAxis.render();
        return this;
    }

    protected doRedrawData(svg: D3.Selection, data: Array<any>): Row {
        this._x
            .domain(data.map((d: any) => d.value))
            .range([this.chartView.effectiveWidth, 0]);
        this._y
            .domain(data.map((d: any) => d.key))
            .rangeBands([0, this.chartView.effectiveHeight]);

        // axis
        this._xAxis.redraw();

        // rows
        var rows: D3.UpdateSelection = svg.selectAll('rect')
            .data(data, (d: any) => d.key);
        var rowsEnter: D3.EnterSelection = rows.enter()
            .append('rect')
            .attr('width', 0)
            .attr('x', 0)
            .attr('fill', 'white')
            .on('click', (data: any) => this.chartModel.filter(data.key))
            .classed('deselected', (data: any) => this.chartModel.isFiltered(data.key))
            .classed('selected', (data: any) => !this.chartModel.isFiltered(data.key));
         rowsEnter.append('title')
            .text(this.title);
        rows.exit().remove();
        return this;
    }
}
export = Row;
