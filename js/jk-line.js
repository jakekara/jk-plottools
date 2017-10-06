var jkd3 = jkd3 || {};

jkd3.line = function(plotter){
    this.strokewidth = "2";
    this.fill = "none";
    this.stroke = "black";
    this.plotter = plotter;
    return this;
}

jkd3.line.prototype.data = jkd3.accessor("__data");
jkd3.line.prototype.y = jkd3.accessor("__y_func");
jkd3.line.prototype.x = jkd3.accessor("__x_func");

jkd3.line.prototype.draw = function(){


    var that = this;
    
    this.line = d3.line()
	.x(function(d){
	    return that.plotter.xScale()(that.x()(d));
	})
	.y(function(d){
	    return that.plotter.yScale()(that.y()(d));
	});


    this.selection = this.plotter.svg().append("g")
	.append("path")
	.datum(this.data())
	.style("fill",this.fill)
	.style("stroke",this.stroke)
	.style("strokwidth", this.strokewidth)
	.attr("d", this.line);

    this.plotter.transform(this.selection);

    
	
}
