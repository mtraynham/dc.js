/// <reference path="../references.ts"/>

interface Accessor<T> {
    (datum: T, index?: number): any;
}

export = Accessor;
