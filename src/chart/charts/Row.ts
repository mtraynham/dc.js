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

    constructor(selectionProvider: ChartView,
                dataProvider: ChartModel) {
        super(selectionProvider, dataProvider);
        this._xAxis = new Axis(selectionProvider, 'xAxis');
    }

    public doRender(svg: D3.Selection): Row {
        // axis
        this._xAxis.doRender(svg);
        return this;
    }

    public doRedraw(svg: D3.Selection, data: Array<any>): Row {
        this._x
            .domain(data.map((d: any) => d.value))
            .range([0, this.selectionProvider.effectiveWidth]);
        this._y
            .domain(data.map((d: any) => d.key))
            .rangeBands([0, this.selectionProvider.effectiveHeight]);

        // axis
        this._xAxis.axis.scale(this._x);
        this._xAxis.doRedraw(svg);

        // rows
        var rows: D3.UpdateSelection = svg.selectAll('rect')
            .data(data, (d: any) => d.key);
        var rowsEnter: D3.EnterSelection = rows.enter()
            .append('rect')
            .attr('width', 0)
            .attr('x', 0)
            .attr('fill', 'white')
            .on('click', (data: any) => this.dataProvider.filter(data.key))
            .classed('deselected', (data: any) => this.dataProvider.isFiltered(data.key))
            .classed('selected', (data: any) => !this.dataProvider.isFiltered(data.key));
         rowsEnter.append('title')
            .text(this.title);
        rows.exit().remove();
        return this;
    }
}
export = Row;
