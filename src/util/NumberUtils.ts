///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

class NumberUtils {
    public static NEGLIGIBLE_NUMBER: number = 1e-10;
    public static FLOAT_FORMAT: (value: number) => string = d3.format('.2f');

    public static isNumber(n: any): boolean {
        return n === +n;
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

    public static safeNumber(n: number) {
        return NumberUtils.isNumber(n) ? n : 0;
    }

    public static clamp(n: number, min: number, max: number): number {
        return Math.max(Math.min(n, max), min);
    }
}
export = NumberUtils;
