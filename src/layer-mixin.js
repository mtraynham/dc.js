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

    _chart._preprocessData = function () {
        _layerFn(_chart, _chart.data());
    };

    _chart._prepareData = function () {
        return _layerFn.prepare();
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
    return _chart;
};

dc.layerMixin.dataFn = {
    standard: function (chart, data) {
        return d3.nest()
            .key(chart.keyAccessor())
            .rollup(function (datums) {
                return d3.sum(datums, chart.valueAccessor());
            }).entries(data);
    },
    layered: function (chart, data) {
        return d3.nest()
            .key(chart.keyAccessor())
            .key(chart.layerAccessor() || function () { return 'all'; })
            .sortKeys(d3.ascending)
            .rollup(function (datums) {
                return d3.sum(datums, chart.valueAccessor());
            }).entries(data);
    }
};

dc.layerMixin.layerFunctor = function (layerFn) {
    var input,
        layered,
        output;
    var layerFunctor = function (chart, d) {
        output = (layered = layerFn(chart, input = d)).prepare();
    };
    layerFunctor.data = function () {
        return layered.data;
    };
    layerFunctor.output = function () {
        return output;
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
        return output.prepare();
    };
    return layerFunctor;
};
