//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let getURL =  window.location.pathname.split("/");
let URLActual = getURL[getURL.length-1];
let productsPages = ["product-info0.html", "product-info1.html", "product-info2.html", "product-info3.html"];
let productSelection = null;
let productsArray = [];
let comentsArray = [];

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentsArray = resultObj.data;
            
            getJSONData(PRODUCT_INFO_URL_NEW).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    productsArray = resultObj.data;
                    //Muestro el producto
                    showProducts (productsArray, comentsArray);
                    
                }
        
            }); 
    
        }

    }); 




for(let i = 0; i < productsPages.length; i++){
    if(productsPages[i] === URLActual){
        productSelection = productsPages.indexOf(productsPages[i]);
    }
}

function showProducts (array, coments){
    let productToShow = array[productSelection];

    let productContentToAppend = `

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
    
    <hr class="my-3">
    <h3 id="">Productos Relacionados</h3>


    <div class="row">
            <div class="col-md-3">
                <a href="`+productsPages[productToShow.relatedProducts[0]]+`" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="`+productsArray[productToShow.relatedProducts[0]].images[0]+`">
                    <h3 class="m-3">`+productsArray[productToShow.relatedProducts[0]].name+`</h3>
                    <div class="card-body">
                        <p class="card-text" maxlength="20">`+productsArray[productToShow.relatedProducts[0]].description.substring(0,85)+`...</p>
                        <p class="text-primary">Ver</p>
                    </div>
                </a>
            </div>
            <div class="col-md-3">
                <a href="`+productsPages[productToShow.relatedProducts[1]]+`" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="`+productsArray[productToShow.relatedProducts[1]].images[0]+`">
                    <h3 class="m-3">`+productsArray[productToShow.relatedProducts[1]].name+`</h3>
                    <div class="card-body">
                        <p class="card-text" maxlength="20">`+productsArray[productToShow.relatedProducts[1]].description.substring(0,85)+`...</p>
                        <p class="text-primary">Ver</p>
                    </div>
                </a>
            </div>
    </div>

    <hr class="my-3">
    <dt>Comentarios</dt>
    
        
    `;

    
    let comentToAppend = "";
    for(let i = 0; i<coments.length; i++){
        let calification = coments[i].score;
        let starsOn = `<span class="fa fa-star checked"></span>`;
        let starsOff = `<span class="fa fa-star"></span>`;
        let stars = starsOn.repeat(calification) + starsOff.repeat(5-calification);
        
        
         
        comentToAppend +=`
        <hr class="my-3">
                <div id="calification`+i+`">
                    <dt  class="d-inline">`+coments[i].user+`</dt> 
                    <p  class="d-inline">- `+coments[i].dateTime+` -</p>
                    `+stars+`
                </div>

                <dd>
                    <p class="m-1">`+coments[i].description+`</p>
                </dd>

        `;
        
    };

    let comentsForm = `

        <hr class="my-3">
            <div class="mt-5"><dt  class="d-inline">Agregar nuevo comentario</dt></div>
                <hr class="my-3">
                    <p>Opinion<p/>
                        <form>
                            <textarea class="form-control" id="textArea" rows="3" required></textarea>
                                <p>Puntuacion<p/>
                                    <select class="form-control col-md-1" id="setStars">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                            <button type="submit" class="btn btn-primary mt-3" id="comentButtonSubmit" onclick="sendComent()">Enviar</button> 
                        </form>                    

        `;
     
    

    document.getElementById("container").innerHTML = productContentToAppend + comentToAppend +comentsForm;
}

let userName = "";
let userComent = "";
let userCalification = "";
let submitButton = null;


function sendComent(){
    userName = localStorage.getItem('Name:');
    userComent = document.getElementById("textArea").value;
    userCalification = document.getElementById("setStars").value;
    let userDate = new Date();
        if(userComent != ""){
            let newComent = {
                "score": parseInt(userCalification),
                "description": userComent,
                "user": userName,
                "dateTime": userDate.getFullYear() + "-" + (userDate.getMonth() +1) + "-" + userDate.getDate() + " " + userDate.getHours() + ":" + userDate.getMinutes() + ":" + userDate.getSeconds()
            };
            
            comentsArray.push(newComent);
            showProducts (productsArray, comentsArray);
        }
}




document.addEventListener("DOMContentLoaded", function(e){

    


    
    
    

});


