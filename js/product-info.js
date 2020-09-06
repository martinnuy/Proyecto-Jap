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
let holas = null;
function showProducts (array, coments){
    let productToShow = array[productSelection];

    let productContentToAppend = `
    
    <dl id="imgContainer">

    <h1 id="productName" class="font-weight-bold">`+ productToShow.name +`</h1>
    <hr class="my-3">
    <div class="row">

    <img class="img-fluid myImg col-md-6 d-inline shadow-lg p-0 mb-5 bg-white rounded" src="`+productToShow.images[0]+`" alt="" id="myImg" onclick="openImages()">

    <div class="col-md-6 pl-5">
      
      <dd>
        <h2 id="productCost">`+productToShow.currency+ " " +productToShow.cost+`</h2>
      </dd>
      <hr class="my-3">

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

               

        
    </div>
    
    </div>

    <hr class="my-3">

            <dl>
                <dt>Imágenes ilustrativas</dt>
                <dd>
                    <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail myImg" src="`+productToShow.images[0]+`" alt="" id="myImg" onclick="openImages()" onmouseover="changeImage(`+productSelection+`, 0)">
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail myImg" src="`+productToShow.images[1]+`" alt="" id="myImg1" onclick="openImages()" onmouseover="changeImage(`+productSelection+`, 1)">
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail myImg" src="`+productToShow.images[2]+`" alt="" id="myImg2" onclick="openImages()" onmouseover="changeImage(`+productSelection+`, 2)">
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail myImg" src="`+productToShow.images[3]+`" alt="" id="myImg3" onclick="openImages()" onmouseover="changeImage(`+productSelection+`,3)">
                    </div>
                </div>
                </div>
                </dd>
            </dl>
    
    </dl>
    
    

        <div id="myModal" class="modal">
                <span class="close">&times;</span>
                <img class="modal-content" id="img01" onclick="zoomImage()">
            <div id="caption"></div>
        </div>
    
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

        
     
    
    document.getElementsByTagName("body")[0].setAttribute("onkeydown", "onKeyDownHandler(event)");
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





    
// Get the modal


// Get the image and insert it inside the modal - use its "alt" text as a caption
function openImages(){
    let imgContainer = document.getElementById("imgContainer");
    let imgProductsModal = imgContainer.getElementsByTagName("img");
    var modal = document.getElementById("myModal");

        for(let i = 0; i<imgProductsModal.length; i++){

            var img = imgProductsModal[i];
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }

}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}



}

    

function zoomImage(){   
    var selectImg = document.getElementById("img01");
    document.getElementById('myModal').onclick=function(div){
        if(div.target.id !== "img01"){
            document.getElementById('myModal').style.display = "none";
            selectImg.style.webkitAnimationName = "zoom";
            selectImg.style.animationName = "zoom";
        }else{
            let element = selectImg;
            let elementStyle = window.getComputedStyle(element);
            let elementAnimation = elementStyle.getPropertyValue('animation-name');
            let elementAnimationWebkit =  elementStyle.getPropertyValue('-webkit-animation-name');
            
            
                if(elementAnimation === ("zoom")){
                    selectImg.style.animationFillMode  = "forwards";
                    selectImg.style.webkitAnimationName = "zoom2";
                    selectImg.style.animationName = "zoom2";
                }else if(elementAnimation === ("zoom3")){
                    selectImg.style.animationFillMode  = "forwards";
                    selectImg.style.webkitAnimationName = "zoom2";
                    selectImg.style.animationName = "zoom2";

                }else{
                    selectImg.style.animationFillMode  = "forwards";
                    selectImg.style.webkitAnimationName = "zoom3";
                    selectImg.style.animationName = "zoom3";
                }
        }
    }
  }


function changeImage(e, n){
    document.getElementById("myImg");
    number = e + 1;
    if(n === 0){
        document.getElementById("myImg").src = "./img/prod"+(e+1)+".jpg";
    }else{
        document.getElementById("myImg").src = "./img/prod"+(e+1)+"_"+ (n) + ".jpg";
    }

    
}

function onKeyDownHandler(event) {

    var codigo = event.key;
    let element = document.getElementById('myModal');
    let elementStyle = window.getComputedStyle(element);
    let elementDisplay = elementStyle.getPropertyValue('display');
     let imgS = document.getElementById("img01");

    if((elementDisplay != "none") && (codigo === "Escape")){
      element.style.display = "none";
      imgS.style.webkitAnimationName = "zoom";
      imgS.style.animationName = "zoom";
    }

     
}
