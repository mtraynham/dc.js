/// <reference path="../../references.ts"/>

import GeoChoroplethLayer = require('./GeoChoroplethLayer');
import Chart = require('../Chart');
import ChartView = require('../ChartView');
import ChartModel = require('../../chartModel/ChartModel');

class GeoChoropleth extends Chart {
    public layers: {[index: string]: GeoChoroplethLayer} = {};
    public projectionZoomScale: number = 0.95;
    public showGraticule: boolean = false;
    public showSphere: boolean = false;
    public zoomable: boolean = false;

    private _allFeatures: any = {type: 'FeatureCollection', features: []};
    private _graticule: D3.Geo.Graticule = d3.geo.graticule();
    private _path: D3.Geo.Path = d3.geo.path();
    private _projection: D3.Geo.Projection;
    private _projectionChanged: boolean = false;

    constructor(chartView: ChartView, chartModel: ChartModel) {
        super(chartView, chartModel);
        this.projection = d3.geo.mercator();
    }

    public set projection(projection: D3.Geo.Projection) {
        this._projection = projection;
        this._path.projection(this._projection);
    }

    public get projection(): D3.Geo.Projection {
        return this._projection;
    }
}
export = GeoChoropleth;
