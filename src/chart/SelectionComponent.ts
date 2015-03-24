import properties = require('../Properties');

class SelectionComponent {

    public static INIT: string = 'init';
    public static DESTROY: string = 'destroy';
    public static PRE_RENDER: string = 'preRender';
    public static POST_RENDER: string = 'postRender';
    public static PRE_REDRAW: string = 'preRedraw';
    public static POST_REDRAW: string = 'postRedraw';
    public static RENDERLET: string = 'renderlet';

    public listeners: D3.Dispatch = d3.dispatch(
        SelectionComponent.INIT,
        SelectionComponent.DESTROY,
        SelectionComponent.PRE_RENDER,
        SelectionComponent.POST_RENDER,
        SelectionComponent.PRE_REDRAW,
        SelectionComponent.POST_REDRAW,
        SelectionComponent.RENDERLET
    );

    public selection: D3.Selection;
    private _transitionDuration: number;

    public get transitionDuration(): number {
        return this._transitionDuration || properties.transitionDuration;
    }

    public set transitionDuration(transitionDuration: number) {
        this._transitionDuration = transitionDuration;
    }

    public init(): SelectionComponent {
        this.doInit();
        this.listeners[SelectionComponent.INIT](this);
        return this;
    }

    public render(): SelectionComponent {
        this.listeners[SelectionComponent.PRE_RENDER](this);
        this.listeners[SelectionComponent.RENDERLET](this);
        this.doRender(this.selection);
        this.listeners[SelectionComponent.POST_RENDER](this);
        return this;
    }

    public redraw(): SelectionComponent {
        this.listeners[SelectionComponent.PRE_REDRAW](this);
        this.listeners[SelectionComponent.RENDERLET](this);
        this.doRedraw(this.selection);
        this.listeners[SelectionComponent.POST_REDRAW](this);
        return this;
    }

    public destroy(): SelectionComponent {
        this.doDestroy();
        this.listeners[SelectionComponent.DESTROY](this);
        return this;
    }

    protected transition(selection: D3.Selection): D3.Transition.Transition {
        return selection.transition().duration(this.transitionDuration);
    }

    // abstract
    protected doInit(): SelectionComponent {
        return this;
    }

    // abstract
    protected doRender(selection: D3.Selection): SelectionComponent {
        return this;
    }

    // abstract
    protected doRedraw(selection: D3.Selection): SelectionComponent {
        return this;
    }

    // abstract
    protected doDestroy(): SelectionComponent {
        return this;
    }
}
export = SelectionComponent;
