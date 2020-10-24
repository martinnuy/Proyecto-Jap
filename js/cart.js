let cartItems = [];
var tipoDeEnvio = null;
var precioEnvio = 0;
var direccion = "";
var pais = null;
var metodoPago = null;

//Funcion que muestra los productos en HTML
function showProducts (array, par, envio, estadoEnvio, direccion, pais, metodoPagoPar){
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


    //Carrito sin productos:
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

    //Molde para cada producto:
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
                //Convertir convertidor de dolares a pesos uruguayos.
                var price = productToShow.articles[i].unitCost * array.articles[i].count ;
                 if(productToShow.articles[i].currency === "USD"){
                  price = ((productToShow.articles[i].unitCost * 40)*array.articles[i].count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                 };

      //Lista de cada producto seleccionado.
      cartList +=`
      
      <li class="list-group-item d-flex justify-content-between align-items-center px-0" id="list`+i+`">
              `+productToShow.articles[i].name+` (`+array.articles[i].count+`)
                <span>$ `+price+`</span>
              </li>
      
      `;
    }
    productToShowTwo += `<p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i>No demore al comprar, agregar artículos a su carrito no significa reservarlos.</p>
    `;
    

    //Subtotal:
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

    
    //Selector de envio:
    if(subTotal === 0){
      precioEnvio = 0;
    }else if(estadoEnvio === "noCambiar"){
      precioEnvio = precioEnvio;
    }else if(envio === "standard" && precioEnvio === ((subTotal*5) / 100) && estadoEnvio === null){
      precioEnvio = 0;
    }else if(envio === "express" && precioEnvio === ((subTotal*7) / 100) && estadoEnvio === null){
      precioEnvio = 0;
    }else if(envio === "premium" && precioEnvio === ((subTotal*15) / 100) && estadoEnvio === null){
      precioEnvio = 0;
    }else if(envio === "standard"){
      precioEnvio = (subTotal*5) / 100;
    }else if(envio === "express"){
      precioEnvio = (subTotal*7) / 100;
    }else if(envio === "premium"){
      precioEnvio = (subTotal*15) / 100;
    }else if(envio === null){
      precioEnvio = 0;
    }

    

    var totalAPagar = subTotal + precioEnvio;

    //Selector de pais:
    cartList += `
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Subtotal
                <span>$ `+subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+`</span>
              </li>
              <strong class="mt-3">Envio:</strong>

                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <i class="fas fa-exclamation-triangle fa-7x col-md-5 marginForIcon mb-4 icon-color"></i>
                          <p class="text-center">Para poder realizar su compra, es necesario elegir un metodo de pago y un tipo de envío.</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                      </div>
                    </div>
                  </div>
            
            <form onsubmit="return false">  
              <li class="list-group-item d-flex justify-content-between align-items-center px-0 pb-0 border-0">
                <button type="button" class="btn btn-light azul mb-1 buttonSizeSmall" onclick="cambiarTipoEnvio('standard')" name="envio" required>Standard</button>
                <button type="button" class="btn btn-light azul mb-1 buttonSizeSmall" onclick="cambiarTipoEnvio('express')" name="envio" required>Express</button>
                <button type="button" class="btn btn-light azul mb-1 buttonSizeSmall" onclick="cambiarTipoEnvio('premium')" name="envio" required>Premium</button>
              </li>

              <select name="pais" class="form-control mt-3 mb-2" id="countryList" required>
                  <option value="" disabled selected>País de destino.</option>
                  <option value="AF">Afganistán</option>
                  <option value="AL">Albania</option>
                  <option value="DE">Alemania</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antártida</option>
                  <option value="AG">Antigua y Barbuda</option>
                  <option value="AN">Antillas Holandesas</option>
                  <option value="SA">Arabia Saudí</option>
                  <option value="DZ">Argelia</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaiyán</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrein</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BE">Bélgica</option>
                  <option value="BZ">Belice</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermudas</option>
                  <option value="BY">Bielorrusia</option>
                  <option value="MM">Birmania</option>
                  <option value="BO">Bolivia</option>
                  <option value="BA">Bosnia y Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BR">Brasil</option>
                  <option value="BN">Brunei</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="BT">Bután</option>
                  <option value="CV">Cabo Verde</option>
                  <option value="KH">Camboya</option>
                  <option value="CM">Camerún</option>
                  <option value="CA">Canadá</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CY">Chipre</option>
                  <option value="VA">Ciudad del Vaticano (Santa Sede)</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comores</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, República Democrática del</option>
                  <option value="KR">Corea</option>
                  <option value="KP">Corea del Norte</option>
                  <option value="CI">Costa de Marfíl</option>
                  <option value="CR">Costa Rica</option>
                  <option value="HR">Croacia (Hrvatska)</option>
                  <option value="CU">Cuba</option>
                  <option value="DK">Dinamarca</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egipto</option>
                  <option value="SV">El Salvador</option>
                  <option value="AE">Emiratos Árabes Unidos</option>
                  <option value="ER">Eritrea</option>
                  <option value="SI">Eslovenia</option>
                  <option value="ES">España</option>
                  <option value="US">Estados Unidos</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Etiopía</option>
                  <option value="FJ">Fiji</option>
                  <option value="PH">Filipinas</option>
                  <option value="FI">Finlandia</option>
                  <option value="FR">Francia</option>
                  <option value="GA">Gabón</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GD">Granada</option>
                  <option value="GR">Grecia</option>
                  <option value="GL">Groenlandia</option>
                  <option value="GP">Guadalupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GY">Guayana</option>
                  <option value="GF">Guayana Francesa</option>
                  <option value="GN">Guinea</option>
                  <option value="GQ">Guinea Ecuatorial</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="HT">Haití</option>
                  <option value="HN">Honduras</option>
                  <option value="HU">Hungría</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IQ">Irak</option>
                  <option value="IR">Irán</option>
                  <option value="IE">Irlanda</option>
                  <option value="BV">Isla Bouvet</option>
                  <option value="CX">Isla de Christmas</option>
                  <option value="IS">Islandia</option>
                  <option value="KY">Islas Caimán</option>
                  <option value="CK">Islas Cook</option>
                  <option value="CC">Islas de Cocos o Keeling</option>
                  <option value="FO">Islas Faroe</option>
                  <option value="HM">Islas Heard y McDonald</option>
                  <option value="FK">Islas Malvinas</option>
                  <option value="MP">Islas Marianas del Norte</option>
                  <option value="MH">Islas Marshall</option>
                  <option value="UM">Islas menores de Estados Unidos</option>
                  <option value="PW">Islas Palau</option>
                  <option value="SB">Islas Salomón</option>
                  <option value="SJ">Islas Svalbard y Jan Mayen</option>
                  <option value="TK">Islas Tokelau</option>
                  <option value="TC">Islas Turks y Caicos</option>
                  <option value="VI">Islas Vírgenes (EEUU)</option>
                  <option value="VG">Islas Vírgenes (Reino Unido)</option>
                  <option value="WF">Islas Wallis y Futuna</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italia</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japón</option>
                  <option value="JO">Jordania</option>
                  <option value="KZ">Kazajistán</option>
                  <option value="KE">Kenia</option>
                  <option value="KG">Kirguizistán</option>
                  <option value="KI">Kiribati</option>
                  <option value="KW">Kuwait</option>
                  <option value="LA">Laos</option>
                  <option value="LS">Lesotho</option>
                  <option value="LV">Letonia</option>
                  <option value="LB">Líbano</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libia</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lituania</option>
                  <option value="LU">Luxemburgo</option>
                  <option value="MK">Macedonia, Ex-República Yugoslava de</option>
                  <option value="MG">Madagascar</option>
                  <option value="MY">Malasia</option>
                  <option value="MW">Malawi</option>
                  <option value="MV">Maldivas</option>
                  <option value="ML">Malí</option>
                  <option value="MT">Malta</option>
                  <option value="MA">Marruecos</option>
                  <option value="MQ">Martinica</option>
                  <option value="MU">Mauricio</option>
                  <option value="MR">Mauritania</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">México</option>
                  <option value="FM">Micronesia</option>
                  <option value="MD">Moldavia</option>
                  <option value="MC">Mónaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="MS">Montserrat</option>
                  <option value="MZ">Mozambique</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Níger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk</option>
                  <option value="NO">Noruega</option>
                  <option value="NC">Nueva Caledonia</option>
                  <option value="NZ">Nueva Zelanda</option>
                  <option value="OM">Omán</option>
                  <option value="NL">Países Bajos</option>
                  <option value="PA">Panamá</option>
                  <option value="PG">Papúa Nueva Guinea</option>
                  <option value="PK">Paquistán</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Perú</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PF">Polinesia Francesa</option>
                  <option value="PL">Polonia</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="UK">Reino Unido</option>
                  <option value="CF">República Centroafricana</option>
                  <option value="CZ">República Checa</option>
                  <option value="ZA">República de Sudáfrica</option>
                  <option value="DO">República Dominicana</option>
                  <option value="SK">República Eslovaca</option>
                  <option value="RE">Reunión</option>
                  <option value="RW">Ruanda</option>
                  <option value="RO">Rumania</option>
                  <option value="RU">Rusia</option>
                  <option value="EH">Sahara Occidental</option>
                  <option value="KN">Saint Kitts y Nevis</option>
                  <option value="WS">Samoa</option>
                  <option value="AS">Samoa Americana</option>
                  <option value="SM">San Marino</option>
                  <option value="VC">San Vicente y Granadinas</option>
                  <option value="SH">Santa Helena</option>
                  <option value="LC">Santa Lucía</option>
                  <option value="ST">Santo Tomé y Príncipe</option>
                  <option value="SN">Senegal</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leona</option>
                  <option value="SG">Singapur</option>
                  <option value="SY">Siria</option>
                  <option value="SO">Somalia</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="PM">St Pierre y Miquelon</option>
                  <option value="SZ">Suazilandia</option>
                  <option value="SD">Sudán</option>
                  <option value="SE">Suecia</option>
                  <option value="CH">Suiza</option>
                  <option value="SR">Surinam</option>
                  <option value="TH">Tailandia</option>
                  <option value="TW">Taiwán</option>
                  <option value="TZ">Tanzania</option>
                  <option value="TJ">Tayikistán</option>
                  <option value="TF">Territorios franceses del Sur</option>
                  <option value="TP">Timor Oriental</option>
                  <option value="TG">Togo</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad y Tobago</option>
                  <option value="TN">Túnez</option>
                  <option value="TM">Turkmenistán</option>
                  <option value="TR">Turquía</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UA">Ucrania</option>
                  <option value="UG">Uganda</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistán</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="YE">Yemen</option>
                  <option value="YU">Yugoslavia</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabue</option>
                </select>
                <input type="text" class="form-control mb-2" placeholder="Ingrese su dirección." value="`+direccion+`" id="direccion" required>
                <small class="form-text text-muted text-center mb-4 mt-0">Calle, numero de puerta, esquina.</small>     
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                  <span>Costo de envío: </span>
                  <span class="align-self-end">$ `+precioEnvio+`</span>
                </li>
               
              <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                <div>
                  <strong>Precio total a pagar</strong>
                
                </div>
                <span><strong>$ `+totalAPagar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+`</strong></span>
              </li>
              <small class="form-text text-muted text-center mb-2 mt-0">
                          Pesos Uruguayos
                        </small>
                       
          

               
                  <button type="button" class="btn btn-secondary btn-block litleButton mx-auto mb-2" onclick="metodoDePago()">Elegir metodo de pago</button>
               <button type="submit" class="btn btn-primary btn-block" onclick="buyButton()">Comprar!</button>
          </form>    
          
          <div class="modal fade" id="metodoDePago" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content width90">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fa fa-credit-card mr-1"></i>Tarjeta de Credito</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fa fa-university mr-1"></i>Transferencia Bancaria.</a>
                            </li>
                          </ul>
                          <div class="tab-content mt-3" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <form role="form" onsubmit="return false">
                            <div class="form-group">
                            <label for="username">Nombre del titular</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-user"></i></span>
                              </div>
                              <input type="text" class="form-control" name="username" placeholder="" required="" id="nameInput" required>
                            </div> <!-- input-group.// -->
                            </div> <!-- form-group.// -->
                            
                            <div class="form-group">
                            <label for="cardNumber">Numero de Tarjeta</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-credit-card"></i></span>
                              </div>
                              <input type="text" class="form-control" name="cardNumber" placeholder="" id="creditInput" required>
                            </div> <!-- input-group.// -->
                            </div> <!-- form-group.// -->
                            
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label><span class="hidden-xs">Fecha de Expiracion</span> </label>
                                      <div class="form-inline">
                                        <select class="form-control" style="width:45%" id="mesInput" required>
                                      <option value disabled selected>MM</option>
                                      <option>Enero</option>
                                      <option>Febrero</option>
                                      <option>Marzo</option>
                                      <option>Abril</option>
                                      <option>Mayo</option>
                                      <option>Junio</option>
                                      <option>Julio</option>
                                      <option>Agosto</option>
                                      <option>Septiembre</option>
                                      <option>Octubre</option>
                                      <option>Noviembre</option>
                                      <option>Diciembre</option>
                                    </select>
                                          <span style="width:10%; text-align: center"> / </span>
                                          <select class="form-control" style="width:45%" id="yearInput" required>
                                      <option value disabled selected>AA</option>
                                      <option>2020</option>
                                      <option>2021</option>
                                      <option>2022</option>
                                      <option>2023</option>
                                      <option>2024</option>
                                      <option>2025</option>
                                    </select>
                                    <div class="pt-4">

                                      <img class="mr-2" width="45px"
                                        src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa">
                                      <img class="mr-2" width="45px"
                                        src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express">
                                      <img class="mr-2" width="45px"
                                        src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard">
                                    </div>

                                      </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>CVV <i class="fa fa-question-circle" data-toggle="tooltip" data-html="true" title="<img src='img/cvv.png' alt=''>"></i></label>
                                        <input class="form-control" required="" type="text" id="cvvInput">
                                    </div> <!-- form-group.// -->
                                </div>
                            </div> <!-- row.// -->
                            <button class="subscribe btn btn-primary btn-block" type="submit" onclick="buyMetodValue('Credito', 'metodoDePago')"> Confirmar  </button>
                            </form>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                  <form onsubmit="return false">
                                    <div class="form-group "> <label for="Select Your Bank">
                                          <h5>Datos para la transferencia bancaria:</h5>
                                          <dl class="param">
                                            <dt>BANCO: </dt>
                                            <dd>BROU</dd>
                                          </dl>
                                          <dl class="param">
                                            <dt>Numero de cuenta: </dt>
                                            <dd> 12345678912345</dd>
                                          </dl>
                                          <dl class="param">
                                            <dt>Codigo IBAN: </dt>
                                            <dd> 123456789</dd>
                                          </dl>
                                          <p><strong>Importante: <br>
                                          </strong>La acreditación dependerá de cuándo fue realizada la misma. 
                                          Si fue efectuada después de las 16 horas de un día hábil o en un día no hábil, la transferencia se procesará el próximo día hábil.</p>
                                  <div class="form-group">
                                      <p> <button type="submit" class="btn btn-primary " onclick="buyMetodValue('Debito', 'metodoDePago')"><i class="fas fa-mobile-alt mr-2"></i>Confirmar</button> </p>
                                  </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                      </div>
                    </div>
                  </div>
    `;


    document.getElementById("container").innerHTML = productContentToAppend;
    document.getElementById("containerProducts").innerHTML += productToShowTwo;
    document.getElementById("cartList").innerHTML += cartList;
    //Mantener los datos del pais seleccionado:
    if(pais != null){
        document.getElementById("countryList").options[pais].selected = "selected";
    }
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
}


