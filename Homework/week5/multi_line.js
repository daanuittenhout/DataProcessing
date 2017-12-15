var	margin = {top: 30, right: 100, bottom: 30, left: 90},
	width = 960 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(5)
	.tickFormat(d3.time.format("%Y"));

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Belgium); });

var	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Netherlands); });

var	valueline3 = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Luxembourg); });




var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
   return "<span style='color:purple'>" + d.Netherlands + "</span>";
});
window.onload = function(d){

var bisectDate = d3.bisector(function(d) { return d.date; }).left;

var	svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

var formatDate = d3.time.format("%Y");
// Get the data
d3.json("data.json", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
		d.date = formatDate.parse(d.date)
	  d.Belgium = +d.Belgium/1000000000;
		d.Netherlands = +d.Netherlands/1000000000;
	  d.Luxembourg = +d.Luxembourg/1000000000;
		d.NetherlandsGNI = +d.NetherlandsGNI/1000000000;
		d.BelgiumGNI = +d.BelgiumGNI/1000000000;
		d.LuxembourgGNI = +d.LuxembourgGNI/1000000000;
		d.NetherlandsGNIPPP = +d.NetherlandsGNIPPP/1000000000;
		d.BelgiumGNIPPP = +d.BelgiumGNIPPP/1000000000;
		d.LuxembourgGNIPPP = +d.LuxembourgGNIPPP/1000000000;
	});
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return Math.max(d.Belgium , d.Netherlands, d.Luxembourg); })]);
d3.select("#inds").on("change", function () {
	console.log(d3.select(this).node().value);

	updateData(d3.select(this).node().value)
})
function updateData(key) {

		    // Get the data again

    	// Scale the range of the data again
console.log();
	  y.domain([0, d3.max(data, function(d) { return Math.max(d["Belgium" + key] , d["Netherlands" + key], d["Luxembourg" + key]) })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

		var	valueline4 = d3.svg.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d["Belgium" + key]); });

		var	valueline5 = d3.svg.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d["Netherlands" + key]); });

		var	valueline6 = d3.svg.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d["Luxembourg" + key]); });

    // Make the changes

        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

				d3.select("svg g").select(".line.one")
					.attr("d", valueline4(data));

				d3.select("svg g").select(".line.two")
					.attr("d", valueline5(data));

				d3.select("svg g").select(".line.three")	// Add the valueline3 path
					.attr("d", valueline6(data));

};


	svg.append("path")		// Add the valueline path.
		.attr("class", "line one")
		.style("stroke", "black")
		.style("fill", "none")
		.attr("d", valueline(data));

	svg.append("path")		// Add the valueline2 path.
		.attr("class", "line two")
		.style("stroke", "blue")
		.style("fill", "none")
		.attr("d", valueline2(data));

	svg.append("path")		// Add the valueline3 path.
		.attr("class", "line three")
		.style("stroke", "red")
		.style("fill", "none")
		.attr("d", valueline3(data));



	svg.append("g")			// Add the X Axis
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .text("Year");

	svg.append("g")			// Add the Y Axis
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("GDP in billions");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[15].Netherlands) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "blue")
		.text("Netherlands");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[15].Belgium) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "black")
		.text("Belgium");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[15].Luxembourg) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Luxembourg");

		// add focus to create mouse interactivity
  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  // add circle element to focus to indicate where the focus is on the path
  focus.append("circle")
      .attr("r", 4.5);

  // add background to focus for label y-axis
  focus.append("rect")
      .attr("id", "y_label_background")
      .attr("height", 20)
      .attr("width", 40)
      .attr("transform", "translate(0,-20)")
      .style("fill", "white")
      .style("opacity", 0.4);

  // add background to focus for label x-axis
  focus.append("rect")
      .attr("id", "x_label_background")
      .attr("height", 20)
      .attr("width", 50)
      .attr("transform", "translate(0,-20)")
      .style("fill", "white")
      .style("opacity", 0.4);

  // add line element to focus to trace from path to y-axis
  focus.append("line")
      .attr("id", "line_y")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");
	
  // add line element to focus to trace from path to x-axis
  focus.append("line")
      .attr("id", "line_x")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

	focus.append("line")
		.attr("id", "line_x1")
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", 0)
		.attr("y2", 0)
		.attr("stroke-width", 1)
		.attr("stroke", "grey");

	focus.append("line")
		.attr("id", "line_x2")
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", 0)
		.attr("y2", 0)
		.attr("stroke-width", 1)
		.attr("stroke", "grey");
  // add text element to focus to label y-axis
  focus.append("text")
      .attr("id", "y-label")
      .attr("x", 4)
      .attr("y", -10)
      .attr("dy", ".35em");

  // add text element to focus to label x-axis
  focus.append("text")
      .attr("id", "x-label")
      .attr("x", 4)
      .attr("y", - 10)
      .attr("dy", ".35em")
	focus.append("text")
			.attr("id", "x-label1")
      .attr("x", 4)
      .attr("y", - 10)
      .attr("dy", ".35em")
	focus.append("text")
			.attr("id", "x-label2")
      .attr("x", 4)
      .attr("y", - 10)
      .attr("dy", ".35em");

  // add overlay to detect mouse placement
  svg.append("rect")
      .attr("class", "overlay")
			.style("fill", "transparent")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove)

		function mousemove() {
	    var x0 = x.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;

	    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.Netherlands) + ")");

			// draw line to x-axis
			focus.select("#line_x").attr("x1", -x(d.date));

			focus.select("#line_x1")
						.attr("x1", -x(d.date))
						.attr("x2", 0)
						.attr("y1",   y(d.Belgium) - y(d.Netherlands))
						.attr("y2",  y(d.Belgium) - y(d.Netherlands));
			focus.select("#line_x2")
						.attr("x1", -x(d.date))
						.attr("x2", 0)
						.attr("y1",  y(d.Luxembourg) - y(d.Netherlands))
						.attr("y2",  y(d.Luxembourg) -  y(d.Netherlands));

			focus.select("#line_x2").attr("x1", -x(d.date));
			// draw line to y-axis
			focus.select("#line_y").attr("y1", height - y(d.Netherlands));

			// relocate background from label y-axis
			focus.select("#y_label_background")
						.attr("x", -x(d.date))

			focus.select("#x_label_background")
					.attr("y", (- y(d.Netherlands) + height));

			// add text to label x-axis
			focus.select("#x-label")
					.attr("transform", "translate(" + -x(d.date) + ",0)")
					.style("font-size", "16")
					.text(d.Netherlands);

			focus.select("#x-label1")
					.attr("transform", "translate(" + -x(d.date) + ",0)")
					.style("font-size", "16")
					.text(d.Belgium)
					.attr("y",  y(d.Belgium) - y(d.Netherlands) - 10);


			focus.select("#x-label2")
					.attr("transform", "translate(" + -x(d.date) + ",0)")
					.style("font-size", "16")
					.text(Math.round(d.Luxembourg))
					.attr("y",  y(d.Luxembourg) - y(d.Netherlands) - 10);

			// add text to label y-axis
			focus.select("#y-label").text((formatDate(d.date)))
					.attr("transform", "translate(0," + (- y(d.Belgium) + height) + ")")
					.attr("font-size", "12");}
});
}
