/// <reference path="../references.ts"/>

class NumberUtils {
    public static NEGLIGIBLE_NUMBER: number = 1e-10;
    public static FLOAT_FORMAT: (value: number) => string = d3.format('.2f');

    public static isNumber(n: any): boolean {
        return typeof n === 'number' ||
            (n && typeof n === 'object' && Object.prototype.toString.call(n) === '[object Number]');
    }

    public static isFloat(n: any): boolean {
        return NumberUtils.isNumber(n) && n !== Math.floor(n);
    }

    public static isInteger(n: any): boolean {
        return NumberUtils.isNumber(n) && n === Math.floor(n);
    }

    public static isNegligible(n: number): boolean {
        return !NumberUtils.isNumber(n) || (n < NumberUtils.NEGLIGIBLE_NUMBER && n > -NumberUtils.NEGLIGIBLE_NUMBER);
    }

    public static safeNumber(n: number, def: number = 0) {
        return NumberUtils.isNumber(n) ? n : def;
    }

    public static clamp(n: number, min: number = Number.MIN_VALUE, max: number = Number.MAX_VALUE): number {
        return Math.max(Math.min(n, max), min);
    }
}
export = NumberUtils;
