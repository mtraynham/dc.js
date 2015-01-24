/// <reference path="../references.ts"/>

import ChartModel = require('../chartModel/ChartModel');

interface Chart {
    chartModel: ChartModel;
    render(): void;
    redraw(): void;
}

export = Chart;
