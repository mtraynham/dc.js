import Chart = require('./Chart');
import SelectionComponent = require('./SelectionComponent');

class Axis extends SelectionComponent {
    private static DARK_LINE_OPACITY: number = 1;
    private static SOFT_LINE_OPACITY: number = 0.5;

    public showGridLines: boolean = true;
    public darkZeroLine: boolean = true;

    private _name: string;
    private _chart: Chart;
    private _axis: D3.Svg.Axis = d3.svg.axis();

    constructor(name: string,
                chart: Chart,
                scale: D3.Scale.GenericScale<any>) {
        super();
        this._name = name;
        this._chart = chart;
        this._axis.scale(scale);
    }

    public get selection() {
        return this._chart.selection;
    }

    public get axis() {
        return this._axis;
    }

    protected doRender(selection: D3.Selection): Axis {
        // axis
        selection.append('g')
            .attr('class', `axis ${this._name}`)
            .attr('opacity', 0)
            .attr('transform', this.orientAxisTransform(selection))
            .call(this._axis);
        return this;
    }


    protected doRedraw(selection: D3.Selection): Axis {
        // axis
        var axisG: D3.Selection = selection.select(`g.axis.${this._name}`)
            .call(this._axis)
            .attr('transform', this.orientAxisTransform(selection))
            .call((axis: D3.Selection) => {
                var ticks: D3.Selection = axis.selectAll('g.tick');
                ticks.style('opacity', 0);
                if (ticks.select('line.grid-line').empty()) {
                    return this.orientAxisGridLinesTransform(
                        selection,
                        ticks.append('line')
                        .attr('opacity', 0)
                        .attr('class', 'grid-line'));
                }
                return selection;
            });
        this.transition(axisG)
            .attr('opacity', 1)
            .selectAll('g.tick')
            .style('opacity', 1)
            .selectAll('line.grid-line')
            .attr('opacity', (d: any) => this.showGridLines ? (d ? Axis.SOFT_LINE_OPACITY : Axis.DARK_LINE_OPACITY) : 0);
        return this;
    }

    private orientAxisTransform(selection: D3.Selection) {
        if (this._axis.orient() === 'bottom') {
            return `translate(0, ${selection.attr('height')})`;
        } else if (this._axis.orient() === 'right') {
            return `translate(${selection.attr('width')}, 0)`;
        }
        return `translate(0, 0)`;
    }

    private orientAxisGridLinesTransform(selection: D3.Selection, tickSelection: D3.Selection) {
        if (this._axis.orient() === 'bottom' || this._axis.orient() === 'top') {
            var bt: number = this._axis.orient() === 'bottom' ? -1 : 1;
            tickSelection
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', bt * (+selection.attr('height')));
        } else {
            var lr: number = this._axis.orient() === 'right' ? -1 : 1;
            tickSelection
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', lr * (+selection.attr('width')))
                .attr('y2', 0);
        }
        return tickSelection;
    }
}
export = Axis;
