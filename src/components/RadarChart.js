import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {

    console.log(data, "RADAR")
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Make sure each player has seasonAverages data
        const playersWithSeasonAverages = data.filter(player => player.seasonAverages);

        if (playersWithSeasonAverages.length === 0) return; // Exit if no player has

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

        // Since statsToShow are static, you might consider adjusting maxValue based on the actual data.
        const statsToShow = ['pts', 'ast', 'reb', 'stl', 'blk'];

        // Prepare the data for the radar chart
        const preparedData = data.map(player => {
            // Check if seasonAverages exists and is an object; otherwise, use an empty object as fallback
            const averages = player.seasonAverages || {};

            return {
                name: player.name,
                // Use .map() to transform each statToShow into a { axis, value } object
                axes: statsToShow.map(stat => ({
                    axis: stat,
                    value: averages[stat] !== undefined ? averages[stat] : 0
                }))
            };
        });

        console.log(data, "PREPARED")

        // Ensure maxValue considers actual data values directly from playersWithSeasonAverages
        cfg.maxValue = Math.max(...playersWithSeasonAverages.flatMap(player =>
            statsToShow.map(stat => player.seasonAverages[stat] || 0)
        ));
        const allAxis = statsToShow,
            total = allAxis.length,
            radius = Math.min(cfg.w / 2, cfg.h / 2),
            Format = d3.format(cfg.format),
            angleSlice = Math.PI * 2 / total;

        // Then proceed with creating the radar chart as before...
        // Create the container SVG and g 
        let svg = d3.select(chartRef.current).append("svg")
            .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
            .attr("class", "radar");
        let g = svg.append("g")
            .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");

        // Glow filter for some extra pizzazz
        let filter = g.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Create the radial lines
        // Adjust the circle, line, and text styles for better visibility
        let axisGrid = g.append("g").attr("class", "axisWrapper");
        axisGrid.selectAll(".levels")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", d => radius / cfg.levels * d)
            .style("fill", "none") // No fill to ensure the dark background shows through
            .style("stroke", "#FFF") // White lines for contrast
            .style("stroke-opacity", 0.75) // Slightly transparent for a subtler effect
            .style("stroke-width", "0.5px") // Thinner lines for a finer grid
            .style("filter", "url(#glow)");

        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", d => -d * radius / cfg.levels)
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#FFF") // White text for readability
            .text(d => Format(cfg.maxValue * d / cfg.levels) + cfg.unit);

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
            .style("stroke", "#FFF") // White for visibility
            .style("stroke-width", "2px");

        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d, i) => radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d)
            .attr("fill", "#FFF") // White text for labels
            .call(wrap, cfg.wrapWidth);

        // The key part: converting each player's data into radar chart-friendly format

        const maxValues = {};
        statsToShow.forEach(stat => {
            maxValues[stat] = Math.max(...playersWithSeasonAverages.map(player => player.seasonAverages[stat] || 0));
        });
        // Now prepare the radar chart data with normalized values
        const radarData = playersWithSeasonAverages.map(player => {
            return {
                name: player.name,
                axes: statsToShow.map(stat => {
                    // Normalize the value to be between 0 and 100
                    const value = (player.seasonAverages[stat] || 0) / (maxValues[stat] || 1) * 100;
                    return { axis: stat, value: Math.round(value) }; // Round the value for better readability
                })
            };
        });

        // Drawing radar areas for each player
        radarData.forEach((playerData, i) => {
            const radarLine = d3.radialLine()
                .curve(d3.curveLinearClosed)
                .radius(d => d.value * radius / 100) // Scale the radius according to the value
                .angle((d, i) => i * angleSlice);

            const color = cfg.color(i); // Use the predefined color scale

            // Draw the radar area
            g.selectAll(".radarArea" + i)
                .data([playerData.axes])
                .enter()
                .append("path")
                .attr("class", "radarArea" + i)
                .attr("d", radarLine)
                .style("fill", color)
                .style("fill-opacity", cfg.opacityArea)
            // Add more styling and transitions as needed

        });

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
