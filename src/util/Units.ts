/// <reference path="../references.ts"/>

import NumberUtils = require('./NumberUtils');

class Units {
    public static integer(start: number, end: number): number {
        return Math.abs(end - start);
    }

    public static float(precision: number): (start: number, end: number) => number {
        return (start: number, end: number): number => {
            var d = Math.abs((end - start) / precision);
            return NumberUtils.isNegligible(d - Math.floor(d)) ? Math.floor(d) : Math.ceil(d);
        };
    }
}
export = Units;
