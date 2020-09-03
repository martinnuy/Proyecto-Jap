let URLActual = window.location.pathname;
let productsPages = ["/product-info0.html", "/product-info1.html", "/product-info2.html", "/product-info3.html"];
let productSelection = null;
let productsArray = [];


for(let i = 0; i < productsPages.length; i++){
    if(productsPages[i] === URLActual){
        productSelection = productsPages.indexOf(productsPages[i]);
    }
}

function showProducts (array){
    let productToShow = array[productSelection];

    let productContentToAppend = `
<div class="text-center p-4">
      <h2>Descripción de la categoría</h2>
      <p class="lead">Encontrarás aquí toda la información de la categoría seleccionada.</p>
      <p class="small alert-warning py-3"><strong>Nota: </strong>por simplicidad, cualquiera sea la categoría
        seleccionada previamente, siempre se visualizará la presente: <strong>Autos</strong>.</p>
    </div>
    <h3 id="productName">`+ productToShow.name +`</h3>
    <hr class="my-3">
    <dl>
      <dt>Precio</dt>
      <dd>
        <p id="productCost">`+productToShow.currency+ " " +productToShow.cost+`</p>
      </dd>

      <dt>Descripción</dt>
      <dd>
        <p id="productDescription">`+productToShow.description+`</p>
      </dd>

      <dt>Categoría</dt>
      <dd>
        <p id="productCategory"><a href="category-info.html">`+productToShow.category+`</a></p>
      </dd>

      <dt>Cantidad de vendidos</dt>
      <dd>
        <p id="productCount">`+productToShow.soldCount+`</p>
      </dd>

      <dt>Imágenes ilustrativas</dt>
      <dd>
        <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
      <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="`+productToShow.images[0]+`" alt="">
          </div>
      </div>
      
      <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="`+productToShow.images[1]+`" alt="">
          </div>
      </div>
      
      <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="`+productToShow.images[2]+`" alt="">
          </div>
      </div>
      
      <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="`+productToShow.images[3]+`" alt="">
          </div>
      </div>
      </div>
      </dd>
    </dl>
    <a type="button" class="btn btn-light btn-lg btn-block" href="products.html">Ver productos</a>
`;

document.getElementById("container").innerHTML = productContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL_NEW).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro el producto
            setTimeout(function(){showProducts (productsArray)}, 200);
            
        }

    }); 

});