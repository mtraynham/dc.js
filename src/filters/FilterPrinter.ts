/// <reference path="../references.ts"/>

import Filter = require('./Filter');

class FilterPrinter {
    public static filter(filter: Filter): string {
        return filter.toString();
    }

    public static filters(filters: Array<Filter>): string {
        return filters.map((filter: Filter) => filter.toString()).join(', ');
    }
}
export = FilterPrinter;
