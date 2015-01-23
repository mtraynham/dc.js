///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

class Exception {
    private static DEFAULT_MESSAGE: string = 'Unexpected internal error';

    private message: string;
    constructor(message: string = Exception.DEFAULT_MESSAGE) {
        this.message = message;
    }

    public toString(): string {
        return this.message;
    }
}
export = Exception;
