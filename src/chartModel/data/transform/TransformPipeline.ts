import Accessor = require('../../../util/Accessor');

class TransformPipeline {

    public keyAccessor: Accessor<any, any>;
    public valueAccessor: Accessor<any, any>;
    public layerAccessor: Accessor<any, any>;

    constructor(keyAccessor: Accessor<any, any>,
                valueAccessor: Accessor<any, number>,
                layerAccessor: Accessor<any, number>) {
        this.keyAccessor = keyAccessor;
        this.valueAccessor = valueAccessor;
        this.layerAccessor = layerAccessor;
    }


}