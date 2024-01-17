//Se crean las cartas que se pasan por parametro
function crearTablero(){
    document.write("<h1 class='puntos'>Puntos: 0</h1>");
    
    let nCartas = localStorage.getItem("cartas");
    document.write(`<div class='wrapCartas''>`);
    for(let i = 0; i<nCartas; i++){
        document.write(`<div class='carta' id='${i}'></div>`);
    }
    document.write("</div>");
}

(function(){    
    //Obtenemos las cartas y el tiempo del localStorage
    let nCartas = localStorage.getItem("cartas");
    let contador = localStorage.getItem("tiempo");
    crearTablero()

    //Asignamos los numeros a las cartas
    let cont = 0;
    let controlBucle = 0;
    let cartas = document.getElementsByClassName("carta");
    while(cont <= (nCartas/2)){
        let rand1 = Math.floor(Math.random()*nCartas);
        let rand2 = Math.floor(Math.random()*nCartas);
        if(cartas[rand1].value !== undefined || cartas[rand2].value !== undefined || rand1 === rand2){
            rand1 = Math.floor(Math.random()*nCartas);
            rand2 = Math.floor(Math.random()*nCartas);
        }else{
            cartas[rand1].value = cont;
            cartas[rand2].value = cont;
            cont++;
        }
        controlBucle++;
        if(controlBucle >= 1000){
            break;
        }
    }

    let uno = null, dos = null,puntos = 0;
    for(let i = 0; i<cartas.length; i++){
        cartas[i].addEventListener("click",function(){
            if(puntos < cartas.length/2 && contador > 0){
                if(uno == null && cartas[i].value != -1){
                    uno = cartas[i];
                    cartas[i].style.backgroundColor = "white";
                    cartas[i].innerHTML = cartas[i].value;
                }else{
                    if(dos == null && cartas[i].value != -1){
                        dos = cartas[i];
                        cartas[i].style.backgroundColor = "white";
                        cartas[i].innerHTML = cartas[i].value;
                    }else{
                        if(uno.value == dos.value && dos.id != uno.id){
                            //Sumamos puntos pero no reiniciamos los estilos
                            puntos++;
                            document.getElementsByClassName("puntos")[0].innerHTML = "Puntos: "+puntos
                            uno = null;
                            dos = null;
                            dos.value = uno.value = -1
                        }else{
                            //Reiniciamos los estilos en caso de no ser
                            dos.style.backgroundColor = uno.style.backgroundColor = "black";
                            dos.innerHTML = uno.innerHTML = "";
                            uno = null;
                            dos = null;
                        }
                    }
                }
            }
        });
        document.body.addEventListener("click",function(){
            if(puntos < cartas.length/2 && contador > 0){
                if(uno != null && dos != null){
                    if(uno.value == dos.value && dos.id != uno.id){
                        //Sumamos puntos pero no reiniciamos los estilos
                        puntos++;
                        document.getElementsByClassName("puntos")[0].innerHTML = "Puntos: "+puntos
                        uno = null;
                        dos = null;
                    }else{
                        //Reiniciamos los estilos en caso de no ser
                        setTimeout(function(){
                            dos.style.backgroundColor = uno.style.backgroundColor = "black";
                            dos.innerHTML = uno.innerHTML = "";
                            uno = null;
                            dos = null;
                        },500)
                    }
                }
            }
        })
    }

    //Cuanta atras hasta terminar la partida
    if(contador == null || isNaN(contador) || !isFinite(contador)){
        contador = 0;
    }
    setInterval(
        function(){
            if(puntos < (localStorage.getItem("cartas")/2)){
                document.querySelector("#tiempo").innerHTML = "Tiempo: "+contador;
                if(contador > 0 ){
                    contador--;
                }
            }
        },
        1000
    )
})()