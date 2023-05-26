/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

//DECLARE MARGINS
const MARGINS = { TOP: 10, LEFT: 100, RIGHT: 10, BOTTOM: 100 };
const width = 600 - MARGINS.LEFT - MARGINS.RIGHT;
const height = 400 - MARGINS.TOP - MARGINS.BOTTOM;

//create an svg
const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + MARGINS.LEFT + MARGINS.RIGHT)
  .attr("height", height + MARGINS.TOP + MARGINS.BOTTOM);

const g = svg
  .append("g")
  .attr("width", width)
  .attr("height", height)
  .attr("transform", `translate(${MARGINS.LEFT},${MARGINS.TOP})`);

g.append("text")
  .text("Months")
  .attr("transform", `translate(${width / 2},${height + 60})`)
  .attr("text-anchor", "middle");

g.append("text")
  .text("Revenue")
  .attr("transform", `rotate(-90)`)
  .attr("x", -height / 2)
  .attr("y", -60)
  .attr("text-anchor", "middle");

d3.csv("data/revenues.csv")
  .then((data) => {
    //converting string to number
    data.map((d) => {
      d.revenue = Number(d.revenue);
      d.profit = Number(d.profit);
    });
    console.log(data);

    //creating scales
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (data) => data.revenue)])
      .range([height, 0]);

    const x = d3
      .scaleBand()
      .domain([data.map((d) => d.month)])
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.2);

    //create x axises
    const xAxis = d3.axisBottom(x);
    g.append("g").call(xAxis).attr("transform", `translate(0,${height})`);

    //create y axises
    const yAxis = d3.axisLeft(y);
    g.append("g").call(yAxis);

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.month))
      .range(d3.schemeCategory10);

    //creating bars
    const monthData = g.selectAll("rect").data(data);
    monthData
      .enter()
      .append("rect")
      .attr("x", (data, i) => x(data.month))
      .attr("y", (data, i) => {
        return y(data.revenue);
      })
      .attr("width", x.bandwidth)
      .attr("height", (data, i) => height - y(data.revenue))
      .attr("fill", (data, i) => colorScale(data.month));
  })
  .catch((e) => {
    console.error(e);
  });
