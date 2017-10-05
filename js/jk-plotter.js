var jkd3 = jkd3 || {};

jkd3.axisPlotter = function(){

    this.margin = {
	"left":10,
	"right":10,
	"top":10,
	"bottom":10
    };
    
    return this;
    
}

jkd3.axisPlotter.prototype.height = accessor("__height");
jkd3.axisPlotter.prototype.width = accessor("__width");
jkd3.axisPlotter.prototype.leftAxis = accessor("__leftAxis");
jkd3.axisPlotter.prototype.bottomAxis = accessor("__bottomAxis");

jkd3.axisPlotter.prototype.svg = accessor("__svg");

jkd3.axisPlotter.prototype.xScale = accessor("__xScale");
jkd3.axisPlotter.prototype.yScale = accessor("__yScale");

jkd3.axisPlotter.prototype.yAxis = accessor("__yAxis");
jkd3.axisPlotter.prototype.xAxis = accessor("__xAxis");

jkd3.axisPlotter.prototype.draw = function(){

    this.svg().html("");

    var bbox = this.svg().node().getBoundingClientRect();
    var width = bbox.width - this.margin.left - this.margin.right;
    var height = bbox.height - this.margin.top - this.margin.bottom;
    
    this.xScale(this.xScale().range([0,width]));
    this.yScale(this.yScale().range([height,0]));

    this.xAxis(d3.axisBottom(this.xScale()).tickSizeOuter(0))
    
    this.yAxis(d3.axisLeft(this.yScale()).tickSizeOuter(0));


    this.bottomAxis(this.svg().append("g")
	.classed("axis", true)
	.classed("x", true)
	.call(this.xAxis())
    	.attr("transform", "translate("
	      + this.margin.left + ","
	      + (this.margin.top + height) + ")"));

    this.leftAxis(this.svg().append("g")
	.classed("axis", true)
	.classed("y", true).call(this.yAxis())
	.attr("transform", "translate("
	      + this.margin.left + ","
	      + this.margin.top + ")"));

    if ( this.leftAxis().node().getBBox().width > this.margin.left ){
	this.margin.left += this.leftAxis().node().getBBox().width;
	this.draw();
    }

    if ( this.bottomAxis().node().getBBox().height > this.margin.bottom ){
	this.margin.bottom += this.bottomAxis().node().getBBox().height;
	this.draw();
    }
}
