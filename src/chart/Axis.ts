import ChartContainer = require('./ChartContainer');
import SelectionComponent = require('./SelectionComponent');

class Axis extends SelectionComponent {
    public gridLines: boolean = true;
    public zeroGridLineOpacity: number = 1;
    public gridLineOpacity: number = 0.5;

    private _chartContainer: ChartContainer;
    private _name: string;
    private _axis: D3.Svg.Axis = d3.svg.axis();

    constructor(chartContainer: ChartContainer, name: string) {
        super();
        this._chartContainer = chartContainer;
        this._name = name;
    }

    public get axis() {
        return this._axis;
    }

    public doRender(selection: D3.Selection): Axis {
        // axis
        selection.append('g')
            .attr('class', `axis ${this._name}`)
            .attr('opacity', 0)
            .attr('transform', this.orientAxisTransform())
            .call(this._axis);
        return this;
    }


    public doRedraw(selection: D3.Selection): Axis {
        // axis
        var axisG: D3.Selection = selection.select(`g.axis.${this._name}`)
            .call(this._axis)
            .attr('transform', this.orientAxisTransform())
            .call((axis: D3.Selection) => {
                var ticks: D3.Selection = axis.selectAll('g.tick');
                if (ticks.select('line.grid-line').empty()) {
                    this.orientAxisGridLines(
                        ticks.append('line')
                            .attr('class', 'grid-line')
                            .attr('x1', 0)
                            .attr('y1', 0));
                }
                return axis;
            });
        this.transition(axisG)
            .attr('opacity', 1)
            .selectAll('line.grid-line')
            .attr('opacity', (d: any) =>
                this.gridLines ?
                    ((!d && this.zeroGridLineOpacity) || this.gridLineOpacity) :
                    0);
        return this;
    }

    private orientAxisTransform() {
        if (this._axis.orient() === 'bottom') {
            return `translate(0, ${this._chartContainer.effectiveHeight})`;
        } else if (this._axis.orient() === 'right') {
            return `translate(${this._chartContainer.effectiveWidth}, 0)`;
        }
        return `translate(0, 0)`;
    }

    private orientAxisGridLines(tickSelection: D3.Selection) {
        if (this._axis.orient() === 'bottom' || this._axis.orient() === 'top') {
            var bt: number = this._axis.orient() === 'bottom' ? -1 : 1;
            tickSelection
                .attr('x2', 0)
                .attr('y2', bt * (+this._chartContainer.effectiveHeight));
        } else {
            var lr: number = this._axis.orient() === 'right' ? -1 : 1;
            tickSelection
                .attr('x2', lr * (+this._chartContainer.effectiveWidth))
                .attr('y2', 0);
        }
        return tickSelection;
    }
}
export = Axis;
