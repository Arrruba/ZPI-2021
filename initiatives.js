var count = 0;

window.onload = function onload() {
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

    var url_get_initiatives="";
    if(localStorage.getItem("user")==null || JSON.parse(localStorage.getItem("user"))["role"].localeCompare("admin")!=0){
        url_get_initiatives = "http://localhost:9003/initiatives/approved/2021";//getAll";
    }
    else{
        url_get_initiatives = "http://localhost:9003/initiatives/year/2021";//getAll";
    }
    var id = 1;

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    console.log("arr: " + arr);
    var array = [];
    if (arr != null && arr.localeCompare("undefined") != 0) {
        array = arr.split(",");
        console.log("eee");
    }
    console.log(array);


    $.ajax({
        url: url_get_initiatives,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log(results);

            var htmlc = '';

            $.each(results.initiativeList, function (key, item) {
                var descript = (item.description).substring(0, 100);
                if ((item.description).length >= 100)
                    descript += "...";

                htmlc += '<div id="filterable"><p style="display:none;">' + item.district.name + "</p>";

                if (array.length > 0 && array.includes((item.id).toString())) {
                    htmlc += '<div id="element-' + item.id + '" class="my-chosen-list-element w-100" style="margin-top:1%;" onclick="location.href=\'initiative_details.html?id=' + item.id + '\';">';
                } else {
                    htmlc += '<div id="element-' + item.id + '" class="my-list-element w-100" style="margin-top:1%;" onclick="location.href=\'initiative_details.html?id=' + item.id + '\';">';
                }
                console.log('"location.href=\'initiative_details.html?id=' + item.id + ';"');
                htmlc += '<table class="table my-tab-color w-100">';
                htmlc += '<tbody id="tab-body">';
                htmlc += '<tr><tr>';
                htmlc += '<td style="font-size:0.25em; display:none;">' + item.id + '</td>';
                htmlc += '<td id="row' + id + '-title" style="font-weight:bold; font-size:1.25em;">' + item.title + '</td>';
                htmlc += '<td id="row' + id + '-districtName" class="city-name-list ' + item.district.name + '" >' + item.district.name + '</td>';
                htmlc += '</tr><tr>';
                htmlc += '<td id="row' + id + '-description">' + descript + '</td>';
                htmlc += '</tr>';
                htmlc += '</tr>';
                htmlc += '<tr></tr></tbody></table></div></div>';
                console.log(item.title + "," + item.description);
                count++;
                id++;
            });
            $("#list-section").append((htmlc));
            $("#spinner").css("display", "none");

        }
    });

}


function showFilter() {

    if(localStorage.getItem("user")==null || JSON.parse(localStorage.getItem("user"))["role"].localeCompare("admin")!=0){

    var url_get_districts = "http://localhost:9003/districts/getAll";

    if (document.getElementById('filter_field').style.display == 'none') {
        $.ajax({
            url: url_get_districts,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (results) {
                console.log(results);

                var htmlc = '<option selected>wszystkie dzielnice</option>';

                $.each(results.districtList, function (key, item) {
                    htmlc += '<option value="' + item.name + '" >' + item.name + '</option>';

                });
                $("#dropdown-menu-districts").html((htmlc));
            }
        });
        document.getElementById('filter_field').style.display = 'block';
        document.getElementById('districts').style.display = 'block';
        document.getElementById('categories-filter').style.display = 'none';

    } else document.getElementById('filter_field').style.display = 'none';


    $(document).ready(function () {
        $("#dropdown-menu-districts").change(function () {
            var value = $(this).val().toLowerCase();
            var filtered = 0;

            if (value.localeCompare("wszystkie dzielnice") != 0) {
                $("#filterable div").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    if ($(this).text().toLowerCase().indexOf(value) > -1) filtered++;
                });
            } else {
                $("#filterable div").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) != 0);
                });
            } 
            if (filtered==0 && value.localeCompare("wszystkie dzielnice")!=0)
                document.getElementById('no_records_msg').style.display = 'block';
            else
                document.getElementById('no_records_msg').style.display = 'none';

        });

    });
    }

    else{
        document.getElementById('filter_field').style.display = 'block';
        document.getElementById('districts').style.display = 'none';
        document.getElementById('categories-filter').style.display = 'block';
    }
}

