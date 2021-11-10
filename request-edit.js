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
                var id=results.id;

                $("#form-title").val(title);
                $("#form-cost").val(cost);
                $('#form-description').val(description);
                $('#form-id').val(id);
            }
        }
    );
}

function submitRequest() {
    var fc_elements = document.getElementsByClassName("form-control");
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
        var id = $("#form-id").val();
        var title = $("#form-title").val();
        var cost = $("#form-cost").val();        
        var description = $("#form-description").val();

        var requestBody = {
            id: id,
            title: title,
            cost: cost,
            description: description
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:9003/requests",
            data: JSON.stringify(requestBody),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (msg) {                
                document.getElementById('request-form').style.display='none';
                document.getElementById('req-info').style.display='none';
                document.getElementById('request-info-success').style.display='block';
            }
        });
    }
}

function deleteRequest() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var request_id = url.searchParams.get("id");
    var url_delete_request = "http://localhost:9003/requests/"+request_id;

    $.ajax(
        {
            url: url_delete_request,
            type:"DELETE",
            success: function(results){
                document.getElementById('request-form').style.display='none';
                document.getElementById('req-info').style.display='none';
                document.getElementById('request-info-delete').style.display='block';
                $("#confirmDeletionModal").removeClass("in");
                $(".modal-backdrop").remove();
                $("#confirmDeletionModal").hide();
                // document.location.href="user-requests.html";
            }
        }
    );
}
