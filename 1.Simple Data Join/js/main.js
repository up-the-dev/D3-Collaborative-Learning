const data = [10, 20, 30, 40, 50];
const svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

const circles = svg.selectAll("circle").data(data);
circles
  .enter()
  .append("circle")
  .attr("r", (d, i) => {
    return d / 2;
  })
  .attr("cx", (d, i) => {
    return i * 50 + 50;
  })
  .attr("cy", (d, i) => {
    return 250;
  })
  .attr("fill", "orange");