getJSONData(CART_BUY_ITEMS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        cartItems = resultObj.data;
        //Muestro el producto
        showProducts (cartItems, undefined, undefined, undefined, direccion);
        
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

    
//Funcion para variar la cantidad de productos:
function sumarProductos(num, action){
    
    if(action === "suma"){
        document.getElementById("input"+num).stepUp([1]);
        let artOneCount = document.getElementById("input"+num).value;
        cartItems.articles[num].count = artOneCount;
        pais = document.getElementById("countryList").selectedIndex;
        direccion = document.getElementById("direccion").value;
        //buyMetodValue();
        showProducts (cartItems, undefined, tipoDeEnvio, "noCambiar", direccion, pais, metodoPago);
        cambiarTipoEnvio(tipoDeEnvio);
    }else if(action === "resta"){
      if(document.getElementById("input"+num).value != 0){
        document.getElementById("input"+num).stepDown([1]);
        let artOneCount = document.getElementById("input"+num).value;
        cartItems.articles[num].count = artOneCount;
        pais = document.getElementById("countryList").selectedIndex;
        direccion = document.getElementById("direccion").value;
        //buyMetodValue();
        showProducts (cartItems, undefined, tipoDeEnvio, "noCambiar", direccion, pais, metodoPago);
        cambiarTipoEnvio(tipoDeEnvio);
      }
        
    }

}

//Cambio de envio:
function cambiarTipoEnvio(tipo){
  pais = document.getElementById("countryList").selectedIndex;
  direccion = document.getElementById("direccion").value;
  //buyMetodValue();
  tipoDeEnvio = tipo;
  showProducts(cartItems, undefined, tipoDeEnvio, null, direccion, pais, metodoPago)
}



//Remover articulo del carrito:
function removeItem(item){
  
  if(cartItems.articles.length > 1){
    cartItems.articles.splice(item, 1);
    tipoDeEnvio = null;
    pais = document.getElementById("countryList").selectedIndex;
    direccion = document.getElementById("direccion").value;
    //buyMetodValue();
    showProducts (cartItems, undefined, tipoDeEnvio, undefined, direccion, pais, metodoPago);
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

//Funcion para mostrar modal con animacion:
function showModal(modal){
  document.getElementById(modal).style.display = "block";
 setTimeout(() => {document.getElementById(modal).style.display = "none"}, 2000);
}

//Boton de comprar:
function buyButton(){
  let conditionA = document.getElementById("countryList").value;
  let conditionB = document.getElementById("direccion").value;

  if(precioEnvio === 0 || metodoPago == null){
    $('#exampleModalCenter').modal({
      keyboard: false
    })
  }else if(conditionA != "" && conditionB != "" && precioEnvio != 0 && metodoPago != null){
    document.getElementById("myModal").style.display = "block";
    setTimeout(() => {document.getElementById("myModal").style.display = "none"}, 2000);
  }
  
}

//Boton para confirmar metodo de pago y cerrar ventana modal.
function buyMetodValue(valor, idModal){
  if(valor === "Credito"){
    let conditionA = document.getElementById("nameInput").value;
    let conditionB = document.getElementById("creditInput").value;
    let conditionC = document.getElementById("mesInput").value;
    let conditionD = document.getElementById("yearInput").value;
    let conditionE = document.getElementById("cvvInput").value;

    if(conditionA != "" && conditionB != "" && conditionC != "" && conditionD != "" && conditionE != ""){
      metodoPago = valor;
      $('#'+idModal).modal('hide');
    }
  }else if(valor === "Debito"){
      metodoPago = valor;
      $('#'+idModal).modal('hide');
  }
}

//Muestra la ventana modal con los metodos de pago.
function metodoDePago(){
  $('#metodoDePago').modal({
    keyboard: false
  })
}

