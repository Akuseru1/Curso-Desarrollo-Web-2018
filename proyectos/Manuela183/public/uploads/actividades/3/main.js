/*vars and name functions they should not start in uppercase*/
/*continue button should be a const
	const continueButton = document.getElementById('btn')
*/
var continueButton = document.getElementById("btn");
continueButton.addEventListener("click",CalcPuntaje);
var elegir; // sera el que escoja la secuencia inicial
var repetir; //permite que la misma secuencia no se repita
var inicio = false;
var finJuego = false;
var OpcionesAleatoria = [];
var secuencia1 = [];
var secuencia2 = [];
var secuencia3 = [];
var secuenciaFinal = [];
var indice; //guarda el indice de la respuesta en "secuencia"
var Respuesta; //guarda la respuesta
var OPCIONES = [];
var puntaje = 0;
var botonPress;
var estadoBoton = false;



window.onload = function () {
    
        inicioJuego();
        escogerRespuesta();
        mostrarSecuencia();
        mostrarEleccion();
        
    
}

//Funciones
//Se asegura que no se repitan los juegos en cada siguiente
function inicioJuego() {
/*REDUNDANT EVALUATION
inicio == false

should be !inicio
*/
    if (!inicio) {
        elegirAleatorio()
        repetir = elegir; //3
        inicio = true;
    } else {
        while (repetir == elegir) {
            elegirAleatorio();
        }
        repetir = elegir;
    }
}
//llena el vector de numeros y escoje un numero para poner como pregunta
function escogerRespuesta() {
    switch (elegir) {
        case 1:
            formaExplicita1(secuenciaAleatorio1());
            indice = indiceAleatorio();
            Respuesta = secuencia1[indice];
            secuenciaFinal = secuencia1;
            OPCIONES = elegirRespuestas(secuenciaFinal);
            secuenciaFinal[indice] = '?';
            break;
        case 2:
            formaExplicita2(secuenciaAleatorio2());
            indice = indiceAleatorio();
            Respuesta = secuencia2[indice];
            secuenciaFinal = secuencia2;
            OPCIONES = elegirRespuestas(secuenciaFinal);
            secuenciaFinal[indice] = '?';
            break;

        case 3:
            formaExplicita3(secuenciaAleatorio3());
            indice = indiceAleatorio();
            Respuesta = secuencia3[indice];
            secuenciaFinal = secuencia3;
            OPCIONES = elegirRespuestas(secuenciaFinal);
            secuenciaFinal[indice] = '?';
            break;

        default:
            break;
    }
}

/////////////////////////////////////
//Herramientas
//posibles limites para cada sucesion dado que no debe superar el 99
function secuenciaAleatorio1() {
    return Math.floor(Math.random() * (25 - 10+1) + 10);
    
}
function secuenciaAleatorio2() {
    return Math.floor(Math.random() * (13 - 1+1) + 1);
    
}
function secuenciaAleatorio3() {
    return Math.floor(Math.random() * (64 - 1+1) + 1);
    
}
//las diferentes formulas  para crear sucesiones
//primera sucesion
function formaExplicita1(num) {
    var lim = num - 7;
    var sum = 0;
    //alert(num + "este es el 1");
    for (num; num > lim; num--) {
        secuencia1[sum] = (4 * num) - 2;
        sum++;

    }
}
//segunda sucesion
function formaExplicita2(num) {
    var lim = num + 7;
    var sum = 0;
    //alert(num + "este es el 2");
    for (num; num < lim; num++) {
        secuencia2[sum] = (5 * num) - 2;
        sum++;
    }
}
//tercera sucesion
function formaExplicita3(num) {
    var lim = num + 7;
    var sum = 0;
    //alert(num + "este es el 3");
    var variable = num;
    for (num; num < lim; num++) {
        secuencia3[sum] = (variable);
        variable +=6; 
        sum++;
    }
}

//permite escojer un indice aleatorio
function indiceAleatorio() {
    return (Math.floor(Math.random() * (5 - 1+1) + 1));
}
//permite escojer una de las 3 posibles sucesiones
function elegirAleatorio() {
    elegir = Math.floor(Math.random() * (3 - 1+1) + 1);
}

