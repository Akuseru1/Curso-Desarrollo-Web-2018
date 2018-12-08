var btnMenuOpen = document.getElementById("btn-menu-open"); /*Definir variable, llamar boton por id de btn en index*/
var menuLateral=document.getElementById("menu-lateral");
var btnMenuClose=document.getElementById("btn-menu-close");
var btnNavToggle =document.getElementById("btn-nav-toggle");
var navLinks= document.getElementById("nav-links");
var textoInstruccion = document.getElementById("texto-instruccion");

/*===========================EVENTOS=============================================*/
/*Cuando se llama a la función no se copia nada en paréntesis*/
btnMenuOpen.addEventListener("click", mostrarMenuLateral); 
btnMenuClose.addEventListener("click", ocultarMenuLateral);
btnNavToggle.addEventListener("click", toggleNavLinks);
window.addEventListener("resize", arreglarNavLinks); /*Arreglar cambio de menú principal según tamaño de pantalla */

document.addEventListener("DOMContentLoaded",cargarDatos);
/*===========================FUNCIONES===========================================*/

function mostrarMenuLateral(){ /*Funciones para ejecutar acción*/
    menuLateral.classList.add("mostrar");
}

function ocultarMenuLateral(){
    menuLateral.classList.remove("mostrar");
}

function toggleNavLinks(){
    navLinks.classList.toggle("mostrar"); /*Mostrar y esconder menú principal en pantaña de menos de 900px*/
}

function arreglarNavLinks(){
    if(window.innerWidth>=900){
        navLinks.classList.remove("mostrar");
    }
}

function cargarDatos() {
    var url = menuLateral.dataset.url;
    var datos = [];
    axios.get(url)
        .then(function(res) {
            var actividades = res.data.actividades; //cumple
            if (actividades.length > 0) {
                actividades.forEach(function(actividad) {
                    var obj = {
                        url: actividad.rutaArchivo,
                        nombre: actividad.nombre,
                        instruccion: actividad.instruccion
                    };
                    datos.push(obj);
                });
                
            }
        } ).catch(function(err) {
            console.log(err.response);//no me cumplen
        }).finally(function() {
            generarLinks(datos);
        });
}

function generarLinks(links){
    var menuLinks=document.getElementById("menu-links");
    menuLinks.innerHTML="";

    if (links.length >0){
        //Llegaron datos
        for (var i=0; i<links.length; i++){
            var texto=document.createTextNode(links[i].nombre);

            var link= document.createElement("a");
            link.href = links[i].url;
            /*link.target= "_blank"; // Abrir links url en una nueva pestaña en vez de redireccionar*/
            link.target="main-iframe";//Abrir link url en el iframe
            link.appendChild(texto);
            link.dataset.instruccion = links[i].instruccion;
            var itemLista= document.createElement("li");
            itemLista.appendChild(link);

            link.addEventListener("click",actualizarContenido);

            menuLinks.appendChild(itemLista);

        }
    }else{
        var texto= document.createTextNode("No se ha encontrado ninguna actividad");
        var itemLista= document.createElement("li");
        itemLista.appendChild(texto);
        menuLinks.appendChild(itemLista);
    }
}

    function actualizarContenido (evento) {
        textoInstruccion.textContent = evento.target.dataset.instruccion;
        //para actualizar la instruccion cada vez que se hace click
    }
    function enviarPuntaje(puntaje) {
        alert( "tu puntaje es: "+ puntaje *100);
    }




