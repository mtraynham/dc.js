///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

import DateUtils = require('./DateUtils');
import NumberUtils = require('./NumberUtils');

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

    public static pluck(key: string, fn?: (obj: any, value: any, index: number) =>
                            (obj: any, index: number) => any): (d: any, index?: number) => any {
        return fn ? (d: any, index: number) => fn.call(d, d[key], index) : (d: any) => d[key];
    }
}
export = ObjectUtils;
