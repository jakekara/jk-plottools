
var chart = function(){
    return this;
}

// d3 selection to draw chart in
chart.prototype.container = accessor("__container");

// text fields
chart.prototype.headline = accessor("__headline");
chart.prototype.chatter = accessor("__chatter");
chart.prototype.byline = accessor("__byline");
chart.prototype.sourceline = accessor("__sourceline");

// plot type
chart.prototype.plotter = accessor("__plotter");

// draw the chart in its container, then hand off
// drawing to the appropriate chart type drawer
chart.prototype.draw = function(){

    if (! this.container() instanceof(d3.selection)){
	throw ("chart.draw: container must be a d3 selection");
    }

    this.container().html("");

    this.headline_div = this.container().append("h3")
	.text(this.headline());
    
    this.chatter_div = this.container().append("div")
	.text(this.chatter());
    
    this.plot_svg = this.container().append("svg");
    
    this.byline_div = this.container().append("div")
	.text(this.byline());
    
    this.sourceline_div = this.container()
	.append("div").text(this.sourceline());

    return this;
}

var bar_plotter  = function(){
    return this;
}

bar_plotter.prototype.container = accessor("__container");
bar_plotter.prototype.xs = accessor("__xs");
bar_plotter.prototype.ys = accessor("__ys");
bar_plotter.prototype.x_scale = accessor("__x_scale");
bar_plotter.prototype.y_scale = accessor("__y_scale")

bar_plotter.prototype.draw = function(){

    this.container().html("");

    // create x scale
    var x_scale = this.x_scale()()
	.domain(d3.extent(this.xs()))
	.range([0, this.container().node().getBoundingClientRect.width])

    // create y scale
    var y_scale = this.y_scale()()
	.domain(d3.extent(this.ys()))

    // create x axis

    // create y axis

    // draw axes

    // draw bars
}




// -----------------------------------------------------------------------------
// testing
// -----------------------------------------------------------------------------


var data = [
    {"state":"CT","population":3000000},
    {"state":"CA", "population":30000000}
];

c = new chart();
c.container(d3.select("#container"));
c.headline("My first chart");
c.chatter("This is my first chart...");
c.sourceline("SOURCE: Someone");
c.byline("JAKE KARA");
c.draw();

b = new bar_plotter();
b.container(c.plot_svg);
b.x_scale(d3.scaleBand);
b.y_scale(d3.scaleLinear);
b.xs(data.map(function(a){ return a["state"]; }));
b.ys(data.map(function(b){ return b["population"]; }));
b.draw();
