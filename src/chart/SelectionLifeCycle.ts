import SelectionProvider = require('./SelectionProvider');

class SelectionLifeCycle {

    private _selectionProvider: SelectionProvider;

    constructor(selectionProvider: SelectionProvider) {
        this._selectionProvider = selectionProvider;
    }

    public listeners: D3.Dispatch = d3.dispatch(
        'preRender',
        'postRender',
        'preRedraw',
        'postRedraw',
        'renderlet'
    );

    public render(data: Array<any>): SelectionLifeCycle {
        this.listeners['preRender'](this);
        this.listeners['renderlet'](this);
        this.doRender(this._selectionProvider.selection(true), data);
        this.listeners['postRender'](this);
        return this;
    }

    public redraw(data: Array<any>): SelectionLifeCycle {
        this.listeners['preRedraw'](this);
        this.listeners['renderlet'](this);
        this.doRedraw(this._selectionProvider.selection(), data);
        this.listeners['postRedraw'](this);
        return this;
    }

    // abstract
    protected doRender(selection: D3.Selection, data: Array<any>): SelectionLifeCycle {
        throw new Error('Method is abstract.');
    }

    // abstract
    protected doRedraw(selection: D3.Selection, data: Array<any>): SelectionLifeCycle {
        throw new Error('Method is abstract.');
    }
}
export = SelectionLifeCycle;
