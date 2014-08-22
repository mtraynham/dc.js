/**
## Bar Chart
Includes: [Stack Mixin](#stack Mixin), [Coordinate Grid Mixin](#coordinate-grid-mixin)

Concrete bar chart/histogram implementation.

Examples:

* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)
* [Canadian City Crime Stats](http://dc-js.github.com/dc.js/crime/index.html)
#### dc.barChart(parent[, chartGroup])
Create a bar chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection | compositeChart - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
 If the bar chart is a sub-chart in a [Composite Chart](#composite-chart) then pass in the parent composite
 chart instance.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created bar chart instance

```js
// create a bar chart under #chart-container1 element using the default global chart group
var chart1 = dc.barChart('#chart-container1');
// create a bar chart under #chart-container2 element using chart group A
var chart2 = dc.barChart('#chart-container2', 'chartGroupA');
// create a sub-chart under a composite parent chart
var chart3 = dc.barChart(compositeChart);
```

**/
dc.barChart = function (parent, chartGroup) {
    var DEFAULT_GAP_BETWEEN_BARS = 2,
        MIN_BAR_WIDTH = 1;

    var _chart = dc.layerMixin(dc.coordinateGridMixin({}));

    var _alwaysUseRounding = false,
        _barWidth = null,
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

    dc.override(_chart, 'rescale', function () {
        _chart._rescale();
        _barWidth = undefined;
    });

    dc.override(_chart, 'render', function () {
        if (_chart.round() && _centerBar && !_alwaysUseRounding) {
            dc.logger.warn('By default, brush rounding is disabled if bars are centered. ' +
                         'See dc.js bar chart API documentation for details.');
        }
        _chart._render();
    });

    _chart.plotData = function () {
        function barHeight(d) {
            return dc.utils.safeNumber(Math.abs(_chart.y()(d.y + d.y0) - _chart.y()(d.y0)));
        }

        var layers = _chart.chartBodyG().selectAll('g.stack')
            .data(_chart.data());

        // Calculate bar width
        if (_barWidth === undefined) {
            var numberOfBars = _chart.xUnitCount();

            // please can't we always use rangeBands for bar charts?
            if (_chart.isOrdinal() && _gap === undefined) {
                _barWidth = Math.floor(_chart.x().rangeBand());
            } else if (_gap) {
                _barWidth = Math.floor((_chart.xAxisLength() - (numberOfBars - 1) * _gap) / numberOfBars);
            } else {
                _barWidth = Math.floor(_chart.xAxisLength() / (1 + _chart.barPadding()) / numberOfBars);
            }
            if (_barWidth === Infinity || isNaN(_barWidth) || _barWidth < MIN_BAR_WIDTH) {
                _barWidth = MIN_BAR_WIDTH;
            }
        }

        layers
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return 'stack ' + '_' + i;
            });

        layers.each(function (d) {
            var layer = d3.select(this);

            // Render bars
            var bars = layer.selectAll('rect.bar')
                .data(d.values, dc.pluck('x'));
            var enter = bars.enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('fill', dc.pluck('data', _chart.getColor))
                .attr('height', 0);

            if (_chart.renderTitle()) {
                enter.append('title').text(dc.pluck('data', _chart.title(d.name)));
            }

            if (_chart.isOrdinal()) {
                bars.on('click', function (d) { _chart.onClick(d.data); });
            }

            dc.transition(bars, _chart.transitionDuration())
                .attr('x', function (d) {
                    var x = _chart.x()(d.x);
                    if (_centerBar) {
                        x -= _barWidth / 2;
                    }
                    if (_chart.isOrdinal() && _gap !== undefined) {
                        x += _gap / 2;
                    }
                    return dc.utils.safeNumber(x);
                })
                .attr('y', function (d) {
                    var y = _chart.y()(d.y + d.y0);

                    if (d.y < 0) {
                        y -= barHeight(d);
                    }
                    return dc.utils.safeNumber(y);
                })
                .attr('width', _barWidth)
                .attr('height', function (d) {
                    return barHeight(d);
                })
                .attr('fill', dc.pluck('data', _chart.getColor))
                .select('title').text(dc.pluck('data', _chart.title(d.name)));

            dc.transition(bars.exit(), _chart.transitionDuration())
                .attr('height', 0)
                .remove();
        });
    };

    _chart.fadeDeselectedArea = function () {
        var bars = _chart.chartBodyG().selectAll('rect.bar'),
            extent = _chart.brush().extent();

        if (_chart.isOrdinal()) {
            if (_chart.hasFilter()) {
                bars.classed(dc.constants.SELECTED_CLASS, function (d) { return _chart.hasFilter(d.x); });
                bars.classed(dc.constants.DESELECTED_CLASS, function (d) { return !_chart.hasFilter(d.x); });
            } else {
                bars.classed(dc.constants.SELECTED_CLASS, false);
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        } else {
            if (!_chart.brushIsEmpty(extent)) {
                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    return d.x < extent[0] || d.x >= extent[1];
                });
            } else {
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        }
    };

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
    group: function (data) {
        return data;
    },
    stack: function (data) {
        return data;
    }
};