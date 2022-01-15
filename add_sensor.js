window.onload = function onload(){
    var url_get_categories = "http://localhost:9003/measurements/allTypes";
    var id=1;

    $.ajax(
        {
            url: url_get_categories,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
               
                var htmlc='<option value="kategoria" >kategoria</option>';
                
                $.each(results.categoryList, function(key,item){
                    console.log(item.name);
                    htmlc += '<option id="'+item.id+'" value="category-'+ item.id +'" >'+ item.name +'</option>';

                });
                $("#select-cat").html((htmlc));
                
            }
        });

    var url_get_districts = "http://localhost:9003/districts/getAll";

    $.ajax(
        {
            url: url_get_districts,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                console.log(results);

                var htmlc='<option selected>dzielnica</option>';
                
                $.each(results.districtList, function(key,item){
                    htmlc += '<option value="district-'+ item.id +'" >'+ item.name +'</option>';
                });
                $("#select-dist").html((htmlc));
            }
        }
    );


}


function submitSensor(){

    var url = document.getElementById('form-url').value;
    var district_arr = (document.getElementById('select-dist').value).split("-");
    var district_id = district_arr[1];
    var category_arr = (document.getElementById('select-cat').value).split("-");
    var category_id = category_arr[1];

    if(JSON.parse(localStorage.getItem("user"))==null || JSON.parse(localStorage.getItem("user")).length ==0 || (JSON.parse(localStorage.getItem("user"))["Yt"]==null && JSON.parse(localStorage.getItem("user"))["login"]==null)){
        document.getElementById('alert').style.display = 'block';
    }
    else{

    var requestBody = {
        url: url,
        district:{
            id: district_id
         },
        category:{
            id: category_id
        }
    };

    console.log("requestBody"+JSON.stringify(requestBody));
    

    }

    $.ajax({
        type: "POST",
        url: "http://localhost:9003/measurements/addNewSensor",
        data: JSON.stringify(requestBody),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (msg) {                
            // document.getElementById('request-form').style.display='none';
            // document.getElementById('req-info').style.display='none';
            document.getElementById('alert-sukces').style.display = 'block';
            setTimeout(window.location.href="index.html", 3000);
            //document.getElementById('request-info-success').style.display='block';
        }
});


}