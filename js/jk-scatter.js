var jkd3 = jkd3 || {};

jkd3.scatter = function(plotter){
    this.default_r = 3;
    this.plotter = plotter;
    return this;
}

jkd3.scatter.prototype.data = accessor("__data");
jkd3.scatter.prototype.y = accessor("__y_func");
jkd3.scatter.prototype.x = accessor("__x_func");
jkd3.scatter.prototype.r = accessor("__r");

jkd3.scatter.prototype.draw = function(){

    if ( typeof(this.r()) == "undefined") this.r(this.default_r);

    var that = this;
    this.plotter.svg().
	append("g")
	.attr("transform", "translate("
	      + this.plotter.margin.left
	      + ", "
	      + this.plotter.margin.top
	      + ")")
	.selectAll(".scatter-point")
	.data(this.data())
	.enter()
	.append("circle")
	.attr("r", this.r())
	.attr("cx", function(d){
	    return that.plotter.xScale()(that.x()(d));
	})
    	.attr("cy", function(d){
	    return that.plotter.yScale()(that.y()(d));
	});

    return this;

    
}
