let cartItems = [];
var tipoDeEnvio = null;
var precioEnvio = 0;


function showProducts (array, par, envio, estadoEnvio){
    let productToShow = array;
    var valor = [];

    for(let i = 0; i<array.articles.length; i++){
        
        
        if(par !=null){
            let inputValue = document.getElementById("input"+i).value;
            valor.push(inputValue);
        } else{
            valor.push(productToShow.articles[i].count);
        }

    }



    let productContentToAppend = `
    
    <section>

    <h1>Tu carrito</h1>
  
    <!--Grid row-->
    <div class="row">
  
      <!--Grid column-->
      <div class="col-lg-8">
  
        <!-- Card -->
        <div class="mb-3 shadow-lg rounded">
          <div class="p-4 wish-list" id="containerProducts">
          <h5 class="mb-4">Articulos (<span>`+productToShow.articles.length+`</span>)</h5>
            
  
          </div>
        </div>
        <!-- Card -->
  
       
  
        
  
      </div>
      <!--Grid column-->
  
      <!--Grid column-->
      <div class="col-lg-4">
  
        <!-- Card -->
        <div class="mb-3 shadow-lg p-3 rounded">
          <div class="">
  
            <h5 class="mb-3">Cantidad total</h5>
  
            <ul class="list-group list-group-flush" id="cartList">
             
      
            </ul>
  
            <button type="button" class="btn btn-primary btn-block" onclick="showModal('myModal')">Comprar!</button>
  
          </div>
        </div>
        <!-- Card -->
  
       
  
      </div>
      <!--Grid column-->
  
    </div>
    <!-- Grid row -->
  
  </section>

  <div id="myModal" class="modal" style="display: none;"">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
  </div>

    
      <div id="myModalHeart" class="modal" style="display: none;"">
        <div class="container">
          <div class="containerHeart">
            <div class="heart"></div>
          </div>
        </div>
      </div>
    
    
    `;

    let productToShowTwo = ``;
    let cartList = ``;
    var garantido = null;

    for(let i = 0; i<array.articles.length; i++){
      if(array.articles[i].currency === "USD" || ((array.articles[i].currency === "UYU") && (array.articles[i].unitCost >1000))){
        garantido = "Con garantía"
      }else{
        garantido ="Sin garantía";
      }
      productToShowTwo += `
      
      <div class="row mb-4">
              <div class="col-md-5 col-lg-3 col-xl-3">
                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <img class="img-fluid w-100 rounded shadow-sm"
                    src="`+productToShow.articles[i].src+`" alt="Sample">
                  <a href="#!">
                    <div class="mask">
                      <div class="mask rgba-black-slight"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-7 col-lg-9 col-xl-9">
                <div>
                  <div class="d-flex justify-content-between">
                    <div>
                      <h5>`+productToShow.articles[i].name+`</h5>
                      <p class="mb-3 text-muted text-uppercase small">Articulo en Stock</p>
                      <p class="mb-2 text-muted text-uppercase small">`+garantido+`</p>
                      <p class="mb-3 text-muted text-uppercase small">Envio: Si</p>
                    </div>
                    <div>
                      <div class="def-number-input number-input safari_only mb-0 w-100 contadorContainer">
                        <button onclick="sumarProductos(`+i+`, 'resta')"
                          class="botonContador"><i class="fas fa-minus"></i></button>
                        <input class="inputContador" min="0" name="quantity" value="`+valor[i]+`" type="number" id="input`+i+`">
                        <button onclick="sumarProductos(`+i+`, 'suma')" id="button1"
                          class="botonContador"><i class="fas fa-plus"></i></button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" onclick="removeItem(`+i+`)"><i
                          class="fas fa-trash-alt mr-1"></i> Remover</a>
                      <a href="#!" type="button" class="card-link-secondary small text-uppercase" onclick="showModal('myModalHeart')"><i
                          class="fas fa-heart mr-1"></i> Mover a la lista de deseados </a>
                    </div>
                    <p class="mb-0"><span><strong id="summary">`+productToShow.articles[i].currency+` `+productToShow.articles[i].unitCost+`</strong></span></p class="mb-0">
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4">
      
      `;

                var price = productToShow.articles[i].unitCost * array.articles[i].count ;
                 if(productToShow.articles[i].currency === "USD"){
                  price = ((productToShow.articles[i].unitCost * 40)*array.articles[i].count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                 };


      cartList +=`
      
      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
              `+productToShow.articles[i].name+` (`+array.articles[i].count+`)
                <span>$ `+price+`</span>
              </li>
      
      `;
    }
    productToShowTwo += `<p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i>No demore al comprar, agregar artículos a su carrito no significa reservarlos.</p>
    `;

    var subTotal = null;
    var pesos = null;
    for(let i = 0; i<array.articles.length; i++){
      
      if(productToShow.articles[i].currency === "USD"){
        pesos = ((productToShow.articles[i].unitCost * 40)*array.articles[i].count);
        subTotal += pesos;
       }else{
      subTotal += array.articles[i].unitCost * array.articles[i].count;
        }
    }

    

    
    
    if(subTotal === 0){
      precioEnvio = 0;
    }else if(estadoEnvio === "noCambiar"){
      precioEnvio = precioEnvio;
    }else if(envio === "standard" && precioEnvio === 100 && estadoEnvio === null){
      precioEnvio = 0;
    }else if(envio === "express" && precioEnvio === 500 && estadoEnvio === null){
      precioEnvio = 0;
    }else if(envio === "standard"){
      precioEnvio = 100;
    }else if(envio === "express"){
      precioEnvio = 500;
    }

    

    var totalAPagar = subTotal + precioEnvio;

    cartList += `
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Subtotal
                <span>$ `+subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+`</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0 pb-0 border-0">
                <strong>Envio:</strong>
                <button type="button" class="btn btn-light azul mb-1 buttonSizeSmall" onclick="cambiarTipoEnvio('standard')">Standard</button>
                <button type="button" class="btn btn-light azul mb-1 buttonSizeSmall" onclick="cambiarTipoEnvio('express')">Express</button>
                <span>$ `+precioEnvio+`</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                <div>
                  <strong>Precio total a pagar</strong>
                
                </div>
                <span><strong>$ `+totalAPagar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+`</strong></span>
              </li>
              <small class="form-text text-muted text-center mb-4 mt-0">
                          (Pesos Uruguayos)
                        </small>
    `;


    document.getElementById("container").innerHTML = productContentToAppend;
    document.getElementById("containerProducts").innerHTML += productToShowTwo;
    document.getElementById("cartList").innerHTML += cartList;
}


getJSONData(CART_BUY_ITEMS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        cartItems = resultObj.data;
        //Muestro el producto
        showProducts (cartItems);
        
    }else{
      let showError = `
      <div class="alert alert-danger" role="alert" style="position: relative; width:auto; top: 0;">
      <h4 class="alert-heading">¡Error! :(</h4>
      <p>No se ha podido cargar el contenido solicitado.</p>
      <hr>
      <p class="mb-0">Intentalo mas tarde.</p>
    </div>
      `;
      document.getElementById("container").innerHTML = showError;
    }

});

    

