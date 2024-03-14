import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const margin = { top: 20, right: 30, bottom: 60, left: 40 },
                width = 800 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            const chart = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1)
                .domain(data.map(d => d.name));

            const x1 = d3.scaleBand()
                .padding(0.05)
                .domain(['pts', 'ast', 'reb'])
                .rangeRound([0, x0.bandwidth()]);

            const y = d3.scaleLinear()
                .rangeRound([height, 0])
                .domain([0, d3.max(data, d => d.seasonAverages ? Math.max(d.seasonAverages.pts || 0, d.seasonAverages.ast || 0, d.seasonAverages.reb || 0) : 0)]);

            chart.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x0))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            chart.append("g")
                .call(d3.axisLeft(y).ticks(null, "s"));

            const color = d3.scaleOrdinal()
                .range(["#1f77b4", "#ff7f0e", "#2ca02c"])
                .domain(['pts', 'ast', 'reb']);

            const barsGroup = chart.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("transform", d => `translate(${x0(d.name)},0)`);

            barsGroup.selectAll("rect")
                .data(d => ['pts', 'ast', 'reb'].map(key => ({ key, value: d.seasonAverages && d.seasonAverages[key] ? d.seasonAverages[key] : 0 })))
                .enter().append("rect")
                .attr("x", d => x1(d.key))
                .attr("width", x1.bandwidth())
                .attr("fill", d => color(d.key))
                // Initialize y and height for the animation
                .attr("y", height)
                .attr("height", 0)
                // Animate bars
                .transition().duration(750)
                .attr("y", d => y(d.value))
                .attr("height", d => height - y(d.value));

            // Add labels for each bar for PTS, AST, REB
            barsGroup.selectAll(null)
                .data(d => ['pts', 'ast', 'reb'].map(key => ({ key, value: d.seasonAverages && d.seasonAverages[key] ? d.seasonAverages[key] : 0 })))
                .enter().append("text")
                .text(d => `${d.key.toUpperCase()}: ${d.value.toFixed(1)}`)
                .attr("x", d => x1(d.key) + x1.bandwidth() / 2)
                .attr("y", d => y(d.value) - 5)
                .attr("text-anchor", "middle")
                .style("fill", "#333")
                .style("font-size", "10px");
        }
    }, [data]);

    return (
        <svg
            className="d3-component"
            width={800}
            height={500}
            ref={d3Container}
        />
    );
};

export default BarChart;
