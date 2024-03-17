import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data || data.length === 0) return;

        // Define chart config
        const cfg = {
            w: 600, // Width of the circle
            h: 600, // Height of the circle
            margin: { top: 20, right: 20, bottom: 20, left: 20 }, // The margins of the SVG
            levels: 5, // How many levels or inner circles
            maxValue: 0, // What is the value that the biggest circle will represent
            labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
            wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
            opacityArea: 0.35, // The opacity of the area of the blob
            dotRadius: 4, // The size of the colored circles of each blog
            opacityCircles: 0.1, // The opacity of the circles of each blob
            strokeWidth: 2, // The width of the stroke around each blob
            roundStrokes: true, // If true the area and stroke will follow a round path (cardinal-closed)
            color: d3.scaleOrdinal(d3.schemeCategory10), // Color function
            format: '.2%',
            unit: '',
            yAxisLabel: '',
            xAxisLabel: '',
        };

        // Remove the previous chart before drawing
        d3.select(chartRef.current).select("svg").remove();

        const allAxis = data[0].map((el, i) => el.axis), //Names of each axis
            total = allAxis.length, //The number of different axes
            radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
            Format = d3.format(cfg.format), //Formatting
            angleSlice = Math.PI * 2 / total; //The width in radians of each "slice"

        // Create the container SVG and g 
        let svg = d3.select(chartRef.current).append("svg")
            .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
            .attr("class", "radar" + chartRef.current);
        let g = svg.append("g")
            .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");

        // Glow filter for some extra pizzazz
        let filter = g.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Create the radial lines
        let axisGrid = g.append("g").attr("class", "axisWrapper");
        axisGrid.selectAll(".levels")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", d => radius / cfg.levels * d)
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter", "url(#glow)");

        // Text indicating at what % each level is
        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", d => -d * radius / cfg.levels)
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#737373")
            .text(d => Format(cfg.maxValue * d / cfg.levels) + cfg.unit);

        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        //Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d, i) => radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d)
            .call(wrap, cfg.wrapWidth);

        // The radar chart function is here...

        // Wrap SVG text - taken from http://bl.ocks.org/mbostock/7555321
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }
    }, [data]);

    return <div ref={chartRef} />;
};

export default RadarChart;
