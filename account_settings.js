window.onload= function onload(){
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
        console.log('x');
        console.log(loggedInUser);
        document.getElementById('content').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
    } else {
        console.log('no user');
        document.getElementById('content').style.display = 'none';
        document.getElementById('signIn').style.display = 'block';
    }

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

    var url_get_user = "http://localhost:9003/users?login=" + loggedInUser['login'];
    console.log(url_get_user);
    
    $.ajax(
        {
            url: url_get_user,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(user){
                var login=user.login;
                var email=user.contactEmail;
                var street=user.contactStreet;
                var address_number=user.contactAddressNumber;
                var code=user.contactCode;

                var district=user.district;

                var business_name=user.businessName;
                var nip=user.nipNumber;
                var first_contact_phone=user.firstContactPhone;
                var second_contact_phone=user.secondContactPhone;
                
                $("#user-login").html(login);
                $("#form-email").val(email);
                $("#form-street").val(street);
                $("#form-address-number").val(address_number);
                $("#form-postcode").val(code);
                
                if(user.citizen == true) {
                    $("#form-district").val(''+district.id);
                    document.getElementById("citizen-details").style.display = "block";
                }
                else {
                    document.getElementById("company-details").style.display = "block";
                    $("#form-nip").val(nip);
                    $("#form-fst-number").val(first_contact_phone);
                    $("#form-snd-number").val(second_contact_phone);

                    document.getElementById("form-street").required = true;
                    document.getElementById("form-address-number").required = true;
                    document.getElementById("form-postcode").required = true;
                }
            }
        }
    );
}

function changePassword() {
    var fc_elements = document.getElementsByClassName("form-pass");
    var num_invalid=0;
    for (var i = 0; i < fc_elements.length; i++) {
        var is_v = fc_elements[i].checkValidity();
        var message = fc_elements[i].validationMessage;
        var el_id = fc_elements[i].id;
        var small_id = el_id+"-small";
        if (is_v==false){
            num_invalid++;
            fc_elements[i].style.borderColor="red";
            document.getElementById(small_id).innerText=message;
        }
        else {
            var el = document.getElementById(small_id);
            if (el)
                el.innerText="";
            fc_elements[i].style.borderColor="#91e561";
        }        
    }

    var repeat_pass = document.getElementById("form-new-pass-repeated");
    if ($("#form-new-pass").val() != $("#form-new-pass-repeated").val()) {
        num_invalid++;
        repeat_pass.style.borderColor="red";  
        document.getElementById("form-new-pass-repeated-small").innerText="Podane hasła nie są identyczne";
    }
    else {
        document.getElementById("form-new-pass-repeated-small").innerText="";
        repeat_pass.style.borderColor="#91e561";
    }

    if (num_invalid==0) {
        var login = $("#user-login").text();
        var oldPass = $("#form-old-pass").val();
        var newPass = $("#form-new-pass").val();

        var requestBody = {
            login: login,
            oldPass: oldPass,
            newPass: newPass
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:9003/users/changePassword",
            data: JSON.stringify(requestBody),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (msg) {                
                document.getElementById("change-pass-success").style.display="block";
                $('html, body').animate({
                    scrollTop: ($("#pass-header").offset().top - $(nav).height() - 50)
                }, 2000);
            },
            error: function(xhr, status, error) {
                var err_msg = xhr.responseText;
                console.log(err_msg);
                document.getElementById("form-old-pass").style.borderColor="red";
                document.getElementById("form-old-pass-small").innerText="Hasło niepoprawne"; 
            }
        });
    }
}

function updateUser() {
    var fc_elements = document.getElementsByClassName("form-details");
    var num_invalid=0;
    for (var i = 0; i < fc_elements.length; i++) {
        var is_v = fc_elements[i].checkValidity();
        var message = fc_elements[i].validationMessage;
        var el_id = fc_elements[i].id;
        var small_id = el_id+"-small";
        if (is_v==false){
            num_invalid++;
            fc_elements[i].style.borderColor="red";
            document.getElementById(small_id).innerText=message;
        }
        else {
            var el = document.getElementById(small_id);
            if (el)
                el.innerText="";
            fc_elements[i].style.borderColor="#91e561";
        }
        
    }

    if (num_invalid==0) {
        var login = $("#user-login").text();
        var contactStreet = $("#form-street").val();
        var contactAddressNumber = $("#form-address-number").val();
        var contactCode = $("#form-postcode").val();

        var districtId = $("#form-district").val();

        var nipNumber = $("#form-nip").val();
        var firstContactPhone = $("#form-fst-number").val();
        var secondContactPhone = $("#form-snd-number").val();

        var requestBody = {
            login: login,
            contactStreet: contactStreet,
            contactAddressNumber: contactAddressNumber,
            contactCode: contactCode,
            firstContactPhone: firstContactPhone,
            secondContactPhone: secondContactPhone,
            nipNumber: nipNumber,
            district: {
                id: districtId
            }
        };

        console.log(requestBody);

        $.ajax({
            type: "PUT",
            url: "http://localhost:9003/users",
            data: JSON.stringify(requestBody),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (msg) {                
                document.getElementById("change-details-success").style.display="block";
                $('html, body').animate({
                    scrollTop: ($("#details-header").offset().top - $(nav).height() - 50)
                }, 2000);
            }
        });
    }
}
