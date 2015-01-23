///ts:ref=references
/// <reference path="./references.ts"/> ///ts:ref:generated

import BaseChart = require('./chart/BaseChart');

class ChartRegistry {
    private static DEFAULT_GROUP: string = '__default_chart_group__';

    private groups: {[group: string]: Array<BaseChart>} = {};

    public hasGroup(group: string): boolean {
        return this.groups.hasOwnProperty(group);
    }

    public hasChart(chart: BaseChart): boolean {
        return Object.keys(this.groups).some((key: string) => this.groups[key].indexOf(chart) > -1);
    }

    public groupHasChart(group: string, chart: BaseChart): boolean {
        return this.hasGroup(group) && this.groups[group].indexOf(chart) > -1;
    }

    public register(chart: BaseChart, group: string): number {
        var charts = this.groups[this.initGroup(group)];
        return charts.indexOf(chart) < 0 ? charts.push(chart) : -1;
    }

    public deregister(chart: BaseChart, group?: string): void {
        var remove: (chart: BaseChart, group: string) => void = (chart: BaseChart, group: string) => {
            var index = this.groups[group].indexOf(chart);
            return index > -1 ? this.groups[group].splice(index, 1) : this.groups[group];
        };
        if (group) {
            remove(chart, group);
        } else {
            Object.keys(this.groups).forEach((key: string) => remove(chart, key));
        }

    }

    public clear(group?: string): void {
        if (group) {
            delete this.groups[group];
        } else {
            this.groups = {};
        }
    }

    public list(group: string): Array<BaseChart> {
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
