window.onload= function onload(){
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        console.log('x');
        console.log(JSON.parse(loggedInUser));
        document.getElementById('content').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
    } else {
        console.log('no user');
        document.getElementById('content').style.display = 'none';
        document.getElementById('signIn').style.display = 'block';
    }
/*
    var modal_login_register=` <div class="modal fade w-100" id="centralModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog w-100" role="document">
        <div class="modal-content" style="padding: 10px; border-radius: 0;">
            <div class="w-100" style="text-align: center;">
                <button type="button" id="close-modal" class=" close-button" data-dismiss="modal"
                    aria-label="Close" onclick="resetVisibility()">x</button>
                <div class="w-100">
                    <div style="display:inline-block;">
                        <img src="img/wroclaw logo.png" style="height: 40px; margin-right:0px; ">
                    </div>
                    <h6 class="modal-title" id="myModalLabel" style="margin-left:-30px;">rocław jest eko</h6>
                </div>
            </div>


            <div id="modalBody"
                style=" font-size: 1em; font-weight: lighter; margin-top: 60px; text-align: center;">

                <div class="w-100" id = "loginInput">
                <input id="username-input" class="input-login" type="text" placeholder="login" name="username"
                    required>
                <input id="password-input" class="input-login" type="password" placeholder="hasło"
                    name="password">
                </div>
                <!-- DO PRZYPOMNIENIA HASŁA-->
                <div class="w-100" id="passwordReminder">
                <input id="email-input" class="input-login" type="email" placeholder="adres e-mail"
                    name="email">
                <p id="dont-remember-pass" class="main-menu-item"
                    style="cursor: pointer; align-self: center; margin-top: 15px; font-size: 0.75em;"
                    onclick="remindPassword()">Nie pamiętam hasła</p>
                <button id="send-reminder-btn" class="btn modal-button"
                    style="margin-top: 15px; display:none;">Wyślij przypomnienie</button>
                </div>
                <!-- DO PRZYPOMNIENIA HASŁA - KONIEC-->

                <!-- DO REJESTRACJI -->
                <div id="registrationHelper" class="w-75" style="margin: auto; display: none;">
                <h6 style="font-weight:normal;">Zarejestruj się jako...</h6>
                <table class="w-100" style="margin-top: 40px;">
                    <tr style="height: 150px; color: white;">
                        <td class="td-clickable" onclick="redirectRegisterCitizen()">
                            <img src="img/dom_logo.png" style="width: 50%;">
                            <br>OBWATEL
                        </td>
                        <td style=" min-width: 10%;"></td>
                        <td class="td-clickable" onclick="redirectRegisterCompany()">
                            <img src="img/praca_logo.png" style="width: 50%;">
                            <br>FIRMA
                        </td>
                    </tr>
                </table>
                <p class="modal-title" id="link-to-login" style="font-size: 0.75em; text-align: center; margin-top: 60px; margin-bottom: 20px;font-family: Segoe UI, Verdana, Helvetica, sans-serif;
                ">Masz już konto? <a href="#" class="logon-link" onclick="resetVisibility()">Zaloguj się</a></p>
                </div>
                <!-- DO REJESTRACJI - KOIEC-->

            </div>
            <button id="classic-login" type="submit" class="btn modal-button" data-dismiss="modal"
                style="margin-top: 40px; ">Zaloguj</button>

                <div class="w-100">
                
            <div id="google-login" class="g-signin2 google-signIn-button"
                style="margin-top: 100px; min-width: 500px; display:block; color:black;" data-width="180px;" span-text="Zaloguj przez Google"
                data-onsuccess="onSignIn"></div>
</div>
            <a class="logon-link" id="return-to-traditional-login" onclick="resetVisibility()"
                style="font-size: 0.75em; text-align: center; margin-top: 60px; margin-bottom: 20px;font-family: Segoe UI, Verdana, Helvetica, sans-serif; display:none; cursor:pointer;">Powrót
                do logowania tradycyjnego</a>

            <p class="modal-title" id="link-to-register" style="font-size: 0.75em; text-align: center; margin-top: 60px; margin-bottom: 20px;font-family: Segoe UI, Verdana, Helvetica, sans-serif;
                ">Nie masz jeszcze konta? <a href="#" id="regiLink" class="logon-link" onclick="registrationStart()">Zarejestruj się</a></p>
             </div>
         </div>
        </div>`;
        
        $("#modal-here").append((modal_login_register));
*/


}

