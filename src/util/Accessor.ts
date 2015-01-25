/// <reference path="../references.ts"/>

interface Accessor<T, R> {
    (datum: T, index?: number): R;
}

export = Accessor;
