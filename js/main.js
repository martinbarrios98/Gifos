(function(){
    'use strict';
    document.addEventListener('DOMContentLoaded', function(){

        
        let estilo = document.querySelector("#estilo"); // Link del estilo

        checkModo();
        Extras();
        hoover();

        console.log('Documento Listo'); // Carga primero el HTML

        // Selectores Menu

        let menuMobile = document.querySelector(".menu-mobile"); // Selector para acceder al menu
        let closeMobile = document.querySelector(".cerrar-menu"); // Selector para cerrar al menu

        //Selectores Modo Nocturno y Normal

        let modo = document.querySelector("#cambiar-modo");

        //Selector boton crear gif

        let botonCrearGif = document.querySelector('#crear-gif'); // Query del boton crear gif
 
        let imagenesGifos = []; // arreglo de imagenes gifos

        if(localStorage.getItem('gifos')){
            if(JSON.parse(localStorage.getItem('gifos')).length > 0){
    
            }else{
                localStorage.setItem('gifos', JSON.stringify(imagenesGifos));
            }
        }else{
            localStorage.setItem('gifos', JSON.stringify(imagenesGifos));
        }

        if(document.querySelector('#crear-gif')){
            botonCrearGif.addEventListener('click', CrearGIf)
        } // Verifico en el localstorage la existencia de imagenesGifos

        //Condicionales para el menu

        if(document.querySelector(".menu-mobile")){
            menuMobile.addEventListener('click', mostrarMenu);
        }

        if(document.querySelector(".cerrar-menu")){
            closeMobile.addEventListener('click', cerrarMenu);
        }

        //Condicionales para el modo nocturno

        if(document.querySelector("#cambiar-modo")){
            modo.addEventListener('click', Modo);
        }

        // Funciones del menu movil

        function mostrarMenu (e){ //Muestra menu movil
            e.preventDefault();
            let menu = document.querySelector(".nav-principal");
            menuMobile.style.display = 'none';
            closeMobile.style.display = 'block';
            menu.classList.add('nav-fixed');

            document.querySelector('.agregar-gif').innerHTML = 'CREAR GIF'

            window.addEventListener('scroll', disableScroll);
              
        }

        function cerrarMenu (e){ // Cierra menu movil
            e.preventDefault();
            let menu = document.querySelector(".nav-principal");
            closeMobile.style.display = 'none';
            menuMobile.style.display = 'block';
            menu.classList.remove('nav-fixed');
            window.removeEventListener('scroll', disableScroll);
        }

        
        function disableScroll(){  // Bloquea el scroll cuando esta el menu abierto
            window.scrollTo(0, 0);
        }

        // Funciones del modo nocturno y normal

        function Modo (e) {
            e.preventDefault();
            
            let hrefModo = estilo.attributes[1].value;

            if(hrefModo === "css/estilo.css"){

                estilo.attributes[1].value = "css/estilo-oscuro.css";

                localStorage .setItem("estilo-actual","negro");
                
                Extras();

            }else if(hrefModo === "css/estilo-oscuro.css"){

                estilo.attributes[1].value = "css/estilo.css";

                localStorage .setItem("estilo-actual","blanco");

                Extras();

            }
        }

        function checkModo () { // Check si existe en la localstorage el valor estilo
            if(localStorage.getItem("estilo-actual") === ""){

                estilo.attributes[1].value = "css/estilo.css";
                Extras();

            }else if(localStorage.getItem("estilo-actual") === "blanco"){

                estilo.attributes[1].value = "css/estilo.css";
                Extras();

            }else if(localStorage.getItem("estilo-actual") === "negro"){

                estilo.attributes[1].value = "css/estilo-oscuro.css";
                Extras();

            }
        }

        //Funciones extras como el hover de las imagenes y control de imagenes de modo normal y nocturno


        function Extras () {

            let logo = document.querySelector("#logo-desktop");
            if(document.querySelector("#icono-search")){
                var iconSearch = document.querySelector("#icono-search");
            }
            let sliderLeft = document.querySelector("#slider-button-left");
            let sliderRight = document.querySelector("#slider-button-right");
            
            if(localStorage.getItem("estilo-actual") === "negro"){

                    logo.attributes[0].value = "img/Logo-modo-noc.svg";
                    if(document.querySelector("#icono-search")){
                        iconSearch.attributes[0].value = "img/icon-search-mod-noc.svg";
                    }
                    if(document.querySelector("#slider-button-left")){
                        sliderLeft.attributes[0].value = "img/button-slider-left-md-noct.svg";
                        sliderRight.attributes[0].value = "img/button-slider-right-md-noct.svg"
                    }

                    if(document.querySelector('#camara-crear')){
                        document.querySelector('#camara-crear img').attributes[0].value = "img/camara-modo-noc.svg";
                        document.querySelector('#pelicula-crear img').attributes[0].value = "img/pelicula-modo-noc.svg";
                    }

                    document.querySelector("#cambiar-modo").text = "MODO CLARO";

            }else if(localStorage.getItem("estilo-actual") === "blanco"){

                    logo.attributes[0].value = "img/logo-desktop.svg";
                    if(document.querySelector("#icono-search")){
                        iconSearch.attributes[0].value = "img/icon-search.svg";
                    }
                    if(document.querySelector("#slider-button-right")){
                        sliderLeft.attributes[0].value = "img/button-slider-left.svg";
                        sliderRight.attributes[0].value = "img/button-slider-right.svg";
                    }
                    
                    if(document.querySelector('#camara-crear')){
                        document.querySelector('#camara-crear img').attributes[0].value = "img/camara.svg";
                        document.querySelector('#pelicula-crear img').attributes[0].value = "img/pelicula.svg";
                    }

                    
                    document.querySelector("#cambiar-modo").text = "MODO OSCURO";

            }
        }

        function hoover (){

            let sliderLeft = document.querySelector("#slider-button-left");
            let sliderRight = document.querySelector("#slider-button-right");

            if(localStorage.getItem("estilo-actual") === "blanco"){

                if(document.querySelector("#slider-button-left")){
                    sliderLeft.addEventListener("mouseover", function (){
                        sliderLeft.attributes[0].value = "img/button-slider-left-hover.svg"
                    });
                    sliderLeft.addEventListener("mouseleave", function (){
                        Extras();
                    });
    
                    sliderRight.addEventListener("mouseover", function (){
                        sliderRight.attributes[0].value = "img/button-slider-right-hover.svg"
                    });
                    sliderRight.addEventListener("mouseleave", function (){
                        Extras();
                    });
                }

            }else if(localStorage.getItem("estilo-actual") === "negro"){
                if(document.querySelector("#slider-button-right")){
                    sliderLeft.addEventListener("mouseover", function (){
                        sliderLeft.attributes[0].value = "img/button-slider-left-md-noct.svg"
                    });
    
                    sliderLeft.addEventListener("mouseleave", function (){
                        Extras();
                    });
    
                    sliderRight.addEventListener("mouseover", function (){
                        sliderRight.attributes[0].value = "img/button-slider-right-md-noct.svg"
                    });
    
                    sliderLeft.addEventListener("mouseleave", function (){
                        Extras();
                    });
                }
                
                

            }

        } // Hoover sobre slider

        function CrearGIf(e){
            e.preventDefault();     

            let contenedor = document.querySelector('.contenido-crear-gif');
            let padreContenedor = document.querySelector('.contenedor-crear-gif');
            
            let paso1 = document.querySelectorAll('.paso')[0];
            let paso2 = document.querySelectorAll('.paso')[1];
            let paso3 = document.querySelectorAll('.paso')[2];

            //Creamos boton grabar

            let botonGrabar = document.createElement('a');
            botonGrabar.classList.add('boton');
            botonGrabar.classList.add('boton-morado');
            botonGrabar.setAttribute('id', 'grabar-gif');
            botonGrabar.innerHTML = `
                GRABAR
            `;

            paso1.classList.add('paso-completo');
            padreContenedor.style.padding = '0';

            contenedor.innerHTML = `
                <video id="vid"></video>
            `; //Limpiamos el html para insertar el tag video

            botonCrearGif.replaceWith(botonGrabar); //Cambiamos contenido del boton

            let contenedorVideo = document.querySelector('#vid');
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(
                stream => {

                    contenedorVideo.srcObject = stream;
                    contenedorVideo.play();
                    
                    
                    let recorder = RecordRTC(stream, {
                        type: 'gif',
                        frameRate: 1,
                        quality: 10,
                        width: 360,
                        hidden: 240
                    });

                    botonGrabar.addEventListener('click', function (){


                        recorder.startRecording();
                        paso2.classList.add('paso-completo');

                        let botonFinalizar = document.createElement('a');
                        botonFinalizar.classList.add('boton');
                        botonFinalizar.classList.add('boton-morado');
                        botonFinalizar.setAttribute('id', 'finalizar-gif');
                        botonFinalizar.innerHTML = `
                            FINALIZAR
                        `;
                        botonGrabar.replaceWith(botonFinalizar);

                        botonFinalizar.addEventListener('click', function (){

                            let botonSubir = document.createElement('a');
                            botonSubir.classList.add('boton');
                            botonSubir.classList.add('boton-morado');
                            botonSubir.setAttribute('id', 'subir-gif');
                            botonSubir.innerHTML = `
                                SUBIR GIFO
                            `;

                            let nodoNuevo = document.createElement('div');
                            nodoNuevo.classList.add('repetir-captura');
                            nodoNuevo.innerHTML = `
                                <p id="repetir-captura">REPETIR CAPTURA</p>
                            `;

                            botonFinalizar.replaceWith(botonSubir);

                            recorder.stopRecording();

                            contenedor.innerHTML = `<img id="vid2"></img>`;
                            contenedor.classList.add('centrado');
                            document.querySelector('#vid2').src = recorder.toURL();

                            document.querySelector('.contenedor-pasos-gif').insertBefore(nodoNuevo, document.querySelector('.contenedor-pasos-gif').childNodes[3]);

                            document.querySelector('#repetir-captura').addEventListener('click', function (){
                                location.reload(true);
                            });
                            
                            botonSubir.addEventListener('click', function (){

                                let usuario = prompt('Ingrese su nombre!');

                                if(usuario === ""){

                                    alert('No ha ingresado un nombre!');
                                    usuario = prompt('Ingrese un nombre!');
                                    
                                    let form = new FormData();
                                    form.append('api_key', 'am6UPP2PeTDEzXPLpkqr9IaE8Vmpi4ch');
                                    form.append('file', recorder.getBlob(), 'myGif.gif');
                                    form.append('usuario', usuario);

                                    UploadGif(form);

                                }else{

                                    let form = new FormData();
                                    form.append('api_key', 'am6UPP2PeTDEzXPLpkqr9IaE8Vmpi4ch');
                                    form.append('file', recorder.getBlob(), 'myGif.gif');
                                    form.append('username', usuario);

                                    UploadGif(form);

                                    contenedor.style.backgroundImage = `url(${recorder.toURL()})`;
                                    contenedor.classList.add('contenedor-crear-gif-completo');
                                    contenedor.innerHTML = `
                                        <div class="contenido-subiendo-gif">
                                            <img src="img/loader.svg" alt="imagen-cargando">
                                            <p class="centrado">Estamos subiendo tu GIFO</p>
                                        </div>
                                    `;

                                    document.querySelector('#repetir-captura').style.display = 'none';
                                    paso3.classList.add('paso-completo');

                                    botonSubir.style.display = 'none';

                                }

                            });
            
                        })
                    });
                }
            )
            
        } //Funcion para comenzar crear gif

        function UploadGif (form){

            let xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://upload.giphy.com/v1/gifs', true);

            xhr.onload = function () {
                if(this.status === 200){

                    console.log(JSON.parse(xhr.responseText));

                    let resultado = JSON.parse(xhr.responseText);

                    document.querySelector('.contenido-crear-gif').innerHTML = `
                    <div class="contenido-subiendo-gif">
                        <img src="img/check.svg" alt="imagen-cargando">
                        <p class="centrado">GIFO subido con exito!</p>
                    </div>
                    `;

                    agregarGifos(resultado.data.id);

                    
                }else {
                    alert('ocurrio un error!');
                    location.reload(true);
                    console.log('error');
                }
            }

            xhr.send(form);

        } // Subir gif creado por el usuario a Gyphy

        function agregarGifos (id){
            let longitudGifos = JSON.parse(localStorage.getItem('gifos'));
            alert('Se agrego correctamente el gif a tus gifos!');
            if(longitudGifos.length === 0){
                imagenesGifos.push(id);
                localStorage.setItem('gifos',JSON.stringify(imagenesGifos));
            }else if(longitudGifos.length > 0){
                let arrayOld = JSON.parse(localStorage.getItem('gifos'));
                arrayOld.push(id);
                console.log(arrayOld);
                localStorage.removeItem('gifos');
                imagenesGifos = arrayOld;
                localStorage.setItem('gifos',JSON.stringify(imagenesGifos));
            };
        } // Agregar gifo creado al arreglo para proceder guardarlo en el localStorage 

    });
})();