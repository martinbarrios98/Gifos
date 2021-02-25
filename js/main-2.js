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
    let contenedorGifOpciones = document.querySelector('.contenedor-info-gif');
    let sliderButtonRight = document.querySelector('#slider-button-right');
    let sliderButtonLeft = document.querySelector('#slider-button-left');
    
    let contenedorSugeEvent = document.querySelector('.sugerencias');

    let imagenesFav= []; // arreglo de favoritos del usuario
    let imagenesGifos = [];

    if(localStorage.getItem('favoritos')){
        if(JSON.parse(localStorage.getItem('favoritos')).length > 0){

        }else{
            localStorage.setItem('favoritos', JSON.stringify(imagenesFav));
        }
    }else{
        localStorage.setItem('favoritos', JSON.stringify(imagenesFav));
    }
    
    let apiKey = "am6UPP2PeTDEzXPLpkqr9IaE8Vmpi4ch"; // Api key de gyphi

    

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

    sliderButtonLeft.addEventListener('click', sliderTrendingLeft);
    sliderButtonRight.addEventListener('click', sliderTrendingRight);

    if(contenedorBusqueda){
        btnSearch.addEventListener('click', seccionBusqueda);
        inputBusqueda.addEventListener('keydown', sugerenciasBusqueda);
        inputBusqueda.addEventListener('keypress', seccionBusquedaEnter);
    }


    function sugerenciasBusqueda (){
        if(inputBusqueda.value === ""){

            if(document.querySelector('.sugerencias')){
                document.querySelector('.sugerencias').remove();
            }
            
            btnSearch.classList.remove('icono-serach-busqueda');
            btnSearch.classList.add('icono-search');
            document.querySelector('.busqueda').classList.remove('busqueda-border');
            inputBusqueda.classList.remove('busqueda-realizada');

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
                    inputBusqueda.classList.add('busqueda-realizada');

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
    } //Funcion para mostrar sugerencias

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
                document.querySelector('.busqueda').classList.remove('busqueda-border');

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
                document.querySelector('.busqueda').classList.remove('busqueda-border');
                secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", inputBusqueda.value);
                

            }
        }
    } // busqueda por toque en la lupa

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
            document.querySelector('.busqueda').classList.remove('busqueda-border');

            secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", valor);
        }else{
            if(document.querySelector('.sugerencias')){
                document.querySelector('.sugerencias').remove();
            }
            btnSearch.classList.remove('icono-serach-busqueda');
            btnSearch.classList.add('icono-search');
            inputBusqueda.classList.remove('busqueda-realizada');
            document.querySelector('.busqueda').classList.remove('busqueda-border');
            secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", valor);
        }
    } //busqueda por toques en sugerencias

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
                    nodos.classList.add('gif-com2');

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
                                nodoImg.classList.add('gif-max-img');

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.setAttribute('id', `${idImg}`);
                                gifOpciones.innerHTML = `
                                    <img src="img/icon-fav.svg">
                                    <img src="img/icon-download.svg" alt="${urlImg}">
                                `;

                                contenedorInfo.appendChild(infoGif);
                                contenedorInfo.appendChild(gifOpciones);
                                contenedorCloseNodo.appendChild(closeNodo)

                                nodo.appendChild(contenedorCloseNodo);
                                nodo.appendChild(nodoImg);
                                nodo.appendChild(contenedorInfo);

                                document.querySelector('.seccion-trending').appendChild(nodo);

                                contenedorInfo.addEventListener('click', agregarFavoritos);

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

                if(screen.width >= 1024){
                    document.querySelector('.contenido-gifos-trending').addEventListener('mouseover', hooverGifEscritorioTrending);
                }

                
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
                    nodos.classList.add('gif-com');

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
                                nodoImg.classList.add('gif-max-img');

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.setAttribute('id', `${idImg}`);
                                gifOpciones.innerHTML = `
                                    <img src="img/icon-fav.svg">
                                    <img src="img/icon-download.svg" alt="${urlImg}">
                                `;

                                contenedorInfo.appendChild(infoGif);
                                contenedorInfo.appendChild(gifOpciones);
                                contenedorCloseNodo.appendChild(closeNodo)

                                nodo.appendChild(contenedorCloseNodo);
                                nodo.appendChild(nodoImg);
                                nodo.appendChild(contenedorInfo);

                                document.querySelector('.seccion-busqueda').appendChild(nodo);

                                contenedorInfo.addEventListener('click', agregarFavoritos);

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

                if(screen.width >= 1024){
                    document.querySelector('.contenido-resultado-busqueda').addEventListener('mouseover', hooverGifEscritorio);
                }

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

            let contenedor = document.querySelector('.contenido-resultado-busqueda');
            contenedor.style.maxHeight = '480px';
            contenedor.classList.add('overflow');

            botonVerMas.addEventListener('click', function(e){

                e.preventDefault();
                if(contenedor.attributes[1].value === 'max-height: 480px;'){
                    contenedor.style.maxHeight = '960px';
                }else if(contenedor.attributes[1].value === 'max-height: 960px;'){
                    contenedor.style.maxHeight = '1440px';
                }else if(contenedor.attributes[1].value === 'max-height: 1440px;'){
                    contenedor.style.maxHeight = '1920px';
                }else if(contenedor.attributes[1].value === 'max-height: 1920px;'){
                    contenedor.style.maxHeight = '2400px';
                    botonVerMas.style.display = 'none';
                    botonVerMenos.style.display = 'inline-block';
                    botonVerMenos.addEventListener('click', function (){
                        contenedor.style.maxHeight = '480px';
                        botonVerMas.style.display = 'inline-block';
                        botonVerMenos.style.display = 'none';
                    })
                }

            })

        }else if(screen.width >= 1024){
            let contenedor = document.querySelector('.contenido-resultado-busqueda');
            contenedor.style.maxHeight = '480px';
            contenedor.classList.add('overflow');

            botonVerMas.addEventListener('click', function(e){

                e.preventDefault();
                if(contenedor.attributes[1].value === 'max-height: 480px;'){
                    contenedor.style.maxHeight = '960px';
                }else if(contenedor.attributes[1].value === 'max-height: 960px;'){
                    contenedor.style.maxHeight = '1440px';
                }else if(contenedor.attributes[1].value === 'max-height: 1440px;'){
                    contenedor.style.maxHeight = '1920px';
                    botonVerMas.style.display = 'none';
                    botonVerMenos.style.display = 'inline-block';
                    botonVerMenos.addEventListener('click', function (){
                        contenedor.style.maxHeight = '480px';
                        botonVerMas.style.display = 'inline-block';
                        botonVerMenos.style.display = 'none';
                    })
                }

            })
        }
    } // Funcion de ver mas general

    function verMasFavoritosGifos(){
        if(screen.width >= 320 && screen.width < 768){
            let contenedor = document.querySelector('.favoritos');
            contenedor.style.maxHeight = '300px';
            contenedor.classList.add('overflow');
            botonVerMas.addEventListener('click', function(e){

                    e.preventDefault();
                    if(contenedor.attributes[2].value === 'max-height: 300px;'){
                        contenedor.style.maxHeight = '600px';
                    }else if(contenedor.attributes[2].value === 'max-height: 600px;'){
                        contenedor.style.maxHeight = '900px';
                    }else if(contenedor.attributes[2].value === 'max-height: 900px;'){
                        contenedor.style.maxHeight = '1200px';
                    }else if(contenedor.attributes[2].value === 'max-height: 1200px;'){
                        contenedor.style.maxHeight = '1500px';
                    }else if(contenedor.attributes[2].value === 'max-height: 1500px;'){
                        contenedor.style.maxHeight = '1800px';
                    }else if(contenedor.attributes[2].value === 'max-height: 1800px;'){
                        contenedor.style.maxHeight = '2100px';
                    }else if(contenedor.attributes[2].value === 'max-height: 2100px;'){
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

            let contenedor = document.querySelector('.favoritos');
            contenedor.style.maxHeight = '480px';
            contenedor.classList.add('overflow');

            botonVerMas.addEventListener('click', function(e){

                e.preventDefault();
                if(contenedor.attributes[2].value === 'max-height: 480px;'){
                    contenedor.style.maxHeight = '960px';
                }else if(contenedor.attributes[2].value === 'max-height: 960px;'){
                    contenedor.style.maxHeight = '1440px';
                }else if(contenedor.attributes[2].value === 'max-height: 1440px;'){
                    contenedor.style.maxHeight = '1920px';
                }else if(contenedor.attributes[2].value === 'max-height: 1920px;'){
                    contenedor.style.maxHeight = '2400px';
                    botonVerMas.style.display = 'none';
                    botonVerMenos.style.display = 'inline-block';
                    botonVerMenos.addEventListener('click', function (){
                        contenedor.style.maxHeight = '480px';
                        botonVerMas.style.display = 'inline-block';
                        botonVerMenos.style.display = 'none';
                    })
                }

            })

        }else if(screen.width >= 1024){
            let contenedor = document.querySelector('.favoritos');
            contenedor.style.maxHeight = '480px';
            contenedor.classList.add('overflow');

            botonVerMas.addEventListener('click', function(e){

                e.preventDefault();
                if(contenedor.attributes[2].value === 'max-height: 480px;'){
                    contenedor.style.maxHeight = '960px';
                }else if(contenedor.attributes[2].value === 'max-height: 960px;'){
                    contenedor.style.maxHeight = '1440px';
                }else if(contenedor.attributes[2].value === 'max-height: 1440px;'){
                    contenedor.style.maxHeight = '1920px';
                    botonVerMas.style.display = 'none';
                    botonVerMenos.style.display = 'inline-block';
                    botonVerMenos.addEventListener('click', function (){
                        contenedor.style.maxHeight = '480px';
                        botonVerMas.style.display = 'inline-block';
                        botonVerMenos.style.display = 'none';
                    })
                }

            })
        }
    } // Funcion de ver mas para gifos y favoritos

    function CheckImagenes (){

        let storageFavoritios = JSON.parse(localStorage.getItem('favoritos'));
        let storageGifos = JSON.parse(localStorage.getItem('gifos'));

        if(contenedorPadre.attributes[1].value === 'favoritos'){

            if(storageFavoritios.length === 0){

                let nuevoNodo = document.createElement("div");
                nuevoNodo.classList.add('centrado');
                nuevoNodo.innerHTML = '<img src="img/icon-fav-sin-contenido.svg"><p class="centrado verdee">"¡Guarda tu primer GIFO en Favoritos para que se muestre aqui!"</p>';
                
                contenedorPadre.replaceWith(nuevoNodo);

                botonVerMas.style.display = 'none';

            }else if(storageFavoritios.length > 0){

                for(let i=0; i<storageFavoritios.length; i++){

                    fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&&ids=${storageFavoritios[i]}`)
                    .then(resultados => resultados.json())
                    .then(json => {

                        let contenedor = document.querySelector('.favoritos');

                        let urlImg = json.data[0].images.original.url;
                        let idImg = json.data[0].id;
                        let tituloImg = json.data[0].title;
                        let alImg = `imagen-${tituloImg}`;

                        let nodos = document.createElement('img');
                        nodos.setAttribute('id', idImg);
                        nodos.setAttribute('src', urlImg);
                        nodos.setAttribute('alt', alImg);
                        nodos.classList.add('gif-com');

                        contenedor.appendChild(nodos);

                        if(storageFavoritios.length > 4){
                            botonVerMas.style.display = "inline-block";
                            verMasFavoritosGifos();
                        }else{
                            botonVerMas.style.display = "none";
                        }

                    })

                }
                

                document.querySelector('.favoritos').addEventListener('click', (e)=> {
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
                                nodoImg.classList.add('gif-max-img');

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.setAttribute('id', `${idImg}`);
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

                                document.querySelector('.seccion-favoritos').appendChild(nodo);

                                contenedorInfo.addEventListener('click', agregarFavoritos);

                                window.addEventListener('scroll', disableScroll);

                                closeNodo.addEventListener('click', () =>{
                                    document.querySelector('.seccion-favoritos').removeChild(nodo);
                                    window.removeEventListener('scroll', disableScroll);
                                })

                            }else{
                                console.error('Ocurrio un error');
                            }

                        })
                        .catch(error => console.log(error));
                    }
                })//Evento gif max

                if(screen.width >= 1024){
                    document.querySelector('.favoritos').addEventListener('mouseover', hooverGifEscritorio);
                }
            }

        }else if(contenedorPadre.attributes[1].value === 'gifos'){

            if(storageGifos.length === 0 ){
                let nuevoNodo2 = document.createElement("div");
                nuevoNodo2.classList.add('centrado');
                nuevoNodo2.innerHTML = '<img src="img/icon-mis-gifos-sin-contenido.svg"><p class="centrado verdee">"¡Animate a crear tu primer gifo!"</p>';
                contenedorPadre.replaceWith(nuevoNodo2);

                botonVerMas.style.display = 'none';

            }else if(storageGifos.length > 0){

                for(let i=0; i<storageGifos.length; i++){

                    fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&&ids=${storageGifos[i]}`)
                    .then(resultados => resultados.json())
                    .then(json => {

                        let contenedor = document.querySelector('.favoritos');

                        let urlImg = json.data[0].images.original.url;
                        let idImg = json.data[0].id;
                        let tituloImg = json.data[0].title;
                        let alImg = `imagen-${tituloImg}`;

                        let nodos = document.createElement('img');
                        nodos.setAttribute('id', idImg);
                        nodos.setAttribute('src', urlImg);
                        nodos.setAttribute('alt', alImg);
                        nodos.classList.add('gif-com');

                        contenedor.appendChild(nodos);

                        if(storageGifos.length > 4){
                            botonVerMas.style.display = "inline-block";
                            verMasFavoritosGifos();
                        }else{
                            botonVerMas.style.display = "none";
                        }

                    })

                }
                

                document.querySelector('.favoritos').addEventListener('click', (e)=> {
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
                                nodoImg.classList.add('gif-max-img');

                                let contenedorInfo = document.createElement('div');
                                contenedorInfo.classList.add('contenedor-info-gif');

                                let infoGif = document.createElement('div');
                                infoGif.innerHTML = `
                                    <p>${userImg}</p>
                                    <p>${tituloImg}</p>
                                `;

                                let gifOpciones = document.createElement('div');
                                gifOpciones.setAttribute('id', `${idImg}`);
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

                                document.querySelector('.seccion-favoritos').appendChild(nodo);

                                contenedorInfo.addEventListener('click', agregarFavoritos);

                                window.addEventListener('scroll', disableScroll);

                                closeNodo.addEventListener('click', () =>{
                                    document.querySelector('.seccion-favoritos').removeChild(nodo);
                                    window.removeEventListener('scroll', disableScroll);
                                })

                            }else{
                                console.error('Ocurrio un error');
                            }

                        })
                        .catch(error => console.log(error));
                    }
                })//Evento gif max

                if(screen.width >= 1024){
                    document.querySelector('.favoritos').addEventListener('mouseover', hooverGifEscritorio);
                }
                
            }
        }
    } //Verifico los localstorage la existencia de favoritos y gifos creados por el usuario para proceder a mostrarlos

    function disableScroll(){  // Bloquea el scroll cuando esta el menu abierto
        window.scrollTo(0, 0);
    }

    function agregarFavoritos (e){
        let id = e.target.parentElement.id;
        if(e.target.attributes[0].value === 'img/icon-fav.svg'){
            let longitudFav = JSON.parse(localStorage.getItem('favoritos'));
            alert('Se agrego correctamente el gif a tus favoritos!');
            if(longitudFav.length === 0){
                imagenesFav.push(id);
                localStorage.setItem('favoritos',JSON.stringify(imagenesFav));
            }else if(longitudFav.length > 0){
                let arrayOld = JSON.parse(localStorage.getItem('favoritos'));
                arrayOld.push(id);
                console.log(arrayOld);
                localStorage.removeItem('favoritos');
                imagenesFav = arrayOld;
                localStorage.setItem('favoritos',JSON.stringify(imagenesFav));
            };

        }else if(e.target.attributes[0].value === 'img/icon-download.svg'){

            alert('La descarga puede demorar unos segundos...');

            let link = e.target.attributes.alt.value;

            fetch(link)
            .then(response => response.blob())
            .then(blob =>{

                    let a = document.createElement('a');
                    a.download = `${id}.gif`;
                    a.href = window.URL.createObjectURL(blob);
                    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                    a.click();

            })
        }else{
            return false;
        }
    } //AgregarFavoritos Dispositivos Moviles

    function hooverGifEscritorio (e){
        if(e.target.className === "gif-com"){

            let src = e.target.src;
            let alt = e.target.alt;
            let id = e.target.id;

            let nodo = document.createElement('div');
            nodo.classList.add('hoover-padre');
            nodo.style.backgroundImage = `url(${src})`;

            let nodoHijo = document.createElement('div');
            nodoHijo.classList.add('hoover-hijo');
            nodoHijo.innerHTML = `
                <div id="${id}" class="opciones-gif-hoover">
                    <img src="img/icon-fav.svg">
                    <img src="img/icon-max-hover.svg">
                    <img src="img/icon-download.svg" alt="${src}">
                </div>
                <div class="gif-hoover-info">
                    <p>Anonimo</p>
                    <p>${alt}</p>
                </div>
            `;


            nodo.appendChild(nodoHijo);
            e.target.replaceWith(nodo);

            nodo.addEventListener('mouseleave', function (){
                let nodo2 = document.createElement('img');
                nodo2.src = src;
                nodo2.setAttribute('id', id);
                nodo2.setAttribute('alt', alt);
                nodo2.classList.add('gif-com');

                nodo.replaceWith(nodo2);
            });

            document.querySelector('.opciones-gif-hoover').addEventListener('click', opcionesHooverEscritorio);


        }
    }// Hoover para Gif de busqueda

    function hooverGifEscritorioTrending (e){
        if(e.target.className === "gif-com2"){
            let src = e.target.src;
            let alt = e.target.alt;
            let id = e.target.id;

            let nodo = document.createElement('div');
            nodo.classList.add('hoover-trending');
            nodo.style.backgroundImage = `url(${src})`;

            let nodoHijo = document.createElement('div');
            nodoHijo.classList.add('hoover-trending-hijo');
            nodoHijo.innerHTML = `
                <div id="${id}" class="trending-opciones-gif-hoover">
                    <img src="img/icon-fav.svg">
                    <img src="img/icon-max-hover.svg">
                    <img src="img/icon-download.svg" alt="${src}">
                </div>
                <div class="gif-hoover-info">
                    <p>Anonimo</p>
                    <p>${alt}</p>
                </div>
            `;


            nodo.appendChild(nodoHijo);
            e.target.replaceWith(nodo);

            nodo.addEventListener('mouseleave', function (){
                let nodo2 = document.createElement('img');
                nodo2.src = src;
                nodo2.setAttribute('id', id);
                nodo2.setAttribute('alt', alt);
                nodo2.classList.add('gif-com2');

                nodo.replaceWith(nodo2);
            });

            
            document.querySelector('.trending-opciones-gif-hoover').addEventListener('click', opcionesHooverEscritorio);

        }
    } // Hoover para gif de trending

    function sliderTrendingLeft (){
        let contenedor = document.querySelector('.contenido-gifos-trending');
        if(sliderButtonRight.classList.length === 1){
            alert('No hay elementos a la izquierda');
        }else if(sliderButtonRight.classList[1] === '2'){
            contenedor.scrollTo(1, 0);
            sliderButtonRight.classList.remove('2');
        }else if(sliderButtonRight.classList[1] === '3'){
            contenedor.scrollTo(1450, 0);
            sliderButtonRight.classList.remove('3');
            sliderButtonRight.classList.add('2');
        }else if(sliderButtonRight.classList[1] === '4'){
            contenedor.scrollTo(2165, 0);
            sliderButtonRight.classList.remove('4');
            sliderButtonRight.classList.add('3');
        }else if(sliderButtonRight.classList[1] === '5'){
            contenedor.scrollTo(2890, 0);
            sliderButtonRight.classList.remove('5');
            sliderButtonRight.classList.add('4');
        }else if(sliderButtonRight.classList[1] === '6'){
            contenedor.scrollTo(3600, 0);
            sliderButtonRight.classList.remove('6');
            sliderButtonRight.classList.add('5');
        }
    } // Slider para la izquierda

    function sliderTrendingRight (){
        let contenedor = document.querySelector('.contenido-gifos-trending');
        if(sliderButtonRight.classList.length === 1){
            contenedor.scrollTo(1450, 0);
            sliderButtonRight.classList.add('2');
        }else if(sliderButtonRight.classList[1] === '2'){
            contenedor.scrollTo(2165, 0);
            sliderButtonRight.classList.remove('2');
            sliderButtonRight.classList.add('3');
        }else if(sliderButtonRight.classList[1] === '3'){
            contenedor.scrollTo(2890, 0);
            sliderButtonRight.classList.remove('3');
            sliderButtonRight.classList.add('4');
        }else if(sliderButtonRight.classList[1] === '4'){
            contenedor.scrollTo(3600, 0);
            sliderButtonRight.classList.remove('4');
            sliderButtonRight.classList.add('5');
        }else if(sliderButtonRight.classList[1] === '5'){
            contenedor.scrollTo(4315, 0);
            sliderButtonRight.classList.remove('5');
            sliderButtonRight.classList.add('6');
        }else if(sliderButtonRight.classList[1] === '6'){
            alert('No hay mas elementos por mostrar');
        }
    } // Slider para la derecha

    function opcionesHooverEscritorio(e){
        if(e.target.attributes[0].value === "img/icon-max-hover.svg"){
                let id = e.target.parentElement.id;
                    fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&&ids=${id}`)
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
                            let idImg = json.data[0].id;

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
                            nodoImg.classList.add('gif-max-img');

                            let contenedorInfo = document.createElement('div');
                            contenedorInfo.classList.add('contenedor-info-gif');

                            let infoGif = document.createElement('div');
                            infoGif.innerHTML = `
                                <p>${userImg}</p>
                                <p>${tituloImg}</p>
                            `;

                            let gifOpciones = document.createElement('div');
                            gifOpciones.setAttribute('id', `${idImg}`);
                            gifOpciones.innerHTML = `
                                <img src="img/icon-fav.svg">
                                <img src="img/icon-download.svg" alt="${urlImg}">
                            `;

                            contenedorInfo.appendChild(infoGif);
                            contenedorInfo.appendChild(gifOpciones);
                            contenedorCloseNodo.appendChild(closeNodo)

                            nodo.appendChild(contenedorCloseNodo);
                            nodo.appendChild(nodoImg);
                            nodo.appendChild(contenedorInfo);

                            document.querySelector('.seccion-trending').appendChild(nodo);

                            contenedorInfo.addEventListener('click', agregarFavoritos);

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
                //Evento gif max
        }else if(e.target.attributes[0].value === "img/icon-fav.svg"){
            let id = e.target.parentElement.id;
            alert('Se agrego correctamente el gif a tus favoritos!');
            let longitudFav = JSON.parse(localStorage.getItem('favoritos'));
            if(longitudFav.length === 0){
                imagenesFav.push(id);
                localStorage.setItem('favoritos',JSON.stringify(imagenesFav));
            }else if(longitudFav.length > 0){
                let arrayOld = JSON.parse(localStorage.getItem('favoritos'));
                arrayOld.push(id);
                console.log(arrayOld);
                localStorage.removeItem('favoritos');
                imagenesFav = arrayOld;
                localStorage.setItem('favoritos',JSON.stringify(imagenesFav));
            }
        }else if(e.target.attributes[0].value === "img/icon-download.svg"){

            
            alert('La descarga puede demorar unos segundos...');

            let id = e.target.parentElement.id;
            let link = e.target.attributes.alt.value;

            fetch(link)
            .then(response => response.blob())
            .then(blob =>{

                    let a = document.createElement('a');
                    a.download = `${id}.gif`;
                    a.href = window.URL.createObjectURL(blob);
                    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                    a.click();

            })


        }
    } //Opciones cuando exista un hover en un gif

    function seccionBusquedaEnter (e){
        if(e.keyCode === 13){
            if(inputBusqueda.value === ""){
                alert('No has ingresado alguna busqueda!');
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
                    document.querySelector('.busqueda').classList.remove('busqueda-border');
    
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
                    document.querySelector('.busqueda').classList.remove('busqueda-border');
                    secciontrending(apiKey, 30, contenedorBusqueda, "api.giphy.com/v1/gifs/search", inputBusqueda.value);
                    
    
                }
            }
        }
    } //Funcion para busqueda con boton enter
    
    

    });
})();