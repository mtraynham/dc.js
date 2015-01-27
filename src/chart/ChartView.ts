/// <reference path="../references.ts"/>

import NumberUtils = require('../util/NumberUtils');

class ChartView {
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
        this._anchor = anchor;
        this._root = d3.select(anchor);
    }

    public get anchor(): string {
        return this._anchor;
    }

    public get root(): D3.Selection {
        return this._root;
    }

    public svg(clear: boolean = false): D3.Selection {
        if (clear) {
            this._svg.remove();
            this._svg = this.root.append('svg');
        }
        return this._svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    public width(): number {
        return this._root ?
            NumberUtils.clamp(this._root.node().getBoundingClientRect().width, this.minWidth, this.maxWidth) : 0;
    }

    public height(): number {
        return this._root ?
            NumberUtils.clamp(this._root.node().getBoundingClientRect().height, this.minHeight, this.maxHeight) : 0;
    }
}
export = ChartView;
