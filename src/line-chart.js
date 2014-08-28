dc.lineChart = function (parent, chartGroup) {
    var DEFAULT_DOT_RADIUS = 5,
        DEFAULT_DOT_OPACITY = 1e-6;

    var _chart = dc.layerMixin(dc.coordinateGridMixin({})),
        _renderArea = false,
        _dotRadius = DEFAULT_DOT_RADIUS,
        _dataPointRadius = null,
        _dataPointFillOpacity = DEFAULT_DOT_OPACITY,
        _dataPointStrokeOpacity = DEFAULT_DOT_OPACITY,
        _interpolate = 'linear',
        _tension = 0.7,
        _defined,
        _dashStyle,
        _safePath = function (d) { return (!d || d.indexOf('NaN') >= 0) ? 'M0,0' : d; };

    _chart.transitionDuration(500);
    _chart._rangeBandPadding(1);

    /**
     #### .interpolate([value])
     Gets or sets the interpolator to use for lines drawn, by string name, allowing e.g. step
     functions, splines, and cubic interpolation.  This is passed to
     [d3.svg.line.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate) and
     [d3.svg.area.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_interpolate),
     where you can find a complete list of valid arguments
     **/
    _chart.interpolate = function (_) {
        if (!arguments.length) {
            return _interpolate;
        }
        _interpolate = _;
        return _chart;
    };

    /**
     #### .tension([value]) Gets or sets the tension to use for lines drawn, in the range 0 to 1.
     This parameter further customizes the interpolation behavior.  It is passed to
     [d3.svg.line.tension](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_tension) and
     [d3.svg.area.tension](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_tension).  Default:
     0.7
     **/
    _chart.tension = function (_) {
        if (!arguments.length) {
            return _tension;
        }
        _tension = _;
        return _chart;
    };

    /**
     #### .defined([value])
     Gets or sets a function that will determine discontinuities in the line which should be
     skipped: the path will be broken into separate subpaths if some points are undefined.
     This function is passed to
     [d3.svg.line.defined](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined)

     Note: crossfilter will sometimes coerce nulls to 0, so you may need to carefully write
     custom reduce functions to get this to work, depending on your data. See
     https://github.com/dc-js/dc.js/issues/615#issuecomment-49089248
     **/
    _chart.defined = function (_) {
        if (!arguments.length) {
            return _defined;
        }
        _defined = _;
        return _chart;
    };

    /**
    #### .dashStyle([array])
    Set the line's d3 dashstyle. This value becomes the 'stroke-dasharray' of line. Defaults to empty
    array (solid line).
     ```js
     // create a Dash Dot Dot Dot
     chart.dashStyle([3,1,1,1]);
     ```
    **/
    _chart.dashStyle = function (_) {
        if (!arguments.length) {
            return _dashStyle;
        }
        _dashStyle = _;
        return _chart;
    };

    /**
    #### .renderArea([boolean])
    Get or set render area flag. If the flag is set to true then the chart will render the area
    beneath each line and the line chart effectively becomes an area chart.

    **/
    _chart.renderArea = function (_) {
        if (!arguments.length) {
            return _renderArea;
        }
        _renderArea = _;
        return _chart;
    };

    /**
    #### .dotRadius([dotRadius])
    Get or set the radius (in px) for dots displayed on the data points. Default dot radius is 5.
    **/
    _chart.dotRadius = function (_) {
        if (!arguments.length) {
            return _dotRadius;
        }
        _dotRadius = _;
        return _chart;
    };

    _chart.dataPointRadius = function (_) {
        if (!arguments.length) {
            return _dataPointRadius;
        }
        _dataPointRadius = _ || 2;
        return _chart;
    };

    _chart.dataPointFillOpacity = function (_) {
        if (!arguments.length) {
            return _dataPointFillOpacity;
        }
        _dataPointFillOpacity = _ || 0.8;
        return _chart;
    };

    _chart.dataPointStrokeOpacity = function (_) {
        if (!arguments.length) {
            return _dataPointStrokeOpacity;
        }
        _dataPointStrokeOpacity = _ || 0.8;
        return _chart;
    };

    _chart.plotData = function () {
        var g = _chart.chartBodyG(),
            data = _chart.layerFn().data,
            chartSpec = _chart.layerFn().render(_chart, g);

        // Layers
        var layers = g.selectAll('g.layer')
            .data(data, function (datum) {
                return datum.key;
            }),
            layersEnter = layers.enter()
                .append('g')
                .attr('class', 'layer');

        // Lines
        layersEnter.append('path')
            .attr('class', 'line');
        dc.transition(layers.select('path.line'), _chart.transitionDuration())
            .attr('stroke', _chart.getColor)
            .attr('stroke-dasharray', _dashStyle || '')
            .attr('d', function (d) {
                return _safePath(chartSpec.line(d.values));
            });

        // Area
        layersEnter.append('path')
            .attr('class', 'area');
        dc.transition(layers.select('path.area'), _chart.transitionDuration())
            .attr('fill', _chart.getColor)
            .attr('d', function (d) { return _safePath(chartSpec.area(d.values)); });

        layers.exit().remove();

        // Points
        var dots = g.selectAll('circle')
            .data(data, function (datum) {
                return datum.key + datum.layer || '';
            });
        dots.enter()
            .append('circle')
            .on('mousemove', function () {
                d3.select(this)
                    .attr('r', _dotRadius)
                    .style('fill-opacity', 0.8)
                    .style('stroke-opacity', 0.8);
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('r', _dataPointRadius)
                    .style('fill-opacity', _dataPointFillOpacity)
                    .style('stroke-opacity', _dataPointStrokeOpacity);
            })
            .append('title').text(_chart.title());
        dc.transition(dots, _chart.transitionDuration())
            .attr('cx', function (d) { return dc.utils.safeNumber(_chart.x()(d.x)); })
            .attr('cy', function (d) { return dc.utils.safeNumber(_chart.y()(d.y + d.y0)); })
            .attr('r', _dataPointRadius)
            .attr('fill', _chart.getColor)
            .style('fill-opacity', _dataPointFillOpacity)
            .style('stroke-opacity', _dataPointStrokeOpacity);
        dots.exit().remove();
    };

    function colorFilter(color, dashstyle, inv) {
        return function () {
            var item = d3.select(this);
            var match = (item.attr('stroke') === color &&
                item.attr('stroke-dasharray') === ((dashstyle instanceof Array) ?
                    dashstyle.join(',') : null)) || item.attr('fill') === color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if (!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('path.line, path.area')
                .classed('highlight', colorFilter(d.color, d.dashstyle))
                .classed('fadeout', colorFilter(d.color, d.dashstyle, true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('path.line, path.area')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart, 'legendables', function () {
        var legendables = _chart._legendables();
        if (!_dashStyle) {
            return legendables;
        }
        return legendables.map(function (l) {
            l.dashstyle = _dashStyle;
            return l;
        });
    });

    return _chart.anchor(parent, chartGroup);
};

dc.lineChart.layerFn = {
    standard: dc.layerMixin.layerFunctor(function (chart, data) {
        var standard = dc.layerMixin.dataFn.standard(chart, data),
            xAxisExtent = d3.extent(standard, dc.pluck('key'));
        data = dc.layerMixin.dataFn.layer(chart, data);
        var yAxisExtent = data.reduce(function (extent, datum) {
            var extentP = d3.extent(datum.values, dc.pluck('values'));
            return [Math.min(extent[0], extentP[0]), Math.max(extent[1], extentP[1])];
        }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
        return {
            data: data,
            xAxisMin: xAxisExtent[0] || 0,
            xAxisMax: xAxisExtent[1] || 0,
            yAxisMin: yAxisExtent[0] === Number.POSITIVE_INFINITY ? 0 : yAxisExtent[0],
            yAxisMax: yAxisExtent[1] === Number.NEGATIVE_INFINITY ? 0 : yAxisExtent[1],
            render: function (chart) {
                var _x = chart.x(),
                    _y = chart.y(),
                    _y0 = _y(0),
                    _line = d3.svg.line()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension()),
                    _area = d3.svg.area()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values); })
                        .y0(_y0)
                        .interpolate(chart.interpolate())
                        .tension(chart.tension());
                if (chart.defined()) {
                    _line.defined(chart.defined());
                    _area.defined(chart.defined());
                }
                return {
                    line: _line,
                    area: _area
                };
            }
        };
    }),
    stack: dc.layerMixin.layerFunctor(function (chart, data) {
        var xAxisExtent = d3.extent(dc.layerMixin.dataFn.standard(chart, data), dc.pluck('key'));
        data = dc.layerMixin.dataFn.layer(chart, data);
        var keyMap = {};
        data = data.map(function (datum) {
            return {
                key: datum.key,
                values: datum.values.reduce(function (previous, keyDatum) {
                    var key = keyDatum.key;
                    previous.push({
                        key: keyDatum.key,
                        values0: keyMap[key] = keyMap[key] || 0,
                        values1: keyMap[key] += keyDatum.values
                    });
                    return previous;
                }, [])
            };
        });
        var yAxisMax = 0;
        for (var key in keyMap) {
            yAxisMax = Math.max(keyMap[key], yAxisMax);
        }
        return {
            data: data,
            xAxisMin: xAxisExtent[0] || 0,
            xAxisMax: xAxisExtent[1] || 0,
            yAxisMin: 0,
            yAxisMax: yAxisMax || 0,
            render: function (chart) {
                var _x = chart.x(),
                    _y = chart.y(),
                    _line = d3.svg.line()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension()),
                    _area = d3.svg.area()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .y0(function (d) { return _y(d.values0); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension());
                if (chart.defined()) {
                    _line.defined(chart.defined());
                    _area.defined(chart.defined());
                }
                return {
                    line: _line,
                    area: _area
                };
            }
        };
    }),
    stack100: dc.layerMixin.layerFunctor(function (chart, data) {
        var xAxisExtent = d3.extent(dc.layerMixin.dataFn.standard(chart, data), dc.pluck('key'));
        data = dc.layerMixin.dataFn.layer(chart, data);
        var keyMap = {};
        data = data.map(function (datum) {
            return {
                key: datum.key,
                values: datum.values.reduce(function (previous, keyDatum) {
                    var key = keyDatum.key;
                    previous.push({
                        key: keyDatum.key,
                        values0: keyMap[key] = keyMap[key] || 0,
                        values1: keyMap[key] += keyDatum.values
                    });
                    return previous;
                }, [])
            };
        });
        data.forEach(function (datum) {
            datum.values.forEach(function (datumValues) {
                var total = keyMap[datumValues.key];
                if (total) {
                    datumValues.values0 /= total;
                    datumValues.values1 /= total;
                }
            });
        });
        return {
            data: data,
            xAxisMin: xAxisExtent[0] || 0,
            xAxisMax: xAxisExtent[1] || 0,
            yAxisMin: 0,
            yAxisMax: 1,
            render: function (chart) {
                var _x = chart.x(),
                    _y = chart.y(),
                    _line = d3.svg.line()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension()),
                    _area = d3.svg.area()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .y0(function (d) { return _y(d.values0); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension());
                if (chart.defined()) {
                    _line.defined(chart.defined());
                    _area.defined(chart.defined());
                }
                return {
                    line: _line,
                    area: _area
                };
            }
        };
    }),
    area: dc.layerMixin.layerFunctor(function (chart, data) {
        var standard = dc.layerMixin.dataFn.standard(chart, data),
            xAxisExtent = d3.extent(standard, dc.pluck('key'));
        data = dc.layerMixin.dataFn.key(chart, data);
        var dataAndYAxisExtent = data.reduce(function (previous, datum) {
                var extent = d3.extent(datum.values, dc.pluck('values'));
                previous[0].push({
                    key: datum.key,
                    values0: extent[1] || 0,
                    values1: extent[0] || 0
                });
                previous[1].push({
                    key: datum.key,
                    values0: extent[0] || 0,
                    values1: extent[1] || 0
                });
                previous[2].push({
                    key: datum.key,
                    values1: extent[1] || 0 - extent[0] || 0
                });
                previous[3] = [Math.min(extent[0], previous[3][0]), Math.max(extent[1], previous[3][1])];
                return previous;
            }, [[], [], [], [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]]);
        return {
            data: [
                {key: 'max', values: dataAndYAxisExtent[0]},
                {key: 'min', values: dataAndYAxisExtent[1]},
                {key: 'mid', values: dataAndYAxisExtent[2]}
            ],
            xAxisMin: xAxisExtent[0] || 0,
            xAxisMax: xAxisExtent[1] || 0,
            yAxisMin: dataAndYAxisExtent[3][0] === Number.POSITIVE_INFINITY ? 0 : dataAndYAxisExtent[3][0],
            yAxisMax: dataAndYAxisExtent[3][1] === Number.NEGATIVE_INFINITY ? 0 : dataAndYAxisExtent[3][1],
            render: function (chart) {
                var _x = chart.x(),
                    _y = chart.y(),
                    _line = d3.svg.line()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension()),
                    _area = d3.svg.area()
                        .x(function (d) { return _x(d.key); })
                        .y(function (d) { return _y(d.values1); })
                        .y0(function (d) { return _y(d.values0); })
                        .interpolate(chart.interpolate())
                        .tension(chart.tension());
                if (chart.defined()) {
                    _line.defined(chart.defined());
                    _area.defined(chart.defined());
                }
                return {
                    line: _line,
                    area: _area
                };
            }
        };
    })
};