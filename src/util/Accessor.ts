///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

interface Accessor<T> {
    (object: T, index?: number): any;
}

export = Accessor;
