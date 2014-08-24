dc.barChart = function (parent, chartGroup) {
    var DEFAULT_GAP_BETWEEN_BARS = 2,
        MIN_BAR_WIDTH = 1;

    var _chart = dc.layerMixin(dc.coordinateGridMixin({}));

    var _alwaysUseRounding = false,
        _centerBar = false,
        _gap = DEFAULT_GAP_BETWEEN_BARS;

    /**
    #### .alwaysUseRounding([boolean])
    Set or get whether rounding is enabled when bars are centered.  Default: false.  If false, using
    rounding with centered bars will result in a warning and rounding will be ignored.  This flag
    has no effect if bars are not centered.

    When using standard d3.js rounding methods, the brush often doesn't align correctly with
    centered bars since the bars are offset.  The rounding function must add an offset to
    compensate, such as in the following example.
    ```js
    chart.round(function(n) {return Math.floor(n)+0.5});
    ```
    **/
    _chart.alwaysUseRounding = function (_) {
        if (!arguments.length) {
            return _alwaysUseRounding;
        }
        _alwaysUseRounding = _;
        return _chart;
    };

    /**
    #### .barPadding([padding])
    Get or set the spacing between bars as a fraction of bar size. Valid values are between 0-1.
    Setting this value will also remove any previously set `gap`. See the
    [d3 docs](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands)
    for a visual description of how the padding is applied.
    **/
    _chart.barPadding = function (_) {
        if (!arguments.length) {
            return _chart._rangeBandPadding();
        }
        _chart._rangeBandPadding(_);
        _gap = undefined;
        return _chart;
    };

    /**
    #### .centerBar(boolean)
    Whether the bar chart will render each bar centered around the data position on x axis. Default: false
    **/
    _chart.centerBar = function (_) {
        if (!arguments.length) {
            return _centerBar;
        }
        _centerBar = _;
        return _chart;
    };

    /**
     #### .gap(gapBetweenBars)
     Manually set fixed gap (in px) between bars instead of relying on the default auto-generated
     gap.  By default the bar chart implementation will calculate and set the gap automatically
     based on the number of data points and the length of the x axis.

    **/
    _chart.gap = function (_) {
        if (!arguments.length) {
            return _gap;
        }
        _gap = _;
        return _chart;
    };

    _chart._useOuterPadding = function () {
        return _gap === undefined;
    };

    /**
    #### .outerPadding([padding])
    Get or set the outer padding on an ordinal bar chart. This setting has no effect on non-ordinal charts.
    Will pad the width by `padding * barWidth` on each side of the chart.

    Default: 0.5
    **/
    _chart.outerPadding = _chart._outerRangeBandPadding;

    _chart.layerFn(dc.barChart.layerFn.stack);

    _chart.plotData = function () {};

    _chart.fadeDeselectedArea = function () {};

    _chart.extendBrush = function () {
        var extent = _chart.brush().extent();
        if (_chart.round() && (!_centerBar || _alwaysUseRounding)) {
            _chart.chartBodyG().select('.brush')
                .call(_chart.brush().extent(extent.map(_chart.round())));
        }
        return extent;
    };

    function colorFilter(color, inv) {
        return function () {
            var match = d3.select(this).attr('fill') === color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if (!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('rect.bar')
                .classed('highlight', colorFilter(d.color))
                .classed('fadeout', colorFilter(d.color, true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('rect.bar')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart, 'xAxisMax', function () {
        var max = this._xAxisMax();
        if ('resolution' in _chart.xUnits()) {
            var res = _chart.xUnits().resolution;
            max += res;
        }
        return max;
    });

    return _chart.anchor(parent, chartGroup);
};

dc.barChart.layerFn = {
    standard: dc.layerMixin.layerFunctor(function (chart, data) {
        data = dc.layerMixin.dataFn.standard(chart, data);
        var xAxisExtent = d3.extent(data, dc.pluck('key')),
            yAxisExtent = d3.extent(data, dc.pluck('values'));
        return {
            data: data,
            xAxisMax: xAxisExtent[0] || 0,
            xAxisMin: xAxisExtent[1] || 0,
            yAxisMax: yAxisExtent[0] || 0,
            yAxisMin: yAxisExtent[1] || 0,
            prepare: function () {
                var _x = chart.x(),
                    _y = chart.y(),
                    bWidth = chart.width() / data.length;
                return data.map(function (datum) {
                    var x = _x(datum.key),
                        y = _y(datum.values);
                    return {
                        key: datum.key,
                        value: datum.values,
                        x: x,
                        y: y,
                        width: x + bWidth,
                        height: chart.height() - y
                    };
                });
            }
        };
    }),
    group: dc.layerMixin.layerFunctor(function (chart, data) {
        var standardData = dc.layerMixin.dataFn.standard(chart, data),
            xAxisExtent = d3.extent(standardData, dc.pluck('key')),
            yAxisExtent = d3.extent(standardData, dc.pluck('values'));
        data = dc.layerMixin.dataFn.layered(chart, data);
        var totalLayers = d3.max(data, function (datum) {
            return datum.values.length;
        });
        return {
            data: data,
            xAxisMax: xAxisExtent[0] || 0,
            xAxisMin: xAxisExtent[1] || 0,
            yAxisMax: yAxisExtent[0] || 0,
            yAxisMin: yAxisExtent[1] || 0,
            prepare: function () {
                var _x = chart.x(),
                    _y = chart.y(),
                    bWidth = chart.width() / (data.length * totalLayers);
                return data.reduce(function (previous, datum) {
                    return previous.concat(datum.values.map(function (layerDatum) {
                        var x = _x(datum.key),
                            y = _y(layerDatum.values);
                        return {
                            key: datum.key,
                            layer: layerDatum.key,
                            value: layerDatum.values,
                            x: x,
                            y: y,
                            width: x + bWidth,
                            height: chart.height() - y
                        };
                    }));
                }, []);
            }
        };
    }),
    // {key: 'a', values:[{key: 'x', values: 1}, {key: 'y', values: 2}]}
    stack: dc.layerMixin.layerFunctor(function (chart, data) {
        data = dc.layerMixin.dataFn.layered(chart, data);
        var xAxisExtent = d3.extent(data, dc.pluck('key'));
        var yAxisMax = data.reduce(function (extent, datum) {
            var sum = d3.sum(datum.values, dc.pluck('values'));
            return Math.max(extent[1], sum);
        }, 0);
        return {
            data: data,
            xAxisMax: xAxisExtent[0] || 0,
            xAxisMin: xAxisExtent[1] || 0,
            yAxisMax: yAxisMax,
            yAxisMin: 0,
            prepare: function () {
                var _x = chart.x(),
                    _y = chart.y(),
                    bWidth = chart.width() / data.length;
                return data.reduce(function (previous, datum) {
                    var x = _x(datum.key);
                    return previous.concat(datum.values.reduce(function (previous, layerDatum, i) {
                        var y = _y(layerDatum.values),
                            yP = i !== 0 ? previous[i].y : 0;
                        return {
                            key: datum.key,
                            layer: layerDatum.key,
                            value: layerDatum.values,
                            x: x,
                            y: y,
                            width: x + bWidth,
                            height: chart.height() - (y - yP)
                        };
                    }, []));
                }, []);
            }
        };
    }),
    stack100: dc.layerMixin.layerFunctor(function (chart, data) {
        data = dc.layerMixin.dataFn.layered(chart, data);
        var xAxisExtent = d3.extent(data, dc.pluck('key'));
        return {
            data: data,
            xAxisMax: xAxisExtent[0] || 0,
            xAxisMin: xAxisExtent[1] || 0,
            yAxisMax: 1,
            yAxisMin: 0,
            prepare: function () {
                var _x = chart.x(),
                    _y = chart.y(),
                    bWidth = chart.width() / data.length;
                return data.reduce(function (previous, datum) {
                    var x = _x(datum.key);
                    var total = d3.sum(datum.values, dc.pluck('values'));
                    return previous.concat(datum.values.reduce(function (previous, layerDatum, i) {
                        var y = _y(layerDatum.values / total),
                            yP = i !== 0 ? previous[i].y : 0;
                        return {
                            key: datum.key,
                            layer: layerDatum.key,
                            value: layerDatum.values,
                            x: x,
                            y: y,
                            width: x + bWidth,
                            height: chart.height() - (y - yP)
                        };
                    }, []));
                }, []);
            }
        };
    }),
};