/// <reference path="../references.ts"/>

import Accessor = require('../util/Accessor');

class ColorScale {
    public colorAccessor: Accessor<any, any>;
    public colors: D3.Scale.GenericScale<any>;

    constructor (colorAccessor: Accessor<any, any>, colors: D3.Scale.GenericScale<any> = d3.scale.category20c()) {
        this.colorAccessor = colorAccessor;
        this.colors = colors;
    }

    public static ARRAY_TO_SCALE(domain: Array<any>): D3.Scale.GenericScale<any> {
        return d3.scale.quantize().range(domain);
    }

    public ordinalColors(domain: Array<any>): D3.Scale.GenericScale<any> {
        return this.colors = ColorScale.ARRAY_TO_SCALE(domain);
    }

    public linearColors(domain: Array<any>): D3.Scale.LinearScale {
        return this.colors = d3.scale.linear().range(domain).interpolate(d3.interpolateHcl);
    }

    public getColor(datum: any, index?: number): any {
        return this.colors(this.colorAccessor.call(this, datum, index));
    }
}
export = ColorScale;
