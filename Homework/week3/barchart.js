// Daan Uittenhout
// Java Script for barchart.html

// set margin for the chart
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// scale the bars
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);
// scale the height of the bars
var y = d3.scale.linear()
    .range([450, 0]);
// create xaxis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create yaxis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// wait to execute function untill all libaries are loaded
window.onload = function(d){

// create the effect for hovering over a bar
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Market Capitalization: $</strong> <span style='color:red'>" + d.Marketcap + "</span>";
  })
// add svg to the body
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// execute tip
svg.call(tip);

// load data
d3.json("bitcoin_price.json", function(error, data) {
  data.forEach (function type(d) {
    d.Marketcap = +d.Marketcap/1000000000; // coerce to number

    return d;
  })
// set the domains for the axis with the propper data
x.domain(data.map(function(d) { return d.Date; }));
y.domain([0, d3.max(data, function(d) { return d.Marketcap; })]);

// set properties of x
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
// set properties of y
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-2.3em")
      .style("text-anchor", "end")
      .text("Market Capitalization in billions of dollars ($)");
// set properties of bars
svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Date); })
    .attr("y", function(d) { return y(d.Marketcap); })
    .attr("height", function(d) { return height - y(d.Marketcap); })
    .attr("width", x.rangeBand())
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

});
};
