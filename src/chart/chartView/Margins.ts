class Margins {
    public top: number;
    public right: number;
    public bottom: number;
    public left: number;

    constructor(top: number = 0, right: number = 20, bottom: number = 20, left: number = 30) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
}
export = Margins;
