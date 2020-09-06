const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const PRODUCT_INFO_URL_NEW = "https://prodigyuy.github.io/Proyecto-Jap/json/all.json";
const PRODUCT_INFO_COMMENTS_URL_NEW = ["https://japdevdep.github.io/ecommerce-api/product/5678-comments.json", "https://prodigyuy.github.io/Proyecto-Jap/json/5678-comments1.json", "https://prodigyuy.github.io/Proyecto-Jap/json/5678-comments2.json", "https://prodigyuy.github.io/Proyecto-Jap/json/5678-comments3.json"]





var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}






function onSignIn(){
  const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  var profile = googleUser.getBasicProfile();
  localStorage.setItem('ID:' , profile.getId()); // Do not send to your backend! Use an ID token instead.
  localStorage.setItem('Name:' , profile.getName());
  localStorage.setItem('Image URL:' , profile.getImageUrl());
  localStorage.setItem('Email:' , profile.getEmail()); // This is null if the 'email' scope is not present.

  localStorage.setItem("Acceso", "Ok");
  window.location.href = "inicio.html"


}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('Acceso');
    localStorage.removeItem('UsuarioNormal'); 
    localStorage.removeItem('ID:' ); 
    localStorage.removeItem('Name:');
    localStorage.removeItem('Image URL:');
    localStorage.removeItem('Email:'); 
    localStorage.removeItem("EmailNormal");
    window.location.href = "index.html";
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}


function sigOutDelay(){
  onLoad();
  var tiempo = setTimeout(signOut, 200)
  
}

function userInfo(){
  var normalLogin = localStorage.getItem("Name:");
  var gogLogin = localStorage.getItem("ID:")

        if(gogLogin === null){
          var userName = localStorage.getItem("Name:");
          var foto = document.getElementById("userAvatar");
          var userButton = document.getElementById("dropdownMenuButton");


          foto.setAttribute("src", "./img/avatar2.png");
          userButton.innerHTML = userName;
        }else{

            var foto = document.getElementById("userAvatar");
            var userButton = document.getElementById("dropdownMenuButton");
            var userName = localStorage.getItem('Name:');
            var profilePhoto =  localStorage.getItem('Image URL:');
            var userEmail =  localStorage.getItem('Email:'); 


        foto.setAttribute("src", profilePhoto);
        userButton.innerHTML = userName;

 }


}

userInfo();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});