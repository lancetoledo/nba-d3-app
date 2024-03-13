// Import necessary React and D3 modules
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    // Use useRef to keep a reference to the SVG DOM element for D3 manipulations
    const d3Container = useRef(null);

    // useEffect hook to perform D3 operations when the component mounts and updates
    useEffect(() => {
        // Ensure there's data and a reference to the SVG before drawing
        if (data && d3Container.current) {
            // Select the SVG element using D3, allowing for D3 operations on it
            const svg = d3.select(d3Container.current);
            // Clear any existing content in the SVG to prepare for new drawing
            svg.selectAll("*").remove();

            // Define margins around the chart for axes and labels
            const margin = { top: 20, right: 30, bottom: 40, left: 90 },
                width = 400 - margin.left - margin.right, // Calculate the width inside the margins
                height = 200 - margin.top - margin.bottom; // Calculate the height inside the margins

            // Create a group element (`<g>`) inside the SVG to draw the chart in, positioned according to margins
            const chart = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Create a linear scale for the x-axis, mapping data points to pixel values
            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.pointsPerGame)]) // Set domain from 0 to max points per game
                .range([0, width]); // Map the domain to the width of the chart

            // Add the x-axis to the chart
            chart.append("g")
                .call(d3.axisBottom(x).tickSize(-height)) // Create bottom axis with tick lines extending across the chart
                .attr("transform", `translate(0,${height})`); // Position axis at the bottom of the chart

            // Create a band scale for the y-axis, spacing player names evenly and setting their band width
            const y = d3.scaleBand()
                .range([0, height]) // Set the range to the height of the chart
                .domain(data.map(d => d.name)) // Use player names as the domain
                .padding(0.1); // Add some padding between bands

            // Add the y-axis to the chart
            chart.append("g")
                .call(d3.axisLeft(y)); // Create left axis with player names

            // Bind data to rectangles (bars) for the bar chart, using player names as keys
            const bars = chart.selectAll(".bar")
                .data(data, d => d.name) // Key function to identify data points
                .enter() // Enter selection for data elements without corresponding DOM elements
                .append("rect") // Append rectangle elements for each data point
                .attr("class", "bar") // Apply a class for styling
                .attr("y", d => y(d.name)) // Set y position based on the player's name
                .attr("height", y.bandwidth()) // Set the bar's height to match the band's width
                .attr("x", x(0)) // Start bars from the left axis
                .attr("width", 0); // Initial width of bars set to 0 for the animation

            // Animate bars to their final width based on the points per game
            bars.transition()
                .duration(750) // Animation duration in milliseconds
                .attr("width", d => x(d.pointsPerGame)) // End width of the bars
                .attr("fill", "steelblue"); // Color the bars
        }
    }, [data]); // Rerun the effect if the `data` prop changes

    return (
        // Render an SVG element to the DOM, with a reference for D3 operations
        <svg
            className="d3-component"
            width={400}
            height={200}
            ref={d3Container}
        />
    );
};

export default BarChart;
