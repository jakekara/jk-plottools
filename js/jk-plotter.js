var jkd3 = jkd3 || {};

jkd3.plotter = function(){

    // array of objects that have a draw method
    this.drawables = [];

    this.margin = {
	"left":10,
	"right":10,
	"top":10,
	"bottom":10
    };
    
    return this;
    
}

jkd3.plotter.prototype.svg = jkd3.accessor("__svg");

jkd3.plotter.prototype.xScale = jkd3.accessor("__xScale");
jkd3.plotter.prototype.yScale = jkd3.accessor("__yScale");

jkd3.plotter.prototype.addDrawable = function(d){
    this.drawables.push(d);
}

jkd3.plotter.prototype.draw = function(){

    this.svg().html("");
    
    for (var i in this.drawables){
	this.drawables[i].draw();
    }
}

