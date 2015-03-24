import ChartView = require('../ChartView');
import Margins = require('./Margins');

class MarginChartView extends ChartView {
    public margins: Margins;

    constructor(anchor: string, margins: Margins = new Margins()) {
        super(anchor);
        this.margins = margins;
    }

    public get effectiveWidth(): number {
        return this.offsetWidth;
    }

    public get effectiveHeight(): number {
        return this.offsetHeight;
    }

    public selection(clear: boolean = false): D3.Selection {
        var svg: D3.Selection = super.selection(clear);
        return (clear ? svg.append('g') : svg.select('g'))
            .attr('width', this.offsetWidth)
            .attr('height', this.offsetHeight)
            .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);
    }

    protected get offsetWidth(): number {
        return this.width - this.margins.left - this.margins.right;
    }

    protected get offsetHeight(): number {
        return this.height - this.margins.top - this.margins.bottom;
    }
}
export = MarginChartView;
