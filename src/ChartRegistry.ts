import Chart = require('./chart/Chart');

class ChartRegistry {
    private static DEFAULT_GROUP: string = '__default_chart_group__';

    private _groups: {[group: string]: Array<Chart>} = {};

    public hasGroup(group: string): boolean {
        return (<Object> this._groups).hasOwnProperty(group);
    }

    public hasChart(chart: Chart, group?: string): boolean {
        return group ? this.hasGroup(group) && this._groups[group].indexOf(chart) > -1 :
            Object.keys(this._groups).some((key: string) => this._groups[key].indexOf(chart) > -1);
    }

    public list(group?: string): Array<Chart> {
        return group ? this._groups[this.initGroup(group)] :
            Object.keys(this._groups).reduce((prev: Array<Chart>, key: string) =>
                prev.concat(this._groups[key]), []);
    }

    public add(chart: Chart, group?: string): number {
        var charts: Array<Chart> = this._groups[this.initGroup(group)];
        var index: number = charts.indexOf(chart);
        return index < 0 ? charts.push(chart) : index;
    }

    public remove(chart: Chart, group?: string): Chart {
        var remove: (group: string) => void = (group: string) => {
            var index: number = this._groups[group].indexOf(chart);
            if (index > -1) {
                this._groups[group].splice(index, 1);
            }
        };
        if (group) {
            remove(group);
        } else {
            Object.keys(this._groups).forEach(remove);
        }
        return chart;
    }

    public clear(group?: string): Array<Chart> {
        var charts: Array<Chart> = this.list(group);
        if (group) {
            delete this._groups[group];
        } else {
            this._groups = {};
        }
        return charts;
    }

    private initGroup(group: string = ChartRegistry.DEFAULT_GROUP): string {
        this._groups[group] = this._groups[group] || [];
        return group;
    }
}

export = ChartRegistry;
