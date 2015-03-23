import DataTransform = require('../DataTransform');
import Accessor = require('../../util/Accessor');

interface LayerTransform extends DataTransform {
    layerAccessor: Accessor<any, any>;
}
export = LayerTransform;
