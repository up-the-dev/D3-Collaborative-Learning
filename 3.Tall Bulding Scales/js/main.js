/*
1.load json data using d3
2.create svg
3.create a selectAll circle apply enter on that circles and then append circle and change attr of every using value and index
*/

//create svg
const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

// load json data using d3
d3.json("data/buildings.json")
  .then((data) => {
    console.log(data);
    console.log(
      "mapping--->",
      data.map((d) => d.name)
    );

    data.map((building) => {
      building.height = Number(building.height);
    });

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.height)])
      .range([0, 400]);
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 400])
      .paddingInner(0.3)
      .paddingOuter(0.2);
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(d3.schemeCategory10);

    const buildings = svg.selectAll("rect").data(data);

    buildings
      .enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("height", (building, i) => {
        return y(building.height);
      })
      .attr("x", (building, i) => {
        return x(building.name);
      })
      .attr("y", (building, i) => {
        return 0;
      })
      .attr("fill", (building, i) => {
        return colorScale(building.name);
      });
  })
  .catch((error) => {
    console.log(error);
  });
