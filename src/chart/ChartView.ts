import NumberUtils = require('../util/NumberUtils');
import SelectionProvider = require('./SelectionProvider');

class ChartView implements SelectionProvider {

    public minWidth: number;
    public maxWidth: number;
    public minHeight: number;
    public maxHeight: number;

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
        this._root = d3.select(anchor);
        this._anchor = anchor;
    }

    public get anchor(): string {
        return this._anchor;
    }

    public get root(): D3.Selection {
        return this._root;
    }

    public get width(): number {
        return this._root ?
            NumberUtils.clamp(
                this._root.node().getBoundingClientRect().width,
                Math.min(this.minWidth, 0),
                this.maxWidth) :
            0;
    }

    public get height(): number {
        return this._root ?
            NumberUtils.clamp(
                this._root.node().getBoundingClientRect().height,
                Math.min(this.minHeight, 0),
                this.maxHeight) :
            0;
    }

    public selection(clear: boolean): D3.Selection {
        if (clear) {
            this._svg.remove();
            this._svg = this.root.append('svg');
        }
        return this._svg
            .attr('width', this.width)
            .attr('height', this.height);
    }
}
export = ChartView;
