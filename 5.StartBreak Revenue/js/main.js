/*
 *    main.js
 *    Data Visualization with D3.js
 *    Star Break Coffee
 */
const margin = { top: 10, bottom: 100, left: 100, right: 10 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

const g = svg
  .append("g")
  .attr("width", width)
  .attr("height", height)
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("data/revenues.csv")
  .then((data) => {
    console.log(data);
    data.map((item) => {
      (item.revenue = Number(item.revenue)),
        (item.profit = Number(item.profit));
    });

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (data) => data.revenue)])
      .range([height, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((item) => item.month))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.2);

    const yAxis = d3.axisLeft(y);
    g.append("g").call(yAxis);

    const xAxis = d3.axisBottom(x);
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("x", "-5")
      .attr("y", "10")
      .attr("text-anchor", "end")
      .attr("transform", `rotate(-40)`);

    g.append("text")
      .text("Months")
      .attr("y", height + 70)
      .attr("x", width / 2)
      .attr("text-anchor", "middle");

    g.append("text")
      .text("Revenue")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -60);

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((item) => item.month))
      .range(d3.schemeCategory10);

    const monthData = g.selectAll("rect").data(data);
    monthData
      .enter()
      .append("rect")
      .attr("x", (data, i) => x(data.month))
      .attr("y", (data) => y(data.revenue))
      .attr("width", x.bandwidth)
      .attr("height", (data, i) => height - y(data.revenue))
      .attr("fill", (data, i) => colorScale(data.month));
  })
  .catch((error) => {
    console.log(error);
  });