function elegirRespuestas(actual = []) {
    var temporal = [];
    var repetidos;

    for (let i = 0; i < 4; i++) {
        repetidos = Math.floor(Math.random() * (actual[indice + 1] - actual[indice - 1]+1) + actual[indice - 1]);
        temporal[i] = repetidos;
    }


     temporal = valoresUnicos(temporal,actual);

    for (let i = 0; i < temporal.length; i++) {
        if (temporal[i] == Respuesta)
        
            return temporal;
    }

    temporal[Math.floor(Math.random() * (3 - 0+1) + 0)] = Respuesta;
    return temporal;
}

//se encarga que el vector de opciones no tenga valores repetidos
function valoresUnicos(tempo,actual2) {
    
    var vectorUnico = false;
    
    while (!vectorUnico) {
        var cont = 0;
        for (let i = 0; i < tempo.length; i++) {
            for (let j = 0; j < tempo.length-1; j++) {
                if (i != j){
                    while(tempo[i] == tempo[j]){
                        cont++;
                       
                        tempo[j] =  Math.floor(Math.random() * (actual2[indice + 1]-1 - actual2[indice - 1]+1) + actual2[indice - 1]);
                    }
                }          
            }   
        } 
        if(cont == 0)
            vectorUnico = true;
    }
   return tempo;
    
}


function mostrarSecuencia() {

    var mostrar = document.getElementById("OP");
    mostrar.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        var texto = document.createTextNode(secuenciaFinal[i]);
        var mostrar1 = document.createElement("li");
        mostrar1.appendChild(texto);
        mostrar.appendChild(mostrar1);
    }

}
//debe recibir un numero (la respuesta) y debe devolver numeros cercanos
function mostrarEleccion() {

    var mostrar = document.getElementById("elec");
    mostrar.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        var texto;
        switch(i){
            case 0:  texto = document.createTextNode("a. "+OPCIONES[i]);
             break;
            case 1:  texto = document.createTextNode("b. "+OPCIONES[i]);
                break;
            case 2:  texto = document.createTextNode("c. "+OPCIONES[i]);
                break;
            case 3:  texto = document.createTextNode("d. "+OPCIONES[i]);
                break;
             default:
                 break;
        }
        
        var mostrar1 = document.createElement("button");
        mostrar1.setAttribute("style","font-size: 30px; background-color:aqua; width: 100px; height: 50px;-moz-border-radius:13px; -webkit-border-radius:13px; border-radius:13px;border: 1px solid var(--c-Color1);");
        mostrar1.value = OPCIONES[i];
	/*
	inside the value of onClick Mostrar1 is undefined to refer to a button where the event occurs we can use this
	Mostrar1.setAttribute("onClick", "Presionando(Mostrar1)";

should be 
Mostrar1.setAttribute("onClick","Presionado(this)");

*/
        mostrar1.setAttribute("onClick","Presionado(this)");
        mostrar1.appendChild(texto);
        mostrar.appendChild(mostrar1);
    }
}

function Presionado(pressedButton) {
    if(!estadoBoton) {
        cambiarEstadoTrue(pressedButton);
    } else {
        cambiarEstadoFalse(pressedButton);
    }
}

function CalcPuntaje() {
/*
    use Puntaje+=1 instead of Puntaje++

*/
    if (isNaN(parseInt(localStorage.getItem("guardado")))) {
        puntaje = (botonPress == Respuesta) ? puntaje + 1 : puntaje;
        localStorage.setItem("guardado", puntaje);
        
        alert("Tu puntaje: "+puntaje);
        location.reload();
    } else {
        memoria = localStorage.getItem("guardado");
        memoria = (botonPress == Respuesta) ? parseInt(localStorage.getItem("guardado")) + 1 : parseInt(localStorage.getItem("guardado"));
        alert("Tu Puntaje: " + memoria);
        localStorage.setItem("guardado",memoria);
        if (parseInt(localStorage.getItem("guardado")) == 5) {
            while (true) {
                alert("Ganaste!");
            }
        }
        location.reload();
    }
}

function cambiarEstadoTrue(presion) {
    presion.setAttribute("style","font-size: 30px;background-color:aqua; width: 100px; height: 50px;-moz-border-radius:13px; -webkit-border-radius:13px; border-radius:13px;border: 1px solid var(--c-Color3);");
/*
to prevent errors parseInt(presion.value)
*/
    botonPress = parseInt(presion.value);
    estadoBoton = true;
    
}

function cambiarEstadoFalse(presion) {
    presion.setAttribute("style","font-size: 30px;background-color:aqua; width: 100px; height: 50px;-moz-border-radius:13px; -webkit-border-radius:13px; border-radius:13px;border: 1px solid var(--c-Color2);");
    estadoBoton = false;
}
