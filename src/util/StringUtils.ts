///ts:ref=references
/// <reference path="../references.ts"/> ///ts:ref:generated

class StringUtils {
    private static _idCounter = 0;
    public static uniqueId(): string {
        return (++StringUtils._idCounter).toString();
    }

    public static nameToId(name: string): string {
        return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
    }
}
export = StringUtils;
