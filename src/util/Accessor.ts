/// <reference path="../references.ts"/>

interface Accessor<T> {
    (object: T, index?: number): any;
}

export = Accessor;
