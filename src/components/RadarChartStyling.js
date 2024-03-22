// NBA Styling
// let axisGrid = g.append("g").attr("class", "axisWrapper");
// axisGrid.selectAll(".levels")
//     .data(d3.range(1, (cfg.levels + 1)).reverse())
//     .enter()
//     .append("circle")
//     .attr("class", "gridCircle")
//     .attr("r", d => radius / cfg.levels * d)
//     .style("fill", "none") // No fill to ensure the dark background shows through
//     .style("stroke", "#FFF") // White lines for contrast
//     .style("stroke-opacity", 0.75) // Slightly transparent for a subtler effect
//     .style("stroke-width", "0.5px") // Thinner lines for a finer grid
//     .style("filter", "url(#glow)");

// axisGrid.selectAll(".axisLabel")
//     .data(d3.range(1, (cfg.levels + 1)).reverse())
//     .enter().append("text")
//     .attr("class", "axisLabel")
//     .attr("x", 4)
//     .attr("y", d => -d * radius / cfg.levels)
//     .attr("dy", "0.4em")
//     .style("font-size", "10px")
//     .attr("fill", "#FFF") // White text for readability
//     .text(d => Format(cfg.maxValue * d / cfg.levels) + cfg.unit);

// var axis = axisGrid.selectAll(".axis")
//     .data(allAxis)
//     .enter()
//     .append("g")
//     .attr("class", "axis");
// axis.append("line")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
//     .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
//     .attr("class", "line")
//     .style("stroke", "#FFF") // White for visibility
//     .style("stroke-width", "2px");

// axis.append("text")
//     .attr("class", "legend")
//     .style("font-size", "11px")
//     .attr("text-anchor", "middle")
//     .attr("dy", "0.35em")
//     .attr("x", (d, i) => radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2))
//     .attr("y", (d, i) => radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2))
//     .text(d => d)
//     .attr("fill", "#FFF") // White text for labels
//     .call(wrap, cfg.wrapWidth);
