dc.layerMixin = function (_chart) {
    var _layerAccessor,
        _layeredData = function (data) {
            var layered = d3.nest()
                .key(_chart.keyAccessor());
            if (_layerAccessor) {
                layered.key(_layerAccessor);
            }
            return layered.rollup(function (datum) {
                    return datum.value;
                }).entries(data);
        },
        _layerFn = null;

    _chart.layerAccessor = function (_) {
        if (!arguments.length) {
            return _layerAccessor;
        }
        _layerAccessor = _;
        return _chart;
    };

    _chart.layeredData = function (_) {
        if (!arguments.length) {
            return _layeredData.call(_chart.data());
        }
        _layeredData = d3.functor(_);
        _chart.expireCache();
        return _chart;
    };

    _chart.layerFn = function (_) {
        if (!arguments.length) {
            return _layerFn;
        }
        _layerFn = _;
        return _chart;
    };
};