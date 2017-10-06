var jkd3 = jkd3 || {}

jkd3.axes = function(plotter){
    this.plotter = plotter;
    return this;
}

jkd3.axes.prototype.leftAxis = jkd3.accessor("__leftAxis");
jkd3.axes.prototype.bottomAxis = jkd3.accessor("__bottomAxis");

jkd3.axes.prototype.yAxis = jkd3.accessor("__yAxis");
jkd3.axes.prototype.xAxis = jkd3.accessor("__xAxis");

jkd3.axes.prototype.draw = function(){


    var bbox = this.plotter.svg().node().getBoundingClientRect();
    var width = bbox.width - this.plotter.margin.left - this.plotter.margin.right;
    var height = bbox.height - this.plotter.margin.top - this.plotter.margin.bottom;
    
    this.plotter.xScale(this.plotter.xScale().range([0,width]));
    this.plotter.yScale(this.plotter.yScale().range([height,0]));

    this.xAxis(d3.axisBottom(this.plotter.xScale()).tickSizeOuter(0))
    
    this.yAxis(d3.axisLeft(this.plotter.yScale()).tickSizeOuter(0));

    this.bottomAxis(this.plotter.svg().append("g")
	.classed("axis", true)
	.classed("x", true)
	.call(this.xAxis())
    	.attr("transform", "translate("
	      + this.plotter.margin.left + ","
	      + (this.plotter.margin.top + height) + ")"));

    this.leftAxis(this.plotter.svg().append("g")
	.classed("axis", true)
	.classed("y", true).call(this.yAxis())
	.attr("transform", "translate("
	      + this.plotter.margin.left + ","
	      + this.plotter.margin.top + ")"));

    if ( this.leftAxis().node().getBBox().width > this.plotter.margin.left ){
	this.plotter.margin.left += this.leftAxis().node().getBBox().width;
	this.plotter.draw();
    }

    if ( this.bottomAxis().node().getBBox().height > this.plotter.margin.bottom ){
	this.plotter.margin.bottom += this.bottomAxis().node().getBBox().height;
	this.plotter.draw();
    }
}

