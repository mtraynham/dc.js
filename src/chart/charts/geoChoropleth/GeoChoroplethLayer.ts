/// <reference path="../../../references.ts"/>

import Accessor = require('../../../util/Accessor');

class GeoChoroplethLayer {
    public name: string;
    public feature: any;
    public keyAccessor: Accessor<any, any>;
    public titleAccessor: Accessor<any, string>;

    constructor(name: string, feature: any, keyAccessor: Accessor<any, any>, titleAccessor: Accessor<any, string>) {
        this.name = name;
        this.feature = feature;
        this.keyAccessor = keyAccessor;
        this.titleAccessor = titleAccessor;
    }
}
export = GeoChoroplethLayer;
