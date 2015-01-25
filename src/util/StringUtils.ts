/// <reference path="../references.ts"/>

class StringUtils {
    private static _idCounter = 0;
    public static uniqueId(): string {
        return (++StringUtils._idCounter).toString();
    }

    public static nameToId(name: string): string {
        return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
    }

    public static arrayToString(array: Array<any>) {
        return array.map((datum: any) => datum.toString()).join(', ');
    }
}
export = StringUtils;
