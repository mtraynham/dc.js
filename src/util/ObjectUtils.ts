///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import DateUtils = require('./DateUtils');
import NumberUtils = require('./NumberUtils');
import Accessor = require('./Accessor');

class ObjectUtils {
    public static toString(value: any): string {
        var s: string = '' + value;
        if (value instanceof Date) {
            s = DateUtils.DATE_FORMAT(<Date> value);
        } else if (NumberUtils.isFloat(value)) {
            s = NumberUtils.FLOAT_FORMAT(<number> value);
        } else if (NumberUtils.isInteger(value)) {
            s = Math.round(<number> value).toString();
        }
        return s;
    }

    public static pluck<T>(key: string, fn?: (object: T, value: any, index: number) => any) : Accessor<T> {
        return fn ? (d: T, index: number) => fn.call(d, d[key], index) : (d: T) => d[key];
    }
}
export = ObjectUtils;
