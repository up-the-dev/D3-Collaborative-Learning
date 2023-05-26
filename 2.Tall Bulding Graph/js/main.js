/*
1.load json data using d3
2.create svg
3.create a selectAll circle apply enter on that circles and then append circle and change attr of every using value and index
*/

// load json data using d3
d3.json("data/buildings.json")
  .then((data) => {
    console.log(data);
    data.map((building) => {
      building.height = Number(building.height);
    });

    //create svg
    const svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", 1200)
      .attr("height", 600);
    const buildings = svg.selectAll("rect").data(data);

    buildings
      .enter()
      .append("rect")
      .attr("width", 70)
      .attr("height", (building, i) => {
        return building.height;
      })
      .attr("x", (building, i) => {
        return i * 140;
      })
      .attr("y", (building, i) => {
        return 100;
      })
      .attr("fill", (building, i) => {
        if (building.name === "Burj Khalifa") {
          return "black";
        } else if (building.name === "Shanghai Tower") {
          return "red";
        } else if (building.name === "Abraj Al-Bait Clock Tower") {
          return "green";
        } else if (building.name === "Ping An Finance Centre") {
          return "blue";
        } else if (building.name === "Lotte World Tower") {
          return "orange";
        }
      });
  })
  .catch((error) => {
    console.log(error);
  });