function checkNumber(){
    var url_user_votes = "http://localhost:9003/votes/countForUser?user_login="+ JSON.parse(localStorage.getItem("user"))["login"]+"&date_from=2021-01-01T00:00:00&date_to=2022-01-01T00:00:00";   
    var user_votes_number = 0;

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    var array ;
    if(arr!=null){
        array = arr.split(",");
    }

    $.ajax({
        url: url_user_votes,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (msg) {                
                user_votes_number = msg;
                if(array == null || array.length + user_votes_number <= 5){
                    $('#voteModal').modal('show');
                    document.getElementById('modal-question').style.display='block';
                    document.getElementById('modal-success').style.display='none';
                    document.getElementById('modal-error').style.display='none';
                    document.getElementById('modal-too-many-votes').style.display='none';
                }
                else{
                    $('#voteModal').modal('show');
                    document.getElementById('modal-question').style.display='none';
                    document.getElementById('modal-success').style.display='none';
                    document.getElementById('modal-error').style.display='none';
                    document.getElementById('modal-too-many-votes').style.display='block';
                }
            }
        });
    
}

function dismissModal(){
    $('#voteModal').modal('hide');
    setTimeout(() => { acknowledge(); }, 100);
}



function submitVotes(){
    var url_add_votes = "http://localhost:9003/votes/addVotes?user_login="+ JSON.parse(localStorage.getItem("user"))["login"];   

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    var array ;
    if(arr!=null){
        array = arr.split(",");
    }

    var cnt=0;
    var requestBody = "[";
    array.forEach(element => {
        if(cnt>0){
            requestBody+= ",{"+
                "\"initiative\": {"+
                "    \"id\": "+element+
               "}"+
            "}";
        }
        else {
            requestBody+=  "{"+
            "\"initiative\": {"+
            "    \"id\": "+element+
           "}"+
        "}";
        }
        cnt++;
    });
    requestBody+="]";
    console.log(requestBody);

    $.ajax({
        url: url_add_votes,
        type: "POST",
        data: requestBody,
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (msg) {                
                document.getElementById('modal-question').style.display='none';
                document.getElementById('modal-success').style.display='block';
            },
        error: function(xhr, status, error) {
                
                document.getElementById('modal-question').style.display='none';
                document.getElementById('modal-error').style.display='block';
            }
    });

    dismissModal();

}

function acknowledge(){
    document.getElementById('modal-question').style.display='block';
    document.getElementById('modal-success').style.display='none';
    document.getElementById('modal-error').style.display='none';
    document.getElementById('modal-too-many-votes').style.display='none';
}

function changeDisplay(){
    var option = document.getElementById('dropdown-menu-categories').value;
    if(option.localeCompare("wszystkie inicjatywy")==0) option="year";
    var get_url = "http://localhost:9003/initiatives/"+option+"/2021";

    $("#spinner").css("display", "block");
    var id=1;
    
    $.ajax({
        url: get_url,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log(results);

            var htmlc = '';

            $.each(results.initiativeList, function (key, item) {
                var descript = (item.description).substring(0, 100);
                if ((item.description).length >= 100)
                    descript += "...";

                htmlc += '<div id="filterable"><p style="display:none;">' + item.district.name + "</p>";

                htmlc += '<div id="element-' + item.id + '" class="my-list-element w-100" style="margin-top:1%;" onclick="location.href=\'initiative_details.html?id=' + item.id + '\';">';
                
                console.log('"location.href=\'initiative_details.html?id=' + item.id + ';"');
                htmlc += '<table class="table my-tab-color w-100">';
                htmlc += '<tbody id="tab-body">';
                htmlc += '<tr><tr>';
                htmlc += '<td style="font-size:0.25em; display:none;">' + item.id + '</td>';
                htmlc += '<td id="row' + id + '-title" style="font-weight:bold; font-size:1.25em;">' + item.title + '</td>';
                htmlc += '<td id="row' + id + '-districtName" class="city-name-list ' + item.district.name + '" >' + item.district.name + '</td>';
                htmlc += '</tr><tr>';
                htmlc += '<td id="row' + id + '-description">' + descript + '</td>';
                htmlc += '</tr>';
                htmlc += '</tr>';
                htmlc += '<tr></tr></tbody></table></div></div>';
                console.log(item.title + "," + item.description);
                count++;
                id++;
            });
            $("#list-section").html(htmlc);
            $("#spinner").css("display", "none");

        }
    });
}
