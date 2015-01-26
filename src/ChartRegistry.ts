/// <reference path="./references.ts"/>

import Chart = require('./chart/Chart');

class ChartRegistry {
    private static DEFAULT_GROUP: string = '__default_chart_group__';

    private groups: {[group: string]: Array<Chart>} = {};

    public hasGroup(group: string): boolean {
        return this.groups.hasOwnProperty(group);
    }

    public hasChart(chart: Chart, group?: string): boolean {
        return group ? this.hasGroup(group) && this.groups[group].indexOf(chart) > -1 :
            Object.keys(this.groups).some((key: string) => this.groups[key].indexOf(chart) > -1);
    }

    public list(group?: string): Array<Chart> {
        return group ? this.groups[this.initGroup(group)] :
            Object.keys(this.groups).reduce((prev: Array<Chart>, key: string) =>
                prev.concat(this.groups[key]), []);
    }

    public add(chart: Chart, group?: string): number {
        var charts = this.groups[this.initGroup(group)];
        var index: number = charts.indexOf(chart);
        return index < 0 ? charts.push(chart) : index;
    }

    public remove(chart: Chart, group?: string): Chart {
        var remove: (group: string) => void = (group: string) => {
            var index = this.groups[group].indexOf(chart);
            if (index > -1) {
                this.groups[group].splice(index, 1);
            }
        };
        if (group) {
            remove(group);
        } else {
            Object.keys(this.groups).forEach(remove);
        }
        return chart;
    }

    public clear(group?: string): Array<Chart> {
        var charts: Array<Chart> = this.list(group);
        if (group) {
            delete this.groups[group];
        } else {
            this.groups = {};
        }
        return charts;
    }

    private initGroup(group: string = ChartRegistry.DEFAULT_GROUP): string {
        this.groups[group] = this.groups[group] || [];
        return group;
    }
}

export = ChartRegistry;
