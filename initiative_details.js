
window.onload= function onload(){
    const loggedInUser = localStorage.getItem("user");
    var role="";
    if (loggedInUser) {
        console.log('x');
        console.log(JSON.parse(loggedInUser));
        document.getElementById('content').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
        role = JSON.parse(localStorage.getItem("user"))["role"];
        console.log(role);
    } else {
        console.log('no user');
        document.getElementById('content').style.display = 'none';
        document.getElementById('signIn').style.display = 'block';
    }

    var url_string = window.location.href
    var url = new URL(url_string);
    var initiative_id = url.searchParams.get("id");
    var url_get_initiative = "http://localhost:9003/initiatives/"+initiative_id;
    console.log(url_get_initiative);

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    if(arr!=null){
    var array = arr.split(",");

    if(!array.includes(initiative_id)){
        document.getElementById('vote').style.display = 'block';
        document.getElementById('unvote').style.display = 'none';
    }
    else{
        document.getElementById('vote').style.display = 'none';
        document.getElementById('unvote').style.display = 'block';
    }
    }

    var is_approved = null;

    $.ajax(
        {
            url: url_get_initiative,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){

                var init_title=results.title;
                var district=results.district.name;
                var cost=results.estimatedCost;
                var category=results.category.name;
                var description=results.description;
                var author=results.user.login;
                is_approved = results.isApproved;
                var stat="";
                if(is_approved==0) stat = "odrzucona";
                else if(is_approved==1) stat = "zaakceptowana";
                else stat = "nierozpatrzona";

                console.log("ajax: "+is_approved);
                            
                $("#initiative-title").html((init_title));
                $("#district-name").append((district));
                $("#cost").append((cost)+" zł");
                $("#category").append((category));
                $('#details').append(description);
                $('#author').append(author);
                $('#status').append("<div style='display:inline-flex'><p style='color: #609e4e; font-style: italic;'>Status:&nbsp&nbsp</p>"+stat+"</div>");

                if(role.localeCompare("admin")==0){
                        document.getElementById('regular-options').style.display = 'none';
                        document.getElementById('admin-options').style.display = 'inline-flex';
                        document.getElementById('status').style.display = 'block';
                        console.log("is_approved: "+is_approved);
                        console.log("i_a: "+is_approved);
                        if(is_approved==0)  {
                            document.getElementById('unaccept-btn').disabled = true;
                            document.getElementById('accept-btn').disabled = false;
                    }
                        else if(is_approved==1)  {
                            document.getElementById('accept-btn').disabled = true;
                            document.getElementById('unaccept-btn').disabled = false;

                        }

                    }
            }
        }
    );

    


    
}

function voteOnInitiative(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var initiative_id = url.searchParams.get("id");

    if(JSON.parse(localStorage.getItem("user"))!=null){
    
    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    var array ;
    if(arr!=null){
        array = arr.split(",");
    }
    
    if (arr==null){
        arr = initiative_id;
        window.sessionStorage.setItem("InitiativesToVoteOn", arr);
    }
    else if(!array.includes(initiative_id) && array.length>0){
        arr += ","+initiative_id;
        window.sessionStorage.setItem("InitiativesToVoteOn", arr);
    }
    else if(!array.includes(initiative_id) && array.length==0){
        arr = initiative_id;
        window.sessionStorage.setItem("InitiativesToVoteOn", arr);
    }
    $('#voteAddedModal').modal('show');

    document.getElementById('vote').style.display = 'none';
    document.getElementById('unvote').style.display = 'block';

    // for (var i=1; i<arr.length(); i++)
    //     counter++;

    // init_array.push(initiative_id);
    // window.sessionStorage.setItem("InitiativesToVoteOn", JSON.stringify(init_array));
    }

    else{
        document.getElementById('alert-login').style.display = 'block';
    }

}

function removeVote(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var initiative_id = url.searchParams.get("id");

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    var array = arr.split(",");
    var arr_new;
    array.forEach(element => {
        if(element.localeCompare(initiative_id)!=0 && array.indexOf(element)>0){
            arr_new += ","+element;
    }
        else if(element.localeCompare(initiative_id)!=0 && array.indexOf(element)==0){
            arr_new = element;
        }
    });
    
    window.sessionStorage.setItem("InitiativesToVoteOn", arr_new);

    document.getElementById('vote').style.display = 'block';
    document.getElementById('unvote').style.display = 'none';
}

function dismissModal(){
    $('#voteAddedModal').modal('hide');
}

function changeState(i){
    var url_change_state="";
    var url_string = window.location.href
    var url = new URL(url_string);
    var initiative_id = url.searchParams.get("id");
    if(i==1) {
        url_change_state = "http://localhost:9003/initiatives/approve?initiative_id="+initiative_id;
    }
    else if(i==0) {
        url_change_state = "http://localhost:9003/initiatives/unapprove?initiative_id="+initiative_id;
    }

    $.ajax({
        type: "POST",
        url: url_change_state,
       // data: JSON.stringify(requestBody),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (msg) {                
            // document.getElementById('register-form').style.display='none';
            // document.getElementById('reg-info').style.display='none';
            // document.getElementById('register-info-success').style.display='block';
            if(i==1){
                document.getElementById('accept-btn').disabled = true;
                document.getElementById('unaccept-btn').disabled = false;
            }
            else{
                document.getElementById('unaccept-btn').disabled = true;
                document.getElementById('accept-btn').disabled = false;
            }
        },
        error: function(xhr, status, error) {
            // var err_msg = xhr.responseText;
            // console.log(err_msg);
            // var element_id;
            // var message
            // if (err_msg == "Login is already taken: " + login) {
            //     element_id = "form-login";
            //     message = "Login jest już zajęty.";
            // }
            // else if (err_msg == "Email is already taken: " + contactEmail) {
            //     element_id = "form-email";     
            //     message = "E-mail jest już zajęty.";         
            // }
            // document.getElementById(element_id).style.borderColor="red";
            // document.getElementById(element_id+"-small").innerText=message; 
        }
    });

}