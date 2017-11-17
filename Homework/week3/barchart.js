d3.json("bitcoin_price.json", function(data) {

var dates = []
var marketcaps = []
for (var i = 0; i < data.length; i++){
  dates.push((data[i].Date));
  marketcaps.push((data[i].Marketcap / 1000000));
}
})


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([450, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Market Capitalization: $</strong> <span style='color:red'>" + d.Marketcap + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


d3.json("bitcoin_price.json", function(error, data) {
  data.forEach (function type(d) {
    d.Marketcap = +d.Marketcap/1000000000; // coerce to number

    return d;
  })
  console.log(data.map(function(d) { return d.Date; }));
  x.domain(data.map(function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function(d) { return d.Marketcap; })]);


svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-2.3em")
      .style("text-anchor", "end")
      .text("Market Capitalization in billions of dollars ($)");

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
