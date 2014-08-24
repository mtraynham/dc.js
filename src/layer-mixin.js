dc.layerMixin = function (_chart) {
    var _layerAccessor,
        _layerFn;

    _chart.layerAccessor = function (_) {
        if (!arguments.length) {
            return _layerAccessor;
        }
        _layerAccessor = _;
        return _chart;
    };

    _chart.layerFn = function (_) {
        if (!arguments.length) {
            return _layerFn;
        }
        _layerFn = _;
        _chart.expireCache();
        return _chart;
    };

    _chart.layeredDataFn = function () {
        return _layerFn(_chart, _chart.data());
    };

    _chart.xAxisMax = function () {
        return dc.utils.add(_layerFn.xAxisMax(), _chart.xAxisPadding());
    };

    _chart.xAxisMin = function () {
        return dc.utils.subtract(_layerFn.xAxisMin(), _chart.xAxisPadding());
    };

    _chart.yAxisMax = function () {
        return dc.utils.add(_layerFn.yAxisMax(), _chart.yAxisPadding());
    };

    _chart.yAxisMin = function () {
        return dc.utils.subtract(_layerFn.yAxisMin(), _chart.yAxisPadding());
    };

    _chart._ordinalXDomain = function () {
        return _layerFn.map(dc.pluck('key'));
    };
};

dc.layerMixin.dataFn = {
    STANDARD: function (chart, data) {
        return d3.nest()
            .key(chart.keyAccessor())
            .rollup(function (datum) {
                return datum.value;
            }).entries(data);
    },
    LAYERED: function (chart, data) {
        return d3.nest()
            .key(chart.keyAccessor())
            .key(chart.layerAccessor() || function () { return 'all'; })
            .sortKeys(d3.ascending)
            .rollup(function (datum) {
                return datum.value;
            }).entries(data);
    }
};

dc.layerMixin.layerFunctor = function (layerFn) {
    var input,
        output;
    var layerFunctor = function (chart, d) {
        output = layerFn.call(chart, input = d);
    };
    layerFunctor.data = function () {
        return output.data;
    };
    layerFunctor.xAxisMax = function () {
        return output.xAxisMax;
    };
    layerFunctor.xAxisMin = function () {
        return output.xAxisMin;
    };
    layerFunctor.yAxisMax = function () {
        return output.yAxisMax;
    };
    layerFunctor.yAxisMin = function () {
        return output.yAxisMin;
    };
    layerFunctor.map = function () {
        return input.map.apply(arguments);
    };
    layerFunctor.prepare = function () {
        return output.prepare.call();
    };
    return layerFunctor;
};
