var allMovies;
var director;

$.getJSON("example/js/listMovieDirectors.json", function (data) {
    allMovies = data;
    director = getDirector(getParameterByName('director'));

    //show a specific director as chart example.
    if (director.length == 0){
        director = getDirector("Quentin Tarantino");
    }    
    
    var chart;
    var linechart;


    nv.addGraph(function () {
        var linechart = nv.models.lineChart();
        //.margin({left: 100, right: 70})  //Adjust chart margins to give the x-axis some breathing room.              

        linechart.forceY([0, 10]);
        linechart.showYAxis(false).showXAxis(false);
        linechart.interactive(false);
        linechart.showLegend(false);

        // linechart.yAxis     //Chart y-axis settings
        //     .axisLabel('Voltage (v)')
        //     .tickFormat(d3.format('.02f'));

        /* Done setting the chart up? Time to render it!*/
        var myData = lineReg();   //You need data...

        d3.select('#test1 svg')    //Select the <svg> element you want to render the chart in.
            .datum(myData)         //Populate the <svg> element with chart data...
            .call(linechart)       //Finally, render the chart!

        //Update the chart when window resizes.
        //nv.utils.windowResize(function() { linechart.update() });
        return linechart;
    });

    nv.addGraph(function () {
        chart = nv.models.scatterChart()
            .showDistX(false)
            .showDistY(false)
            .duration(300)
            //color =
            .color(
            d3.scale.ordinal()

                .range(["#991824"]));

        chart.dispatch.on('renderEnd', function () {
            console.log('render complete');
        });


        //chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        chart.forceY([0, 10]);
        chart.showLegend(false);


        chart.yAxis
            .axisLabel('Rating');

        chart.xAxis
            .axisLabel('Year');

        d3.select('#test1 svg')
            .datum(nv.log(director)).call(chart);

        chart.tooltip.contentGenerator(function (d) {

            var html = "<table><thead><td colspan='3'>Movie: <b>" + d.point.movie + "</b></td></thead>"

            d.series.forEach(function (elem) {

                var movie = d.point.movie;
                var year = d.point.x;
                var rating = d.point.y;
                var votes = d.point.size;
                var cover = d.point.cover;
                html += "<tbody><tr><td colspan='3'>Year: <b>" + year + "</b></tr>";
                html += "<tr><td>rating: <b>" + rating + "</b></tr>";
                html += "<tr><td>votes: <b>" + votes + "</b></tr><td></tbody></table>";
                if (cover != "NA") {
                    html += "<img src='" + cover + "' align='center'>";
                }

            })
            return html;
        });


        return chart;

    });

    /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
});
/**************************************
 * Simple test data generator
 */
function lineReg() {
    var reg = [];
    var regValues = [];

    //Data is represented as an array of {x,y} pairs.
    director[0].values.forEach(function (r) {
        regValues.push([r.x, r.y]);
    });

    var result = regression('linearThroughOrigin', regValues);

    result.points.forEach(function (e) {
        reg.push({x: e[0], y: e[1]});
    });

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: reg,      //values - represents the array of {x,y} data points
            key: '', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
        }
    ];
}


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
                    cover: movies[j]["fcover"],
                    movie: movies[j]["movie"],
                    shape: shapes[j % shapes.length]
                });
            }
        }
    }
    return data;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function busca(){
    var qtd;
    var buscaInputTermos;
    var nome;
    var urlFoto;
    var birthDate;
    var deathDate;
    var biografia;

    


    // Resgatar valores.
    busca.prototype.resgatarValores = function(){
        $('#resultado').html('Carregando dados...');

        // Estrutura de resultado.
        $.getJSON('example/datas/informationDirectors.json', function(data){
            this.qtd = data.directors.length;
            this.nome = '';
            this.urlFoto = '';
            this.birthDate = '';
            this.deathDate = '';
            this.biografia = '';

            buscaInputTermos = getParameterByName('director');

            for (i = 0; i < this.qtd; i++){
                if (buscaInputTermos == data.directors[i].FIELD1){

                    this.nome =  data.directors[i].FIELD1 + '<br />';
                    this.urlFoto = '<img src=' + data.directors[i].FIELD2.trim() + '" class="img-responsive"><br />';
                    this.birthDate =  data.directors[i].FIELD4 + '<br />';


                    if (data.directors[i].FIELD5.trim() == "NA"){
                        this.deathDate = '---';
                    }else{
                        this.deathDate =  data.directors[i].FIELD5.trim() + '<br />';
                    }

                    this.biografia = data.directors[i].FIELD3 + '<br /><br />';

                }


            }

            $('#nome').html(this.nome);
            $('#urlFoto').html(this.urlFoto);
            $('#birthDate').html(this.birthDate);
            $('#deathDate').html(this.deathDate);
            $('#biografia').html(this.biografia);

        });

    }

}

// Objeto.
var obj = new busca();
obj.resgatarValores();