/// <reference path="../../references.ts"/>

import DataTransform = require('../DataTransform');
import Accessor = require('../../util/Accessor');

class StandardTransform implements DataTransform {
    public transform(data: Array<any>, keyAccessor: Accessor<any, any>, valueAccessor: Accessor<any, number>): Array<any> {
        return d3.nest()
            .key((data: any, index: number) => keyAccessor(data))
            .rollup((datums: Array<any>) => d3.sum(datums, (d: any) => valueAccessor(d)))
            .entries(data);
    }
}
export = StandardTransform;
