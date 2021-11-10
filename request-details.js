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
    var request_id = url.searchParams.get("id");
    var url_get_request = "http://localhost:9003/requests/"+request_id;
    console.log(url_get_request);

    $.ajax(
        {
            url: url_get_request,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                var title=results.title;
                var cost=results.cost;
                var description=results.description;
                var is_approved = (results.isApproved === true) ? 'Zaakceptoway' : 'Czeka na akceptację';

                $("#title").html(title);
                $("#cost").append((cost)+" zł");
                $('#description').append(description);
                $('#is-approved').append(is_approved);

                if (is_approved != true) {
                    $('#request-title td:last').after('<td style="text-align: end;"><img src="img/edit.png" style="cursor: pointer;" onclick="location.href=\'request-edit.html?id='+results.id+'\';"></td>');
                }
            }
        }
    );
}
