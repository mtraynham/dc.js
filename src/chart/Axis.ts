import SelectionProvider = require('./SelectionProvider');
import SelectionLifeCycle = require('./SelectionLifeCycle');

class Axis extends SelectionLifeCycle {
    public showGridLines: boolean = false;

    private _axis: D3.Svg.Axis = d3.svg.axis();

    constructor(selectionProvider: SelectionProvider,
                scale: D3.Scale.GenericScale<any>) {
        super(selectionProvider);
        this._axis.scale(scale);
    }

    public get axis() {
        return this._axis;
    }

    protected doRender(svg: D3.Selection): Axis {
        // axis
        svg.append('g')
            .attr('class', 'axis')
            .attr('opacity', 0)
            .attr('transform', this.orientTransform(svg))
            .call(this._axis);
        return this;
    }


    protected doRedraw(svg: D3.Selection): Axis {
        // axis
        svg.select('g.axis')
            .call(this._axis)
            .attr('transform', this.orientTransform(svg))
            .transition()
            .duration(1000)
            .attr('opacity', 1);
        return this;
    }

    private orientTransform(svg: D3.Selection) {
        if (this._axis.orient() === 'bottom') {
            return `translate(0, ${svg.attr('height')})`;
        } else if (this._axis.orient() === 'right') {
            return `translate(${svg.attr('width')}, 0)`;
        }
        return `translate(0, 0)`;
    }
}
export = Axis;
