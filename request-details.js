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
                var author=results.user.login;
                var is_approved = (results.approved === true) ? 'Zaakceptowany' : 'Czeka na akceptację';
                var rating = results.rating;
                var date = (results.dateSubmitted).substring(8,10) + '-' + (results.dateSubmitted).substring(5,7) + '-' + (results.dateSubmitted).substring(0,4);

                $("#title").html(title);
                $('#author').append(author);
                $("#cost").append((cost)+" zł");
                $('#description').append(description);
                $('#is-approved').append(is_approved);
                $('#date').append(date);

                if (results.approved != true && author == loggedInUser['login']) {
                    $('#request-title td:last').after('<td style="text-align: end;"><img src="img/edit.png" style="cursor: pointer;" onclick="location.href=\'request-edit.html?id='+results.id+'\';"></td>');
                }

                if (loggedInUser && loggedInUser['role'] == 'admin') {
                    var htmlc='';

                    htmlc += '<input type="number" min="0" class="form-control" id="rating-input" placeholder="0" required style="width: 100px;">';
                    htmlc += '<p id="rating-input-small"style="color: red;"></p>';
                    htmlc += '<a onclick="rateRequest()"><button type="submit" class="btn btn-primary modal-button" style="margin: auto; width: 40%; ">Zatwierdź</button></a>';

                    $('#rating').append(htmlc);

                    if (rating != undefined) {
                        document.getElementById('rating-input').value = rating;
                    }
                }
                else {
                    $('#rating').append((rating == undefined) ? '-' : rating);
                }
            }
        }
    );
}

function rateRequest() {
    var rating_input_el = document.getElementById("rating-input");
    var emarating_input_small = document.getElementById(rating_input_el.id+"-small");

    if (rating_input_el.checkValidity() == false) {
        rating_input_el.style.borderColor="red";
        emarating_input_small.innerText=rating_input_el.validationMessage;
    }
    else {
        var url_string = window.location.href
        var url = new URL(url_string);
        var request_id = url.searchParams.get("id");
        var rating = $("#rating-input").val();
        var requestBody = {
            requestId: request_id,
            rating: rating
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:9003/requests/rate",
            data: JSON.stringify(requestBody),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (msg) {     
                emarating_input_small.innerText="";
                rating_input_el.style.borderColor="#91e561";   
                location.reload();        
            }
        });
    }
}
