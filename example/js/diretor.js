var allMovies;
var director;
$.getJSON("js/listMovieDirectors.json", function (data){
    allMovies = data;

    var chart;
    nv.addGraph(function() {
        chart = nv.models.scatterChart()
            .showDistX(false)
            .showDistY(false)
            .duration(300)
        //color =
            .color(
            d3.scale.ordinal()

            .range(["#991824"]));

        chart.dispatch.on('renderEnd', function(){
            console.log('render complete');
        });

        //chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));


        director = getDirector("Steven Spielberg");

        d3.select('#test1 svg')
            .datum(nv.log(director)).call(chart);

        // chart.tooltip.contentGenerator(function () {
        // 	return "<table>" +
        // 			    "<thead>" +
        // 			    	"<tr>" + 
        // 			    		"<td colspan='3'>" +
        // 			    			 	"<strong class='x-value'>"+ director[0].values[1].movie +"</strong>" +
        // 			    	    "</td>"+
        // 			    	"</tr>" +

        // 			    "</thead>" +


        // 			    "<tbody>" +
        // 			    	"<tr>" +
        // 			    		"<td class='legend-color-guide'>" +
        // 			    			"<div style='background-color: rgb(31,119,180)'></div>" +
        // 			    		"</td>" +
        // 			    		"<td class='key'>"+ director[0].key +"</td>" +

        //  			    	"<td class='value'>" + director[0].values[1].size + " votes</td>"+
        //  			    	"<td>" + director[0].values[1].x + "</td>" +
        // 			    	"</tr>"
        // 			    "</tbody>" +

        // 			    "<img src='' style='width:304px;height:228px;'>" +
        // 	      "</table>";
        // });


        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;
    });



    function getDirector(name) { //# groups,# points per group
        var data = [],
            shapes = ['circle'],
            random = d3.random.normal();

        for (var i = 0; i < allMovies.length; i++) {
            if (allMovies[i].director === name) {

                data.push({
                    key: allMovies[i].director,
                    values: [],
                    slope: Math.random() - .01,
                    intercept: Math.random() - .5
                });

                var movies = allMovies[i]["movies"];
                for (j = 0; j < movies.length; j++) {
                    data[0].values.push({
                        x: parseInt(movies[j]["year"], 10),
                        y: parseInt(movies[j]["rating"]),
                        size: parseInt(movies[j]["cover"]),
                        movie: movies[j]["movie"],
                        shape: shapes[j % shapes.length]
                    });
                }
            };
        };

        // for (i = 0; i < groups; i++) {
        //     data.push({
        //         key: allMovies[i].director,
        //         values: [],
        //         slope: Math.random() - .01,
        //         intercept: Math.random() - .5
        //     });


        //     var movies = allMovies[i]["movies"];
        //     for (j = 0; j < movies.length; j++) {
        //         data[i].values.push({
        //             x: parseInt(movies[j]["year"], 10),
        //             y: parseInt(movies[j]["rating"]),
        //             size: parseInt(movies[j]["cover"]),
        //             movie: movies[j]["movie"],
        //             shape: shapes[j % shapes.length]
        //         });
        //     }
        // }
        return data;
    }

});


