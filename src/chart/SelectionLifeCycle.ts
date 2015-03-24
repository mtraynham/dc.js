import SelectionProvider = require('./SelectionProvider');

class SelectionLifeCycle {

    public static INIT: string = 'init';
    public static DESTROY: string = 'destroy';
    public static PRE_RENDER: string = 'preRender';
    public static POST_RENDER: string = 'postRender';
    public static PRE_REDRAW: string = 'preRedraw';
    public static POST_REDRAW: string = 'postRedraw';
    public static RENDERLET: string = 'renderlet';

    public listeners: D3.Dispatch = d3.dispatch(
        SelectionLifeCycle.INIT,
        SelectionLifeCycle.DESTROY,
        SelectionLifeCycle.PRE_RENDER,
        SelectionLifeCycle.POST_RENDER,
        SelectionLifeCycle.PRE_REDRAW,
        SelectionLifeCycle.POST_REDRAW,
        SelectionLifeCycle.RENDERLET
    );

    private _selectionProvider: SelectionProvider;

    constructor(selectionProvider: SelectionProvider) {
        this._selectionProvider = selectionProvider;
    }

    public init(): SelectionLifeCycle {
        this.doInit();
        this.listeners[SelectionLifeCycle.INIT](this);
        return this;
    }

    public render(): SelectionLifeCycle {
        this.listeners[SelectionLifeCycle.PRE_RENDER](this);
        this.listeners[SelectionLifeCycle.RENDERLET](this);
        this.doRender(this._selectionProvider.selection(true));
        this.listeners[SelectionLifeCycle.POST_RENDER](this);
        this.redraw();
        return this;
    }

    public redraw(): SelectionLifeCycle {
        this.listeners[SelectionLifeCycle.PRE_REDRAW](this);
        this.listeners[SelectionLifeCycle.RENDERLET](this);
        this.doRedraw(this._selectionProvider.selection(false));
        this.listeners[SelectionLifeCycle.POST_REDRAW](this);
        return this;
    }

    public destroy(): SelectionLifeCycle {
        this.doDestroy();
        this.listeners[SelectionLifeCycle.DESTROY](this);
        return this;
    }

    // abstract
    protected doInit(): SelectionLifeCycle {
        return this;
    }

    // abstract
    protected doRender(selection: D3.Selection): SelectionLifeCycle {
        return this;
    }

    // abstract
    protected doRedraw(selection: D3.Selection): SelectionLifeCycle {
        return this;
    }

    // abstract
    protected doDestroy(): SelectionLifeCycle {
        return this;
    }
}
export = SelectionLifeCycle;
