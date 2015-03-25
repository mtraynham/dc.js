import ChartContainer = require('./ChartContainer');
import NumberUtils = require('../util/NumberUtils');
import SelectionProvider = require('./SelectionProvider');

class ChartView implements SelectionProvider, ChartContainer {

    public minWidth: number = 0;
    public maxWidth: number = 1280;
    public minHeight: number = 0;
    public maxHeight: number = 1020;

    private _anchor: string;
    private _root: D3.Selection;
    private _svg: D3.Selection;

    constructor(anchor: string) {
        this.anchor = anchor;
    }

    public set anchor(anchor: string) {
        if (this._anchor) {
            this._root.remove();
        }
        if (anchor) {
            this._root = d3.select(anchor);
            this._anchor = anchor;
        }
    }

    public get anchor(): string {
        return this._anchor;
    }

    public get root(): D3.Selection {
        return this._root;
    }

    public get effectiveWidth(): number {
        return this.width;
    }

    public get effectiveHeight(): number {
        return this.height;
    }

    public selection(clear: boolean = false): D3.Selection {
        if (!this.root) {
            return null;
        }
        if (clear) {
            if (this._svg) {
                this._svg.remove();
            }
            this._svg = this.root.append('svg');
        }
        return this._svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    protected get width(): number {
        return this.root ?
            NumberUtils.clamp(
                this._root.node().getBoundingClientRect().width,
                Math.min(this.minWidth, 0),
                this.maxWidth) :
            0;
    }

    protected get height(): number {
        return this.root ?
            NumberUtils.clamp(
                this._root.node().getBoundingClientRect().height,
                Math.min(this.minHeight, 0),
                this.maxHeight) :
            0;
    }
}
export = ChartView;