function sumarProductos(num, action){
    
    if(action === "suma"){
        document.getElementById("input"+num).stepUp([1]);
        let artOneCount = document.getElementById("input"+num).value;
        cartItems.articles[num].count = artOneCount;
        showProducts (cartItems, undefined, tipoDeEnvio, "noCambiar")
    }else if(action === "resta"){
        document.getElementById("input"+num).stepDown([1]);
        let artOneCount = document.getElementById("input"+num).value;
        cartItems.articles[num].count = artOneCount;
        showProducts (cartItems, undefined, tipoDeEnvio, "noCambiar")
    }

}


function cambiarTipoEnvio(tipo){
  tipoDeEnvio = tipo;
  showProducts(cartItems, undefined, tipoDeEnvio, null)
}


function removeItem(item){
  
  if(cartItems.articles.length > 1){
    cartItems.articles.splice(item, 1);
    showProducts (cartItems, undefined, tipoDeEnvio)
  }else if(cartItems.articles.length === 1){
    let emptyCart = `
      <div class="alert alert-secondary " role="alert" style="position: relative; width:auto; top: 0;">
      <div class="container">
        <div clas="row">
          <i class="fas fa-shopping-cart fa-7x fa-align-center center-block  col-md-2 offset-md-5"></i>
       </div></div>
      <p class="text-center mt-2">¡Tu carrito esta Vacio!</p>
      <hr>
      <p class="mb-0 text-center">Seras redirigido a la seccion de productos :)</p>
    </div>
      `;
      document.getElementById("container").innerHTML = emptyCart;
      setTimeout(() => {window.location.href = "categories.html";}, 5000);
  }

  
}


function showModal(modal){
  document.getElementById(modal).style.display = "block";
 setTimeout(() => {document.getElementById(modal).style.display = "none"}, 2000);
}