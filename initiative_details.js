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

    $.ajax(
        {
            url: url_get_initiative,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){

                var init_title=results.title;
                var district=results.district;
                var cost=results.estimatedCost;
                var category=results.category.name;
                var description=results.description;
                            
                console.log(init_title);//+" "+author+" "+district);
                $("#initiative-title").html((init_title));
                $("#district-name").append((district));
                $("#cost").append((cost)+" zł");
                $("#category").append((category));
                $('#description').append(description);
            }
        }
    );
}