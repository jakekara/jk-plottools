# jk-plottools

A minimally opinionated set of tools to speed up the process of making
basic d3 charts.

I do not want to reinvent anything in d3, or make a full charting "library"
such as highcharts.

I do want to write a package of code to automate the tasks I do for every
chart, especially adding and positioning axes. Right now I'm intent to only
implement left and bottom axis support, since I've never ever made a chart
with a right or top axis.

The general idea in how I add axes is by creating an axisPlotter object
that takes an svg to draw in, and d3 scales of any kind (time, linear,
band), and draws the axes for you.

All of the d3 stuff, the d3 scales, the d3 axes, the svg, are all exposed
members of the axisPlotter object, so you can customize it to your heart's
content. They are not abstracted with some "better" (but actually way
worse) wrapper I invented.

# jkd3 API

Everything is wrapped in the jkd3 object when you include the library via a
script tag.

Here is a run-down of the methods in the order you would typically use
them, along with a continus example that assumes you have included the jkd3
library in an HTML document and have a div with id "#container" somewhere
to draw in. The complete example can be found in [js/jk-demo.js](js/jk-demo.js) and viewed live at

# jkd3.axisPlotter

The real benefit this object gives is that the
draw function handles making sure the axes are positioned properly, which
is kind of a pain in the ass and definitely not a problem you want to solve
more than once.

It is the base object that other objects for plotting scatter, line and bar
charts depends on.

###  jkd3.axisPlotter()

Initialize a new jkd3 axisPlotter, for drawing and positioning axes (left and
bottom only at the moment). 

Example:

       // Create a new axisPlotter object
       var p = new jkd3.axisPlotter();

### jkd3.svg(d3selection)

Set the svg selection in which the axisPlotter will draw.

* _d3selection_ must be a d3 selection

If no argument is passed, this will return the current svg.

Example:

	// Create an svg element and pass it to
	// p as container for the plot
	p.svg(d3.select("#container").append("svg")
	  .style("width", "100%")
	  .style("height", "500px"));

### jkd3.axisPlotter.xScale(d3Scale)

Set the d3 scale for the x axis.

* _d3Scale_ must be a d3 scale, such as d3.scaleLinear or d3.scaleTime

The range of d3scale is irrelevant and will be overwritten to fit the
axisPlotter's svg dimensions.

If no argument is passed will return the current xScale of the object.

Example:

	// set the x scale to a linear scale from 0 to 100
	p.xScale(d3.scaleLinear().domain([0,100]));

### jkd3.axisPlotter.yScale(d3Scale)

Same as axisPlotter.xScale but for the y axis.

Example:
	// set the y scale to a linear scale from 0 to 100
	p.yScale(d3.scaleLinear().domain([0,100]));

### jkd3.axisPlotter.draw()

Draw the axes in the svg

Example:

	// draw p
	p.draw()

# jkd3.scatter

Given a jkd3.axisPlotter, some data, draw a scatter chart.

### jkd3.scatter(axisPlotter)

Initializer.

* _axisPlotter_ must be a jkd3.axisPlotter

Example:

	// initialize a new jkd3.scatter object
	var s = new jkd3.scatter(p)

### jkd3.scatter.data(data)

Set the data object.

*_data_ must be an array of objects of any kind.

If not argument is passed, return the current data object.

Example:

	
	s.data(data);


### jkd3.scatter.x(func)

Set a function used to retrieve x values from elements in the _data_ array

* _func_ must be a function that takes a _data_ element and returns a numeric value

If not argument is passed, return the current x function.

Example:

	s.x(function(a){ return a["x"]; });

### jkd3.scatter.y(func)

Same as jkd3.scatter.x but for y values.

     s.y(function(a){ return a["y"]; });

### jkd3.scatter.draw()

Draw scatter within its _axisPlotter_

Example:

	s.draw();