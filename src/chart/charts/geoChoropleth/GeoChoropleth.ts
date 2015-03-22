/// <reference path="../../../references.ts"/>

import GeoChoroplethLayer = require('./GeoChoroplethLayer');
import Chart = require('../../Chart');

class GeoChoropleth extends Chart {
    public layers: {[index: string]: GeoChoroplethLayer} = {};
    public projectionZoomScale: number = 0.95;
    public showGraticule: boolean = false;
    public showSphere: boolean = false;
    public zoomable: boolean = false;

    private _allFeatures: any = {type: 'FeatureCollection', features: []};
    private _graticule: D3.Geo.Graticule = d3.geo.graticule();
    private _path: D3.Geo.Path = d3.geo.path();
    private _projection: D3.Geo.Projection = d3.geo.mercator();
    private _projectionChanged: boolean = false;

    public get allFeature(): any {
        return this._allFeatures;
    }

    public set projection(projection: D3.Geo.Projection) {
        this._projection = projection;
        this._path.projection(this._projection);
    }

    public get projection(): D3.Geo.Projection {
        return this._projection;
    }

    protected doRender(svg: D3.Selection, data: Array<any>): Chart {
        this._projectionChanged = false;
        if (this.showGraticule) {
            svg.append('path').attr('class', 'graticule').datum(this._graticule).attr('d', this._path);
        }
        if (this.showSphere) {
            svg.append('path').attr('class', 'sphere').datum({type: 'Sphere'}).attr('d', this._path);
        }
        Object.keys(this.layers).forEach((key: string) => {
            var layer: GeoChoroplethLayer = this.layers[key];
            svg.append('g').attr('class', 'feature ' + layer.name)
                .selectAll('path').data(layer.feature)
                .enter().append('path')
                .attr('fill', 'white')
                .attr('d', this._path)
                .on('click', (data: any) => this.chartModel.filter(data))
                .append('title');
        });
        return this.doRedraw(svg, data);
    }

    protected doRedraw(svg: D3.Selection, data: Array<any>): Chart {
        return this;
    }
}
export = GeoChoropleth;
