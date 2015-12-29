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

        chart.tooltip.contentGenerator(function (d) {
            
          var html = "<table><thead><td colspan='3'>Movie: <b>"+d.point.movie+"</b></td></thead>" 
          
          d.series.forEach(function(elem){
            var movie = d.point.movie;
            var year = d.point.x;
            var rating = d.point.y;
            var votes = d.point.size;
            var cover = d.point.cover;
            html += "<tbody><tr><td colspan='3'>Year: <b>" + year + "</b></tr>";
            html += "<tr><td>rating: <b>" + rating + "</b></tr>";
            html += "<tr><td>votes: <b>" + votes + "</b></tr><td></tbody></table>";
            if (cover != "NA"){
                html += "<img src=" + cover + " align='center'>";
            }
            
          })
          return html;
        });

        
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
                    console.log(movies[j]["cover"])
                    data[0].values.push({
                        x: parseInt(movies[j]["year"], 10),
                        y: parseInt(movies[j]["rating"]),
                        size: parseInt(movies[j]["cover"]),
                        cover: movies[j]["fcover"],
                        movie: movies[j]["movie"],
                        shape: shapes[j % shapes.length]
                    });
                }
            };
        };
        return data;
    }

});


