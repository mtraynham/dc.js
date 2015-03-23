import Chart = require('../Chart');
import ChartView = require('../ChartView');
import ChartModel = require('../../chartModel/ChartModel');

class Row extends Chart {
    private static ROW_CSS_CLASS: string = 'row';

    public labelOffsetX: number = 10;
    public labelOffsetY: number = 0;
    public gap: number = 0.05;
    public xAxis: D3.Svg.Axis = d3.svg.axis();

    private x: D3.Scale.LinearScale = d3.scale.linear();
    private y: D3.Scale.OrdinalScale = d3.scale.ordinal();
    private dyOffset: string = '0.35em';

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView, chartModel);
        this.xAxis = this.xAxis.scale(this.x);
    }

    protected doRedraw(svg: D3.Selection, data: Array<any>): Chart {
        var layeredData: Array<any> = data.reduce((all: Array<any>, layer: any) => all.concat(layer.values), []);
        var domain: Array<any> = d3.set(layeredData.map((data: any) => data.x)).values();

        this.x.domain(d3.extent(layeredData.map((data: any) => data.y0 + data.y1).concat[0]))
            .range([0, this.chartView.width()]);
        this.y.domain(domain)
            .rangeBands([0, this.chartView.height()]);

        var axisG: D3.Selection = svg.select('g.axis');
        if (axisG.empty()) {
            axisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0, ' + this.chartView.height() + ')');
        }
        axisG.call(this.xAxis);

        var ticks: D3.Selection = svg.selectAll('g.tick');
        if (ticks.selectAll('line.grid-line').empty()) {
            ticks.append('line')
                .attr('class', (data: number) => data ? 'grid-line' : '') // don't set css for 0 grid line
                .attr('y2', -this.chartView.height());
        }

        var rows: D3.UpdateSelection = svg.selectAll('rect.' + Row.ROW_CSS_CLASS)
            .data(layeredData);
        rows.enter().append('rect')
            .attr('width', 0)
            .attr('x', 0)
            .attr('fill', 'white')
            .attr('class', (data: any, index: number) => Row.ROW_CSS_CLASS + ' _' + index);
        rows.on('click', (data: any) => this.chartModel.filter(data.x))
            .classed('deselected', (data: any) => this.chartModel.hasFilter() ? !this.chartModel.hasFilter(data.x) : false)
            .classed('selected', (data: any) => this.chartModel.hasFilter() ? this.chartModel.hasFilter(data.x) : false);
        rows.attr('y', (data: any) => this.y(data.x))
            .attr('height', this.y.rangeBand())
            .attr('x', (data: any) => this.x(data.y0))
            .attr('width', (data: any) => this.x(Math.abs(data.y) + data.y0) + this.x(data.data.y0));
        rows.exit().remove();

        if (this.renderTitle) {
            if (rows.selectAll('title').empty()) {
                rows.append('title').text(this.titleFn);
            }
        } else {
            rows.selectAll('title').remove();
        }

        var labels: D3.UpdateSelection = svg.selectAll('text.' + Row.ROW_CSS_CLASS)
            .data(domain);
        labels.enter().append('text')
            .attr('class', (data: any, index: number) => Row.ROW_CSS_CLASS + ' _' + index);
        labels.on('click', (data: any) => this.chartModel.filter(data.x));
        labels.attr('y', (data: any) => this.y(data) + this.y.rangeBand() / 2)
            .attr('x', this.labelOffsetX)
            .attr('dy', this.dyOffset)
            .text(this.labelFn)
            .on('click', (data: any) => this.chartModel.filter(data.x));
        labels.exit().remove();
        return this;
    }
}
export = Row;
