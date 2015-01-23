///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

class Logger {
    private enableDebugLog: boolean;

    constructor(enableDebugLog: boolean = false) {
        this.enableDebugLog = enableDebugLog;
    }

    public warn(msg: string): Logger {
        var fn: (message?: any, ...optionalParams: any[]) => void =
            console && (console.warn || console.log);
        fn(msg);
        return this;
    }

    public debug(msg: string): Logger {
        var fn: (message?: any, ...optionalParams: any[]) => void =
            this.enableDebugLog && console && (console.debug || console.log);
        fn(msg);
        return this;
    }

    public deprecate(fn: (...args: any[]) => any, msg: string): (...args: any[]) => any {
        var warned: boolean = false;
        return () => {
            if (!warned) {
                this.warn(msg);
                warned = true;
            }
            return fn.apply(this, arguments);
        };
    }
}
export = Logger;
