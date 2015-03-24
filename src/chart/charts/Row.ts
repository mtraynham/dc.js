import Chart = require('../Chart');
import ChartView = require('../ChartView');
import ChartModel = require('../../chartModel/ChartModel');

class Row extends Chart {
    public labelOffsetX: number = 10;
    public labelOffsetY: number = 0;
    public gap: number = 0.05;
    public xAxis: D3.Svg.Axis = d3.svg.axis();

    private _x: D3.Scale.LinearScale = d3.scale.linear();
    private _y: D3.Scale.OrdinalScale = d3.scale.ordinal();

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView, chartModel);
        this.xAxis = this.xAxis.scale(this._x);
    }

    protected doRender(svg: D3.Selection): Chart {
        // append axis and grid lines
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${this.chartView.height})`)
            .selectAll('tick')
            .append('line')
            .attr('class', (data: number) => data ? 'grid-line' : '')
            .attr('y2', -this.chartView.height);

        // append rows
        var rows: D3.UpdateSelection = svg.selectAll('rect').data([]);
        var rowsEnter: D3.EnterSelection = rows.enter().append('rect')
                .attr('width', 0)
                .attr('x', 0)
                .attr('fill', 'white')
                .on('click', (data: any) => this.chartModel.filter(data.x))
                .classed('deselected', (data: any) => this.chartModel.isFiltered(data.x))
                .classed('selected', (data: any) => !this.chartModel.isFiltered(data.x));
        rowsEnter.append('title')
            .text(this.title);
        rows.exit().remove();
        return this;
    }

    protected doRedraw(svg: D3.Selection, data: Array<any>): Chart {
        this._x.domain(data.map((d: any) => d.value));
        this._y.domain(data.map((d: any) => d.key)).rangeBands([0, this.chartView.height]);
        // this.xAxis.call(this._x);
        var rows: D3.UpdateSelection = svg.selectAll('rect').data(data, (d: any) => d.key);
        rows.enter().append('rect')
            .attr('width', 0)
            .attr('x', 0)
            .attr('fill', 'white')
            .on('click', (data: any) => this.chartModel.filter(data.key))
            .classed('deselected', (data: any) => this.chartModel.isFiltered(data.key))
            .classed('selected', (data: any) => !this.chartModel.isFiltered(data.key));
        // rowsEnter.append('title')
        //    .text(this.title);
        rows.exit().remove();
        return this;
    }
}
export = Row;
