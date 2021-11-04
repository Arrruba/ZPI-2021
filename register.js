var error_count=0;


window.onload= function  onload(){
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
   // document.getElementById("form-email").addEventListener("invalid", increaseErrorCount());
   // document.getElementById("submit-btn").addEventListener("click",clickRegister());
    
   //$(".alert").alert();
}

$(document).ready(function(e) {
    $.ajax({
        type: "GET",
        url:"http://localhost:9003/districts",
        dataType: "json",
        success: function (data) {
            $.each(data.districtList,function(i,obj) {
                var div_data="<option value="+obj.id+">"+obj.name+"</option>";
                $(div_data).appendTo('#form-district'); 
            });  
        }
    });
});

function increaseErrorCount(){
    error_count=error_count+1;
    console.log("error counttt:"+error_count);
    console.log("aaa");
}

function clickRegister(user_type){
    var fc_elements = document.getElementsByClassName("form-control");
    console.log(fc_elements.length);
    var num_invalid=0;
    for (var i = 0; i < fc_elements.length; i++) {
        var is_v = fc_elements[i].checkValidity();//.addEventListener("invalid", increaseErrorCount());
        var message = fc_elements[i].validationMessage;
        var el_id = fc_elements[i].id;
        var small_id = el_id+"-small";
        if (is_v==false){
            num_invalid++;
            fc_elements[i].style.borderColor="red";            
            console.log(small_id);
            console.log(message);
           // console.log(document.getElementById(small_id).textContent);
            document.getElementById(small_id).innerText=message;
        }
        else {
            var el = document.getElementById(small_id);
            if (el)
                el.innerText="";
            fc_elements[i].style.borderColor="#91e561";
        }
        
    }

    const check_bx = document.getElementById('regulaminCheck');
    var is_checked = check_bx.checked;

    if(!is_checked){
       // window.alert("Musisz zaakceptować regulamin");
       document.getElementById('alert').style.display = 'block';

     //  $(".alert").alert();
    }
    else if (num_invalid==0 && is_checked){
        var login = $("#form-login").val();
        var password = $("#form-password").val();        
        var businessName = $("#form-company").val();
        var contactStreet = $("#form-street").val();        
        var contactAddressNumber = $("#form-address-number").val();
        var contactCode = $("#form-postcode").val();
        var firstContactPhone = $("#form-fst-number").val();
        var secondContactPhone = $("#form-snd-number").val();
        var contactEmail = $("#form-email").val();
        var nipNumber = $("#form-nip").val();
        var districtId = $("#form-district").val();

        var requestBody = {
            login: login,
            password: password,
            businessName: businessName,
            contactStreet: contactStreet,
            contactAddressNumber: contactAddressNumber,
            contactCode: contactCode,
            firstContactPhone: firstContactPhone,
            secondContactPhone: secondContactPhone,
            contactEmail: contactEmail,
            nipNumber: nipNumber,
            district: {
                id: districtId
            }
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:9003/signup/" + user_type,
            data: JSON.stringify(requestBody),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (msg) {                
                document.getElementById('register-form').style.display='none';
                document.getElementById('reg-info').style.display='none';
                document.getElementById('register-info-success').style.display='block';
            },
            error: function(xhr, status, error) {
                var err_msg = xhr.responseText;
                console.log(err_msg);
                var element_id;
                var message
                if (err_msg == "Login is already taken: " + login) {
                    element_id = "form-login";
                    message = "Login jest już zajęty.";
                }
                else if (err_msg == "Email is already taken: " + contactEmail) {
                    element_id = "form-email";     
                    message = "E-mail jest już zajęty.";           
                }
                document.getElementById(element_id).style.borderColor="red";
                document.getElementById(element_id+"-small").innerText=message; 
            }
        });
    }

    if(is_checked){
        document.getElementById('alert').style.display = 'none';
    }
    console.log("error count:"+error_count);
    console.log("num invalid: "+num_invalid);

}

