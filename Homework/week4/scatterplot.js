/* Daan Uittenhout
Java Script for scatterplot.html */

// set margin for the plot
var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = 960 - margin.left - 20,
    height = 500 - margin.top - margin.bottom;

// scale the dot's size
var rscale = d3.scale.linear()
    .range([5,35])

// scale the dot's x position
var x = d3.scale.linear()
    .range([0, width]);

// scale the dot's y position
var y = d3.scale.linear()
    .range([height, 0]);

// giv different colors
var color = d3.scale.category10();

// create x
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// create y
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// create mouse over
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
   return "<span style='color:white'>" + d.country + " (" +
          (Math.round(d.popgrowth * 100) / 100) + "% ," +
          (Math.round(d.gdpgrowth * 100) / 100)  +  "%) " + "total population(mln): " +
           Math.round(((d.population/1000000)*100))/100 + "</span>";
});

// wait to execute function untill all libaries are loaded
window.onload = function(d){

// create svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// call tip
svg.call(tip);

// load data
d3.json("data1.json", function(error, data) {
  if (error) throw error;
  data.forEach (function type(d) {
    d.popgrowth = +d.popgrowth;
    d.gdpgrowth = +d.gdpgrowth;
    d.population = +d.population;


    return d;
});

// set the domains for the axis with the propper data
rscale.domain(d3.extent(data, function(d) { return d.population; })).nice();
x.domain(d3.extent(data, function(d) { return d.popgrowth; })).nice();
y.domain(d3.extent(data, function(d) { return d.gdpgrowth; })).nice();

// append x to svg
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("population growth (%)");

// append y to svg
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("gdp growth (%)")

// append dots to svg
svg.selectAll(".dot")
    .data(data)
  .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.popgrowth); })
    .attr("cy", function(d) { return y(d.gdpgrowth); })
    .attr('r', function(d) {return rscale(d.population); })
    .style("fill", function(d) { return color(d.country); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

// create legend
var legend = svg.selectAll(".legend")
    .data(color.domain())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// append rect to legend
legend.append("rect")
    .attr("x", width + 30)
    .attr("width", 10)
    .attr("height", 18)
    .style("fill", color);

// append text to legend
legend.append("text")
    .attr("x", width + 29)
    .attr("y", 9)
    .attr("dy", ".25em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

});
};
