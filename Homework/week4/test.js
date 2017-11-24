console.log("aaaaaaaaaaaaa");

d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

var svg = d3.select("svg")
 // .selectAll("rect")
 //  .enter().append("rect")
 //  .attr("x", 10)
 //  .attr("y", 10)
 //  .attr("width", 30)
 //  .attr("height", 30)
 //  .style("fill", "green")
svg.selectAll(".st1")
  .attr("text", "aaa")
  .style("fill", "#ccece6")
svg.selectAll(".st2")
  .style("fill", "orange")
svg.selectAll(".st0")
  .style("fill", "purple")


});
