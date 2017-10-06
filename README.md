# jk-plottools

A minimally opinionated set of tools to speed up the process of making
basic d3 charts.

I do not want to reinvent anything in d3, or make a full charting "library"
such as highcharts.

I do want to write a package of code to automate the tasks I do for every
chart, especially adding and positioning axes. Right now I'm intent to only
implement left and bottom axis support, since I've never ever made a chart
with a right or top axis.

The general idea in how I add axes is by creating an plotter object that
takes an svg to draw in, and d3 scales of any kind (time, linear,
band). Theny you add drawable objects (objects with draw methods) like
axes, scatter layers, line layers, etc.

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
to draw in. The complete example can be found in
[js/jk-demo.js](js/jk-demo.js) and viewed live at [https://jakekara.github.io/jk-plottools](https://jakekara.github.io/jk-plottools)

# jkd3.plotter

Object that contains the SVG to draw in, as well as an array of drawable
components (implemented in subsequent objects, such as jkd3.axis and
jkd3.scatter).

###  jkd3.plotter()

Initializer. Takes no arguments.

Example:

       // Create a new plotter object
       var p = new jkd3.plotter();

### jkd3.plotter.svg(d3selection)

Set the svg selection in which the axisPlotter will draw.

* _d3selection_ must be a d3 selection

If no argument is passed, this will return the current svg.

Example:

	// Create an svg element and pass it to
	// p as container for the plot
	p.svg(d3.select("#container").append("svg")
	  .style("width", "100%")
	  .style("height", "500px"));

### jkd3.plotter.xScale(d3Scale)

Set the d3 scale for the x axis.

* _d3Scale_ must be a d3 scale, such as d3.scaleLinear or d3.scaleTime

The range of d3scale is irrelevant and will be overwritten to fit the
axisPlotter's svg dimensions.

If no argument is passed will return the current xScale of the object.

Example:

	// set the x scale to a linear scale from 0 to 100
	p.xScale(d3.scaleLinear().domain([0,100]));

### jkd3.plotter.yScale(d3Scale)

Same as plotter.xScale but for the y axis.

Example:
	// set the y scale to a linear scale from 0 to 100
	p.yScale(d3.scaleLinear().domain([0,100]));

### jkd3.plotter.addDrawable(d)

Add a drawable to the plot. These drawables, such as axes or scatter
objects, will be drawn in order they are added!

Example:

	// in order to keep this example liner, see the jkd3.axes
	// initializer example code.

### jkd3.plotter.draw()

Clear the plotter's _svg_ and draw all drawable items in order they were
added.

Example:

	// draw p
	p.draw()

# jkd3.axes

A drawable that requires a jkd3.plotter. The x and y scale belong to the
plotter, so axes doesn't need any configuration. You just create one, and
then add it to the plotter's drawables.

### jkd3.axes()

Initializer. Takes a plotter object.

Example:

	// create a new 
	ax = new jkd3.axes(p);

	// now add it to the plotter p
	p.addDrawable(ax);

# jkd3.scatter

Given a jkd3.plotter, some data, draw a scatter chart.

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

# jkd3.line

A line drawable

### jkd3.line(plotter)

Initializer.

*_plotter_ must be a jkd3.plotter object

### jkd3.line.data(data)

Set or get the data to use for the line.

* _data_ must be an array of any type of data object

With no argument passed, this function returns the line's data object.

### jkd3.line.x(func)

Set or get the function get an x value from an element of this line's data
object.

* func must be a function that takes an element from _data_ and returns a
  numeric value

With no argument, this function returns the x function.

### jkd3.line.y

Same as jkd3.line.x, but for the y value function.



