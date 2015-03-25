import IDataProvider = require('../chartModel/IDataProvider');
import SelectionComponent = require('./SelectionComponent');
import ISelectionProvider = require('./ISelectionProvider');

class ChartComponent extends SelectionComponent {

    public static INIT: string = 'init';
    public static DESTROY: string = 'destroy';
    public static PRE_RENDER: string = 'preRender';
    public static POST_RENDER: string = 'postRender';
    public static PRE_REDRAW: string = 'preRedraw';
    public static POST_REDRAW: string = 'postRedraw';
    public static RENDERLET: string = 'renderlet';

    public listeners: D3.Dispatch = d3.dispatch(
        ChartComponent.INIT,
        ChartComponent.DESTROY,
        ChartComponent.PRE_RENDER,
        ChartComponent.POST_RENDER,
        ChartComponent.PRE_REDRAW,
        ChartComponent.POST_REDRAW,
        ChartComponent.RENDERLET
    );

    public selectionProvider: ISelectionProvider;
    public dataProvider: IDataProvider;

    constructor(selectionProvider: ISelectionProvider,
                dataProvider: IDataProvider) {
        super();
        this.selectionProvider = selectionProvider;
        this.dataProvider = dataProvider;
    }

    public init(): ChartComponent {
        this.doInit();
        this.listeners[ChartComponent.INIT](this);
        return this;
    }

    public render(): ChartComponent {
        this.listeners[ChartComponent.PRE_RENDER](this);
        this.listeners[ChartComponent.RENDERLET](this);
        this.doRender(this.selectionProvider.selection(true));
        this.listeners[ChartComponent.POST_RENDER](this);
        return this.redraw();
    }

    public redraw(): ChartComponent {
        this.listeners[ChartComponent.PRE_REDRAW](this);
        this.listeners[ChartComponent.RENDERLET](this);
        this.doRedraw(this.selectionProvider.selection(false),
            this.dataProvider.data());
        this.listeners[ChartComponent.POST_REDRAW](this);
        return this;
    }

    public destroy(): ChartComponent {
        this.doDestroy(this.selectionProvider.selection(false));
        this.listeners[ChartComponent.DESTROY](this);
        return this;
    }
}
export = ChartComponent;
