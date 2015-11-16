// custom javascript


$(function() {
  console.log('jquery is working!')
  createGraph();
});

function createGraph() {

  // main config
  var width = 960; // chart width
  var height = 700; // chart height
  var format = d3.format(",d");  // convert value to integer
  var color = d3.scale.category20b();  // create ordial scale with 20 colors
  var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50]);  // https://github.com/mbostock/d3/wiki/Quantitative-Scales#pow

  // bubble config
  var bubble = d3.layout.pack()
    .sort(null)  // disable sorting, use DOM tree traversal
    .size([width, height])  // chart layout size
    .padding(1)  // padding between circles
    .radius(function(d) { return 20 + (sizeOfRadius(d) * 60); });  // radius for each circle

  // svg config
  var svg = d3.select("#chart").append("svg") // append to DOM
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bubble");

  // tooltip config
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");

  // request the data
  d3.json("/data", function(error, quotes) {
    console.log(quotes)
    var node = svg.selectAll('.node')
      .data(bubble.nodes(quotes).filter(function(d) { return !d.children; }))
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

  node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style('fill', function(d) { return color(d.symbol); })

    .on("mouseover", function(d) {
      tooltip.text(d.name + ": $" + d.price);
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
      return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append('text')
      .attr("dy", ".3em")
      .style('text-anchor', 'middle')
      .text(function(d) { return d.symbol; });

  });
	
	
	//REQUEST THE DATA
	d3.json("/data", function(error, quotes) {
	  var node = svg.selectAll('.node')
	    .data(bubble.nodes(quotes)
	    .filter(function(d) { return !d.children; }))
	    .enter().append('g')
	    .attr('class', 'node')
	    .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

	    node.append('circle')
	      .attr('r', function(d) { return d.r; })
	      .style('fill', function(d) { return color(d.symbol); });

	    node.append('text')
	      .attr("dy", ".3em")
	      .style('text-anchor', 'middle')
	      .text(function(d) { return d.symbol; });
	});

//		InitChart();
	
	/*var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.time.format("%Y-%m").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./bar-data.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});*/

}

function InitChart() {

	  var width = 960; // chart width
	  var height = 700; // chart height
	  var format = d3.format(",d");  // convert value to integer
//	  var color = d3.scale.category20b();  // create ordial scale with 20 colors
	  
	  var barData = [{
	    'x': 1,
	    'y': 5
	  }, {
	    'x': 20,
	    'y': 20
	  }, {
	    'x': 40,
	    'y': 10
	  }, {
	    'x': 60,
	    'y': 40
	  }, {
	    'x': 80,
	    'y': 5
	  }, {
	    'x': 100,
	    'y': 60
	  }];

	  var vis = d3.select('#visualisation'),
	    WIDTH = 1000,
	    HEIGHT = 500,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(barData, function(d) {
	        return d.x;
	      }),
	      d3.max(barData, function (d) {
	        return d.x;
	      })
	    ]),

	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(barData, function(d) {
	        return d.y;
	      }),
	      d3.max(barData, function (d) {
	        return d.y;
	      })
	    ]),

	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize(5)
	      .tickSubdivide(true),

	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize(5)
	      .orient("left")
	      .tickSubdivide(true);

	  vis.append('svg:g')
	    .attr('class', 'x axis')
	    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	    .call(xAxis);

	  vis.append('svg:g')
	    .attr('class', 'y axis')
	    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	    .call(yAxis);
	}