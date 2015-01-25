/// <reference path="./references.ts"/>

import Chart = require('./chart/Chart');

class ChartRegistry {
    private static DEFAULT_GROUP: string = '__default_chart_group__';

    private groups: {[group: string]: Array<Chart>} = {};

    public hasGroup(group: string): boolean {
        return this.groups.hasOwnProperty(group);
    }

    public hasChart(chart: Chart): boolean {
        return Object.keys(this.groups).some((key: string) => this.groups[key].indexOf(chart) > -1);
    }

    public groupHasChart(group: string, chart: Chart): boolean {
        return this.hasGroup(group) && this.groups[group].indexOf(chart) > -1;
    }

    public register(chart: Chart, group: string): ChartRegistry {
        var charts = this.groups[this.initGroup(group)];
        if (charts.indexOf(chart) < 0) {
            charts.push(chart);
        }
        return this;
    }

    public deregister(chart: Chart, group?: string): ChartRegistry {
        var remove: (chart: Chart, group: string) => void = (chart: Chart, group: string) => {
            var index = this.groups[group].indexOf(chart);
            return index > -1 ? this.groups[group].splice(index, 1) : this.groups[group];
        };
        if (group) {
            remove(chart, group);
        } else {
            Object.keys(this.groups).forEach((key: string) => remove(chart, key));
        }
        return this;
    }

    public clear(group?: string): ChartRegistry {
        if (group) {
            delete this.groups[group];
        } else {
            this.groups = {};
        }
        return this;
    }

    public list(group: string): Array<Chart> {
        return this.groups[this.initGroup(group)];
    }

    private initGroup(group: string): string {
        if (!group) {
            group = ChartRegistry.DEFAULT_GROUP;
        }
        if (!this.groups[group]) {
            this.groups[group] = [];
        }
        return group;
    }
}

export = ChartRegistry;
