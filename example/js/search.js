// Classe para chamar o Json.
function busca(){
  var qtd;
  var buscaInputTermos;
  var nome;
  var urlFoto;
  var birthDate;
  var deathDate;
  var biografia;
  
  console.log("here");


  // Resgatar valores.
  busca.prototype.resgatarValores = function(){
    $('#resultado').html('Carregando dados...');

    // Estrutura de resultado.
    $.getJSON('datas/informationDirectors.json', function(data){
      this.qtd = data.directors.length;
      this.nome = '';
      this.urlFoto = '';
      this.birthDate = '';
      this.deathDate = '';
      this.biografia = ';'

      buscaInputTermos = 'Steven Spielberg';

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
