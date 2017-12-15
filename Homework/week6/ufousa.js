
var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = 1500 - margin.left - 20,
    height = 2000 - margin.top - margin.bottom;

window.onload = function(d){


var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
// scale the height of the bars
var y = d3.scaleLinear()
    .range([750, 0]);
// create xaxis


  // create svg

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
	.classed("parentSvg", true);


var path = d3.geoPath();

queue()
  .defer(d3.json, "usmap.json")
  .defer(d3.json, "data_map.json")
  .defer(d3.json, "data_bar.json")
  .await(makemap);

var randomColor = Math.floor(Math.random()*16777215).toString(16);
var year1 = 2004


// create slider
d3.select("body").insert("p", ":first-child").append("input")
.attr("type", "range")
.attr("min", "2004")
.attr("max", "2014")
.attr("value", year1)
.attr("id", "year");

var title = d3.select("body").insert("h1", ":first-child")
title.text(year1)

console.log(year1);
function makemap(error, us, data_map, data_bar){
  if (error) throw error;
  d3.select("#year").on("input", function() {
    year1 = this.value
    title.text(year1)

data_bar = data_bar
svg.selectAll("g")
  .on("click", function(d) {
    svg.select("text1").enter().attr("text", "");
    console.log(data_map[String(year1)]["state" + String(d.id)]);
    d3.event.stopPropagation();


    });
  })

  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("class", function(d) { return "state" + d.id; })
    .attr("d", path)
    .style("fill", randomColor)
    .on("click", function(d) {


      data1 = data_bar[String(year1)]["state" + String(d.id)]
      stateid = "state" + String(d.id)
      updatebar(data1, stateid, year1, x, y)
      d3.event.stopPropagation();
      });



svg.append("path")
  .attr("class", "state-borders")
  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));


function updatebar(data1, stateid, year1, x, y, remove){

      d3.selectAll(".yaxis1").remove()
      d3.selectAll(".bar").remove()
      d3.selectAll(".xaxis1").remove()

  console.log(data1);
 q = Object.getOwnPropertyNames(data1)
 data = data1
data_list = []
data_list1 =[]

// data_list1.push(q[1])
data_list1.push(q[2])
data_list1.push(q[3])
data_list1.push(q[4])
data_list1.push(q[5])

// data_list.push(parseFloat(data1["Violent crime rate"]))
data_list.push(parseFloat(data1["Murder and nonnegligent Manslaughter rate"]))
data_list.push(parseFloat(data1["Legacy rape rate"]))
data_list.push(parseFloat(data1["Robbery rate"]))
data_list.push(parseFloat(data1["Aggravated assault rate"]))

console.log(data_list);
 w = data1["Violent crime rate"]
 console.log(data1);
  // Scale the range of the data in the domains
  x.domain(data_list1.map(function(d) { return d; }));
  y.domain([0, d3.max(data_list, function(d) { return d})])

  console.log(q.length)
  svg.selectAll(".bar")
      .data(data_list)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i ) { return 275 + (i * 350) })
      .attr("y", function(d, i) { return 1450 - ( d )})
      .attr("height", function(d, i) { return d; })
      .attr("width", 30)

  svg.append("g")
      .attr("class", 'xaxis1')
      .attr("transform", "translate(100," + 1450 + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .attr("class", 'yaxis1')
      .attr("transform", "translate(100," + 700 + ")")
      .call(d3.axisLeft(y));


}


var colorScale = d3.scaleLinear()
  .range(["#C67171", "#00CD00"])
  .interpolate(d3.interpolateLab);


}}
