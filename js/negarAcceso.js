function negarAcceso(){
    var concederAcceso = localStorage.getItem('Acceso');
    if(concederAcceso != "Ok"){
      window.location.href = "index.html";
    }
  }
  negarAcceso();