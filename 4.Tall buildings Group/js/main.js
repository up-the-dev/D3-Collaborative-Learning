//setting up some properties for group in SVG
const margin = { TOP: 10, BOTTOM: 130, LEFT: 100, RIGHT: 10 };
const width = 600 - margin.LEFT - margin.RIGHT;
const height = 400 - margin.TOP - margin.BOTTOM;

//create a svg
const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.LEFT + margin.RIGHT)
  .attr("height", height + margin.TOP + margin.BOTTOM);

//append a group on svg
const g = svg
  .append("g")
  .attr("transform", `translate(${margin.LEFT},${margin.TOP})`);

// load json data using d3
d3.json("data/buildings.json")
  .then((data) => {
    data.map((building) => {
      building.height = Number(building.height);
    });

    //creating scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.height)])
      .range([height, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(d3.schemeCategory10);

    //adding x-axis
    const xAxis = d3.axisBottom(x);

    // g.append("g").call(xAxis);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("x", "-5")
      .attr("y", "10")
      .attr("text-anchor", "end")
      .attr("transform", `rotate(-40)`);

    //adding y-axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => d + " m");

    g.append("g").call(yAxis);

    //adding label to x and y axis
    g.append("text")
      .text(" buildings")
      .attr("y", height + 120)
      .attr("x", width / 2)
      .attr("text-anchor", "middle");

    g.append("text")
      .text(" heights")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -60);

    const buildings = g.selectAll("rect").data(data);

    buildings
      .enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("height", (building, i) => {
        return height - y(building.height);
      })
      .attr("x", (building, i) => {
        return x(building.name);
      })
      .attr("y", (building, i) => {
        return y(building.height);
      })
      // .attr("transform", "rotate(1)")
      .attr("fill", (building, i) => {
        return colorScale(building.name);
      });
  })
  .catch((error) => {
    console.log(error);
  });
