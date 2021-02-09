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
                    sliderLeft.attributes[0].value = "img/button-slider-left-md-noct.svg";
                    sliderRight.attributes[0].value = "img/button-slider-right-md-noct.svg"

                    document.querySelector("#cambiar-modo").text = "MODO CLARO";

            }else if(localStorage.getItem("estilo-actual") === "blanco"){

                    logo.attributes[0].value = "img/logo-desktop.svg";
                    if(document.querySelector("#icono-search")){
                        iconSearch.attributes[0].value = "img/icon-search.svg";
                    }
                    sliderLeft.attributes[0].value = "img/button-slider-left.svg";
                    sliderRight.attributes[0].value = "img/button-slider-right.svg";

                    
                    document.querySelector("#cambiar-modo").text = "MODO OSCURO";

            }
        }

        function hoover (){

            let sliderLeft = document.querySelector("#slider-button-left");
            let sliderRight = document.querySelector("#slider-button-right");

            if(localStorage.getItem("estilo-actual") === "blanco"){

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

            }else if(localStorage.getItem("estilo-actual") === "negro"){

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

        

    });
})();