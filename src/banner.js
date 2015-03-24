var generatePropProxy = function (arr, property, accessor) {
    var memoize = [];
    return new Proxy(arr, {
        get(target, key) {
            return memoize[key] || (memoize[key] = accessor(target[key]));
        }
    });
};

var invertProxy = function (arr, x, y, z) {
    var memoize = [];
    return new Proxy(arr, {
        get(target, key, receiver) {
            console.log(key);
            if (!isNaN(key)) {
                console.log('number');
                return memoize[key] || (memoize[key] = {x: x[key], y: y[key], z: z[key], data: arr[key]});
            }
            return arr[key];
        }
    });
};

var data = [
        {a: 'foo', b: 'bar', c: 'd'},
        {a: 'foo1', b: 'bar1', c: 'd1'}
    ],
    data = invertProxy(data,
        generatePropProxy(data, 'x', function (d) { return d.a; }),
        generatePropProxy(data, 'y', function (d) { return d.b; }),
        generatePropProxy(data, 'z', function (d) { return d.c; }));




var data = [];
    xAccessor = function(d) { return d.a },
    yAccessor = function(d) { return d.b },
    zAccessor = function(d) { return d.c };

for (var i = 0; i < 100; i++) {
    data[i] = {a: 1, b: 1, c: 1};
}

var generatePropProxy = function (arr, property, accessor) {
    var memoize = [];
    return new Proxy(arr, {
        get(target, key) {
            return memoize[key] || (memoize[key] = accessor(target[key]));
        }
    });
};

var invertProxy = function (arr, x, y, z) {
    var memoize = [];
    return new Proxy(arr, {
        get(target, key) {
            return memoize[key] || (memoize[key] = {x: x[key], y: y[key], z: z[key], data: arr[key]});
        }
    });
};

var aData = [];
for (var i = 0; i < data.length; i++) {
    aData[i] = {
        x: xAccessor(data[i]),
        y: yAccessor(data[i]),
        z: zAccessor(data[i]),
        data: data[i]
    };
}

var bData = [];
for (var i = 0; i < data.length; i++) {
    bData[i] = new Proxy(data[i], {
        get(target, key) {
            if (key === 'x') {
                return xAccessor(data[i]);
            } else if (key === 'y') {
                return yAccessor(data[i]);
            } else if (key === 'z') {
                return zAccessor(data[i]);
            } else {
                return data[i];
            }
        }
    });
}

var cData = invertProxy(data,
        generatePropProxy(data, 'x', function (d) { return d.a; }),
        generatePropProxy(data, 'y', function (d) { return d.b; }),
        generatePropProxy(data, 'z', function (d) { return d.c; }));


for (var i = 0; i < array.length; i++) {
    console.log(array[i]['x']);
    console.log(array[i]['y']);
    console.log(array[i]['z']);
    console.log(array[i]['data']);
}