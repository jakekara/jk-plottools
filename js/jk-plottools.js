var plotter = function(){

    this.margin = {
	"top":0,
	"left":0,
	"right":0,
	"bottom":0
    }

    this.scale = {
	"top":null,
	"left":null,
	"right":null,
	"bottom":null
    }

    this.axis = {
	"top":null,
	"left":null,
	"right":null,
	"bottom":null
    }
    
    return this;
}

plotter.prototype.container = accessor("__container");

plotter.prototype.bbox = function(){
    // return this.container().node().getBoundingClientRect();
    return this.svg.node().getBoundingClientRect();
}

// determine the appropiatse  xOffset for an axis
plotter.prototype.xOffset = function(axis){
    switch(axis){
    case "top":
    case "bottom":
	return this.margin.left;
    case "left":
	return this.margin.left;
    case "right":
	return this.bbox().width - this.margin.right;
    }
}

// determine the appropriate yOffset for an axis
plotter.prototype.yOffset = function(axis){

    switch(axis){
    case "top":
	return this.margin.top;
    case "bottom":
	return this.bbox().height - this.margin.bottom - this.margin.top;
    case "left":
	return this.margin.top;
    case "right":
	return this.margin.top;
    }
}

plotter.prototype.d3AxisFunction = function(axis){

    switch(axis){
    case "left":
	return d3.axisLeft;
    case "right":
	return d3.axisRight;
    case "bottom":
	return d3.axisBottom;
    case "top":
	return d3.axisTop;
    }
}

plotter.prototype.xRange = function(){
    var ret = [0, this.bbox().width - this.margin.right - this.margin.left];
    console.log("this.xrange", ret);
    return ret;
}

plotter.prototype.yRange = function(){
    var ret = [this.bbox().height - this.margin.bottom - this.margin.top, 0];
    return ret;
}

plotter.prototype.range = function(axis){
    switch(axis){
    case "top":
    case "bottom":
	return this.xRange();
    case "left":
    case "right":
	return this.yRange();
    }
}

plotter.prototype.translate = function(side){
    return "translate("
		    + this.xOffset(side)
		    + ","
		    + this.yOffset(side)
		    + ")"
}
    

// add axes, and draw
plotter.prototype.drawAxes = function(){

    // clear container
    this.container().html("");

    this.svg = this.container().append("svg");
    
    var axes = this.svg.append("g").classed("axes", true);

    for (var side in this.scale){

	if (this.scale[side] == null) continue;

	this.scale[side].range(this.range(side));

	this.axis = this.d3AxisFunction(side)(this.scale[side]);

	// add axis to plot
	// position it at the appropriate margin
	var axis_g = axes.append("g")
	    .classed("axis", true)
	    .classed(side, true)

	axis_g
	    .call(this.axis);

	// see if the axis fits
	var bbox = axis_g.node().getBBox();

	console.log("offset", side, this.xOffset(side), this.yOffset(side));	

	axis_g.attr("transform", this.translate(side));
		    // "translate("
		    // + this.xOffset(side)
		    // + ","
		    // + this.yOffset(side)
		    // + ")");

	var dim = function(){
	    switch (side){
	    case "left":
	    case "right":
		return "width";
	    case "top":
	    case "bottom":
		return "height";
	    }
	}();
	
	if (this.margin[side] < bbox[dim]){
	    this.margin[side] = bbox[dim];
	    console.log(this.margin);
	    this.drawAxes();
	}
    }
}

plotter.prototype.drawLine = function(data){
    var that = this;
    this.svg.append("g")
	.classed("line", true)
	.append("path")
	.style("fill","none")
	.style("capstyle", "round")
	.style("stroke-width", 4)
	.style("stroke","black")
	.attr("transform", this.translate("top"))
	.datum(data)
	.attr("d",
	      d3.line()
	      .x(function(a){ return that.scale["bottom"](a["x"]);})
	      .y(function(a){ return that.scale["left"](a["y"]);}));

}
