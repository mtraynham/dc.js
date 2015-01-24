/// <reference path="../references.ts"/>

interface Filter {
    isFiltered(value: any): boolean;
    toString(): string;
}
export = Filter;
