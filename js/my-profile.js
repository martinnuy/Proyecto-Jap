let profileImg = null;
let profileNames = null;
let profileLastNames = null;
let profileEmail= null;

let userInformationJson = JSON.parse(localStorage.getItem("UserProfileInofrmation"));
if(!localStorage.getItem("UserProfileInofrmation")){
    userInformationJson = {
            "names" : "",
            "lastNames" : "",
            "birthDay" : "",
            "phoneNumber": "",
            "celNumber": "",
            "email": "",
            "profilePhoto" : ""
    }
}

document.getElementById("profilePhoto").onload = function(){
    document.getElementById("profilePhoto").style.width = "318px";
    document.getElementById("profilePhoto").style.height = "318px";}

if(localStorage.getItem("UserProfileInofrmation")){
    document.getElementById("inputName").value = userInformationJson.names;
    document.getElementById("inputLastName").value = userInformationJson.lastNames;
    document.getElementById("birthDate").value = userInformationJson.birthDay;
    document.getElementById("phoneNumber").value = userInformationJson.phoneNumber;
    document.getElementById("celNumber").value = userInformationJson.celNumber;
    document.getElementById("emailAddress").value = userInformationJson.email;
    document.getElementById("profilePhoto").src = userInformationJson.profilePhoto;

    getAge()
    document.getElementById("showName").innerHTML = document.getElementById("inputName").value.replace(/ .*/,'') + " " + document.getElementById("inputLastName").value.replace(/ .*/,'');
    setTimeout(() => {document.getElementById("showName").className += "d-block"}, 500);

    if(document.getElementById("celNumber").value || (document.getElementById("celNumber").value && document.getElementById("phoneNumber").value)){
        document.getElementById("showNumber").innerHTML = "Celular: " + document.getElementById("celNumber").value;
        setTimeout(() => {document.getElementById("showNumber").className += "d-block"}, 1500);
    }else if(document.getElementById("phoneNumber").value){
        document.getElementById("showNumber").innerHTML = "Teléfono: " + document.getElementById("phoneNumber").value;
        setTimeout(() => {document.getElementById("showNumber").className += "d-block"}, 1500);
    }

    document.getElementById("showEmail").innerHTML = document.getElementById("emailAddress").value;
    setTimeout(() => {document.getElementById("showEmail").className += "d-block"}, 2000);
}else if(localStorage.getItem('Email:')){
    document.getElementById("emailAddress").value = localStorage.getItem('Email:');
    document.getElementById("profilePhoto").src = localStorage.getItem('Image URL:');
}else{
    document.getElementById("emailAddress").value = localStorage.getItem('Name:')
    
        var img = new Image();
        img.src = "img/avatar2.png"
        img.crossOrigin = 'Anonymous';

        img.onload = function () {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);

        var uri = canvas.toDataURL('image/png'),
        b64 = uri.replace(/^data:image.+;base64,/, '');

        document.getElementById("profilePhoto").src = "data:image/gif;base64," + b64;
        };
}



  function getAge(){
    var dateString = document.getElementById("birthDate").value;  
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age){
        document.getElementById("showAge").innerHTML =  age + " Años";
        setTimeout(() => {document.getElementById("showAge").className += "d-block"}, 1000);
    }
}

document.getElementById("submitButton").addEventListener("click", function saveChanges(){
    if(!document.getElementById("phoneNumber").value && !document.getElementById("celNumber").value && document.getElementById("inputName") && document.getElementById("inputLastName") && document.getElementById("birthDate").value){
        $('#exampleModalCenter').modal({
            keyboard: false
          })
    }else if(document.getElementById("inputName") && document.getElementById("inputLastName") && document.getElementById("birthDate").value && document.getElementById("emailAddress").value && (document.getElementById("phoneNumber").value || document.getElementById("celNumber").value)){
        getAge();

        document.getElementById("showName").innerHTML = document.getElementById("inputName").value.replace(/ .*/,'') + " " + document.getElementById("inputLastName").value.replace(/ .*/,'');
        setTimeout(() => {document.getElementById("showName").className += "d-block"}, 500);

        if(document.getElementById("celNumber").value || (document.getElementById("celNumber").value && document.getElementById("phoneNumber").value)){
            document.getElementById("showNumber").innerHTML = "Celular: " + document.getElementById("celNumber").value;
            setTimeout(() => {document.getElementById("showNumber").className += "d-block"}, 1500);
        }else if(document.getElementById("phoneNumber").value){
            document.getElementById("showNumber").innerHTML = "Teléfono: " + document.getElementById("phoneNumber").value;
            setTimeout(() => {document.getElementById("showNumber").className += "d-block"}, 1500);
        }

        document.getElementById("showEmail").innerHTML = document.getElementById("emailAddress").value;
        setTimeout(() => {document.getElementById("showEmail").className += "d-block"}, 2000);



        if(document.getElementById("inputName").value != userInformationJson.names || document.getElementById("inputLastName").value != userInformationJson.lastNames || 
        document.getElementById("birthDate").value != userInformationJson.birthDay || document.getElementById("phoneNumber").value != userInformationJson.phoneNumber ||
        document.getElementById("celNumber").value != userInformationJson.celNumber || document.getElementById("emailAddress").value != userInformationJson.email){
            document.getElementById("showName").style.display = "none"
            setTimeout(() => {document.getElementById("showName").style.display = "block"}, 500);

            document.getElementById("showAge").style.display = "none"
            setTimeout(() => {document.getElementById("showAge").style.display = "block"}, 1000);

            document.getElementById("showNumber").style.display = "none"
            setTimeout(() => {document.getElementById("showNumber").style.display = "block"}, 1500);

            document.getElementById("showEmail").style.display = "none"
            setTimeout(() => {document.getElementById("showEmail").style.display = "block"}, 2000);

            
        }
        


            if(document.getElementById("uploadPhoto").value){
                var input = document.getElementById("uploadPhoto");
                var fReader = new FileReader();
                fReader.readAsDataURL(input.files[0]);
                fReader.onloadend = function(event){
                var img = document.getElementById("profilePhoto");
                var imgData = event.target.result;
                
                document.getElementById("profilePhoto").style.width = "318px";
                document.getElementById("profilePhoto").style.height = "318px";
                
                if(imgData != document.getElementById("profilePhoto").src){
                document.getElementById("profilePhoto").style.display = "none";
                img.src = imgData;
                setTimeout(() => {document.getElementById("profilePhoto").style.display = "block"}, 10);;
                
            }
        
        }
    }
        }
        
        setTimeout(() => {

            let profileInformation = {
                "names" : document.getElementById("inputName").value,
                "lastNames" : document.getElementById("inputLastName").value,
                "birthDay" : document.getElementById("birthDate").value,
                "phoneNumber": document.getElementById("phoneNumber").value,
                "celNumber": document.getElementById("celNumber").value,
                "email": document.getElementById("emailAddress").value,
                "profilePhoto" : document.getElementById("profilePhoto").src
            }
            
            
            localStorage.setItem("UserProfileInofrmation", JSON.stringify(profileInformation))
            userInformationJson = JSON.parse(localStorage.getItem("UserProfileInofrmation"));
        }, 400);

        setTimeout(() => {userInfo();}, 500);
    
});




  