// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("Happiness.csv", function(data) {

// X axis
var x1 = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Country; }))
  .padding(0.2);
svg1.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x1))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y1 = d3.scaleLinear()
  .domain([0, 8])
  .range([ height, 0]);
svg1.append("g")
  .call(d3.axisLeft(y));


   // create a tooltip
var Tooltip = d3.select('body')
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// Bars
svg1.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x1(d.Country); })
    .attr("y", function(d) { return y1(d.Score); })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return height - y1(d.Score); })
    .attr("fill", "#FFFF9F")
    .on("mouseover", function(d) {
      Tooltip
        .style("opacity",1)
        .html(d.Country + " " + d.Score)
        .style('transform', `translate(${d3.event.layerX}px, ${d3.event.layerY-700}px)`)
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", .5)
        .style("opacity",1)
  })
  .on("mouseout", function(d) {
      Tooltip
        .style("opacity",0)
      d3.select(this).style("stroke","none");
  });

})