const mayorAMenor = "mayor";
const menorAMayor = "menor";
const relevancia = "rel";
var minCount = undefined;
var maxCount = undefined;

var categoriesArray = [];
var categoriesArrayClean = [];


function contador(){
        let navDivContainer = document.getElementById("linksNav");
        let navDiv = document.getElementById("linksNav").getElementsByTagName("div")[0];
        let navLinkInicio = document.getElementById("linksNav").getElementsByTagName("a")[0];

    if(screen.width < 576 && document.getElementById("linksNav").getElementsByTagName("a")[0] === document.getElementById("inicioButtonNav")){
        navDivContainer.insertBefore(navDiv, navLinkInicio);
        document.getElementById("dropdownProfile").className += " col-md-2 pt-2 pl-2";
    }else if(screen.width > 576 && document.getElementById("linksNav").getElementsByTagName("a")[0] != document.getElementById("inicioButtonNav")){
        navDivContainer.appendChild(navDiv);
        document.getElementById("dropdownProfile").className = "dropdown p-0  m-auto row";
    }
}


setInterval('contador()', 500);


function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `

            <div class="col-md-6 list-group-item-action" id="product`+i+`">
                <div class="card mb-4 shadow-sm">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail img-responsive p-0">
                        <div class="card-body">
                                    <h4 class="mb-1">`+ category.name + " - " + category.currency + " " +category.cost +`</h4>
                                        <p class="card-text">`+ category.description +`</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                            </div>
                            <small class="text-muted">` + category.soldCount + " Vendidos" + `</small>
                        </div>
                    </div>
                </div>
            </div>

            `

            /*  <div class="list-group-item list-group-item-action">
                <div class="row" id="product`+i+`">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + " - " + category.currency + " " +category.cost +`</h4>
                            <small class="text-muted">` + category.soldCount + " Vendidos" + `</small>
                        </div>
                        <p>`+ category.description +`</p>
                    </div>
                </div>
            </div>*/ 

        }

       
        
        document.getElementById("container").innerHTML = htmlContentToAppend;
        //Agregando links a cada producto
        setTimeout(function(){document.getElementById("product"+i).addEventListener("click", function(){window.location.href = "product-info"+category.id+".html"});}, 200);

    }
}



function sortCategories(criteria, array){
    let result = [];
    
    if (criteria === mayorAMenor){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if(criteria === menorAMayor){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return 1; }
            if ( aCount < bCount ){ return -1; }
            return 0;
        });
    }else if(criteria === relevancia){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function sortAndShowCategories(sortCriteria, categoriesArrayS){
    currentSortCriteria = sortCriteria;

    if(categoriesArrayS != undefined){
        categoriesArray = categoriesArrayS;
    }

    categoriesArray = sortCategories(currentSortCriteria, categoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList(categoriesArray);
}


//Buscador

const formulario = document.getElementById("formulario");

const filtrar = ()=>{
    const texto = formulario.value.toLowerCase();
    var lista = [];
    var sinResultado = [];
    for(let autos of categoriesArrayClean){
        let nombre = autos.name.toLowerCase();
        let autoDesc = autos.description.toLowerCase();
        let todo = nombre + " " + autoDesc;
        
        if(todo.indexOf(texto) !== -1){
            
            lista.push(autos);
            categoriesArray = lista;
            
            showCategoriesList(categoriesArray);
        }else{
            sinResultado.push(autos);
        }
    }

    if(formulario.value === ""){
        categoriesArray = categoriesArrayClean;    
        showCategoriesList(categoriesArray);

    }else if(sinResultado.length === 4){
        document.getElementById("container").innerHTML = "No encontrado";
    }
}

formulario.addEventListener("keyup", filtrar);
filtrar();


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            editData = resultObj.data;
            for(let i = 0; i < editData.length; i++){
                editData[i].id = i ;

            }

            categoriesArray = editData;
            categoriesArrayClean = editData;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            
        }

    }); 


    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(mayorAMenor);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(menorAMayor);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(relevancia);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(categoriesArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList(categoriesArray);
    });

    

});