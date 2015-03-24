import SelectionLifeCycle = require('./SelectionLifeCycle');

class Axis extends SelectionLifeCycle {
    public showGridLines: boolean = false;

    private _axis: D3.Svg.Axis = d3.svg.axis();
    private _name: string;

    constructor(name: string,
                selection: D3.Selection,
                scale: D3.Scale.GenericScale<any>) {
        super(selection);
        this._name = name;
        this._axis.scale(scale);
    }

    public get axis() {
        return this._axis;
    }

    protected doRender(selection: D3.Selection): Axis {
        // axis
        selection.append('g')
            .attr('class', 'axis')
            .attr('class', this._name)
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
            .call((selection: D3.Selection) => {
                var ticks: D3.Selection = selection.selectAll('g.tick');
                if (ticks.select('line.grid-line').empty()) {
                    ticks.append('line')
                        .attr('opacity', 0)
                        .attr('class', 'grid-line')
                        .attr('x1', 0)
                        .attr('y1', 0)
                        .attr('x2', 0)
                        .attr('y2', -selection.attr('height'));
                }
                selection.selectAll('g.tick')
                    .select('line.grid-line')
                    .remove();
                return selection;
            });
        this.transition(axisG)
            .attr('opacity', 1)
            .call((transition: D3.Transition.Transition) =>
                transition.selectAll('g.tick.line.grid-line')
                    .attr('opacity', this.showGridLines ? 0 : 1));
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
}
export = Axis;
