// jkd3 demo

// Create a new axisPlotter object
var p = new jkd3.axisPlotter();

// Create an svg element and pass it to
// p as container for the plot
p.svg(d3.select("#container").append("svg")
      .style("width", "100%")
      .style("height", "500px"));
p.xScale(d3.scaleLinear().domain([0,100]));
p.yScale(d3.scaleLinear().domain([0,100]));
p.draw();

// scatter plot some data
var data = d3.range(100).map(function(_, i){
    return {"x": i,"y":Math.random() * 100};
});

var s = new jkd3.scatter(p).data(data)
    .x(function(a){ return a["x"]; })
    .y(function(a){ return a["y"]; });

s.draw();
