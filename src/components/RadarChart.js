import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {

    // console.log(data, "RADAR")
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


        // Find the highest value from all the players' stats to set as maxValue
        cfg.maxValue = Math.max(...playersWithSeasonAverages.flatMap(player =>
            statsToShow.map(stat => player.seasonAverages[stat] || 0)
        ));
        const allAxis = statsToShow,
            total = allAxis.length,
            radius = Math.min(cfg.w / 2, cfg.h / 2) - 50, // Leave space for labels
            Format = d3.format(cfg.format),
            angleSlice = Math.PI * 2 / total;

        // Then proceed with creating the radar chart as before...
        // Create the container SVG and g 
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
            .text(d => d3.format(cfg.format)(d / cfg.levels)); // Use d3.format to apply percentage formatting

        //Create the straight lines radiating outward from the center
        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        // Check if the radius calculation and positioning logic are correct
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        // Append the labels at each axis
        // Adjust the 'labelFactor' if necessary to ensure labels appear within the SVG
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d, i) => radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d.toUpperCase()) // Ensure text is uppercase for consistency
            .call(wrap, cfg.wrapWidth);



        // The key part: converting each player's data into radar chart-friendly format

        // Find the highest value for each stat to set as maxValue for that stat
        const maxValues = statsToShow.reduce((acc, stat) => {
            acc[stat] = Math.max(...playersWithSeasonAverages.map(player => player.seasonAverages[stat] || 0));
            return acc;
        }, {});

        // ... RadarChart.js contents before this code remain unchanged ...

        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        // Check if the radius calculation and positioning logic are correct
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        // Append the labels at each axis
        // Adjust the 'labelFactor' if necessary to ensure labels appear within the SVG
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d, i) => radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d.toUpperCase()) // Ensure text is uppercase for consistency
            .call(wrap, cfg.wrapWidth);

        // ... Code to draw radar areas ...

        // Correct the normalization of values
        // Make sure to calculate the maxValue correctly as the highest value from the data
        cfg.maxValue = Math.max(cfg.maxValue, ...playersWithSeasonAverages.flatMap(player =>
            statsToShow.map(stat => player.seasonAverages[stat] || 0)
        ));

        // Normalize the data
        // Normalize the data for each stat against its max value
        // const radarData = playersWithSeasonAverages.map(player => ({
        //     name: player.name,
        //     axes: statsToShow.map(stat => {
        //         const value = player.seasonAverages[stat] || 0;
        //         // Ensure that the value doesn't exceed 100% after normalization
        //         const normalizedValue = Math.min((value / maxValues[stat]) * 100, 100);
        //         return {
        //             axis: stat,
        //             value: normalizedValue
        //         };
        //     })
        // }));

        // Use percentile ranks for normalization
        // This would require you to have or calculate the percentile rank for each stat for each player
        const radarDataPercentiles = playersWithSeasonAverages.map(player => ({
            name: player.name,
            axes: statsToShow.map(stat => {
                const percentileRank = player?.percentileRanks[stat] || 0; // Assuming you have percentile ranks data

                return {
                    axis: stat,
                    value: percentileRank // Use the percentile rank directly
                };
            })
        }));


        // Calculate the scale factor based on the number of stats
        const radarChartScaleFactor = Math.sqrt(statsToShow.length) / Math.sqrt(5); // Base number of stats is 5
        const scaledRadius = radius / radarChartScaleFactor;

        // Draw the radar areas for each player using percentile ranks
        radarDataPercentiles.forEach((playerData, i) => {
            const radarLine = d3.lineRadial()
                .curve(d3.curveLinearClosed)
                .radius(d => d.value * scaledRadius / 100) // Use the scaled radius
                .angle((d, i) => i * angleSlice);

            // Append the radar area paths
            g.selectAll(".radarArea" + i)
                .data([playerData.axes])
                .enter()
                .append("path")
                .attr("class", "radarArea" + i)
                .attr("d", radarLine)
                .style("fill", cfg.color(i))
                .style("fill-opacity", cfg.opacityArea);
        });


        // // Draw the radar areas for each player using normalized values
        // radarData.forEach((playerData, i) => {
        //     // Use d3.lineRadial which is the updated method in D3 v5+
        //     const radarLine = d3.lineRadial()
        //         .curve(d3.curveLinearClosed)
        //         .radius(d => d.value * radius / 100) // Use the normalized value for the radius
        //         .angle((d, i) => i * angleSlice);

        //     // Append the radar area paths
        //     g.selectAll(".radarArea" + i)
        //         .data([playerData.axes])
        //         .enter()
        //         .append("path")
        //         .attr("class", "radarArea" + i)
        //         .attr("d", radarLine)
        //         .style("fill", cfg.color(i))
        //         .style("fill-opacity", cfg.opacityArea);
        // });





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
