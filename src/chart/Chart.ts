/// <reference path="../references.ts"/>

import ChartModel = require('../chartModel/ChartModel');
import Accessor = require('../util/Accessor');

interface Chart {
    chartModel: ChartModel;
    keyAccessor: Accessor<any>;
    valueAccessor?: Accessor<any>;
    layerAccessor?: Accessor<any>;
    render(): void;
    redraw(): void;
}

export = Chart;
