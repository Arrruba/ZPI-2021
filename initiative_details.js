
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
                            
                console.log(init_title);//+" "+author+" "+district);
                $("#initiative-title").html((init_title));
                $("#district-name").append((district));
                $("#cost").append((cost)+" zł");
                $("#category").append((category));
                $('#details').append(description);
                $('#author').append(author);

            }
        }
    );


    
}

function voteOnInitiative(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var initiative_id = url.searchParams.get("id");
    
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

    document.getElementById('vote').style.display = 'none';
    document.getElementById('unvote').style.display = 'block';

    // for (var i=1; i<arr.length(); i++)
    //     counter++;

    // init_array.push(initiative_id);
    // window.sessionStorage.setItem("InitiativesToVoteOn", JSON.stringify(init_array));
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