function popup(){

  //  var auth2 = gapi.auth2.getAuthInstance();
   // var profile = auth2.currentUser.get().getBasicProfile();
    var url_string = window.location.href;
    var url = new URL(url_string);

   

  // document.getElementById("modalBody").innerHTML ="0/10";
}

function signIn() {
    var login = $("#username-input").val();
    var password = $("#password-input").val();
    var authRequest = {
        login: login,
        password: password
    };

    var err_el = document.getElementById("login-small");

    $.ajax({
        type: "POST",
        url: "http://localhost:9003/auth",
        data: JSON.stringify(authRequest),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (response) {
            // var user = {
            //     login: response.login,
            //     role: response.role
            // };
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('login_method', "classic");            
            // document.getElementById("classic-login").setAttribute("data-dismiss", "modal"); 
            location.reload();
        },
        error: function(xhr, status, error) {
            var err_msg = xhr.responseText;
            console.log(err_msg);
            err_el.style.display='block';
            err_el.innerText="Niepoprawny login i/lub hasło";
        }
    });
}

function onSignIn(googleUser) {
    console.log('User is ' + JSON.stringify(googleUser.getBasicProfile()))
    // localStorage.setItem('user', JSON.stringify(googleUser.getBasicProfile())); 
    // localStorage.setItem("user.login", JSON.stringify(googleUser.getBasicProfile().getEmail()));   
    //console.log(JSON.parse(localStorage.getItem("user"))["login"]);     
    localStorage.setItem('login_method', "google");            

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

    var ulr_add_user = "http://localhost:9003/users/googleSignUp?user_email="+googleUser.getBasicProfile().getEmail();
    $.ajax({
        url: ulr_add_user,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(results) {
            //$("#signIn").css("visibility", "none");
            var user = {
                login: results.login,//googleUser.getBasicProfile().getEmail(),
                role: results.role//"citizen"
            };
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
        }
    });

    // var user = {
    //          login: googleUser.getBasicProfile().getEmail(),
    //          role: null
    //      };
    // localStorage.setItem('user', JSON.stringify(user));
    // console.log(user);

    
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
    // gapi.auth2.getAuthInstance().signOut().then(function() {
    //     console.log('User signed out');
    //     var element = document.querySelector('#content');
    //     element.innerHTML = '';
    //     document.getElementById('content').style.display = 'none';
    //     document.getElementById('signIn').style.display = 'block';

    // });
    if(localStorage.getItem('login_method').localeCompare("google")==0){
        gapi.auth2.getAuthInstance().signOut().then(function() {
                console.log('User signed out');
                var element = document.querySelector('#content');
                element.innerHTML = '';
                document.getElementById('content').style.display = 'none';
                document.getElementById('signIn').style.display = 'block';
        
            });
    }
    localStorage.clear();
    window.sessionStorage.removeItem("InitiativesToVoteOn");
    document.location.href="index.html";
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
    document.getElementById('email-input-small').style.display='block';
    document.getElementById("login-small").style.display='none';
}

function resetPassword(){
    var email_element = document.getElementById("email-input");
    var email_small = document.getElementById(email_element.id+"-small");
    if (email_element.checkValidity() == false) {
        email_element.style.borderColor="red";
        email_small.innerText=email_element.validationMessage;
    }
    else {
        console.log("http://localhost:9003/users/generateNewPassword?email=" + $("#email-input").val())
        $.ajax({
            type: "GET",
            url:"http://localhost:9003/users/generateNewPassword?email=" + $("#email-input").val(),
            success: function (data) {
                email_small.innerText="";
                email_small.style.borderColor="#91e561";
                document.getElementById('email-input').style.display = 'none';
                document.getElementById('send-reminder-btn').style.display = 'none';
                document.getElementById('email-reset-success-info').style.display='block';
            }
        });
    }
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
    document.getElementById('email-input-small').style.display='none';
    document.getElementById('email-reset-success-info').style.display='none';
    document.getElementById("login-small").style.display='none';
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


