/// <reference path="../references.ts"/>

import Accessor = require('./Accessor');
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

    public static pluck<T, R>(key: string, fn?: (datum: T, value: any, index: number) => R): Accessor<T, R> {
        return fn ? (datum: T, index: number) => fn.call(datum, datum[key], index) : (datum: T) => datum[key];
    }
}
export = ObjectUtils;
