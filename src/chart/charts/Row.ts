/// <reference path="../../references.ts"/>

import Chart = require('../Chart');
import ChartView = require('../../chartView/ChartView');
import ChartModel = require('../../chartModel/ChartModel');
import Accessor = require('../../util/Accessor');

class Row extends Chart {
    private static ROW_CSS_CLASS = 'row';

    public labelOffsetX: number = 10;
    public labelOffsetY: number = 0;
    public gap: number = 0.05;

    public renderTitle: boolean = true;

    private x: D3.Scale.LinearScale = d3.scale.linear();
    private xAxis: D3.Svg.Axis = d3.svg.axis().scale(this.x);
    private y: D3.Scale.OrdinalScale = d3.scale.ordinal();
    private dyOffset = '0.35em';

    protected doRedraw(svg: D3.Selection, data: Array<any>): Chart {
        var layeredData: Array<any> = data.reduce((all: Array<any>, layer: any) => all.concat(layer.values), []);
        var domain: Array<any> = d3.set(layeredData.map((d: any) => d.x)).values();

        this.x
            .domain(d3.extent(layeredData.map((d: any) => d.y0 + d.y1).concat[0]))
            .range([0, this.chartView.width()]);
        this.y
            .domain(domain)
            .rangeBands([0, this.chartView.height()]);

        var axisG: D3.Selection = svg.select('g.axis');
        if (axisG.empty()) {
            axisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0, ' + this.chartView.height() + ')');
        }
        axisG.call(this.xAxis);

        var ticks = svg.selectAll('g.tick');
        ticks.select('line.grid-line').remove();
        ticks.append('line')
            .attr('class', 'grid-line')
            .attr('y2', -this.chartView.height());

        var rows: D3.UpdateSelection = svg.selectAll('rect.' + Row.ROW_CSS_CLASS)
            .data(layeredData);
        rows.enter().append('rect')
            .attr('width', 0)
            .attr('x', 0)
            .attr('fill', 'white')
            .attr('class', (d: any, i: number) => Row.ROW_CSS_CLASS + ' _' + i);
        rows.on('click', (d: any) => this.chartModel.filter(d.x))
            .classed('deselected', (d: any) => this.chartModel.hasFilter() ? !this.chartModel.hasFilter(d.x) : false)
            .classed('deselected', (d: any) => this.chartModel.hasFilter() ? this.chartModel.hasFilter(d.x) : false);
        rows.attr('y', (d: any) => this.y(d.x))
            .attr('height', this.y.rangeBand())
            .attr('x', (d: any) => this.x(d.y0))
            .attr('width', (d: any) => this.x(d.y));
        rows.exit().remove();

        rows.selectAll('title').remove();
        if (this.renderTitle) {
            rows.append('title');
        }

        var labels: D3.UpdateSelection = svg.selectAll('text.' + Row.ROW_CSS_CLASS).data(domain);
        labels.enter().append('text')
            .attr('class', (d: any, i: number) => Row.ROW_CSS_CLASS + ' _' + i);
        labels.on('click', (d: any) => this.chartModel.filter(d.x));
        labels.attr('y', (d: any) => this.y(d) + this.y.rangeBand() / 2)
            .attr('x', this.labelOffsetX)
            .attr('dy', this.dyOffset)
            .text((d: any) => d)
            .on('click', (d: any) => this.chartModel.filter(d.x));
        labels.exit().remove();
        return this;
    }
}
export = Row;
