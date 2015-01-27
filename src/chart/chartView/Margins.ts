/// <reference path="../../references.ts"/>

class Margins {
    public top: number;
    public right: number;
    public bottom: number;
    public left: number;

    constructor(top: number = 0, right: number = 50, bottom: number = 30, left: number = 30) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
}
export = Margins;
