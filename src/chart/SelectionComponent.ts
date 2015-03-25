import properties = require('../Properties');

class SelectionComponent {
    private _transitionDuration: number;

    public get transitionDuration(): number {
        return this._transitionDuration || properties.transitionDuration;
    }

    public set transitionDuration(transitionDuration: number) {
        this._transitionDuration = transitionDuration;
    }

    // abstract
    public doInit(): SelectionComponent {
        return this;
    }

    // abstract
    public doRender(selection: D3.Selection): SelectionComponent {
        return this;
    }

    // abstract
    public doRedraw(selection: D3.Selection, data: Array<any>): SelectionComponent {
        return this;
    }

    // abstract
    public doDestroy(selection: D3.Selection): SelectionComponent {
        return this;
    }

    protected transition(selection: D3.Selection): D3.Transition.Transition {
        return selection.transition().duration(this.transitionDuration);
    }
}
export = SelectionComponent;
