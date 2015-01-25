/// <reference path="../references.ts"/>

import ChartView = require('./ChartView');
import Margins = require('./Margins');

class MarginChartView extends ChartView {
    public margins: Margins;

    constructor(anchor: string, margins: Margins = new Margins()) {
        super(anchor);
        this.margins = margins;
    }

    public get effectiveWidth(): number {
        return this.width - this.margins.left - this.margins.right;
    }

    public get effectiveHeight(): number {
        return this.height - this.margins.top - this.margins.bottom;
    }
}
export = MarginChartView;
