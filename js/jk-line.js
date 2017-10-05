// console.log("jk-line.js");

// var data = d3.range(10).map(function(_, i){
//     return {"x": i,"y":Math.random() * 100};
// });

// var margin = {
//     "left":10,
//     "right":10,
//     "top":10,
//     "bottom":10
// }

// var leftWidth = null;
// var bottomHeight = null;


// var draw = function(data){

//     d3.select("#container").html("");
//     var svg = d3.select("#container").append("svg");

//     var bbox = svg.node().getBoundingClientRect();
//     var width = bbox.width - margin.left - margin.right;
//     var height = bbox.height - margin.top - margin.bottom;

//     // Create x and y scale
//     var xScale = d3.scaleLinear().domain(d3.extent(data.map(function(d){ return d["x"]; })));
//     var yScale = d3.scaleLinear().domain(d3.extent(data.map(function(d){ return d["y"]; })));

//     xScale.range([0, width]);
//     yScale.range([height, 0]);

//     var xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
//     var yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

//     var transtr = "translate(" + margin.left + "," + (margin.top + height) + ")";
//     console.log(transtr);
//     var bottomAxis = svg.append("g").classed("axis", true).classed("x", true).call(xAxis)
// 	.attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

//     transtr =  "translate(" + margin.left + "," + margin.top + ")";
//     console.log(transtr);
    
//     var leftAxis = svg.append("g").classed("axis", true).classed("y", true).call(yAxis)
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // add the left axis width to the left margin
//     if ( leftWidth == null ){
// 	leftWidth = leftAxis.node().getBBox().width;
// 	margin.left += leftWidth;
//     }

//     // add the bottom axis height to the bottom margin
//     if ( bottomHeight == null ){
// 	bottomHeight = bottomAxis.node().getBBox().height;
// 	margin.bottom += bottomHeight;

// 	console.log("Drawing again");
// 	draw(data);
//     }

// }

// draw(data);
