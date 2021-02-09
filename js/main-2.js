(function(){
    'use strict';
    document.addEventListener('DOMContentLoaded', function(){

    console.log("Principal 2 cargado");

    //Funcion ver mas
    
    let botonVerMas = document.querySelector("#ver-mas");
    let hijos = document.querySelectorAll(".favoritos div");
    let hijosLongitud = document.querySelectorAll(".favoritos div").length;
    let contenedorPadre = document.querySelector(".favoritos");
    let contenedorTrendingPadre = document.querySelector('.contenido-gifos-trending');
    let contenedorBusqueda = document.querySelector('.contenedor-seccion-busqueda');
    let inputBusqueda = document.querySelector('#busqueda-gif');
    let btnSearch = document.querySelector('#icono-search');
    
    let contenedorSugeEvent = document.querySelector('.sugerencias');
    
    let apiKey = "am6UPP2PeTDEzXPLpkqr9IaE8Vmpi4ch"; // Api key de gyphi

    let imagenesFav= []; // arreglo de favoritos del usuario
    let imagenesGifos = []; // arreglo de gifos personales del usuario

    let botonVerMenos = document.querySelector("#ver-menos");
    if(botonVerMenos){
        botonVerMenos.style.display = "none";
    } // Boton de ver menos

    if(document.querySelector('.busqueda')){
        botonVerMas.style.display = "none";
    }

    if(contenedorPadre){
        CheckImagenes();
    } // Condicional para evitar errores en paginas donde no exista ese query

    secciontrending(apiKey, 20, contenedorTrendingPadre, "api.giphy.com/v1/gifs/trending", ""); // Seccion de gif trending

    if(contenedorBusqueda){
        btnSearch.addEventListener('click', seccionBusqueda);
        inputBusqueda.addEventListener('keydown', sugerenciasBusqueda);
    }


    function sugerenciasBusqueda (){
        if(inputBusqueda.value === ""){

            if(document.querySelector('.sugerencias')){
                document.querySelector('.sugerencias').remove();
            }
            
            btnSearch.classList.remove('icono-serach-busqueda');
            btnSearch.classList.add('icono-search');
            inputBusqueda.classList.add('busqueda-realizada');

        }else if(inputBusqueda.value.length > 3){
            if(!document.querySelector('.sugerencias')){
                
                fetch (`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&&limit=5&&q=${inputBusqueda.value}`)
                .then(response => response.json())
                .then(json => {

                    let contenedorSugerencias = document.createElement('div');
                    contenedorSugerencias.classList.add('sugerencias');

                    document.querySelector('.busqueda').appendChild(contenedorSugerencias);
                    document.querySelector('.busqueda').classList.add('busqueda-border');

                    btnSearch.classList.remove('icono-search');
                    btnSearch.classList.add('icono-serach-busqueda');

                    for(let i=0; i<json.data.length; i++){

                        let ctnParrafoSuge = document.createElement('div');
                        ctnParrafoSuge.classList.add('ctn-parrafo-suge');
                        ctnParrafoSuge.setAttribute('id', `${json.data[i].name}`);

                        let nodoP = document.createElement('p');
                        nodoP.innerText = json.data[i].name;

                        let nodoIcono = document.createElement('i');
                        nodoIcono.classList.add('fa');
                        nodoIcono.classList.add('fa-search');
                        nodoIcono.setAttribute('aria-hidden', 'true');

                        ctnParrafoSuge.appendChild(nodoIcono);
                        ctnParrafoSuge.appendChild(nodoP);

                        contenedorSugerencias.appendChild(ctnParrafoSuge);

                    }

                    

                
                document.querySelector('.sugerencias').addEventListener('click', function (e){
                    if(e.target.parentElement.classList[0] === 'ctn-parrafo-suge'){
                        let buscar = e.target.parentElement.id;
                        seccionBusquedaSugerencias(buscar);
                    }
                })

                })
                .catch(error => console.error(error))

            }
            else if(document.querySelector('.sugerencias').childNodes.length > 3){
                let nodoViejos = document.querySelectorAll('.ctn-parrafo-suge');

                fetch (`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&&limit=5&&q=${inputBusqueda.value}`)
                .then(response => response.json())
                .then(json => {

                    for(let i=0; i<json.data.length; i++){

                        let ctnParrafoSuge = document.createElement('div');
                        ctnParrafoSuge.classList.add('ctn-parrafo-suge');
                        ctnParrafoSuge.setAttribute('id', `${json.data[i].name}`)

                        let nodoP = document.createElement('p');
                        nodoP.innerText = json.data[i].name;

                        let nodoIcono = document.createElement('i');
                        nodoIcono.classList.add('fa');
                        nodoIcono.classList.add('fa-search');
                        nodoIcono.setAttribute('aria-hidden', 'true');

                        ctnParrafoSuge.appendChild(nodoIcono);
                        ctnParrafoSuge.appendChild(nodoP);

                        for(let i2 = 0; i2<nodoViejos.length; i2++){
                            nodoViejos[i].replaceWith(ctnParrafoSuge);
                        }

                    }

                    document.querySelector('.sugerencias').addEventListener('click', function (e){
                        if(e.target.parentElement.classList[0] === 'ctn-parrafo-suge'){
                            let buscar = e.target.parentElement.id;
                            seccionBusquedaSugerencias(buscar);
                        }
                    })

                })
                .catch(error => console.error(error))

            }
        }
    }

    function seccionBusqueda (e){
        e.preventDefault();
        if(inputBusqueda.value === ""){
            alert('No se ingreso nada');
        }else{
            let contenedorSeccionBusqueda = document.querySelector('.contenedor-seccion-busqueda').childNodes;

            if(contenedorSeccionBusqueda.length === 15){

                let nodoViejoH1 =  document.querySelector('#nodo-h1');
                let nodoViejo = document.querySelector('.contenido-resultado-busqueda');
                
                contenedorBusqueda.removeChild(nodoViejoH1);
                contenedorBusqueda.removeChild(nodoViejo);

                
                if(document.querySelector('.sugerencias')){
                    document.querySelector('.sugerencias').remove();
                }
                btnSearch.classList.remove('icono-serach-busqueda');
                btnSearch.classList.add('icono-search');
                inputBusqueda.classList.remove('busqueda-realizada');

                if(document.querySelector('#ver-menos')){
                    botonVerMenos.style.display = 'none';
                }

                secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", inputBusqueda.value);





            }else{
                if(document.querySelector('.sugerencias')){
                    document.querySelector('.sugerencias').remove();
                }
                btnSearch.classList.remove('icono-serach-busqueda');
                btnSearch.classList.add('icono-search');
                inputBusqueda.classList.remove('busqueda-realizada');
                secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", inputBusqueda.value);
                

            }
        }
    }

    function seccionBusquedaSugerencias (valor) {
        let contenedorSeccionBusqueda = document.querySelector('.contenedor-seccion-busqueda').childNodes;

        if(contenedorSeccionBusqueda.length === 15){

            let nodoViejoH1 =  document.querySelector('#nodo-h1');
            let nodoViejo = document.querySelector('.contenido-resultado-busqueda');
            
            nodoViejoH1.remove();
            nodoViejo.remove();

            
            if(document.querySelector('.sugerencias')){
                document.querySelector('.sugerencias').remove();
            }
            btnSearch.classList.remove('icono-serach-busqueda');
            btnSearch.classList.add('icono-search');
            inputBusqueda.classList.remove('busqueda-realizada');

            secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", valor);
        }else{
            if(document.querySelector('.sugerencias')){
                document.querySelector('.sugerencias').remove();
            }
            btnSearch.classList.remove('icono-serach-busqueda');
            btnSearch.classList.add('icono-search');
            inputBusqueda.classList.remove('busqueda-realizada');
            secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", valor);
        }
    }

    function secciontrending (api, limit, contenedor, url, q = "") {

        if(q === ""){

            fetch(`https://${url}?api_key=${api}&&limit=${limit}`)
            .then(response => response.json())
            .then(json => {

                for(let i = 0; i<json.data.length; i++){

                    let urlImg = json.data[i].images.original.url;
                    let idImg = json.data[i].id;
                    let tituloImg = json.data[i].title;
                    let alImg = `imagen-${tituloImg}`;
                    
                    let nodos = document.createElement('img');
                    nodos.setAttribute('id', idImg);
                    nodos.setAttribute('src', urlImg);
                    nodos.setAttribute('alt', alImg);

                    contenedor.appendChild(nodos);

                }

                contenedor.addEventListener('click', (e)=> {
                    if(e.target.id){
                        fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&&ids=${e.target.id}`)
                        .then(respuesta => respuesta.json())
                        .then(json => {

                            if(json.meta.status === 200){

                                let tituloImg = json.data[0].title;
                                let urlImg = json.data[0].images.original.url;
                                let userImg;
                                if(json.data[0].username === ''){
                                    userImg = 'Anonimo'
                                }else{
                                    userImg = json.data[0].username;
                                }
                                let idImg = e.target.id;

                                let nodo = document.createElement('div');
                                nodo.classList.add('centrado');
                                nodo.classList.add('gif-max');

                                let contenedorCloseNodo = document.createElement('div');
                                contenedorCloseNodo.classList.add('derecha');

                                let closeNodo = document.createElement('img');
                                if(localStorage.getItem('estilo-actual') === 'blanco'){
                                    closeNodo.setAttribute('src', 'img/close.svg');
                                }else{
                                    closeNodo.setAttribute('src', 'img/close-modo-noct.svg');
                                }
                                closeNodo.setAttribute('id', 'close-gif-max')

                                let nodoImg = document.createElement('img');
                                nodoImg.setAttribute('src', `${urlImg}`);
                                nodoImg.setAttribute('id', `${idImg}`);
                                nodoImg.setAttribute('alt', `${tituloImg}`);

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.innerHTML = `
                                    <img src="img/icon-fav.svg">
                                    <img src="img/icon-download.svg">
                                `;

                                contenedorInfo.appendChild(infoGif);
                                contenedorInfo.appendChild(gifOpciones);
                                contenedorCloseNodo.appendChild(closeNodo)

                                nodo.appendChild(contenedorCloseNodo);
                                nodo.appendChild(nodoImg);
                                nodo.appendChild(contenedorInfo);

                                document.querySelector('.seccion-trending').appendChild(nodo);

                                
                                window.addEventListener('scroll', disableScroll);

                                closeNodo.addEventListener('click', () =>{
                                    document.querySelector('.seccion-trending').removeChild(nodo);
                                    window.removeEventListener('scroll', disableScroll);
                                })

                            }else{
                                console.error('Ocurrio un error');
                            }

                        })
                        .catch(error => console.log(error));
                    }
                })//Evento gif max
                
            })
            .catch(error => console.error(error))

            

        }else {
            fetch(`https://${url}?api_key=${api}&&limit=${limit}&&q=${q}`)
            .then(response => response.json())
            .then(json => {
                

                let contenidoBusqueda = document.createElement('div');
                contenidoBusqueda.classList.add('contenido-resultado-busqueda');

                let nodoH1 = document.createElement('h1');
                nodoH1.innerText = q;
                nodoH1.classList.add('centrado');
                nodoH1.classList.add('capatalize');
                nodoH1.setAttribute('id', 'nodo-h1');

                contenedor.insertBefore(nodoH1, contenedor.childNodes[9] );
                contenedor.insertBefore(contenidoBusqueda, contenedor.childNodes[10]);

                for(let i = 0; i<json.data.length; i++){

                    let urlImg = json.data[i].images.original.url;
                    let idImg = json.data[i].id;
                    let tituloImg = json.data[i].title;
                    let alImg = `imagen-${tituloImg}`;

                    let nodos = document.createElement('img');
                    nodos.setAttribute('id', idImg);
                    nodos.setAttribute('src', urlImg);
                    nodos.setAttribute('alt', alImg);

                    contenidoBusqueda.appendChild(nodos);

                }

                botonVerMas.style.display = "inline-block";

                verMas();
                
                contenidoBusqueda.addEventListener('click', (e)=> {
                    if(e.target.id){
                        fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&&ids=${e.target.id}`)
                        .then(respuesta => respuesta.json())
                        .then(json => {

                            if(json.meta.status === 200){

                                let tituloImg = json.data[0].title;
                                let urlImg = json.data[0].images.original.url;
                                let userImg;
                                if(json.data[0].username === ''){
                                    userImg = 'Anonimo'
                                }else{
                                    userImg = json.data[0].username;
                                }
                                let idImg = e.target.id;

                                let nodo = document.createElement('div');
                                nodo.classList.add('centrado');
                                nodo.classList.add('gif-max');

                                let contenedorCloseNodo = document.createElement('div');
                                contenedorCloseNodo.classList.add('derecha');

                                let closeNodo = document.createElement('img');
                                if(localStorage.getItem('estilo-actual') === 'blanco'){
                                    closeNodo.setAttribute('src', 'img/close.svg');
                                }else{
                                    closeNodo.setAttribute('src', 'img/close-modo-noct.svg');
                                }
                                closeNodo.setAttribute('id', 'close-gif-max')

                                let nodoImg = document.createElement('img');
                                nodoImg.setAttribute('src', `${urlImg}`);
                                nodoImg.setAttribute('id', `${idImg}`);
                                nodoImg.setAttribute('alt', `${tituloImg}`);

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.innerHTML = `
                                    <img src="img/icon-fav.svg">
                                    <img src="img/icon-download.svg">
                                `;

                                contenedorInfo.appendChild(infoGif);
                                contenedorInfo.appendChild(gifOpciones);
                                contenedorCloseNodo.appendChild(closeNodo)

                                nodo.appendChild(contenedorCloseNodo);
                                nodo.appendChild(nodoImg);
                                nodo.appendChild(contenedorInfo);

                                document.querySelector('.seccion-busqueda').appendChild(nodo);

                                
                                window.addEventListener('scroll', disableScroll);

                                closeNodo.addEventListener('click', () =>{
                                    document.querySelector('.seccion-busqueda').removeChild(nodo);
                                    window.removeEventListener('scroll', disableScroll);
                                })

                            }else{
                                console.error('Ocurrio un error');
                            }

                        })
                        .catch(error => console.log(error));
                    }
                })//Evento gif max
            })
            .catch(error => console.error(error))
            
        }

    } //Insercion de trendings y busquedas y el correspondiente evento de gif max

    function verMas(){
        if(screen.width >= 320 && screen.width < 768){
            let contenedor = document.querySelector('.contenido-resultado-busqueda');
            contenedor.style.maxHeight = '300px';
            contenedor.classList.add('overflow');
            botonVerMas.addEventListener('click', function(e){

                    e.preventDefault();
                    if(contenedor.attributes[1].value === 'max-height: 300px;'){
                        contenedor.style.maxHeight = '600px';
                    }else if(contenedor.attributes[1].value === 'max-height: 600px;'){
                        contenedor.style.maxHeight = '900px';
                    }else if(contenedor.attributes[1].value === 'max-height: 900px;'){
                        contenedor.style.maxHeight = '1200px';
                    }else if(contenedor.attributes[1].value === 'max-height: 1200px;'){
                        contenedor.style.maxHeight = '1500px';
                    }else if(contenedor.attributes[1].value === 'max-height: 1500px;'){
                        contenedor.style.maxHeight = '1800px';
                    }else if(contenedor.attributes[1].value === 'max-height: 1800px;'){
                        contenedor.style.maxHeight = '2100px';
                    }else if(contenedor.attributes[1].value === 'max-height: 2100px;'){
                        contenedor.style.maxHeight = '2400px';
                        botonVerMas.style.display = 'none';
                        botonVerMenos.style.display = 'inline-block';
                        botonVerMenos.addEventListener('click', function (){
                            contenedor.style.maxHeight = '300px';
                            botonVerMas.style.display = 'inline-block';
                            botonVerMenos.style.display = 'none';
                        })
                    }

            })
        }else if(screen.width >= 768 && screen.width < 1024){
            console.log('tableta');
        }else if(screen.width >= 1024){
            console.log('lap');
        }
    } // Funcion de ver mas

    function CheckImagenes (){
        if(contenedorPadre.attributes[1].value === 'favoritos'){

            if(imagenesFav.length === 0 ){
                let nuevoNodo = document.createElement("div");
                nuevoNodo.classList.add('centrado');
                nuevoNodo.innerHTML = '<img src="img/icon-fav-sin-contenido.svg"><p class="centrado verdee">"¡Guarda tu primer GIFO en Favoritos para que se muestre aqui!"</p>';
                
                contenedorPadre.replaceWith(nuevoNodo);

                botonVerMas.style.display = 'none';

            }else if(imagenesFav.length > 0 && imagenesFav.length < 5){
                
                for(let i=0; i<imagenesFav.length; i++){
                    
                    let nodoImaFav = document.createElement('div');
                    nodoImaFav.classList.add('centrado');
                    nodoImaFav.setAttribute('id', 'numero-x');
                    nodoImaFav.innerHTML = `<img src="${imagenesFav[i].img}">`;

                    contenedorPadre.appendChild(nodoImaFav);
                }


            }else if(imagenesFav.length > 5 || imagenesFav.length === 5){

                for(let i=0; i<imagenesFav.length; i++){
                    
                    var nodoImaFav = document.createElement('div');
                    nodoImaFav.classList.add('centrado');
                    nodoImaFav.setAttribute('id', 'numero-x');
                    nodoImaFav.innerHTML = `<img src="${imagenesFav[i].img}">`;

                    contenedorPadre.appendChild(nodoImaFav);
                }

                

            }

        }else if(contenedorPadre.attributes[1].value === 'gifos'){

            if(imagenesGifos.length === 0 ){
                let nuevoNodo2 = document.createElement("div");
                nuevoNodo2.classList.add('centrado');
                nuevoNodo2.innerHTML = '<img src="img/icon-mis-gifos-sin-contenido.svg"><p class="centrado verdee">"¡Animate a crear tu primer gifo!"</p>';
                contenedorPadre.replaceWith(nuevoNodo2);

                botonVerMas.style.display = 'none';

            }else if(imagenesGifos.length > 0){

                for(let i=0; i<imagenesGifos.length; i++){
                    
                    let nodoImaFav = document.createElement('div');
                    nodoImaFav.classList.add('centrado');
                    nodoImaFav.setAttribute('id', 'numero-x');
                    nodoImaFav.innerHTML = `<img src="${imagenesGifos[i].img}">`;

                    contenedorPadre.appendChild(nodoImaFav);
                }
                
            }
        }
    }

    function disableScroll(){  // Bloquea el scroll cuando esta el menu abierto
        window.scrollTo(0, 0);
    }


    
    

    });
})();