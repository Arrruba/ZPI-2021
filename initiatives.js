
var count=0;

window.onload= function onload(){
    var url_get_initiatives = "http://localhost:9003/initiatives/getAll";
    var id=1;

    var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
    console.log("arr: "+arr);
    var array=[];
    if(arr!=null && arr.localeCompare("undefined")!=0){
        array = arr.split(",");
        console.log("eee");
    }
    console.log(array);


    $.ajax(
        {
            url: url_get_initiatives,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                console.log(results);

                var htmlc='';
                
                $.each(results.initiativeList, function(key,item){
                    var descript = (item.description).substring(0,100);
                    if((item.description).length>=100)
                        descript +="...";

                        htmlc += '<div id="filterable"><p style="display:none;">'+item.district.name+"</p>";

                    if(array.length>0 && array.includes((item.id).toString())){
                        htmlc += '<div id="element-'+item.id+'" class="my-chosen-list-element w-100" style="margin-top:2%;" onclick="location.href=\'initiative_details.html?id='+item.id+'\';">';
                    }
                    else{
                        htmlc += '<div id="element-'+item.id+'" class="my-list-element w-100" style="margin-top:2%;" onclick="location.href=\'initiative_details.html?id='+item.id+'\';">';
                    }
                    console.log('"location.href=\'initiative_details.html?id='+item.id+';"');
                    htmlc += '<table class="table my-tab-color w-100">';
                    htmlc += '<tbody id="tab-body">';
                         htmlc += '<tr><tr>';
                            htmlc += '<td style="font-size:0.25em; display:none;">'+item.id+'</td>';
                             htmlc += '<td id="row'+id+'-title" style="font-weight:bold; font-size:1.25em;">'+item.title+'</td>';
                             htmlc += '<td id="row'+id+'-districtName" class="city-name-list '+item.district.name+'" >'+item.district.name+'</td>';
                         htmlc += '</tr><tr>';
                             htmlc += '<td id="row'+id+'-description">'+descript+'</td>';
                        htmlc += '</tr>';
                    htmlc += '</tr>';
                    htmlc += '<tr></tr></tbody></table></div></div>';
                    console.log(item.title+","+item.description);
                    count++;
                    id++;
                });
                $("#list-section").append((htmlc));

               // $('#tab-body').html(htmlc);
            }
        }
    );

//     var arr = window.sessionStorage.getItem("InitiativesToVoteOn");
//     if(arr!=null){
//     var array = arr.split(",");
//     if(array.length>0){
//         array.forEach(element => {
//             console.log("el"+element);
//             var el_id = 'element-'+element;
//             console.log("el_id "+el_id);

//             document.getElementById(el_id).style.backgroundColor = '#5dca3e93';
//         });
//     }
// }
}


function showFilter(){
    var url_get_districts = "http://localhost:9003/districts/getAll";

    if(document.getElementById('filter_field').style.display == 'none'){
    $.ajax(
        {
            url: url_get_districts,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                console.log(results);

                var htmlc='<option selected>dzielnica</option>';
                
                $.each(results.districtList, function(key,item){
                  //  htmlc += '<li><a class="dropdown-item" href="#">'+ item.name +'</a></li>';
                    htmlc += '<option value="'+ item.name +'" >'+ item.name +'</option>';

                });
                $("#dropdown-menu-districts").html((htmlc));
            }
        }
    );
    document.getElementById('filter_field').style.display = 'block';
    }
    else     document.getElementById('filter_field').style.display = 'none';

    $(document).ready(function(){
        $("#dropdown-menu-districts").change(function() {
            console.log("pick");
          var value = $(this).val().toLowerCase();
          console.log(value);
          if(value.localeCompare("dzielnica")!=0){
          $("#filterable div").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                console.log($(this).text().toLowerCase());
          });}
          else{
            $("#filterable div").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value)!= 0)
          }); 
          }
        });
    
      });
    // document.getElementById('filter-field').addEventListener('select', (e) => {
    //     instance.input-group(e.target.value);
    //   });

}


function randomSong(){
    count = $('#tab-body .col1').length;
    console.log(count);
    if(count>0){
        var rand = Math.ceil(Math.random() * (+count - +1)) + +1;
        var title = document.getElementById("row"+rand+"-title").innerHTML;
        var author = document.getElementById("row"+rand+"-author").innerHTML;
        location.href="game.html?title="+title+"&author="+author;
    }
    else{
        window.alert("Brak piosenek - nie udało się wylosować :/");
    }
}