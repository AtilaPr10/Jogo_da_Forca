const menuSection =         document.querySelector('.menu-section');
const gameSection =         document.querySelector('.game-section');
const userRightLettersDiv = document.querySelector('.user-right-letters');
const newWordSection      = document.querySelector('.new-word-section');
const userWrongLettersDiv = document.querySelector('.user-wrong-letters');
const hangmanImageDiv     = document.querySelector('.hangman-img');


//dados com as palavras a serem sorteadas
var palavras =['maça', 'banana','manga','tangerina','uva','pera','laranja','abacaxi','pessego','mamao','maracuja'] ;
const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'];
var palavra_digitada = [];
var str;
var palavra_sorteada;
var tamanho_do_texto;
var palavraok=0;
var pressed = document.getElementById('pressed');
var letra = document.getElementById('letra');
var letra2 = document.getElementById('letra2');
var tries = 6;
var maximo_tentativa= 10;
var numero_tentativas=0;
let = pagina_Atual = menuSection;



//retorna a palavra baseada em um numero aleatorio
function sorteiaPalavra(num_aleatorio) {
   
       return palavras[num_aleatorio];


}

//Gera um numero aleatorio de 0 a 11
function  retornaNumeroAleatorio() {
       var numero;
       numero =  Math.floor(Math.random() *10 + 1);
       return numero;
} 


function irparaJogo(){
    pagina_Atual.classList.add('hide');
    gameSection.classList.remove('hide');
    pagina_Atual = gameSection;
    iniciaJogo();

}


function iniciaJogo(){
    palavra_digitada=[];   
    pressed.innerHTML = palavra_digitada;
    tries=6;
    hangmanImageUpdate(tries);
    maximo_tentativa= 10; 
    numero_tentativas=0;
    //funcao que seta a palavra sorteada
    var indice = retornaNumeroAleatorio();
    palavra_sorteada = sorteiaPalavra(indice);
    console.log(palavra_sorteada);
    montaLinha();


}

function montaLinha(){
  console.log(palavra_sorteada.length);
  /*
  for (let i = 0 ;i < palavra_sorteada.length ; i++){
        //desenha a base das letras de acordo com a quantidade de caracteres das palavras 
         const wordElement = document.createElement('div');
         wordElement.setAttribute('class', 'word-letter');
         wordElement.setAttribute('id','letter-i-${i}');
         userRightLettersDiv.appendChild(wordElement);
   
   }
  */

   letra2.innerHTML = 'Você tem no total 10 tentativas ou ate completar a forca,a fruta contém '+ palavra_sorteada.length+ '  letras:  ';
}


function verificaPalavra(caractere){
      
       if(numero_tentativas === maximo_tentativa){
              alert('Maximo de Tentativas ');
              location.reload();
       }
       
      
      
       
       //se letra exite na palavra
       if (palavra_sorteada.includes(caractere)){
              numero_tentativas++;
          for(let i=0; i < palavra_sorteada.length; i++){
                   
                   
                   
                   if(palavra_sorteada[i] === caractere){
                          palavra_digitada[i] = caractere.toUpperCase();
                         
                          palavraok++;
                          console.log(palavraok);

                   }
                   if(palavra_digitada[i] != ''){

                         continue;

                   }
          }
              
             console.log('faz parte');
             //coloca a letra na posição
             //letra.innerHTML += caractere.toUpperCase();
             letra.innerHTML  = palavra_digitada;
             numero_tentativas++
             
       }else {
              console.log('nao faz parte');
              pressed.innerHTML += str.toUpperCase();  
              //desenha a parte do erro 
              tries--;
              hangmanImageUpdate(tries);
              numero_tentativas++;
              if(tries === 0){
                    alert('Fim de Jogo');
                    location.reload();
                    return;
              }

       }

       if(palavraok == palavra_sorteada.length){
              alert('Ganhou!!');
             // location.reload();
       }

   }  


   
   

 //Exibe as Teclas Digitadas
 document.onkeypress = function(evt) {
       str = capturaTecla(evt);
      
       if(validaLetras(str)){
              console.log('letra digitada ' + str);
              verificaPalavra(str);
       }
}     

//Captura a tecla digitada
function capturaTecla(evt){
       evt = evt || window.event;
       var key = evt.keyCode || evt.which;
       return String.fromCharCode(key); 


}

//Valida se o que foi digitado e letra
function validaLetras(letra){
        if(letras.includes(letra)){
                return letra;

       }
       else{
              
                alert('Digite apenas letras!! ');
       }
}

function hangmanImageUpdate(whatTryIsUser) {
       hangmanImageDiv.innerHTML = `<img src="./imgs/${whatTryIsUser}-try.svg" alt="" id="man">` 
   }


function desistir(){

       location.reload();

}   
  