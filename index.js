window.onload= function onload(){
    
    
}

function popup(){

  //  var auth2 = gapi.auth2.getAuthInstance();
   // var profile = auth2.currentUser.get().getBasicProfile();
    var url_string = window.location.href;
    var url = new URL(url_string);

   

  // document.getElementById("modalBody").innerHTML ="0/10";
}


function onSignIn(googleUser) {
    console.log('User is ' + JSON.stringify(googleUser.getBasicProfile()))

    var element = document.querySelector('#content');
    var str_short = (googleUser.getBasicProfile().getName()).split(' ');
    var str="";
    str_short.forEach(element => {
        str = str+element[0];
    });
    element.innerText = str;//googleUser.getBasicProfile().getName();

    var image = document.createElement('img');
    image.setAttribute('src', googleUser.getBasicProfile().getImageUrl());
    image.setAttribute('height',"30px");
    image.style.marginLeft="7px";
    element.append(image);
    document.getElementById('content').style.display = 'block';

    /*
    var ulr_add_user = "http://localhost:8080/addOrNotByData/user/"+googleUser.getBasicProfile().getEmail();
        $.ajax({
            url: ulr_add_user,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(results) {
            $("#signIn").css("visibility", "none");
            }
        });*/
     document.getElementById('signIn').style.display = 'none';
     document.getElementById('close-modal').click();
    }

    function signOut() {
        gapi.auth2.getAuthInstance().signOut().then(function() {
            console.log('User signed out');
            var element = document.querySelector('#content');
            element.innerHTML = '';
            document.getElementById('content').style.display = 'none';
            document.getElementById('signIn').style.display = 'block';

        });
    }

function remindPassword(){
    document.getElementById('username-input').style.display = 'none';
    document.getElementById('password-input').style.display = 'none';
    document.getElementById('email-input').style.display = 'block';
    document.getElementById('dont-remember-pass').style.display = 'none';
    document.getElementById('send-reminder-btn').style.display = 'block';
    document.getElementById('classic-login').style.display = 'none';
    document.getElementById('google-login').style.marginTop="50px";
    document.getElementById('return-to-traditional-login').style.display='block';
    document.getElementById('link-to-register').style.marginTop="-3px";
}
    
function resetVisibility(){
    document.getElementById('loginInput').style.display = 'block';
    document.getElementById('username-input').style.display = 'block';
    document.getElementById('password-input').style.display = 'block';
    document.getElementById('username-input').style.margin = 'auto';
    document.getElementById('password-input').style.margin = 'auto';
    document.getElementById('password-input').style.marginTop = '10px';
    document.getElementById('email-input').style.display = 'none';
    document.getElementById('dont-remember-pass').style.display = 'block';
    document.getElementById('send-reminder-btn').style.display = 'none';
    document.getElementById('classic-login').style.display = 'block';
    document.getElementById('google-login').style.display="block";
    document.getElementById('google-login').style.marginTop="10px";
    document.getElementById('return-to-traditional-login').style.display='none';
    document.getElementById('link-to-register').style.display="block";
    document.getElementById('link-to-register').style.marginTop="60px";
    document.getElementById('registrationHelper').style.display='none';

}

function redirectRegisterCitizen(){
    window.location.href = 'register-citizen.html';
}

function redirectRegisterCompany(){
    window.location.href = 'register-company.html';
}

function registrationStart(){
    document.getElementById('registrationHelper').style.display='block';
    document.getElementById('loginInput').style.display = 'none';
    document.getElementById('dont-remember-pass').style.display = 'none';
    document.getElementById('classic-login').style.display = 'none';
    document.getElementById('google-login').style.display="none";
    document.getElementById('link-to-register').style.display="none";
}


