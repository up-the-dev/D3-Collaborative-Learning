console.log("dipya nalla");

const MARGINS = { TOP: 10, LEFT: 100, RIGHT: 10, BOTTOM: 100 };

const svg = d3
  .select("chart-area")
  .append("svg")
  .attr("width", 800)
  .attr("height", 800);

const g = svg.append("g");

d3.csv("data/revenues.csv")
  .then((data) => {
    console.log(data);
  })
  .catch((e) => console.log("error---->", e));
