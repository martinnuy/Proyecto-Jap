let loginButton = document.getElementById("login");
let inputEmail = document.getElementById("inputEmail");
let inputPassword = document.getElementById("inputPassword");
let googleButon = document.getElementsByClassName("abcRioButton");

function googleButStyle(){
    googleButon.classList.add("mt-3 mx-auto");
    console.log("vapai");
}

googleButStyle();


let prueba = null;
let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


function beforeLogin(){

    prueba = inputEmail.value;
    let esValido = expReg.test(prueba);
   
   if(esValido && inputPassword.value){

    window.location.href = "inicio.html";

    return false;

   }else{
       alert("El formato de correo o la contraseña no son validos.");
   }

 
    
}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});