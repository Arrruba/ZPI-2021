var error_count=0;


window.onload= function(){
    console.log("b");
   // document.getElementById("form-email").addEventListener("invalid", increaseErrorCount());
   // document.getElementById("submit-btn").addEventListener("click",clickRegister());
    

}

function increaseErrorCount(){
    error_count=error_count+1;
    console.log("error counttt:"+error_count);
    console.log("aaa");
}

function clickRegister(){
    var fc_elements = document.getElementsByClassName("form-control");
    console.log(fc_elements.length);
    var num_invalid=0;
    for (var i = 0; i < fc_elements.length; i++) {
        var is_v = fc_elements[i].checkValidity();//.addEventListener("invalid", increaseErrorCount());
        var message = fc_elements[i].validationMessage;
        var el_id = fc_elements[i].id;
        if (is_v==false){
            num_invalid++;
            fc_elements[i].style.borderColor="red";
            var small_id = el_id+"-small";
            console.log(small_id);
            console.log(message);
           // console.log(document.getElementById(small_id).textContent);
            document.getElementById(small_id).innerText=message;
        }
        else fc_elements[i].style.borderColor="#91e561";
        
    }

    if (num_invalid==0){
    document.getElementById('register-form').style.display='none';
    document.getElementById('reg-info').style.display='none';
    document.getElementById('register-info-success').style.display='block';
    }
    console.log("error count:"+error_count);
    console.log("num invalid: "+num_invalid);

}

