window.onload = function onload(){
    var url_get_categories = "http://localhost:9003/categories/getAll";
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
                    htmlc += '<option value="'+ item.name +'" >'+ item.name +'</option>';

                });
                $("#select-cat").html((htmlc));
                
            }
        });


}