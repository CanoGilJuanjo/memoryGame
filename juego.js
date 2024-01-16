//Se crean las cartas que se pasan por parametro
function crearTablero(){
    let url = "";
    for(let i = 0; i<location.href.split("/").length -1; i++){
        url += location.href.split("/")[i]+"/";
    }
    url += "/index.html";
    //Extraemos las cartas del localStorage
    
    let nCartas = localStorage.getItem("cartas");
    for(let i = 0; i<nCartas; i++){
        document.write("<div class='carta'>"+nCartas+"</div>");
    }
}



crearTablero()

for(let carta of document.getElementsByClassName("carta")){
    console.log(carta.textContent);
}


//Cuanta atras hasta terminar la partida
let contador = localStorage.getItem("tiempo");
setInterval(
    function(){
        document.querySelector("#tiempo").innerHTML = "Tiempo: "+contador;
        if(contador > 0){
            contador--;
        }
    },
    1000
)