var jkd3 = jkd3 || {};

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
    
    this.xAxis(d3.axisBottom(this.plotter.xScale()).tickSizeOuter(0))
    
    this.yAxis(d3.axisLeft(this.plotter.yScale()).tickSizeOuter(0));

    this.bottomAxis(this.plotter.svg().append("g")
		    .attr("transform", "translate("
			  + this.plotter.margin.left
			  + ","
			  + (this.plotter.margin.top + height)
			  + ")")
		    .classed("axis", true)
		    .classed("x", true)
		    .call(this.xAxis()));

    this.leftAxis(this.plotter.svg().append("g")
		  .attr("transform", "translate("
			+ this.plotter.margin.left
			+ ", "
			+ (this.plotter.margin.top)
			+ ")")
		  .classed("axis", true)
		  .classed("y", true)
		  .call(this.yAxis()));

    if ( this.leftAxis().node().getBBox().width > this.plotter.margin.left ){
	this.plotter.margin.left += this.leftAxis().node().getBBox().width;
	this.plotter.draw();
    }

    if ( this.bottomAxis().node().getBBox().height > this.plotter.margin.bottom ){
	this.plotter.margin.bottom += this.bottomAxis().node().getBBox().height;
	this.plotter.draw();
    }
}

