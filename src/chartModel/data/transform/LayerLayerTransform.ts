import LayerTransform = require('./LayerTransform');
import Accessor = require('../../util/Accessor');

class LayerLayerTransform implements LayerTransform {

    public layerAccessor: Accessor<any, any>;

    constructor(layerAccessor: Accessor<any, any> = (data: any) => data['layer']) {
        this.layerAccessor = layerAccessor;
    }

    public transform(data: Array<Tuple>, keyAccessor: Accessor<any, any>, valueAccessor: Accessor<any, number>): Array<any> {
        return d3.nest()
            .key((data: any, index: number) => this.layerAccessor(data))
            .key((data: any, index: number) => keyAccessor(data))
            .sortKeys(d3.ascending)
            .rollup((datums: Array<any>) => d3.sum(datums, (d: any) => valueAccessor(d)))
            .entries(data);
    }
}
export = LayerLayerTransform;
