function createPositiveNegativeGraph(div,jsonGainer){
	console.log("inside createPositiveNegativeGraph",jsonGainer);
	var processed_json = new Array();
	var category = new Array();
	$.map(jsonGainer, function(obj, i) {
	    processed_json.push([obj.key, parseInt(obj.value)]);
	    category.push(obj.name);
	});
	
	$('#'+div).highcharts({
	        chart: {
	            type: 'column'
	        },
	        xAxis: {
	            title:{text:"Features"},
	            //min:1,
	            offset:1,
	            type: category
	        },
	         yAxis: {
	            title:{text:"Number of samples with missing data"},
	            //min:1,
	            offset:1,
	            type: category
	        },
	        series: [{
	            name: "Features",
	            data: processed_json
	        }
	          ]
	    });
}

function createLineChart(div,categories,series_data_miss,series_data_replaced,series_data_estimated){
	 $('#'+div).highcharts({
        title: {
            text: 'Real estate KNN plot',
            x: -20 //center
        },
        subtitle: {
            text: 'KNN plot',
            x: -20
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Mean absolute error $'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Missing data removed',
            data: series_data_miss
        },  {
            name: 'Replaced with mean',
            data: series_data_replaced
        }, {
            name: 'Estimated with EM',
            data: series_data_estimated
        }]
    });
}