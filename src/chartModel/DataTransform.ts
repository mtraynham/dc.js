/// <reference path="../references.ts"/>

import Accessor = require('../util/Accessor');

interface DataTransform {
    transform(data: Array<any>, keyAccessor: Accessor<any, any>, valueAccessor: Accessor<any, any>): Array<any>;
}
export = DataTransform;
