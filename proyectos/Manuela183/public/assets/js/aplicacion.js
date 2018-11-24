var btnMenuOpen = document.getElementById("btn-menu-open"); /*Definir variable, llamar boton por id de btn en index*/
var menuLateral=document.getElementById("menu-lateral");
var btnMenuClose=document.getElementById("btn-menu-close");
var btnNavToggle =document.getElementById("btn-nav-toggle");
var navLinks= document.getElementById("nav-links");

/*===========================EVENTOS=============================================*/
/*Cuando se llama a la función no se copia nada en paréntesis*/
btnMenuOpen.addEventListener("click", mostrarMenuLateral); 
btnMenuClose.addEventListener("click", ocultarMenuLateral);
btnNavToggle.addEventListener("click", toggleNavLinks);
window.addEventListener("resize", arreglarNavLinks); /*Arreglar cambio de menú principal según tamaño de pantalla */

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

function cargarDatos(){
    var datos =[
        /*Links menú lateral*/
        {url:"//unal.edu.co", nombre: "UNAL", instruccion: "Instrucción UNAL"},
        {url:"//css-trick.com", nombre: "CSS Tricks", instruccion: "Instrucción CSS Tricks"},
        {url:"//rogerdudler.github.io/git-guide/index.es.html", nombre: "Git: guía sencilla", instruccion: "Instrucción Git: Guía Sencilla"},
        {url:"assets/uploads/actividades/actividad-normal/index.html", nombre: "Determinar operación", instruccion: "Fíjate en los números y selecciona la operación que da el resultado"},
        {url:"assets/uploads/actividades/actividad-canvas/index.html", nombre: "Agrupar", instruccion: "Agrupa los animales"},
    ];
    return datos;
}

function generarLinks(){
    var menuLinks=document.getElementById("menu-links");
    menuLinks.innerHTML="";

    var links = cargarDatos();
    if (links.length >0){
        //Llegaron datos
        for (var i=0; i<links.length; i++){
            var texto=document.createTextNode(links[i].nombre);

            var link= document.createElement("a");
            link.href = links[i].url;
            /*link.target= "_blank"; // Abrir links url en una nueva pestaña en vez de redireccionar*/
            link.target="main-iframe";//Abrir link url en el iframe
            link.appendChild(texto);

            var itemLista= document.createElement("li");
            itemLista.appendChild(link);

            menuLinks.appendChild(itemLista);

        }
    }else{
        var texto= document.createTextNode("No se ha encontrado ninguna actividad");
        var itemLista= document.createElement("li");
        itemLista.appendChild(texto);
        menuLinks.appendChild(itemLista);
    }
}

generarLinks();

