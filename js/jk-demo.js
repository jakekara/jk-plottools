// jkd3 demo

// --------------------------------------------------------------------------
// Part 1: Creating a plotter
// --------------------------------------------------------------------------

// Create a new axisPlotter object
var p = new jkd3.plotter();

// Create an svg element and pass it to
// p as container for the plot
p.svg(d3.select("#container").append("svg")
      .style("width", "100%")
      .style("height", "500px"));

// set x and y axes
// note there is no need to set the range
// since axisPlotter will set that based on
// the dimensions of the SVG
p.xScale(d3.scaleLinear().domain([0,100]));
p.yScale(d3.scaleLinear().domain([0,100]));

// draw the plot (does nothing, seemingly, since it has no drawable)
p.draw();

// --------------------------------------------------------------------------
// Part 3: Creating axes
// --------------------------------------------------------------------------

// create a new axes
ax = new jkd3.axes(p);

// add the axis to the plotter note, comment out this line and the plot
// will still work without axes. This can be used to make simple sparklines
p.addDrawable(ax);

// draw the plot, now with axes
p.draw();

// --------------------------------------------------------------------------
// Part 3: Adding a scatter layer
// --------------------------------------------------------------------------

// generate some data
var data = d3.range(100).map(function(_, i){
    return {"x": i,"y":Math.random() * 100};
});

// create a scatter drawable
var s = new jkd3.scatter(p);

// set the data for the scatter drawable
s.data(data);

// set the functions to return x and y values
//  from the data
s.x(function(a){ return a["x"]; });
s.y(function(a){ return a["y"]; });

// add the scatter layer s to the plotter p
p.addDrawable(s);

// draw the plot, now with axes and scatter layer
p.draw();

// --------------------------------------------------------------------------
// Part 4: Adding a line
// --------------------------------------------------------------------------

// create a new line
var ln = new jkd3.line(p);

// set the data, reusing values from the scatter layer s
ln.data(s.data());
ln.x(s.x());
ln.y(s.y());

p.addDrawable(ln);

p.draw();

