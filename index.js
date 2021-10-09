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


    