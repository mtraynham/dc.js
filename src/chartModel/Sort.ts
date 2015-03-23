import SortDirection = require('./SortDirection');
import Accessor = require('../util/Accessor');

class Sort {
    public sortAccessor: Accessor<any, any>;
    public sortDirection: SortDirection;
    public asc: (a: any, b: any) => number;
    public desc: (a: any, b: any) => number;

    constructor(sortAccessor: Accessor<any, any>, sortDirection: SortDirection = SortDirection.ASC) {
        this.sortAccessor = sortAccessor;
        this.sortDirection = sortDirection;
        this.asc = (a: any, b: any) => this.sortAccessor(a) >= this.sortAccessor(b) ? -1 : 1;
        this.desc = (a: any, b: any) => this.sortAccessor(a) >= this.sortAccessor(b) ? 1 : -1;
    }

    public apply(data: Array<any>): Array<any> {
        return this.sortDirection === SortDirection.DESC ? data.sort(this.desc) : data.sort(this.asc);
    }
}

export = Sort;
