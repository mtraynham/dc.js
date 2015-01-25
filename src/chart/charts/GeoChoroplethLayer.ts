/// <reference path="../../references.ts"/>

import Accessor = require('../../util/Accessor');

class GeoChoroplethLayer {
    public feature: any;
    public name: string;
    public keyAccessor: Accessor<any, any>;
    public titleAccessor: Accessor<any, string>;

    constructor(feature: any, name: string, keyAccessor: Accessor<any, any>, titleAccessor: Accessor<any, string>) {
        this.feature = feature;
        this.name = name;
        this.keyAccessor = keyAccessor;
        this.titleAccessor = titleAccessor;
    }
}
export = GeoChoroplethLayer;
