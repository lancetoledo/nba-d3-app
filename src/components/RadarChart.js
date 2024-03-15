import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, dimensions }) => {
    const chartRef = useRef(null);
    const cfg = {
        radius: 5,
        w: dimensions.width,
        h: dimensions.height,
        factor: 1,
        factorLegend: 0.85,
        levels: 3,
        maxValue: 0.6,
        radians: 2 * Math.PI,
        opacityArea: 0.5,
        ToRight: 5,
        TranslateX: 80,
        TranslateY: 30,
        ExtraWidthX: 100,
        ExtraWidthY: 100,
        color: d3.scaleOrdinal(d3.schemeCategory10),
    };

    useEffect(() => {
        drawRadarChart();
    }, [data]); // Redraw chart when data changes

    const drawRadarChart = () => {
        const allAxis = (data[0].map((i, j) => i.axis)), // Names of each axis
            total = allAxis.length,                    // The number of different axes
            radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2), // The radius of the outermost circle
            Format = d3.format('%'),                  // Percentage formatting
            angleSlice = cfg.radians / total;         // The width in radians of each "slice"

        // Remove whatever chart with the same id/class was present before
        d3.select(chartRef.current).select("svg").remove();

        // Initiate the radar chart SVG
        let svg = d3.select(chartRef.current).append("svg")
            .attr("width", cfg.w + cfg.ExtraWidthX)
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .attr("class", "radar" + chartRef.current);
        let g = svg.append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        // Filter for the outside glow
        let filter = g.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Circular segments
        for (let j = 0; j < cfg.levels; j++) {
            let levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", (d, i) => levelFactor * (1 - cfg.factor * Math.sin(i * angleSlice)))
                .attr("y1", (d, i) => levelFactor * (1 - cfg.factor * Math.cos(i * angleSlice)))
                .attr("x2", (d, i) => levelFactor * (1 - cfg.factor * Math.sin((i + 1) * angleSlice)))
                .attr("y2", (d, i) => levelFactor * (1 - cfg.factor * Math.cos((i + 1) * angleSlice)))
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
        }

        // Text indicating at what % each level is
        for (let j = 0; j < cfg.levels; j++) {
            let levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data([1]) //dummy data
                .enter()
                .append("svg:text")
                .attr("x", d => levelFactor * (1 - cfg.factor * Math.sin(0)))
                .attr("y", d => levelFactor * (1 - cfg.factor * Math.cos(0)))
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
                .attr("fill", "#737373")
                .text(Format((j + 1) * cfg.maxValue / cfg.levels));
        }

        // The radial line function
        const radarLine = d3.radialLine()
            .curve(d3.curveLinearClosed)
            .radius(d => d.value)
            .angle((d, i) => i * angleSlice);

        let blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");

        // Append the backgrounds    
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", d => radarLine(d))
            .style("fill", (d, i) => cfg.color(i))
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d, i) {
                // Dim all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                // Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            .on('mouseout', () => {
                // Bring back all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });

        // Create the outlines   
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", d => radarLine(d))
            .style("stroke-width", "2px")
            .style("stroke", (d, i) => cfg.color(i))
            .style("fill", "none")
            .style("filter", "url(#glow)");

        // Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(d => d)
            .enter()
            .append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.radius)
            .attr("cx", (d, i) => cfg.w / 2 * (1 - (parseFloat(Math.max(d.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)))
            .attr("cy", (d, i) => cfg.h / 2 * (1 - (parseFloat(Math.max(d.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total)))
            .style("fill", (d, i, j) => cfg.color(j))
            .style("fill-opacity", 0.9);

        //Append the labels at each axis
        let axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        axis.append("line")
            .attr("x1", cfg.w / 2)
            .attr("y1", cfg.h / 2)
            .attr("x2", (d, i) => cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)))
            .attr("y2", (d, i) => cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)))
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(d => d)
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", "translate(0, -10)")
            .attr("x", (d, i) => cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total))
            .attr("y", (d, i) => cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total));
    };

    return <div ref={chartRef} />;
};

export default RadarChart;
